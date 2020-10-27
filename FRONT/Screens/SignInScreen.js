import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView } from 'react-native';

import { Button, Input, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { color } from 'react-native-reanimated';

function SignInScreen({ navigation, onSubmitUserstatus }) {

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

  const [listErrorsSignin, setErrorsSignin] = useState([])

  const [status, setstatus] = useState('')

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

        <KeyboardAvoidingView behavior="position" enabled>

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
            onPress={() => {
              navigation.navigate('ProfileVigneron'); 
              // navigation.navigate('ProfileCaviste'); 
             }}
              ></Button>
            
            <Button
              onPress={async () => {
<<<<<<< HEAD
                var rawResponse = await fetch("http://172.17.1.151:3000/sign-in", {
=======

                var rawResponse = await fetch("http://172.17.1.153:3000/sign-in", {
>>>>>>> 2614629b4eb7000d92d43ffc6e3aacd9b9fff798
                  method: 'POST',
                  headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                  body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
                })
                var response = await rawResponse.json()
<<<<<<< HEAD
                console.log("RESPONSE", response);
                console.log("RESULT", response.result)

                 if (response.result == true) {
                    navigation.navigate('ProfilVi'); 
                    // navigation.navigate('ProfilCav'); 
                    props.addToken(body.token);
                    console.log("ICI")
                 } else {
                  setErrorsSignin(response.error);
                 }
               }}
=======
                // console.log("RESPONSE", response);

                // if (response.result = true) {
                //   // props.addToken(body.token)
                // }

                if (response.status == "Vigneron") {
                  setstatus('Vigneron');
                  onSubmitUserstatus(status);
                  navigation.navigate("Profil");
                 
                } else if (response.status == "Caviste") {
                  setstatus('Caviste');
                  onSubmitUserstatus(status);
                  navigation.navigate("Profil");
                  
                }

              }}

>>>>>>> 2614629b4eb7000d92d43ffc6e3aacd9b9fff798
              containerStyle={{ marginBottom: 25, width: '70%', borderRadius: 15, padding: 10, }}
              title="Rejoindre le club"
              type="solid"
              buttonStyle={{ backgroundColor: '#FF9900' }}
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
    backgroundColor: '#FCDF23',
    // fontFamily: "Gothic A1",
  },
  box: {
    width: 300,
    height: 300,
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
    fontSize: 18,
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

function mapStateToProps(state) {
  return { status: state.userstatus }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignInScreen);