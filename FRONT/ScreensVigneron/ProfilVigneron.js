
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, SafeAreaView } from "react-native";
import { Button, Input, Header, Avatar, Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/FontAwesome';

import * as ImagePicker from 'expo-image-picker';

import {
  responsiveHeight,
  responsiveWidth,
  responsiveFontSize,
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";

function ProfilVigneron({ navigation, token, userstatus }) {

  var IPecole = "172.17.1.153";

  const [nom, setNom] = useState(null)
  const [domaine, setDomaine] = useState(null)
  const [ville, setVille] = useState(null)
  const [region, setRegion] = useState(null)
  const [desc, setDesc] = useState(null)

  const [image, setImage] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    async function loadData() {
      console.log("PROFIL")
      var rawResponse = await fetch(`http://${IPecole}:3000/info-v?token=${token}`);
      var response = await rawResponse.json();
      console.log("GET INFOS VIGNERON", response)

      if (response.result == true) {
        setDisabled(false)
        setImage(response.user.Photo)
        setNom(response.user.Nom)
        setDomaine(response.user.Domaine)
        setVille(response.user.Ville)
        setRegion(response.user.Region)
        setDesc(response.user.Desc)
      }

      if (domaine == null || ville == null || region == null || desc == null) {
        setDomaine("Nom de domaine")
        setVille("Ville")
        setRegion("Région")
        setDesc("Parlez-nous de vous!")
      }
    }

    (async () => {
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
    loadData()
  }, []);


  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (

    <View style={{ flex: 1 }}>
      <View style={styles.container}>

        <KeyboardAvoidingView behavior="position" enabled>
          <View style={styles.box1}>
            <Image source={require('../assets/monprofil.png')} style={{ width: 120, height: 80, justifyContent:"center", alignItems: 'center' }}></Image>

            <ScrollView>

              <View style={styles.box2}>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                  {image && <Avatar size={100} rounded source={{ uri: image }} title={nom}></Avatar>}

                  <Button
                    icon={{ name: 'plus', type: 'font-awesome', color: '#FFFFFF' }}
                    rounded
                    buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 100, margin: 5, width: 25, height: 25 }}
                    onPress={pickImage} />
                </View>

                <TouchableOpacity>
                  <Text style={{ color: '#AAAAAA', marginTop: 20 }}>Changer ma photo</Text>
                </TouchableOpacity>

                <Input
                  containerStyle={{ marginBottom: 20, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={nom}
                  disabled={disabled}
                  onChangeText={(val) => {
                    setNom(val)
                  }}
                />
                <Input
                  containerStyle={{ marginBottom: 20, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={domaine}
                  disabled={disabled}
                  onChangeText={(val) => {
                    setDomaine(val)
                  }}
                />
                <Input
                  containerStyle={{ marginBottom: 20, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={ville}
                  disabled={disabled}
                  onChangeText={(val) => {
                    setVille(val)
                  }}
                />
                <Input
                  containerStyle={{ marginBottom: 20, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={region}
                  disabled={disabled}
                  onChangeText={(val) => {
                    setRegion(val)
                  }}
                />
                <Input
                  containerStyle={{ marginBottom: 20, width: '80%' }}
                  placeholder={desc}
                  multiline={true}
                  disabled={disabled}
                  inputStyle={{ marginLeft: 10 }}
                  onChangeText={(val) => {
                    setDesc(val)
                  }}
                />

                <TouchableOpacity>
                  <Icon
                    style={{ name: 'cog', size: 20, color: '#AAAAAA' }}
                  ></Icon>
                  <Text
                    onPress={() => setDisabled(false)}
                    style={{ color: '#AAAAAA' }}>Changer mes paramètres</Text>
                </TouchableOpacity>

                <Button onPress={async () => {
                  
                  setDisabled(true)
                  // création du form data qui formate les données
                  if (userstatus == "Vigneron") {
                    var data = new FormData();
                    // envoie du files avatar
                    data.append('avatar', {
                      uri: image,
                      type: 'image/jpeg',
                      name: 'avatar.jpg',
                    });
                    // création objet userinfo
                    var userinfos = {
                      nom: nom,
                      domaine: domaine,
                      ville: ville,
                      region: region,
                      desc: desc,
                      token: token
                    };

                    // envoie l'objet en string au serveur
                    data.append('userinfos', JSON.stringify(userinfos));

                    var updateUser = await fetch(`http://${IPecole}:3000/info-update-v`, {
                      method: 'post',
                      body: data
                    })

                    var response = await updateUser.json();
                    console.log('responseFB', response)

                  }
                  navigation.navigate('Catalogue');
                }}

                  disabled={disabled}
                  buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 15, width: 25, height: 25, margin: 10 }}
                  title="OK"
                  titleStyle={{
                    color: "white",
                    fontSize: 10,
                    alignContent: "center",
                    justifyContent: "center"
                  }}
                />

                <TouchableOpacity>
                  <Text
                    onPress={() => {
                      navigation.navigate('SignIn');
                    }}
                    style={{ color: '#9D2A29' }}>Déconnexion</Text>
                </TouchableOpacity>

              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View >
    </View >

  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
    justifyContent: 'center',

  },
  box1: {
    flex: 1,
    alignItems: 'center',
    height: responsiveHeight(90),
    width: responsiveWidth(90),
    justifyContent: 'center',
    // fontFamily: "Gothic A1",
  },
  box2: {
    height: responsiveScreenHeight(90),
    width: responsiveScreenWidth(90),
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function mapStateToProps(state) {
  // console.log("STATE TOKEN", state.token)
  return { token: state.token, userstatus: state.userstatus }
}

function mapDispatchToProps(dispatch) {
  return {
    changeImg: function (selectedImg) {
      dispatch({ type: 'addImg', selectedImg: selectedImg })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfilVigneron);
