
import React, { useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';


var socket = socketIOClient("http://172.17.1.159:3000");

function MessageVigneron({ navigation }) {
  return (
    <View style={{ flex: 1 }}>
      <Header
        containerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCDF23' }}
        centerComponent={{ text: 'Message direct Vigneron', marginTop: 30 }}
        >
        <Image source={require('../assets/MainGlouGlou.png')} style={{width:20, height: 30}}></Image>
      </Header>
      <ListItem
          title="Jean Pierre"
          subtitle="Merci beaucoup"
          style={{ backgroundColor: '#DEDDDD', borderRadius: 15 }}
          leftAvatar={
            <Avatar
              rounded
              source={require('../assets/vigneron.jpg')}
            >
              <Accessory />
            </Avatar>
          }
        />
        <Button
        title="Go back"
        type="solid"
        buttonStyle={{ backgroundColor: '#FF9900' }}
        onPress={() => {
          navigation.navigate('ChatVigneron');
        }}>
      </Button>
    </View>
  );
}

function mapStateToProps(state) {
  return { pseudo: state.pseudo, token: state.token }
}

export default connect(
  mapStateToProps,
  null
)(MessageVigneron);