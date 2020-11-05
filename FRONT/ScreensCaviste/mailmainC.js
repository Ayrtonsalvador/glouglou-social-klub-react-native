import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import MailmainV from '../ScreensVigneron/MailmainV';

function MailmainC({ navigation, token, userstatus }) {
  
  var IPecole = "172.17.1.153";
 
  const [listMessages, setListMessages] = useState([]);
  const [Nom, setNom] = useState();
  const [Texte, setTexte] = useState();
  const [nomCaviste, setNomCaviste] = useState();
  const [nomVigneron, setNomVigneron] = useState();
  const [selectedId, setSelectedId] = useState(null);
  const [clickedMsg, setClickedMsg] = useState(null)

  const handleClick = (id, texte) => {
    setSelectedId(id)
    setClickedMsg(texte)   
    navigation.navigate('Read');

    if (clickedMsg != null) { return (<MailreadC clickedMsg={clickedMsg} />) }

    navigation.navigate('Read')
  }

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(`http://${IPmaison}:3000/mailbox-main?token=${token}`);
      var response = await rawResponse.json();
      // console.log("RESPONSE MAIL MAIN C", response)

      if (response.result == true) {
        setListMessages(response.Caviste.MessagesR)
        setNomVigneron(response.Caviste.MessagesR.Nom)
        // console.log("NOM Cav expediteur", response.Caviste.MessagesR.Nom)
      }
    }
    loadData()
  }, []);


  var listMessagesItem = listMessages.map((msg, i) => {

    return <ListItem
      key={i}
      title={msg.Texte}
      subtitle={msg.Nom}
      leftAvatar={
        <Avatar rounded
          // source={require('../assets/vigneron.jpg')} 
          >
        </Avatar>
      }
      bottomDivider={true}
      onPress={() => { handleClick(msg._id, msg.Texte) }}
    >
    </ListItem>
  });

  if (userstatus == "Vigneron") {
    return (<MailmainV navigation={navigation} token={token} userstatus={userstatus} />)
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
  // console.log("state", state.token)
  return { token: state.token, userstatus: state.userstatus }

}

function mapDispatchToProps(dispatch) {
  return { 
    sendMessage: function (message) {
      dispatch({ type: 'addMessage', message: message })
    }
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MailmainC);