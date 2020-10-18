import React, {useState} from 'react';
import { StyleSheet, View, Image, SafeAreaView} from "react-native";
import {Button, ListItem, Input, Text, Header} from 'react-native-elements';

export default function ProfileScreen({navigation}) {
    return (
      <View style={{ flex: 1}}>
        <Header
          containerStyle={{alignItems: 'center', justifyContent: 'center', backgroundColor: '#FBDF4C'}}
          centerComponent={{ text: 'MON PROFIL', marginTop: 30 }}
        />

        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor:'#FBDF4C'  }}>
        <Text>Profile Page</Text>
        <Button
          containerStyle = {{borderRadius: 15,}}
          title="Logout"
          type="solid"
          buttonStyle = {{backgroundColor: '#FF9900'}}
          onPress={() => {
          navigation.navigate('First'); }}>
          </Button>
        </View>
      </View>
    );
  }
