import React, { useState } from 'react';
import { AppRegistry, StyleSheet, View, Text, Image } from 'react-native';

import { Button, Input } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from "react-native-carousel-control";

import { 
  responsiveHeight , 
  responsiveWidth , 
  responsiveFontSize,
  responsiveScreenHeight , 
  responsiveScreenWidth , 
  responsiveScreenFontSize 
}  from  "react-native-responsive-dimensions" ;

import { connect } from 'react-redux';
import { color } from 'react-native-reanimated';

function FirstScreen({ navigation }) {

  const pagination = () => {
    const [activeSlide, setActiveSlide] = useState(0);

    return (
        <Pagination
          dotsLength={3}
          activeDotIndex={activeSlide}
          containerStyle={{ backgroundColor: '#FFFFFF' }}
          dotColor={'#FFD15C'}
          dotStyle={{
              width: 10,
              height: 10,
              borderRadius: 5,
              marginHorizontal: 8,
              backgroundColor: '#FFFFFF'
          }}
          inactiveDotStyle={{
            width: 8,
            height: 8,
            borderRadius: 5,
            marginHorizontal: 8,
            backgroundColor: '#FFF2A0'
          }}
          inactiveDotOpacity={0.4}
          inactiveDotScale={0.6}
        />
    );
}

  return (

    <View style={styles.container}>

      <View style={{ flex: 1 }}>

        <View style={styles.glou}>
          <Image source={require('../assets/GGSC.png')} style={{ width: 250, height: 250, marginTop:50}}></Image>
        </View>

        <Carousel
          onPress={(index) => setActiveSlide(index) }
          inactiveSlideOpacity={0.4}
          pagingEnabled
          showsHorizontalScrollIndicator={false}
        >

          
            <View style={styles.box2}>
             
              <Text style={styles.text}>BOIRE BIEN, BOIRE MIEUX</Text>
              <Text style={{ width: 200, justifyContent: "center", padding:5,}}>GlouGlou Social Club réunit les amateurs de vins et met en relation les producteurs indépendants et les cavistes.</Text>
              {pagination}
    
            </View>

            <View style={styles.box2}>
              <Text style={styles.text}>CÔTÉ VIGNERONS</Text>
              <Text style={{ width: 200, justifyContent: "center", padding:5  }}>Nous participons au développement des producteurs indépendants grâce à notre catalogue de références à disposition des cavistes.</Text>
              {pagination}
            </View>

            <View style={styles.box2}>
              <Text style={styles.text}>CÔTÉ CAVISTES</Text>
              <Text style={{ width: 200, justifyContent: "center", padding:5 }}>Nous aidons les restaurateurs à étoffer leur carte grâce à une présélection de références de petits producteurs.</Text>
              {pagination}
            </View>

        </Carousel>
            

      </View>

      <View style={styles.buttons}>

      <Button buttonStyle={{backgroundColor: '#FCDF23', margin:10}}
          title="S'IDENTIFIER"
          onPress={() => {
          navigation.navigate('SignIn');
          }}>S'INSCRIRE</Button>

        <Button buttonStyle={{backgroundColor: '#FFAE34', margin:10}}
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
    height : responsiveScreenHeight (100 ) , 
    width : responsiveScreenWidth ( 100),
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
    fontWeight : 'bold',
    color : "#FFAE34",
    fontSize: 18,
    padding: 5,

    // fontFamily: "GothicA1-Bold",
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
    
    // fontFamily: "GothicA1-Bold",
  },
  box2: {
    borderRadius: 15,
    height : responsiveScreenHeight (30), 
    width : responsiveScreenHeight (45),
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