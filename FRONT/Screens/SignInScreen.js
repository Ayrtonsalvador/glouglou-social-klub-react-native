import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView } from 'react-native';

import { Button, Input, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { color } from 'react-native-reanimated';

function SignInScreen({ navigation, onSubmitPseudo }) {

  const [signInEmail, setSignInEmail] = useState('')
  const [signInPassword, setSignInPassword] = useState('')

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
          <Button
            onPress={async () => {

              var rawResponse = await fetch("http://172.17.1.151:3000/sign-in", {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `emailFromFront=${signInEmail}&passwordFromFront=${signInPassword}`
              })
              var response = await rawResponse.json()
              console.log("RESPONSE", response);

              if (response.result == true) {
                navigation.navigate('ProfileCaviste');
                // navigation.navigate('ProfileVigneron');
              } 
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


function mapStateToProps(state){
  return {userinfo: state.userinfo}
}

export default connect(
  mapStateToProps,
  null
)(SignInScreen);