import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';

import { Button, Input, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { color } from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

// ATTENTION ADRESS IP 

function SignUpScreen({navigation, onSubmitUserstatus, addToken}) {
 
  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpTel, setSignUpTel] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpStatus, setSignUpStatus] = useState('null')

  const [userExists, setUserExists] = useState(false)
  const [isVisible, setIsVisible] = useState(false);

  const [listErrorsSignup, setErrorsSignup] = useState([])

  const [modalVisible, setModalVisible] = useState(false);

  var tabErrorsSignup = listErrorsSignup.map((error, i) => {
    return (
      <View>
        <Text style={{ color: '#9D2A29' }}>{error}</Text>
      </View>
    )
  })

  // POPUP CONFIRMATION INSCRIPTION
  if (isVisible) {
    return (

      <View style={styles.container}>
        <View style={styles.popup}>
          <Text style={styles.text}>A BIENTÔT DANS LE</Text>
          <Image source={require('../assets/ContacterGlouGlou.png')}
            style={styles.img}
          ></Image>
          <Button
            containerStyle={{ marginBottom: 15, width: '20%', borderRadius: 15, }}

            title="OK"
            type="solid"
            buttonStyle={{ backgroundColor: '#FFAE34' }}
            onPress={() => {
              setIsVisible(false)
              navigation.navigate('SignIn');
            }}
          />
        </View>
      </View>
    )
    //   POPUP CONFIRMATION INSCRIPTION

    //   FORMULAIRE INSCRIPTION
  } else {
    return (

      <View style={{ flex: 1, backgroundColor: '#FBDF4C' }}>

        <View style={styles.container}>

          <KeyboardAvoidingView behavior="position" enabled>

            <View style={styles.box}>

              {/* <View style={styles.img}>
                <Image source={require('../assets/ContactGlouGlou.png')}></Image>
              </View> */}

              <Input
                containerStyle={{ marginBottom: 25, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Nom'
                leftIcon={
                  <Icon
                    name='user'
                    size={20}
                    color="#FFD15C"
                  />
                }
                onChangeText={(val) => setSignUpUsername(val)}
              />
              <Input
                containerStyle={{ marginBottom: 25, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Email'
                leftIcon={
                  <Icon
                    name='inbox'
                    size={20}
                    color="#FFD15C"
                  />
                }
                onChangeText={(val) => {
                  setSignUpEmail(val);
                }}
              />
              <Input
                containerStyle={{ marginBottom: 25, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Téléphone'
                leftIcon={
                  <Icon
                    name='phone'
                    size={20}
                    color="#FFD15C"
                  />
                }
                onChangeText={(val) => setSignUpTel(val)}
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
                onChangeText={(val) => setSignUpPassword(val)}
              />
              
              {tabErrorsSignup}

              <Button
                onPress={async () => {                 
                  setSignUpStatus('Vigneron');
                  onSubmitUserstatus(signUpStatus);

                  var rawResponse = await fetch("http://172.17.1.46:3000/sign-up", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&telFromFront=${signUpTel}&passwordFromFront=${signUpPassword}&statusFromFront=Vigneron`
                  })
                  var response = await rawResponse.json()

                  console.log("RESPONSE UP", response);
                  
                  if (response.result == true) {
                    setUserExists(true);
                    setIsVisible(true);
                    addToken(response.token);
                  } else {
                    setErrorsSignin(response.error);
                  }
                }}

                containerStyle={{ marginBottom: 15, width: '70%', borderRadius: 15, }}
                title="Je suis vigneron"
                type="solid"
                buttonStyle={{ backgroundColor: '#FFAE34' }}
              />

              <Button
                onPress={async () => {

                  setSignUpStatus('Caviste');
                  onSubmitUserstatus(signUpStatus);
              
                  var data = await fetch("http://172.17.1.46:3000/sign-up", {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&telFromFront=${signUpTel}&passwordFromFront=${signUpPassword}&statusFromFront=Caviste`
                  })
                  var body = await data.json()
                  console.log("RESPONSE", body)

                  if(body.result == true) {
                    setUserExists(true);
                    setIsVisible(true);
                    addToken(body.token);
                  } else {
                    setErrorsSignin(body.error);
                  }
                }}

                containerStyle={{ marginBottom: 15, width: '70%', borderRadius: 15, }}
                title="Je suis caviste"
                type="solid"
                buttonStyle={{ backgroundColor: '#FFAE34' }}
              />

                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('SignIn');
                  }}
                  >
                  <Text
                    style={{ color: '#DDDDDD' }}>J'ai déjà un compte</Text>
                </TouchableOpacity>


            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    );
  }
}
//   FORMULAIRE INSCRIPTION

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDF23',
    // fontFamily: "Gothic A1",
  },
  box: {
    // width: '80%',
    // height: '70%',
    width: 300,
    height: 550,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // fontFamily: "Gothic A1",
  },
  text: {
    color: '#FFD15C',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 22,
    padding: 10,
    // fontFamily: "Gothic A1",
  },
  img: {
    // width: '20%',
    // height: '20%',
    marginLeft: 30,
    width: 100,
    height: 100,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
    // width: '70%',
    // height: '50%',
    width: 250,
    height: 300,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // fontFamily: "Gothic A1",
  },
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

function mapStateToProps(state) {
  return { status: state.userstatus }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUpScreen);