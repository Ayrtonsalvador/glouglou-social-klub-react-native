import React, {useState} from 'react';
import { AppRegistry, StyleSheet, View, Text, Image} from 'react-native';

import {Button, Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from "react-native-carousel-control";

import {connect} from 'react-redux';
import { color } from 'react-native-reanimated';

function FirstScreen({ navigation}) {
    
    return (

  <View style={{flex : 1, backgroundColor:'#FBDF4C'}}>

    <View style= {{flex : 1}}>

      <Carousel>

          <View style={styles.container}>
            <Image source={require('../assets/GGSC.png')} style={{width:200, height:200, justifyContent: 'center', alignItems:'center'}}></Image>
            
            <View style={styles.box2}>
              <Text style={styles.text}>QUI SOMMES-NOUS ?</Text>
              <Text style={{width:200, justifyContent:"center"}}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's. Lorem Ipsum has been the industry's.</Text>
            </View>
          </View> 

          <View style={styles.container}>

            <View style={styles.box}>
              <Text style={styles.text}>REJOINDRE LE CLUB</Text>
              <Button
                  containerStyle = {{marginBottom: 25, width: '70%', borderRadius: 15,}}
                  title="Je suis vigneron"
                  type="solid"
                  buttonStyle = {{backgroundColor: '#FF9900'}}
                  onPress={() => {
                    navigation.navigate('Profile'); 
                  }}
              />

              <Button
                  containerStyle = {{marginBottom: 25, width: '70%', borderRadius: 15,}}
                  title="Je suis caviste"
                  type="solid"
                  buttonStyle = {{backgroundColor: '#FF9900'}}
                  onPress={() => {
                    navigation.navigate('Profile'); 
                  }}
              />

              <Input
                  containerStyle = {{marginBottom: 25, width: '70%'}}
                  inputStyle={{marginLeft: 10}}
                  placeholder='Nom'
                  leftIcon={
                      <Icon
                      name='user'
                      size={20}
                      color="#FFD15C"
                      />
                  }
              />
                <Input
                  containerStyle = {{marginBottom: 25, width: '70%'}}
                  inputStyle={{marginLeft: 10}}
                  placeholder='Email'
                  leftIcon={
                      <Icon
                      name='inbox'
                      size={20}
                      color="#FFD15C"
                      />
                  }
              />
                <Input
                  containerStyle = {{marginBottom: 25, width: '70%'}}
                  inputStyle={{marginLeft: 10}}
                  placeholder='Téléphone'
                  leftIcon={
                      <Icon
                      name='phone'
                      size={20}
                      color="#FFD15C"
                      />
                  }
              />
              <Image source={require('../assets/ContactGlouGlou.png')} style={{width:100, height:100, justifyContent: 'center', alignItems:'center'}}></Image>
            </View>
          </View> 

       </Carousel>

    </View>

      <View style={styles.buttons}>
        <View style={{borderColor:'#FFD15C'}}>
          <Text style={styles.txt}
                onPress={() => {
                navigation.navigate('SignUp'); 
              }}>S'INSCRIRE</Text>
        </View>

        <View style={{borderColor:'#FFD15C'}}>
          <Text style={styles.txt}
                onPress={() => {
                navigation.navigate('SignIn'); 
                }}>S'IDENTIFIER</Text>
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
    backgroundColor: '#FBDF4C',
    // fontFamily: "Gothic A1",
  },
  box: {
    width: 300,
    height: 500,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // fontFamily: "Gothic A1",
  },
  text: {
    color: '#FFD15C',
    fontSize: 18,
    padding: 10,
    // fontFamily: "Gothic A1",
  }, 
  buttons: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#FBDF4C",
    borderRadius: 15,
  },
  txt: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingLeft: 35,
    padding: 10,
    justifyContent: 'center',
    // fontFamily: "Gothic A1",
  },
  box2:{
    width: 300,
    height: 200,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // fontFamily: "Gothic A1",
  }
});
  
  export default FirstScreen;