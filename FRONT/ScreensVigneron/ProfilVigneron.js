import React, { useState } from 'react';
import { StyleSheet, View, Image, SafeAreaView } from "react-native";
import { Button, ListItem, Input, Header } from 'react-native-elements';

export default function ProfilVigneron({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Header
        containerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCDF23' }}
        centerComponent={{ text: 'AJOUT VIN VIGNERON', marginTop: 30 }}
        >
        <Image source={require('../assets/MainGlouGlou.png')} style={{width:20, height: 30}}></Image>
      </Header>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF' }}>
        <Button
          containerStyle={{ borderRadius: 15, }}
          title="Logout"
          type="solid"
          buttonStyle={{ backgroundColor: '#FF9900' }}
          onPress={() => {
            navigation.navigate('First');
          }}>
        </Button>
      </View>
    </View>
  );
}
