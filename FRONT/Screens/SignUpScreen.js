import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, AsyncStorage } from 'react-native';

import { Button, Input, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';

function SignUpScreen({ navigation, onSubmitUserstatus, addToken }) {

  var IPecole = "172.17.1.153";

  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpTel, setSignUpTel] = useState('')
  const [signUpPassword, setSignUpPassword] = useState('')
  const [signUpStatus, setSignUpStatus] = useState('')

  const [isVisible, setIsVisible] = useState(false);

  const [listErrorsSignup, setlistErrorsSignup] = useState([])

  var tabErrorsSignup = listErrorsSignup.map((error, i) => {
    return (
      <View>
        <Text style={{ color: '#9D2A29', marginBottom: 10 }}>{error}</Text>
      </View>
    )
  })

  // POPUP CONFIRMATION INSCRIPTION
  if (isVisible) {
    return (

      <View style={styles.container}>
        <View style={styles.popup}>
          <Text style={styles.text}>A BIENTÔT DANS LE</Text>
          <Image style={{ width: "20%", height: "20%" }} source={require('../assets/ContacterGlouGlou.png')}>
          </Image>
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

              <Image source={require('../assets/ContactGlouGlou.png')} style={{ margin: 10, width: 120, height: 120 }}></Image>

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

                  var data = await fetch(`http://${IPmaison}:3000/sign-up`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&telFromFront=${signUpTel}&passwordFromFront=${signUpPassword}&statusFromFront=Vigneron`
                  })
                  var response = await data.json()
                  // console.log('Sign-up-vigneron', response)

                  if (response.result == true) {
                    setIsVisible(true);
                    addToken(response.saveVigneron.token);

                  } else {
                    setlistErrorsSignup([...listErrorsSignup], response.error);
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

                  var data = await fetch(`http://${Iecole}:3000/sign-up`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&telFromFront=${signUpTel}&passwordFromFront=${signUpPassword}&statusFromFront=Caviste`
                  })
                  var response = await data.json()
                  // console.log('Sign-up-caviste', response)

                  if (response.result == true) {
                    setIsVisible(true);
                    addToken(response.saveCaviste.token);
                  } else {
                    setlistErrorsSignup([...listErrorsSignup], response.error);
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
                  style={{ color: '#A9A8A8' }}>J'ai déjà un compte</Text>
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
    height: 580,
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
  mapDispatchToProps,
)(SignUpScreen);