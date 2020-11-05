import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';

import { Button, Input, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
function SignInScreen({ navigation, onSubmitUserstatus, addToken }) {

  var IPecole = "172.17.1.46";

  const [signInEmail, setSignInEmail] = useState("")
  const [signInPassword, setSignInPassword] = useState("")
  const [listErrorsSignin, setErrorsSignin] = useState([])

  var tabErrorsSignin = listErrorsSignin.map((error, i) => {
    return (
      <View>
        <Text style={{ color: '#9D2A29' }}>{error}</Text>
      </View>
    )
  })

  return (

    <View style={{ flex: 1, backgroundColor: '#FCDF23' }}>
      <View style={styles.container}>

      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',justifyContent: 'center',}} behavior="padding" enabled   >
        <ScrollView>
          <View style={styles.box1}>

            <Image source={require('../assets/GGSC.png')} style={styles.img}></Image>

            <View style={styles.box}>
              <Text style={styles.text}>IDENTIFICATION</Text>
              <Input
                containerStyle={{ marginBottom: 25, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Email'
                leftIcon={
                  <Icon
                    name='user'
                    size={20}
                    color="#FFD15C"
                  />
                }
                onChangeText={(val) => setSignInEmail(val)}
              />

              <Input
                containerStyle={{ marginBottom: 25, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Mot de passe'
                secureTextEntry={true}
                leftIcon={
                  <Icon
                    name='key'
                    size={20}
                    color="#FFD15C"
                  />
                }
                onChangeText={(val) => setSignInPassword(val)}
              />

              {tabErrorsSignin}

              <Button
                onPress={async () => {

                  var rawResponse = await fetch(`http://${IPecole}:3000/sign-in`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
                  })
                  var response = await rawResponse.json()
                  console.log("RESPONSE SIGNIN", response)

                  if (response.result == true && response.status == "Vigneron") {
                    onSubmitUserstatus(response.status);
                    addToken(response.token);
                    navigation.navigate('Profil');
                   
                  } else if (response.result == true && response.status == "Caviste") {
                    onSubmitUserstatus(response.status);
                    addToken(response.token);
                    navigation.navigate('Profil');
                  
                  } else {
                    setErrorsSignin(response.error);
                  }

                }}

                containerStyle={{ marginBottom: 20, width: '70%', borderRadius: 15, padding: 10, }}
                title="Rejoindre le club"
                type="solid"
                buttonStyle={{ backgroundColor: '#FF9900' }}

              />

              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('SignUp');
                }}
              >
                <Text
                  style={{ color: '#A9A8A8' }}>Je n'ai pas encore de compte</Text>
              </TouchableOpacity>

            </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDF23',
    // fontFamily: "Gothic A1",
  },
  box: {
    width: 300,
    height: 350,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // fontFamily: "Gothic A1",
  },
  box1: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFD15C',
    // fontFamily: "Gothic A1",
    fontSize: 20,
    padding: 15,
  },
  img: {
    width: 200,
    height: 200,
    marginLeft: 20,
    justifyContent: 'center',
    alignItems: 'center',
  }
});


function mapDispatchToProps(dispatch) {
  return {
    addToken: function (token) {
      dispatch({ type: 'addToken', token: token })
    },
    onSubmitUserstatus: function (status) {
      dispatch({ type: 'saveUserstatus', status: status })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps,
)(SignInScreen);