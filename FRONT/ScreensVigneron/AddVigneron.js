import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity, Text, SafeAreaView } from "react-native";
import { Button, Input, Header, Avatar } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { connect } from 'react-redux';

import * as ImagePicker from 'expo-image-picker';
import { set } from 'react-native-reanimated';
import symbolicateStackTrace from 'react-native/Libraries/Core/Devtools/symbolicateStackTrace';

import { 
  responsiveHeight , 
  responsiveWidth , 
  responsiveFontSize,
  responsiveScreenHeight , 
  responsiveScreenWidth , 
  responsiveScreenFontSize 
}  from  "react-native-responsive-dimensions" ;

function AddVigneron({ navigation, token, userstatus }) {

  var IPecole = "172.17.1.46";

  const [NomRef, setNomRef] = useState(null);
  const [Couleur, setCouleur] = useState(null);
  const [Cepage, setCepage] = useState(null);
  const [Millesime, setMillesime] = useState(null);
  const [Appellation, setAppellation] = useState(null);
  const [Desc, setDesc] = useState(null);

  const [image, setImage] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const [Error, setError] = useState([]);

  var ListError = Error.map((error, i) => {
    return (
      <View>
        <Text style={{ color: '#9D2A29' }}>{error}</Text>
      </View>
    )
  })

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

          <Image source={require('../assets/macave.png')} 
        style={{ height : responsiveScreenHeight ( 15 ), 
                  width : responsiveScreenWidth ( 40 ), 
                  justifyContent:"center", 
                  alignItems: 'center' }}></Image>

<KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   >

            <ScrollView>
            <View style={styles.box1}>
              {/* <View style={styles.box2}> */}

                

                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                  <Button
                    icon={{ name: 'plus', type: 'font-awesome', color: '#FFFFFF' }}
                    rounded
                    buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 100 }}
                    onPress={pickImage} />
                  {image && <Image source={{ uri: image }} style={{ width: 150, height: 150 }} />}
                  <Text style={{ color: '#AAAAAA', marginTop: 10 }}>Ajouter une photo</Text>
                </View>

                <Input
                  containerStyle={{ marginTop: 20, marginBottom: 20, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder="Nom de la référence"
                  onChangeText={(text) => setNomRef(text)}
                  value={NomRef}
                />

                <Input
                  containerStyle={{ marginBottom: 15, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder="Couleur"
                  onChangeText={(text) => setCouleur(text)}
                  value={Couleur}
                />

                <Input
                  containerStyle={{ marginBottom: 15, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder="Cépage"
                  disabled={disabled}
                  onChangeText={(text) => setCepage(text)}
                  value={Cepage}

                />

                <Input
                  containerStyle={{ marginBottom: 15, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder="Millésime"
                  onChangeText={(text) => setMillesime(text)}
                  value={Millesime}

                />
                <Input
                  containerStyle={{ marginBottom: 15, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder="Appellation"
                  onChangeText={(text) => setAppellation(text)}
                  value={Appellation}
                />

                <Input
                  containerStyle={{ marginBottom: 15, width: '80%' }}
                  inputStyle={{ marginLeft: 10 }}
                  placeholder="Description"
                  onChangeText={(text) => setDesc(text)}
                  value={Desc}

                />

                <Text>{ListError}</Text>

                <Button
                icon={{ name: 'plus', type: 'font-awesome', color: '#FFFFFF' }}
                rounded
                type='font-awesome'
                buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 100, margin: 5 }}

                onPress={async () => {

                  navigation.navigate('Catalogue');
                  // setstate(!state)
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

                  var newbottle = await fetch(`http://${IPmaison}:3000/AddVin`, {
                    method: 'post',
                    body: data
                  })
                  var response = await newbottle.json();
                  setCouleur('')
                  // console.log("FB", response)
                  // if (response.result == true) {
                   
                  // } 
                  // else if (response.result == false) {
                  //   setError(response.error);
                  // }
                }}

              />
              </View>
            </ScrollView>
        </KeyboardAvoidingView>
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height : responsiveScreenHeight ( 90 ) , 
    width : responsiveScreenWidth ( 100 ),
    alignItems: 'center',
    justifyContent: 'center',
  },
  box1: {
    flex: 1,
    alignItems: 'center',
    height : responsiveHeight ( 100 ) , 
    width : responsiveWidth ( 90 ),
    justifyContent: 'center',
    // fontFamily: "Gothic A1",
  },
  box2: {
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
  null,
)(AddVigneron);