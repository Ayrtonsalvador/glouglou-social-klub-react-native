
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView } from "react-native";
import { Button, Input, Header, Avatar, Card } from 'react-native-elements';
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

  var IPecole = "172.17.1.159";

  const [nom, setNom] = useState()
  const [domaine, setDomaine] = useState()
  const [ville, setVille] = useState()
  const [region, setRegion] = useState()
  const [desc, setDesc] = useState()

  const [disabled, setDisabled] = useState(false);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function loadData() {

      if (userstatus == "Vigneron") {

        var rawResponse = await fetch(`http://${IPecole}:3000/info-v?token=${token}`);
        var response = await rawResponse.json();
        console.log("GET INFOS VIGNERON", response)

        if (response.result == true) {
          setDisabled(false)
          setNom(response.user.Nom)
          setDomaine(response.user.Domaine)
          setVille(response.user.Ville)
          setRegion(response.user.Region)
          setDesc(response.user.Desc)

          if (image != null) {
            setImage(response.user.Photo)
          } else {
            setImage(`require('../assets/gris.png')`)
          }
          setDisabled(true)
        }

        (async () => {
          const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
          if (status !== 'granted') {
            alert('Sorry, we need camera roll permissions to make this work!');
          }
        })();
      }
    }

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

        <Image source={require('../assets/monprofil.png')}
          style={{
            width: 120, height: 100, marginTop: -10, marginBottom: -10,
            justifyContent: "center",
            alignItems: 'center'
          }}>
        </Image>

        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior="padding" enabled   >

          <ScrollView>
            <View style={styles.box1}>

              <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                {image && <Avatar size={100} rounded source={{ uri: image }} title={nom}></Avatar>}
            
                </View>

                <TouchableOpacity>
                  <Text style={{ color: '#FFAE34', marginTop: 10, fontSize: 18 }}
                   onPress={pickImage} >Changer ma photo</Text>
                </TouchableOpacity>

                <Input
                  containerStyle={{ marginTop: 25, marginBottom: 15, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder="Nom"
                  disabled={disabled}
                  onChangeText={(val) => { setNom(val) }}
                  value={nom}
                />
                <Input
                  containerStyle={{ marginBottom: 15, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder="Domaine"
                  disabled={disabled}
                  onChangeText={(val) => {
                    setDomaine(val)
                  }}
                  value={domaine}
                />
                <Input
                  containerStyle={{ marginBottom: 15, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder="Ville"
                  disabled={disabled}
                  onChangeText={(val) => {
                    setVille(val)
                  }}
                  value={ville}
                />
                <Input
                  containerStyle={{ marginBottom: 15, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder="Region"
                  disabled={disabled}
                  onChangeText={(val) => {
                    setRegion(val)
                  }}
                />
                <Input
                  containerStyle={{ marginBottom: 15, width: '80%' }}
                  placeholder="Description"
                  multiline={true}
                  disabled={disabled}
                  inputStyle={{ marginLeft: 10 }}
                  onChangeText={(val) => {
                    setDesc(val)
                  }}
                  value={desc}
                />

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
                  buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 15 }}
                  title="OK"
                />

                <TouchableOpacity>
                  <Icon
                    style={{ name: 'cog', type: 'font-awesome', color: '#AAAAAA' }}
                  ></Icon>
                  <Text
                    // onPress={() => setDisabled(false)}
                    style={{ color: '#AAAAAA' }}>Changer mes paramètres</Text>
                </TouchableOpacity>

                <TouchableOpacity>
                  <Text onPress={() => {
                    navigation.navigate('SignIn');
                  }}
                    style={{ color: '#9D2A29', marginTop: 10 }}>Déconnexion</Text>
                </TouchableOpacity>

                {/* </View> */}
              </View>
<<<<<<< HEAD
=======
            
>>>>>>> e6ee082a84d81431743be53c32df54a53b7187fa
          </ScrollView>
        </KeyboardAvoidingView>
      </View >
      </View >

  )
}
}

const styles = StyleSheet.create({
        container: {
        alignItems: 'center',
    height: responsiveScreenHeight(90),
    width: responsiveScreenWidth(100),
    justifyContent: 'center',
  },
  box1: {
        flex: 1,
    alignItems: 'center',
    height: responsiveHeight(100),
    width: responsiveWidth(90),
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
        console.log("STATE TOKEN", state.token)
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