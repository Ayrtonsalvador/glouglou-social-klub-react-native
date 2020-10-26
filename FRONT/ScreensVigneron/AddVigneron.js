import React, { useState } from 'react';
import { StyleSheet, View, Image, KeyboardAvoidingView } from "react-native";
import { Button, Input, Header, Icon, Avatar } from 'react-native-elements';

// import Icon from 'react-native-vector-icons/FontAwesome';

export default function AddVigneron({ navigation }) {

  const [uploaded, setUploaded] = useState('plus');

  // Demander accès à la bibliothèque photo

  return (

    <View style={{ flex: 1 }}>

      <Header
        containerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCDF23' }}
        centerComponent={{ text: 'AJOUTER UN NOUVEAU VIN', marginTop: 30 }}
      >
        <Image source={require('../assets/MainGlouGlou.png')} style={{ width: 20, height: 30 }}></Image>
      </Header>

      <View style={styles.container}>

        <KeyboardAvoidingView behavior="position" enabled>

          <View style={styles.box1}>

            <Avatar
              rounded
              icon={{ name: 'plus', type: 'font-awesome' }}
              size="large"
              overlayContainerStyle={{ backgroundColor: '#FFAE34' }}
            >
            </Avatar>

            <View style={styles.box2}>
              <Input
                containerStyle={{ marginBottom: 25, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Nom de la référence'
                errorStyle={{ color: 'red' }}
                errorMessage=''
              />
              <Input
                containerStyle={{ marginBottom: 25, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Cépage'
                errorStyle={{ color: 'red' }}
                errorMessage=''
              />
              <Input
                containerStyle={{ marginBottom: 25, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Milésime'
                errorStyle={{ color: 'red' }}
                errorMessage=''
              />
              <Input
                containerStyle={{ marginBottom: 25, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Appelation'
                errorStyle={{ color: 'red' }}
                errorMessage=''
              />
              <Input
                containerStyle={{ marginBottom: 25, width: '70%' }}
                inputStyle={{ marginLeft: 10 }}
                placeholder='Description'
                errorStyle={{ color: 'red' }}
                errorMessage=''
              />
              <Button
                icon={{ name: 'plus', type: 'font-awesome', color: '#FFFFFF' }}
                rounded
                type='font-awesome'
                buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 100 }}
                onPress={() => {
                  setUploaded("check-circle")
                }}
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
    // fontFamily: "Gothic A1",
  },
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // fontFamily: "Gothic A1",
  },
  box2: {
    // width: '80%',
    // height: '70%',
    width: 350,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  }
});