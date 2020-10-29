import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text, SafeAreaView } from "react-native";
import { Button, Input, Header, Icon, Avatar } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import * as ImagePicker from 'expo-image-picker';

// import Icon from 'react-native-vector-icons/FontAwesome';

function AddVigneron({ navigation }) {

  const [NomRef, setNomRef] = useState("Référence");
  const [Couleur, setCouleur] = useState("Couleur");
  const [Cepage, setCepage] = useState("Cépage");
  const [Millesime, setMillesime] = useState("Millesime");
  const [Appellation, setAppellation] = useState("Appelation");
  const [Desc, setDesc] = useState("Description");
  const [annee, setAnne] = useState("Année");

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

            <Image source={require('../assets/macave.png')} style={{ width: 120, height: 100 }}></Image>

            <ScrollView >

              <View style={styles.box2}>

                <Text style={{ color: '#AAAAAA', marginTop: 20 }}>Ajouter une photo</Text>

                <View style={{alignItems: 'center', justifyContent: 'center' }}>
                  <Button
                    icon={{ name: 'plus', type: 'font-awesome', color: '#FFFFFF' }}
                    rounded
                    buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 100 }}
                    onPress={pickImage} />
                  {image && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />}
                </View>

                <Input
                  containerStyle={{ marginTop: 20, marginBottom: 20, width: '70%' }}
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
                    setNomRef("")
                    setCouleur("")
                    setCepage("")
                    setMillesime("")
                    setAppellation("")
                    setDesc("")

                    var data = await fetch("http://192.168.1.22:3000/AddVin", {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                      body: `NomRefFF=${NomRef}&CouleurFF=${Couleur}&CepageFF=${Cepage}&MillesimeFF=${Millesime}&AppellationFF=${Appellation}&DescFF=${Desc}&AnneeFF=${annee}&ImageFF=${image}`
                    })
                    var body = await data.json()
                    navigation.navigate('CaveVigneron');
                    console.log("RESPONSE", body)
                    console.log("IMAGEFF", image);
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
  },
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // fontFamily: "Gothic A1",
  },
  box2: {
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