import React, { useState } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';

import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { color } from 'react-native-reanimated';

function SignInScreen({ navigation, onSubmitPseudo }) {
  const [pseudo, setPseudo] = useState('');

  return (

    <View style={{ flex: 1, backgroundColor: '#FCDF23' }}>
      <View style={styles.container}>

        <Image source={require('../assets/GGSC.png')} style={styles.img}></Image>

        <View style={styles.box}>
          <Text style={styles.text}>IDENTIFICATION</Text>

          <Input
            containerStyle={{ marginBottom: 25, width: '70%' }}
            inputStyle={{ marginLeft: 10 }}
            placeholder='Pseudo'
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
            leftIcon={
              <Icon
                name='key'
                size={20}
                color="#FFD15C"
              />
            }
          />
          <Button
            containerStyle={{ marginBottom: 25, width: '70%', borderRadius: 15, padding: 10, }}
            title="Rejoindre le club"
            type="solid"
            buttonStyle={{ backgroundColor: '#FF9900' }}
            onPress={() => {
              navigation.navigate('Profile');
            }}
          />
        </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  }
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
)(SignInScreen);