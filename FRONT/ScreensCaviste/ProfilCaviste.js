import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView } from "react-native";
import { Button, Input, Header, Avatar, Icon } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import * as ImagePicker from 'expo-image-picker';
import ProfilVigneron from '../ScreensVigneron/ProfilVigneron';

function ProfilCaviste({ navigation, token, userstatus }) {

  var IPmaison = "";
  var IPecole = "172.17.1.153";

  const [nom, setNom] = useState("Nom")
  const [etablissement, setEtablissement] = useState("Nom d'établissement")
  const [ville, setVille] = useState("Ville")
  const [region, setRegion] = useState("Région")
  const [desc, setDesc] = useState("Description")

  const [disabled, setDisabled] = useState(false);
  const [image, setImage] = useState(null);
  const [sendinfos, setsendinfos] = useState(false)

      useEffect(() => {
      async function loadData() {
        console.log("PROFIL")
        var rawResponse = await fetch(`http://${IPecole}:3000/info-c?token=${token}`);
        var response = await rawResponse.json();
        console.log("GET INFOS CAVISTE", response)

        if (etablissement == "" || ville == "" || region == "" || desc == "") {
          setDomaine("Nom d'établissement")
          setVille("Ville")
          setRegion("Région")
          setDesc("Parlez-nous de vous!")
        }

        if (response.result == true) {
          setNom(response.user.Nom)
          setEtablissement(response.user.Etablissement)
          setVille(response.user.Ville)
          setRegion(response.user.Region)
          setDesc(response.user.Desc)
          setImage(response.user.Photo)
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

  if (userstatus == "Vigneron") {
    return (<ProfilVigneron navigation={navigation} token={token} userstatus={userstatus} />)
  } else {
    return (

      <View style={{ flex: 1 }}>
        <View style={styles.container}>

          <KeyboardAvoidingView behavior="position" enabled>
            <View style={styles.box1}>
              <Image source={require('../assets/monprofil.png')} style={{ width: 120, height: 80 }}></Image>

              <ScrollView>

                <View style={styles.box2}>

                  <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                    {image && <Avatar size={100} rounded source={{ uri: image }} title={nom}></Avatar>}

                    <Button
                      icon={{ name: 'plus', type: 'font-awesome', color: '#FFFFFF' }}
                      rounded
                      buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 100, margin: 5 }}
                      onPress={pickImage}
                    />
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
                    placeholder={etablissement}
                    disabled={disabled}
                    onChangeText={(val) => {
                      setEtablissement(val)
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

                  <Button onPress={async () => {
                    setDisabled(true)

                
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
                      etablissement: etablissement,
                      ville: ville,
                      region: region,
                      desc: desc,
                      token: token
                    };
                
                    // envoie l'objet en string au serveur
                    data.append('userinfos', JSON.stringify(userinfos));
                
                    var updateUser = await fetch(`http://${IPecole}:3000/info-update-c`, {
                      method: 'post',
                      body: data
                    })
                
                    var response = await updateUser.json();
                    console.log('responseFB', response)
          
                    
              }
                }

                    disabled={disabled}
                    buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 15 }}
                    title="OK"
                  />

                  <TouchableOpacity>
                    <Icon
                      style={{ name: 'cog', type: 'font-awesome', color: '#AAAAAA' }}
                    ></Icon>
                    <Text
                      onPress={() => setDisabled(false)}
                      style={{ color: '#AAAAAA' }}>Changer mes paramètres</Text>
                  </TouchableOpacity>

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
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // fontFamily: "Gothic A1",
  },
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // fontFamily: "Gothic A1",
  },
  box2: {
    width: 350,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  }
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
)(ProfilCaviste);
