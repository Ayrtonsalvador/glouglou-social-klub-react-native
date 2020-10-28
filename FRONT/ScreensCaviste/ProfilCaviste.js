import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { Button, Input, Header, Icon, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';

import * as ImagePicker from 'expo-image-picker';
import { ScrollView } from 'react-native-gesture-handler';

// import Icon from 'react-native-vector-icons/FontAwesome';

function ProfilCaviste({ navigation }) {

  const [uploaded, setUploaded] = useState('plus')
  const [nom, setNom] = useState('')
  const [etablissement, setEtablissement] = useState('')
  const [ville, setVille] = useState('')
  const [desc, setDesc] = useState('')

  const [image, setImage] = useState(null);

  // Demander accès à la bibliothèque photo
  useEffect(() => {
    (async () => {

      const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    })();
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

                  <TouchableOpacity>
                    <Text style={{ color: '#AAAAAA', marginTop: 20 }}>Changer ma photo</Text>
                  </TouchableOpacity>
                </View>

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
                  placeholder="Nom de l'établissement"
                  errorStyle={{ color: 'red' }}
                  errorMessage=''
                  onChangeText={(val) => setEtablissement(val)}
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
                  containerStyle={{ marginBottom: 50, width: '80%' }}
                  placeholder={"Description \n"}
                  multiline={true}
                  inputStyle={{ marginLeft: 10 }}
                  errorStyle={{ color: 'red' }}
                  errorMessage=''
                  onChangeText={(val) => setDesc(val)}

                />

                <Button onPress={async () => {

                  const data = await fetch("http://172.17.1.46:3000/info-update-c", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `nom=${nom}&ville=${ville}&etablissement=${etablissement}&desc=${desc}&img=${image}`
                  })
                  var body = await data.json()
                  console.log("RESPONSE", body)
                  console.log("IMAGEFF", image);
                  // setUploaded("check-circle");

                }}
                  Icon={{ name: 'cog', type: 'font-awesome', color: '#AAAAAA' }}
                  type='font-awesome'
                  title="Changer mes paramètres"
                />

                <TouchableOpacity>
                  <Text
                    onPress={() => {
                      navigation.navigate('ChatCaviste');
                    }} style={{ color: '#9D2A29' }}>Déconnexion</Text>
                </TouchableOpacity>

              </View>
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </View>
    </View>
  );
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
)(ProfilCaviste);