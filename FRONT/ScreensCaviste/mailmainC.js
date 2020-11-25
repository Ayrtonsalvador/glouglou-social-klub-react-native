import React, { useEffect, useState } from 'react';
import { View, ScrollView, Image } from 'react-native';
import { ListItem,  Header, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import MailmainV from '../ScreensVigneron/MailmainV';
import MailreadC from './MailreadC';
import URL from '../URL'

function MailmainC({ navigation, token, userstatus, sendMessage, message }) {

  const [listMessages, setListMessages] = useState([]);
  const [read, setRead] = useState(false);

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(`${URL}/mailbox-main/${token}`);
      var response = await rawResponse.json();

      if (response.result == true) {
        setListMessages(response.Caviste.MessagesR)
      }
    }
    loadData()
  }, []);

  // OUVRIR MESSAGE
  if (read) {
    (<MailreadC />)
  }

  // MAP MESSAGES RECU
  var listMessagesItem = listMessages.map((msg, i) => {

    return <ListItem
      key={i}
      title={msg.Nom}
      subtitle={msg.Texte}
      bottomDivider={true}
      leftAvatar={
        <Avatar rounded
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


  // REDIRECTION SCREEN VIGNERON
  if (userstatus == "Vigneron") {
    return (<MailmainV navigation={navigation} token={token} userstatus={userstatus} message={message} />)
  } else {

    // MESSAGES CAVISTE
    return (
      <View style={{ flex: 1 }}>
        <Header
          centerComponent={<Image source={require('../assets/mescontacts.png')} style={{ width: 120, height: 100, marginTop: -20 }}></Image>}
          rightComponent={<Icon
            name="pencil"
            size={25}
            color="#FFD15C"
            buttonStyle={{ backgroundColor: '#FF9900' }}
            onPress={() => { navigation.navigate('Write'); }}>
          </Icon>}
          containerStyle={{
            backgroundColor: '#FFFFFF', height: 80
          }}
        />
        <ScrollView style={{ flex: 1 }}>
          {listMessagesItem}
        </ScrollView>
      </View>
    )
  }
}

function mapStateToProps(state) {
  return { token: state.token, userstatus: state.userstatus, message: state.message }

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