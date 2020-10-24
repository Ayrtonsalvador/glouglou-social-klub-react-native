import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView } from 'react-native';

import { Button, Input, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { color } from 'react-native-reanimated';

function SignUpScreen({ navigation, onSubmitUsername }) {

  const [signUpUsername, setSignUpUsername] = useState('')
  const [signUpEmail, setSignUpEmail] = useState('')
  const [signUpTel, setSignUpTel] = useState('')
  const [signUpStatus, setSignUpStatus] = useState('')

  const [userExists, setUserExists] = useState(false)
  const [isVisible, setIsVisible] = useState(false);

  const [listErrorsSignup, setErrorsSignup] = useState([])


  var tabErrorsSignup = listErrorsSignup.map((error, i) => {
    return (
      <View>
        <Text>Erreur</Text>
        <Text>{error}</Text>
      </View>
    )
  })

  //   POPUP CONFIRMATION INSCRIPTION
  if (userExists) {
    return (

      <View style={styles.container}>
        <View style={styles.popup}>
          <Text style={styles.text}>A BIENTÔT DANS LE :</Text>
          <Image source={require('../assets/ContacterGlouGlou.png')}
            style={styles.img}
          ></Image>
          <Button
            containerStyle={{ marginBottom: 15, width: '50%', borderRadius: 15, }}
            title="Compris"
            type="solid"
            buttonStyle={{ backgroundColor: '#FFAE34' }}
            onPress={() => {
              setIsVisible(false)
              navigation.navigate('SignIn');
            }}
          />
        </View>
      </View>
    //   POPUP CONFIRMATION INSCRIPTION

    //   FORMULAIRE INSCRIPTION
    )
  } else {
    return (

      <View style={{ flex: 1, backgroundColor: '#FBDF4C' }}>

        <View style={styles.container}>

          <KeyboardAvoidingView behavior="position" enabled>

            <View style={styles.box}>

              <View>
                <Image source={require('../assets/ContactGlouGlou.png')} style={styles.img}></Image>
              </View>


              <Input
                containerStyle={{ marginBottom: 25, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Nom'
                errorStyle={{ color: 'red' }}
                errorMessage=''
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
                  if(val == null){
                    errorStyle={{ color: 'red' }}
                    errorMessage='Veuillez remplir ce champ'
                  }
                 }
              />
              <Input
                containerStyle={{ marginBottom: 25, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Téléphone'
                errorStyle={{ color: 'red' }}
                errorMessage=''
                leftIcon={
                  <Icon
                    name='phone'
                    size={20}
                    color="#FFD15C"
                  />
                }
                onChangeText={(val) => setSignUpTel(val)}
              />

              <Button
                containerStyle={{ marginBottom: 15, width: '70%', borderRadius: 15, }}
                title="Je suis vigneron"
                type="solid"
                buttonStyle={{ backgroundColor: '#FFAE34' }}
                onPress={() => {
                  // setIsVisible(true);
                }}
              />

              <Button
                onPress={async () => {

                  setSignUpStatus('Vigneron')

                  const data = await fetch('/sign-up', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: `usernameFromFront=${signUpUsername}&emailFromFront=${signUpEmail}&telFromFront=${signUpTel}&statusFromFront=${signUpStatus}`
                  })

                  const body = await data.json()

                  if (body.result == true) {
                    setUserExists(true);
                    setIsVisible(true);
                    console.log("SUCCESS", body)

                  } else {
                    setErrorsSignup(body.error)
                    console.log("ERROR", body.error)
                  }
                }}

                containerStyle={{ marginBottom: 15, width: '70%', borderRadius: 15, }}
                title="Je suis caviste"
                type="solid"
                buttonStyle={{ backgroundColor: '#FFAE34' }}
              />

              {tabErrorsSignup}

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
    width: 150,
    height: 150,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  popup: {
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
    onSubmitUsername: function(username) { 
      dispatch( {type: 'saveUsername', username: username }) 
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignUpScreen);