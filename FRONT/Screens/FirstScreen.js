import React from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Button } from 'react-native-elements';
import Carousel from "react-native-carousel-control";

import {
  responsiveScreenHeight,
  responsiveScreenWidth,
} from "react-native-responsive-dimensions";

function FirstScreen({ navigation }) {

  return (

    <View style={styles.container}>

      <View style={{ flex: 1 }}>

        <View style={styles.glou}>
          <Image source={require('../assets/GGSC.png')} style={{ width: 250, height: 250, marginTop: 50 }}></Image>
        </View>

        <Carousel
          onPress={(index) => setActiveSlide(index)}
          inactiveSlideOpacity={0.4}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >

          <View style={styles.box2}>

            <Text style={styles.text}>BOIRE BIEN, BOIRE MIEUX</Text>
            <Text style={{ width: 200, padding: 5}}>GlouGlou Social Club réunit les amateurs de vins et met en relation les producteurs indépendants et les cavistes.</Text>
          </View>

          <View style={styles.box2}>
            <Text style={styles.text}>CÔTÉ VIGNERONS</Text>
            <Text style={{ width: 200, padding: 5, justifyContent: "justify"}}>Nous participons au développement des producteurs indépendants grâce à notre catalogue de références à disposition des cavistes.</Text>
          </View>

          <View style={styles.box2}>
            <Text style={styles.text}>CÔTÉ CAVISTES</Text>
            <Text style={{ width: 200, padding: 5 }}>Nous aidons les restaurateurs à étoffer leur carte grâce à une présélection de références de petits producteurs.</Text>
          </View>

        </Carousel>
      </View>

      <View style={styles.buttons}>

        <Button buttonStyle={{ backgroundColor: '#FCDF23', margin: 10 }}
          title="S'IDENTIFIER"
          onPress={() => {
            navigation.navigate('SignIn');
          }}>S'INSCRIRE</Button>

        <Button buttonStyle={{ backgroundColor: '#FFAE34', margin: 10 }}
          title="S'INSCRIRE"
          onPress={() => {
            navigation.navigate('SignUp');
          }}>S'INSCRIRE</Button>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: responsiveScreenHeight(100),
    width: responsiveScreenWidth(100),
    justifyContent: 'center',
    backgroundColor: '#FCDF23',
  },
  box: {
    width: 300,
    height: 500,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,

  },
  text: {
    fontWeight: 'bold',
    color: "#FFAE34",
    fontSize: 18,
    padding: 5,
  },

  buttons: {
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDF23',
    borderRadius: 15,
  },
  txt: {
    color: '#FFFFFF',
    fontSize: 18,
    paddingLeft: 35,
    padding: 10,
    justifyContent: 'center',
    backgroundColor: '#FCDF23',
  },
  box2: {
    borderRadius: 15,
    height: responsiveScreenHeight(30),
    width: responsiveScreenHeight(45),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',

  },
  glou: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDF23',
  }
});

export default FirstScreen;