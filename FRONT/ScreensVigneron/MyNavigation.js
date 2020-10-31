import React, { useState } from 'react';

import { StyleSheet, View, Image, KeyboardAvoidingView, ScrollView, TouchableOpacity, Button } from "react-native";

import IconFontAwesome from 'react-native-vector-icons/FontAwesome';
import IconIonic from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';

function MyNavigation({ navigation }) {

  return (

    <View style={styles.container}>

      <View style={styles.boutton}>

      <TouchableOpacity onPress={() => {
          navigation.navigate("ProfilVigneron")}}>
          <IconIonic
            name="ios-person"
            size={30}
            color="#ffffff"
          />
        </TouchableOpacity>


<TouchableOpacity onPress={() => {
          navigation.navigate("ChatVigneron");
        }}>
          <IconIonic
               name="md-chatboxes"
            size={30}
            color="#ffffff"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          navigation.navigate("CaveVigneron");
        }}>
          <IconIonic
            name="ios-home"
            size={30}
            color="#ffffff"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {
          navigation.navigate("AddVigneron");
        }}>
          <IconIonic
            name="ios-wine"
            size={30}
            color="#ffffff"

          /></TouchableOpacity>

      </View>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    backgroundColor: '#CCCCFF',
  },
  boutton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: "space-between",
    padding: 5,
    marginHorizontal: 10,
  }
})

export default MyNavigation;
