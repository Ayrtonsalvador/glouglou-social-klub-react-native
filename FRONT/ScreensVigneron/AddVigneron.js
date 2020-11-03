import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text, SafeAreaView } from "react-native";
import { Button, Input, Header, Avatar } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import * as ImagePicker from 'expo-image-picker';
import { set } from 'react-native-reanimated';

function AddVigneron({ navigation, token, userstatus }) {

  var IPmaison = "";
  var IPecole = "172.17.1.153";

  const [NomRef, setNomRef] = useState("Référence");
  const [Couleur, setCouleur] = useState("Couleur");
  const [Cepage, setCepage] = useState("Cépage");
  const [Millesime, setMillesime] = useState("Millesime");
  const [Appellation, setAppellation] = useState("Appelation");
  const [Desc, setDesc] = useState("Description");

  const [image, setImage] = useState(null);
  const [disabled, setDisabled] = useState(false);

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
    }
  };

  // const updateClick = () => {
  //   navigation.navigate('CaveVigneron');
  // }

  return (

    <View style={{ flex: 1 }}>

      <View style={styles.container}>

        <KeyboardAvoidingView behavior="position" enabled>
          <View style={styles.box1}>

            <Image source={require('../assets/macave.png')} style={{ width: 120, height: 100 }}></Image>
            <ScrollView>
              <View style={styles.box2}>

                <Text style={{ color: '#AAAAAA', marginTop: 10 }}>Ajouter une photo</Text>

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
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
                  placeholder={NomRef}
                  onChangeText={(text) => setNomRef(text)}
                />

                <Input
                  containerStyle={{ marginBottom: 20, width: '70%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={Couleur}
                  onChangeText={(text) => setCouleur(text)}
                />

                <Input
                  containerStyle={{ marginBottom: 20, width: '70%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={Cepage}
                  disabled={disabled}
                  onChangeText={(text) => setCepage(text)}
                />

                <Input
                  containerStyle={{ marginBottom: 20, width: '70%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={Millesime}
                  onChangeText={(text) => setMillesime(text)}
                />
                <Input
                  containerStyle={{ marginBottom: 20, width: '70%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={Appellation}
                  onChangeText={(text) => setAppellation(text)}
                />

                <Input
                  containerStyle={{ marginBottom: 20, width: '70%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder={Desc}
                  onChangeText={(text) => setDesc(text)}
                />
              </View>
            </ScrollView>

            <View>
              <Button
                icon={{ name: 'plus', type: 'font-awesome', color: '#FFFFFF' }}
                rounded
                type='font-awesome'
                buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 100, margin: 5 }}

                onPress={async () => {

                  navigation.navigate('Catalogue');

                  var data = new FormData();

                  data.append('avatar', {
                    uri: image,
                    type: 'image/jpeg',
                    name: 'avatar.jpg',
                  });

                  var bottleinfos = {
                    NomRef: NomRef,
                    Couleur: Couleur,
                    Cepage: Cepage,
                    Millesime: Millesime,
                    AOC: Appellation,
                    Desc: Desc,
                    token: token,
                  };

                  data.append('bottleinfos', JSON.stringify(bottleinfos));

                  var newbottle = await fetch(`http://${IPecole}:3000/AddVin`, {
                    method: 'post',
                    body: data
                  })
                  var response = await newbottle.json();
                  // console.log("FB", response)
                  if (response.result == true) {
                    navigation.navigate('Catalogue') } 
                }}

              />
            </View>


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
  return { token: state.token, userstatus: state.userstatus }
}

export default connect(
  mapStateToProps,
  null
)(AddVigneron);