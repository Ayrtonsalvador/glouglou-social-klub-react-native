import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView } from "react-native";
import { Button, Input, Header, Avatar, Icon } from 'react-native-elements';
// import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import * as ImagePicker from 'expo-image-picker';

function ProfilVigneron({ navigation }) {

  const [uploaded, setUploaded] = useState('plus')
  const [photo, setPhoto] = useState('')
  const [nom, setNom] = useState('')
  const [domaine, setDomaine] = useState('')
  const [ville, setVille] = useState('')
  const [region, setRegion] = useState('')
  const [desc, setDesc] = useState('')

  const [image, setImage] = useState(null);
  const [dataStatus, setDataStatus] = useState("loading...");

  // Demander accès à la bibliothèque photo
  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch("http://172.17.1.46:3000/info-update");
      var response = await rawResponse.json();
      setDataStatus(response);
      // console.log("BDD", response.Photo)
      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
    console.log("USEEFFECT", dataStatus)
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
      // console.log("URI", result.uri)
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
                  placeholder='Nom'
                  errorStyle={{ color: 'red' }}
                  errorMessage=''
                  onChangeText={(val) => setNom(val)}
                />
                <Input
                  containerStyle={{ marginBottom: 20, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder='Nom de domaine'
                  errorStyle={{ color: 'red' }}
                  errorMessage=''
                  onChangeText={(val) => setDomaine(val)}
                />
                <Input
                  containerStyle={{ marginBottom: 20, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder='Ville'
                  errorStyle={{ color: 'red' }}
                  errorMessage=''
                  onChangeText={(val) => setVille(val)}
                />
                <Input
                  containerStyle={{ marginBottom: 20, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder='Région'
                  errorStyle={{ color: 'red' }}
                  errorMessage=''
                  onChangeText={(val) => setRegion(val)}
                />
                <Input
                  containerStyle={{ marginBottom: 20, width: '80%' }}
                  placeholder={"Description \n"}
                  multiline={true}
                  inputStyle={{ marginLeft: 10 }}
                  errorStyle={{ color: 'red' }}
                  errorMessage=''
                  onChangeText={(val) => setDesc(val)}

                />

                <Button onPress={async () => {

                  const data = await fetch("http://172.17.1.46:3000/info-update", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `photo=${photo}&nom=${nom}&domaine=${domaine}&ville=${ville}&region=${region}&desc=${desc}&img=${image}`
                  })
                  var body = await data.json()
                  console.log("RESPONSE", body)
                  console.log("IMAGE FF", image);
                }}
                  Icon={{ name: 'cog', type: 'font-awesome', color: '#AAAAAA' }}
                  type='font-awesome'
                  title="Changer mes paramètres"
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

      </View>

    </View>

  )
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
    // width: '80%',
    // height: '70%',
    width: 350,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(
  mapStateToProps,
  null
)(ProfilVigneron);
