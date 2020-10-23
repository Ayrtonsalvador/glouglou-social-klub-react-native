import React, { useState } from 'react';
import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import { Button, ListItem, Input, Header } from 'react-native-elements';

export default function ChatVigneron({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Header
        containerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCDF23' }}
        centerComponent={{ text: 'CHAT VIGNERON', marginTop: 30 }}
        >
        <Image source={require('../assets/MainGlouGlou.png')} style={{width:20, height: 30}}></Image>
      </Header>
    </View>
  );
}