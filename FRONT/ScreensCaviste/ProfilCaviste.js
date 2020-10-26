import React, { useState } from 'react';
import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import { Button, ListItem, Input, Text, Header } from 'react-native-elements';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Header
        containerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCDF23' }}
        centerComponent={{ text: 'MON PROFIL Caviste', marginTop: 30 }}
        >
        <Image source={require('../assets/MainGlouGlou.png')} style={{width:20, height: 30}}></Image>
      </Header>
      <Button
        title="Logout"
        type="solid"
        buttonStyle={{ backgroundColor: '#FF9900' }}
        onPress={() => {
          navigation.navigate('First');
        }}>
      </Button>
    </View>
  );
}
