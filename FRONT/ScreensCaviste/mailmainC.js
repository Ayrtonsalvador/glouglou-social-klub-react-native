import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import MailmainV from '../ScreensVigneron/MailmainV';


function MailmainC({ navigation, pseudo, token, MessagesR, userstatus }) {
  
  var IPecole = "172.17.1.153";
 
  const [listMessages, setListMessages] = useState([]);
  const [Nom, setNom] = useState();
  const [Texte, setTexte] = useState();
  const [nomCaviste, setNomCaviste] = useState();
  const [selectedId, setSelectedId] = useState(null);

  const handleClick = (id, texte) => {
    setSelectedId(id) // ID détecté !
    setClickedMsg(texte) // MSG détecté     
    navigation.navigate('Read');

    if(clickedMsg != null){return (<MailmainC clickedMsg={clickedMsg} />)}
    
    navigation.navigate('Read')
  }

useEffect(() => {
  async function loadData() {
    var rawResponse = await fetch(`http://${IPecole}:3000/mailbox-main?token=${token}`);
    var response = await rawResponse.json();
    // console.log("RESPONSE MAIL MAIN C", response)
    // console.log("NOM EXPEDITEUR", response.Caviste.MessagesR[3].Nom)

    if(response.result == true){
    setListMessages(response.msgCaviste)
    setNomVigneron(response.Caviste.MessagesR.Nom)
  }
  } 
  loadData()
}, []);


 var listMessagesItem = listMessages.map((msg, i) => {
      
          return <ListItem
              key={i}
              title={msg.Texte}
              subtitle={msg.Nom}
              // subtitle={i}
              // leftAvatar={
              //   // <Avatar rounded
              //   //   // source={require('../assets/vigneron.jpg')} 
              //   //   >
              //   //   <Accessory />
              //   // </Avatar>
              // }
              bottomDivider={true}
              onPress={() => {handleClick(msg._id, msg.Texte)}} 
                          >    
                 </ListItem>
    });
 
    if (userstatus == "Vigneron") {
      return (<MailmainV navigation={navigation} token={token} userstatus={userstatus}/>)
    } else {
  return (
<View style={{ flex: 1 }}>

<Header
  containerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCDF23' }}
  centerComponent={{ text: 'REDIGER NOUVEAU MESSAGE', marginTop: 30 }}
>
  <Image source={require('../assets/MainGlouGlou.png')} style={{ width: 20, height: 20 }}></Image>
  <Button icon={{ name: 'plus', type: 'font-awesome', color: '#FFFFFF' }}
          rounded
          buttonStyle={{ backgroundColor: '#FFAE34', borderRadius: 100 }}
          onPress={() => {navigation.navigate('Write');}} />
</Header>
<ScrollView style={{ flex: 1}}>
{listMessagesItem}
</ScrollView>
</View>
  )
 }}

function mapStateToProps(state) {
  // console.log("state", state.token)
  return { token: state.token, userstatus : state.userstatus}
  
}

export default connect(
  mapStateToProps,
  null
)(MailmainC);