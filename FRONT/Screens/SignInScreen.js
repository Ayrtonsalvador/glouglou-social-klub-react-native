import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView } from 'react-native';

import { Button, Input, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { color } from 'react-native-reanimated';

// ATTENTION ADRESS IP 

function SignInScreen({ navigation }) {
  const [signInPassword, setSignInPassword] = useState('')
  const [signInEmail, setsignIEmail] = useState('')

  return (

    <View style={{ flex: 1, backgroundColor: '#FCDF23' }}>
      <View style={styles.container}>
     
      <KeyboardAvoidingView behavior="position" enabled>

        <Image source={require('../assets/GGSC.png')} style={styles.img}></Image>

        <View style={styles.box}>
          <Text style={styles.text}>IDENTIFICATION</Text>
          <Input
            containerStyle={{ marginBottom: 25, width: '70%' }}
            inputStyle={{ marginLeft: 10 }}
            placeholder='Email'
            onChangeText={(val) => setSignInEmail(val)}
            leftIcon={
              <Icon
                name='user'
                size={20}
                color="#FFD15C"
              />
            }
          />

          <Input
            containerStyle={{ marginBottom: 25, width: '70%' }}
            inputStyle={{ marginLeft: 10 }}
            placeholder='Mot de passe'
            secureTextEntry={true}
            onChangeText={(val) => setSignInPassword(val)}
            leftIcon={
              <Icon
                name='key'
                size={20}
                color="#FFD15C"
              />
            }
          />
          <Button
            onPress={async () => {
              
              var data = await fetch("http://172.17.1.153:3000/sign-in", {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
              })
              var body = await data.json()

              var getstatus = await fetch("http://172.17.1.153:3000/get-status");
              var response = await getstatus.json();
              console.log(response);

      //voir si on redirige ac le REDUX ou avec le "status" qui vient du back
              if ( userstatus == 'Caviste' ) {
                navigation.navigate('ProfileCaviste'); 
               } else {
                navigation.navigate('ProfileVigneron'); }
            }}

            containerStyle={{ marginBottom: 25, width: '70%', borderRadius: 15, padding: 10, }}
            title="Rejoindre le club"
            type="solid"
            buttonStyle={{ backgroundColor: '#FF9900' }}
          />
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


function mapDispatchToProps(dispatch){
  return {
    addToken: function(token){
      dispatch({type: 'addToken', token: token})
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignInScreen);