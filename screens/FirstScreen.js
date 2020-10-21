import React, { useState } from 'react';
import { AppRegistry, StyleSheet, View, Text, Image } from 'react-native';

import { Button, Input } from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import Carousel from "react-native-carousel-control";

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

    <View style={{ flex: 1, backgroundColor: '#FCDF23' }}>

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
              <Text style={styles.text}>QUI SOMMES-NOUS ?</Text>
              <Text style={{ width: 200, justifyContent: "center", padding:10  }}>Le GlouGlou Social Club réunit les amateurs de vins et facilite la mise en relation entre les vignerons et professionnels de la restauration.</Text>
            </View>

            <View style={styles.box2}>
              <Text style={styles.text}>POUR LES VIGNERONS</Text>
              <Text style={{ width: 200, justifyContent: "center", padding:5  }}>Vous êtes vigneron et cherchez à donner plus de visibilité à vos bouteilles, et développer votre présence digitale ? Alors contactez notre team pour nous expliquer votre savoir-faire !</Text>
            </View>

            <View style={styles.box2}>
              <Text style={styles.text}>POUR LES CAVISTES</Text>
              <Text style={{ width: 200, justifyContent: "center", padding:5 }}>Vous êtes restaurateur ou  caviste et vous désirez dénicher de nouveaux producteurs de qualité et étoffer votre carte ? Alors contactez notre team pour nous expliquer vos objectifs !</Text>
            </View>

        </Carousel>
            {pagination}

      </View>

      <View style={styles.buttons}>

        <View style={{ borderColor: '#FFD15C', margin:10}}>
          <Text style={styles.txt}
            onPress={() => {
              navigation.navigate('SignIn');
            }}>S'IDENTIFIER</Text>
        </View>

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
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDF23',
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
    padding: 5,
    // fontFamily: "Gothic A1",
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
    backgroundColor: '#FCDF23'
    // fontFamily: "Gothic A1",
  },
  box2: {
    // flex: 1,
    width: 300,
    height: 200,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // fontFamily: "Gothic A1",
  },
  glou: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FCDF23',
  }
});

export default FirstScreen;