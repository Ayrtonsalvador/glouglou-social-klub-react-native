import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView } from "react-native";
import { Button, Input, Avatar, Icon } from 'react-native-elements';
import { connect } from 'react-redux';
import * as ImagePicker from 'expo-image-picker';
import ProfilVigneron from '../ScreensVigneron/ProfilVigneron';
import URL from '../URL'

import {
  responsiveHeight,
  responsiveWidth,
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";

function ProfilCaviste({ navigation, token, userstatus }) {

  const [nom, setNom] = useState()
  const [etablissement, setEtablissement] = useState()
  const [ville, setVille] = useState()
  const [region, setRegion] = useState()
  const [desc, setDesc] = useState()

  const [disabled, setDisabled] = useState(true);
  const [image, setImage] = useState(null);

  useEffect(() => {
    async function loadData() {

      if (userstatus == "Caviste") {

        var rawResponse = await fetch(`${URL}/info-c/${token}`);
        var response = await rawResponse.json();

        if (response.result == true) {

          setNom(response.user.Nom)
          setEtablissement(response.user.Etablissement)
          setVille(response.user.Ville)
          setRegion(response.user.Region)
          setDesc(response.user.Desc)

          if (response.user.Photo != null) {
            setImage(response.user.Photo)
          } else {
            setImage(`require('../assets/gris.png')`)
          }
        }
      }

      (async () => {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      })();
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

  // REDIRECTION SCREEN VIGNERON
  if (userstatus == "Vigneron") {
    return (<ProfilVigneron navigation={navigation} token={token} userstatus={userstatus} />)
  } else {
    return (

      // AFFICHAGE PROFIL CAVISTE
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

                  {image && <Avatar size={100} rounded source={{ uri: image }} title={nom} marginTop={20}></Avatar>}

                </View>

                <TouchableOpacity>
                  <Text style={{ color: '#FFAE34', marginTop: 10, fontSize: 18 }}
                    onPress={pickImage}>Changer ma photo</Text>
                </TouchableOpacity>

                <Input
                  containerStyle={{ marginTop: 25, marginBottom: 15, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder="Nom"
                  disabled={disabled}
                  onChangeText={(val) => {
                    setNom(val)
                  }}
                  value={nom}
                />

                <Input
                  containerStyle={{ marginBottom: 15, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder="Etablissement"
                  disabled={disabled}
                  onChangeText={(val) => {
                    setEtablissement(val)
                  }}
                  value={etablissement}
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
                  placeholder="R??gion"
                  disabled={disabled}
                  onChangeText={(val) => {
                    setRegion(val)
                  }}
                  value={region}
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
              </View>

              <View style={{ alignItems: "center", bottom: 0 }}>

                <TouchableOpacity>
                  <Icon
                    style={{ name: 'cog', type: 'font-awesome', color: '#AAAAAA' }}
                  ></Icon>
                  <Text
                    onPress={() => setDisabled(false)}
                    style={{ color: '#AAAAAA' }}
                  >Changer mes param??tres</Text>
                </TouchableOpacity>

                <Button onPress={async () => {
                  setDisabled(true)

                  var data = new FormData();
                  data.append('avatar', {
                    uri: image,
                    type: 'image/jpeg',
                    name: 'avatar.jpg',
                  });

                  var userinfos = {
                    nom: nom,
                    etablissement: etablissement,
                    ville: ville,
                    region: region,
                    desc: desc,
                    token: token
                  };

                  data.append('userinfos', JSON.stringify(userinfos));

                  var updateUser = await fetch(`${URL}/info-update-c`, {
                    method: 'post',
                    body: data
                  })

                  var response = await updateUser.json();
                }
                }

                  disabled={disabled}
                  buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 15, marginTop: 5 }}
                  title="OK"
                />

                <TouchableOpacity>
                  <Text onPress={() => {
                    navigation.navigate('SignIn');
                  }}
                    style={{ color: '#9D2A29', marginTop: 5 }}>D??connexion</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>

          </KeyboardAvoidingView>
        </View>
      </View>

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
  box2: {
    width: 350,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function mapStateToProps(state) {
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
)(ProfilCaviste);