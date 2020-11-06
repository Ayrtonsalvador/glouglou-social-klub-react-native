import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import userstatus from '../reducers/userstatus';
import MailreadV from './MailreadV';

function MailmainV({ navigation, pseudo, token, userstatus, sendMessage, message }) {

  var IPecole = "172.17.1.159";

  const [listMessages, setListMessages] = useState([]);
  const [Nom, setNom] = useState();
  const [Texte, setTexte] = useState();
  const [photo, setPhoto] = useState();
  const [nomCaviste, setNomCaviste] = useState();
  const [nomVigneron, setNomVigneron] = useState();
  const [read, setRead] = useState(false);

  // Récupérer les messages reçus par le vigneron
  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(`http://${IPecole}:3000/mailbox-main-v?token=${token}`);
      var response = await rawResponse.json();
      // console.log("RESPONSE MAIL MAIN V", response)

      if (response.result == true) {
        setListMessages(response.Vigneron.MessagesR)
        setPhoto(response.Vigneron.MessagesR.Photo)
      }
    }
    loadData()
  }, []);

  if (read) { (<MailreadV message={message} />) }


  var listMessagesItem = listMessages.map((msg, i) => {

    return <ListItem
      key={i}
      title={msg.Nom}
      subtitle={msg.Texte}
      style={{ backgroundColor: "transparent" }}
      leftAvatar={
        <Avatar
          rounded
          source={{ uri: msg.Photo }}
        />
      }
      onPress={async () => {
        setRead(true)
        sendMessage({ message: msg })
        navigation.navigate('Read')
      }}>
    </ListItem>
  });

  return (
    <View style={{ flex: 1 }}>

      <Header 
          centerComponent={<Image source={require('../assets/mescontacts.png')} style={{ width: 120, height: 100, marginTop: -20 }}></Image>}
          rightComponent={<Icon
             name="pencil"
             size={25}
             color="#FFD15C"
             buttonStyle={{ backgroundColor: '#FF9900' }}
             onPress={() => {navigation.navigate('Write');}}>
             </Icon>}
             containerStyle={{
              backgroundColor: '#FFFFFF', height: 80}}
             />

      <ScrollView style={{ flex: 1 }}>
        {listMessagesItem}
      </ScrollView>
    </View>
  )
}

function mapDispatchToProps(dispatch) {
  return {
    sendMessage: function (message) {
      dispatch({ type: 'addMessage', message: message })
    }
  }
}

function mapStateToProps(state) {
  console.log("STATE V", state.message)
  return { token: state.token, userstatus: state.userstatus, message: state.message }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MailmainV);


