import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import userstatus from '../reducers/userstatus';
import MailreadV from './MailreadV';

function MailmainV({ navigation, pseudo, token, userstatus, openMessage }) {

  var IPecole = "172.17.1.153";

  const [Nom, setNom] = useState();
  const [Texte, setTexte] = useState();
  const [nomVigneron, setNomVigneron] = useState();
  const [nomCaviste, setNomCaviste] = useState();

  const [listMessages, setListMessages] = useState([]);
  const [clickedMsg, setClickedMsg] = useState([])
  const [choosen, setChoosen] = useState()

  const handleClick = (id, texte, nomCaviste) => {
    navigation.navigate('Read');

    setClickedMsg({ texte: texte, nomCaviste: choosen })
    openMessage(clickedMsg)
    console.log("Envoi redux message", clickedMsg)

    if (clickedMsg != null) { return (<MailreadV clickedMsg={clickedMsg} />) }
  }

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(`http://${IPecole}:3000/mailbox-main-v?token=${token}`);
      var response = await rawResponse.json();
      console.log("RESPONSE MAIL MAIN V", response)

      if (response.result == true) {
        setListMessages(response.Vigneron.MessagesR)
        setNomCaviste(response.Vigneron.MessagesR.Nom)
        // console.log("NOM Cav expediteur", response.Vigneron.MessagesR.Nom)
      }
    }
    loadData()
  }, []);

  var listMessagesItem = listMessages.map((msg, i) => {

    return <ListItem
      key={i}
      title={msg.Texte}
      subtitle={msg.Nom}
      style={{ backgroundColor: "transparent" }}
      leftAvatar={
        <Avatar
          rounded
          source={require('../assets/vigneron.jpg')}
        />}
      bottomDivider={true}
      onPress={() => {
        setChoosen(msg.Nom)
        handleClick(msg.Nom, msg.Texte)
      }}
      >
    </ListItem>
  });


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

function mapDispatchToProps(dispatch) {
  return {
    openMessage: function (message) {
      dispatch({ type: 'readMessage', message: message })

    },
  }
}

function mapStateToProps(state) {
  // console.log("state", state.token)
  return { token: state.token, userstatus: state.userstatus }

}


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MailmainV);


