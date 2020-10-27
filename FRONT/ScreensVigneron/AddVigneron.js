import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text } from "react-native";
import { Button, Input, Header, Icon, Avatar } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import * as ImagePicker from 'expo-image-picker';

// import Icon from 'react-native-vector-icons/FontAwesome';

function AddVigneron({ navigation }) {

  const [uploaded, setUploaded] = useState('plus');

  const [NomRef, setNomRef] = useState("");
  const [Couleur, setCouleur] = useState("");
  const [Cepage, setCepage] = useState("");
  const [Millesime, setMillesime] = useState("");
  const [Appellation, setAppellation] = useState("");
  const [Desc, setDesc] = useState("");

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

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (

    <View style={{ flex: 1 }}>

      <View style={styles.container}>


        <KeyboardAvoidingView behavior="position" enabled>

          <View style={styles.box1}>

            <Image source={require('../assets/macave.png')} style={{ width: 120, height: 100 }}></Image>

      <ScrollView >
              <View style={styles.box2}>

              <TouchableOpacity>
                <Text style={{ color: '#AAAAAA', marginTop: 20 }}>Ajouter une photo</Text>
              </TouchableOpacity>

              <Button
                icon={{ name: 'plus', type: 'font-awesome', color: '#FFFFFF' }}
                rounded
                type='font-awesome'
                buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 100 }}
                onPress={pickImage} />
              {image && (
                <View style={{
                  width: 100, height: 100, flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: 15
                }}>
                  <Image source={{ uri: image }} />
                </View>
              )}

                <Input
                  containerStyle={{ marginTop:20, marginBottom: 20, width: '70%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder='Nom de la référence'
                  errorStyle={{ color: 'red' }}
                  errorMessage=''
                  onChangeText={(text) => setNomRef(text)}
                  value={NomRef}
                />

                <Input
                  containerStyle={{ marginBottom: 20, width: '70%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder='Couleur'
                  errorStyle={{ color: 'red' }}
                  errorMessage=''
                  onChangeText={(text) => setCouleur(text)}
                  value={Couleur}
                />

                <Input
                  containerStyle={{ marginBottom: 20, width: '70%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder='Cépage'
                  errorStyle={{ color: 'red' }}
                  errorMessage=''
                  onChangeText={(text) => setCepage(text)}
                  value={Cepage}
                />

                <Input
                  containerStyle={{ marginBottom: 20, width: '70%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder='Millésime'
                  errorStyle={{ color: 'red' }}
                  errorMessage=''
                  onChangeText={(text) => setMillesime(text)}
                  value={Millesime}
                />
                <Input
                  containerStyle={{ marginBottom: 20, width: '70%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder='A.O.C / I.G.C'
                  errorStyle={{ color: 'red' }}
                  errorMessage=''
                  onChangeText={(text) => setAppellation(text)}
                  value={Appellation}
                />

                <Input
                  containerStyle={{ marginBottom: 20, width: '70%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder='Description'
                  errorStyle={{ color: 'red' }}
                  errorMessage=''
                  onChangeText={(text) => setDesc(text)}
                  value={Desc}
                />

                <Button
                  icon={{ name: 'plus', type: 'font-awesome', color: '#FFFFFF' }}
                  rounded
                  type='font-awesome'
                  buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 100 }}
                  onPress={async () => {
                    setUploaded("check-circle")
                    setNomRef("")
                    setCouleur("")
                    setCepage("")
                    setMillesime("")
                    setAppellation("")
                    setDesc("")

                    var data = await fetch("http://172.17.1.153:3000/AddVin", {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                      body: `NomRefFF=${NomRef}&CouleurFF=${Couleur}&CepageFF=${Cepage}&MillesimeFF=${Millesime}&AppellationFF=${Appellation}&DescFF=${Desc}`
                    })
                    var body = await data.json()

                  }}
                />

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
    marginTop: 60,
    width: 350,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  },
  responsiveBox: {
    width: wp('84.5%'),
    height: hp('17%'),
    borderWidth: 2,
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  avatar: {
    height: 40,
    width: 40,
    backgroundColor: '#FFAE34',
    borderRadius: 100,
  }
});

function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(
  mapStateToProps,
  null
)(AddVigneron);