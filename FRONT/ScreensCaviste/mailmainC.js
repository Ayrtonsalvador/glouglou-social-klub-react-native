import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import MailmainV from '../ScreensVigneron/MailmainV';
import MailreadC from './MailreadC';

function MailmainC({ navigation, token, userstatus, sendMessage, message }) {
  
  var IPecole = "172.17.1.46";
 
  const [listMessages, setListMessages] = useState([]);

  const [Nom, setNom] = useState();
  const [Texte, setTexte] = useState();
  const [nomCaviste, setNomCaviste] = useState();
  const [nomVigneron, setNomVigneron] = useState();
  const [read, setRead] = useState(false);

// Récupérer les messages reçus par le caviste
  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(`http://${IPecole}:3000/mailbox-main?token=${token}`);
      var response = await rawResponse.json();
      // console.log("RESPONSE MAIL MAIN C", response)

      if (response.result == true) {
        setListMessages(response.Caviste.MessagesR)
      }
    }
    loadData()
  }, []);

// OUVRIR MESSAGE RECU
if(read){
  (<MailreadC/>)
}

  var listMessagesItem = listMessages.map((msg, i) => {

    return <ListItem
      key={i}
      title={msg.Nom}
      subtitle={msg.Texte}
      bottomDivider={true}
      leftAvatar={
        <Avatar rounded
          // source={require('../assets/vigneron.jpg')} 
          />
      }
      onPress={async () => {
        setRead(true)
        sendMessage(msg)
        navigation.navigate('Read')
      }}>
    </ListItem>
  });

  if (userstatus == "Vigneron") {
    return (<MailmainV navigation={navigation} token={token} userstatus={userstatus} message={message}/>)
  } else {
    return (
      <View style={{ flex: 1 }}>

      {/* <Header> */}
      <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "space-around" }}>
        <Image source={require('../assets/mescontacts.png')} style={{ width: 120, height: 80 }}></Image>
        <Icon
          name="pencil"
          size={25}
          color="#FFD15C"
          buttonStyle={{ backgroundColor: '#FF9900' }}
          onPress={() => {
            navigation.navigate('Write');
          }} />
      </View>
      {/* </Header> */}

        <ScrollView style={{ flex: 1 }}>
          {listMessagesItem}
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { token: state.token, userstatus: state.userstatus, message: state.message}

}

function mapDispatchToProps(dispatch) {
  return { 
    sendMessage: function (message) {
      dispatch({ type: 'addMessage', message: message})
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailmainC);