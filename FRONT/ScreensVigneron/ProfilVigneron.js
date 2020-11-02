
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableOpacity} from "react-native";
import { Button, Input, Header, Avatar, Icon, Card } from 'react-native-elements';
import { ScrollView} from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import * as ImagePicker from 'expo-image-picker';

function ProfilVigneron({ navigation, token }) {

  const [photo, setPhoto] = useState('')
  const [nom, setNom] = useState("Nom")
  const [domaine, setDomaine] = useState("Nom de domaine")
  const [ville, setVille] = useState("Ville")
  const [region, setRegion] = useState("Région")
  const [desc, setDesc] = useState("Description")

  const [image, setImage] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    async function loadData() {
      console.log("PROFIL")
      var rawResponse = await fetch(`http://172.17.1.159:3000/info-v?token=${token}`);
      var response = await rawResponse.json();
      console.log("GET INFOS VIGNERON", response)

      if(response.result == true){
        setDisabled(true)
        // setImage(response.user.Photo)
        setNom(response.user.Nom)
        setDomaine(response.user.Domaine)
        setVille(response.user.Ville)
        setRegion(response.user.Region)
        setDesc(response.user.Desc)
      } 
      
      if(domaine == "" || ville == "" || region == "" || desc == "") {
        setDomaine('Nom de domaine')
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

            <Image source={require('../assets/monprofil.png')} style={{ width: 120, height: 80 }}></Image>

            <ScrollView>

              <View style={styles.box2}>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>

                  {image && <Avatar size={100} rounded source={{ uri: image }} title={nom}></Avatar>}

                  <Button
                    icon={{ name: 'plus', type: 'font-awesome', color: '#FFFFFF' }}
                    rounded
                    buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 100 }}
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

                <Button onPress={async () => {
                  setDisabled(true)
                  const data = await fetch("http://172.17.1.159:3000/info-update-v", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `photo=${photo}&nom=${nom}&domaine=${domaine}&ville=${ville}&region=${region}&desc=${desc}&img=${image}&token=${token}`
                  })
                  var body = await data.json()
                  console.log("RESPONSE", body)
                }}
                  disabled={disabled}
                  buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 15 }}
                  title="OK"
                />

                <TouchableOpacity>
                  <Icon
                  style={{name:'cog', type: 'font-awesome', color: '#AAAAAA'}}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
  return { token: state.token }
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
