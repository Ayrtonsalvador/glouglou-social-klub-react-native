import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView } from "react-native";
import { Button, Input, Header, Avatar, Icon } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import * as ImagePicker from 'expo-image-picker';
import ProfilVigneron from '../ScreensVigneron/ProfilVigneron';

function ProfilCaviste({ navigation, token, userstatus }) {

  const [photo, setPhoto] = useState('')
  const [nom, setNom] = useState("Nom")
  const [etablissement, setEtablissement] = useState("Nom d'établissement")
  const [ville, setVille] = useState("Ville")
  const [region, setRegion] = useState("Région")
  const [desc, setDesc] = useState("Description")

  const [image, setImage] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    async function loadData() {
      console.log("PROFIL")
      var rawResponse = await fetch(`http://192.168.1.11:3000/info-c?token=${token}`);
      var response = await rawResponse.json();
      // console.log("GET INFOS CAVISTE", response)
      // console.log("Caviste", response.user)

      if(response.result == true){
        setImage(response.user.Photo)
        setNom(response.user.Nom)
        setEtablissement(response.user.Etablissement)
        setVille(response.user.Ville)
        setRegion(response.user.Region)
        setDesc(response.user.Desc)
      } 

      if(etablissement == "" || ville == "" || region == "" || desc == "") {
        setDomaine("Nom d'établissement")
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

  if (userstatus == "Vigneron") {
    return (<ProfilVigneron navigation={navigation}/>)
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
                    if(nom != null){
                      setNom("Nom")
                    }
                  }}
                />
                <Input
                  containerStyle={{ marginBottom: 20, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={etablissement}
                  disabled={disabled}
                  onChangeText={(val) => {
                    setEtablissement(val)
                    if(etablissement != null){
                      setEtablissement("Établissement")
                    }
                  }}
                />
                <Input
                  containerStyle={{ marginBottom: 20, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={ville}
                  disabled={disabled}
                  onChangeText={(val) => {
                    setVille(val)
                    if(ville != null){
                      setVille("Ville")
                    }
                  }}
                />
                <Input
                  containerStyle={{ marginBottom: 20, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={region}
                  disabled={disabled}
                  onChangeText={(val) => {
                    setRegion(val)
                    if(region != null){
                      setRegion("Région")
                    }
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
                    if(desc != null){
                      setDesc("Description \n")
                    }
                  }}
                />

                <Button onPress={async () => {
                  setDisabled(true)
                  const data = await fetch("http://192.168.1.11:3000/info-update-c", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `photo=${photo}&nom=${nom}&etablissement=${etablissement}&ville=${ville}&region=${region}&desc=${desc}&img=${image}&token=${token}`
                  })
                  var body = await data.json()
                  console.log("RESPONSE", body)
                  if(response.result == true) {
                  }
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
                      navigation.navigate('Catalogue');
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
}}

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
  return { token: state.token, userstatus : state.userstatus}
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
