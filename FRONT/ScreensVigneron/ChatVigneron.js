
import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';

import Icon from 'react-native-vector-icons/FontAwesome';

import socketIOClient from "socket.io-client";
import { connect } from 'react-redux';


var socket = socketIOClient("http://172.17.1.159:3000/");

function ChatVigneron({ navigation, pseudo }) {

  const [listMessage, setListMessage] = useState([]);
  const [currentMessage, setCurrentMessage] = useState('');

  useEffect(() => {

    socket.on('sendMessageToAll', (newMessage) => {
      setListMessage([...listMessage, newMessage])
      console.log(newMessage);
    });

  }, [listMessage]);

  var listMessageItem = listMessage.map((msg, i) => {
    return (
      <ListItem
        title={msg.nom}
        subtitle="Parfait et toi ?"
        style={{ backgroundColor: '#DEDDDD', borderRadius: 15 }}
        leftAvatar={
          <Avatar
            rounded
            source={{
              uri:
                'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
            }}
            badge={3}
          >
            <Accessory />
          </Avatar>
        }
        bottomDivider={true}
      />)
  });

  return (
    <View style={{ flex: 1 }}>

      <Header
        containerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCDF23'}}
        centerComponent={{ text: 'MES CONTACTS GLOUGLOU', marginTop: 30 }}
      >
      <Image source={require('../assets/MainGlouGlou.png')} style={{width:20, height: 30}}></Image>
      </Header>

      <ScrollView style={{ flex: 1, marginTop: 15 }}>
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
            title="Go to message Jean pierre"
            type="solid"
            buttonStyle={{ backgroundColor: '#FF9900' }}
            onPress={() => {
              navigation.navigate('MessageVigneron');
            }}>
            </Button>

        <ListItem
          title="La GlouGlou Team"
          subtitle="Bienvenue au Club !"
          style={{ backgroundColor: '#DEDDDD', borderRadius: 15 }}
          leftAvatar={
            <Avatar
              rounded
              source={require('../assets/GGSC.png')}
            >
              <Accessory />
            </Avatar>
          }
        />
        {listMessageItem}
      </ScrollView >

      <KeyboardAvoidingView behavior="padding" enabled>

        <View style={{ flexDirection: "row" }}>
          <Input
            containerStyle={{ marginBottom: 5 }}
            placeholder='Your message'
            onChangeText={(text) => setCurrentMessage(text)}
            value={currentMessage}
          />
          <Input
            containerStyle={{ marginBottom: 5 }}
            placeholder='To:'
            onChangeText={(text) => setCurrentMessage(text)}
            value={currentMessage}
          />
        </View>
        <Button
          icon={
            <Icon
              name="envelope-o"
              size={20}
              color="#ffffff"
            />
          }
          title="Send"
          buttonStyle={{ backgroundColor: "#FFD15C", marginBottom: 5 }}
          type="solid"
          // Envoi du message au back en appuyant sur Send
          onPress={() => {
            socket.emit("sendMessage", { message: currentMessage, nom: pseudo });
            setCurrentMessage('')
          }}
        />

        <Button
          buttonStyle={{ backgroundColor: "#FFD15C", marginBottom: 5 }}
          type="solid"
          title="Contactez-nous"
          icon={
            <Icon
              name='heart'
              size={20}
              color="#ffffff"
            />
          }
        />
      </KeyboardAvoidingView>

    </View>
  );
}

function mapStateToProps(state) {
  return { pseudo: state.pseudo }
}

export default connect(
  mapStateToProps,
  null
)(ChatVigneron);