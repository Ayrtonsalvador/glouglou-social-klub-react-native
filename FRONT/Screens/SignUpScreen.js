import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { Button, Input, Header } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { color } from 'react-native-reanimated';

function SignUpScreen({ navigation, onSubmitPseudo }) {
  const [pseudo, setPseudo] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  if (isVisible) {

    return(

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
      {/* </Overlay> */}
    </View>
  </View>
    )} else {

    return (

      <View style={{ flex: 1, backgroundColor: '#FBDF4C' }}>

        <View style={styles.container}>

          <View style={styles.box}>

            <View>
              <Image source={require('../assets/ContactGlouGlou.png')}
                style={styles.img}
              ></Image>
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
            />
            <Input
              containerStyle={{ marginBottom: 25, width: '70%' }}
              inputStyle={{ marginLeft: 10 }}
              placeholder='Email'
              errorStyle={{ color: 'red' }}
              errorMessage=''
              leftIcon={
                <Icon
                  name='inbox'
                  size={20}
                  color="#FFD15C"
                />
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
            />

            <Button
              containerStyle={{ marginBottom: 15, width: '70%', borderRadius: 15, }}
              title="Je suis vigneron"
              type="solid"
              buttonStyle={{ backgroundColor: '#FFAE34' }}
              onPress={() => {
                setIsVisible(true);
              }}
            />

            <Button
              containerStyle={{ marginBottom: 15, width: '70%', borderRadius: 15, }}
              title="Je suis caviste"
              type="solid"
              buttonStyle={{ backgroundColor: '#FFAE34' }}
              onPress={() => {
                setIsVisible(true);
              }}
            />

          </View>
        </View>
      </View>
    );
  }
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
    onSubmitPseudo: function (pseudo) {
      dispatch({ type: 'savePseudo', pseudo: pseudo })
    }
  }
}

export default connect(
  null,
  mapDispatchToProps
)(SignUpScreen);