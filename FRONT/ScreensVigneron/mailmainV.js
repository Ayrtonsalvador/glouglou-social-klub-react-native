import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import userstatus from '../reducers/userstatus';

function MailmainV({ navigation, pseudo, token, userstatus, sendMessage }) {

  var IPmaison = "192.168.1.22";
  var IPecole = "172.17.1.159";

  const [listMessages, setListMessages] = useState([]);
  const [Nom, setNom] = useState();
  const [Texte, setTexte] = useState();
  const [nomVigneron, setNomVigneron] = useState();
  const [nomCaviste, setNomCaviste] = useState();

  const handleClick = (msgDatas) => { 
    // setSelectedId(msg._id) // ID détecté !
    // setClickedMsg(msg.Texte) // MSG détecté
      // if(message != null){return (<MailmainC message={message} />)}
    sendMessage({id:msgDatas.id, msg:msgDatas.msg})
    console.log("selectedid+clickedMsg", msgDatas ) // ok, il a l'info
    navigation.navigate('Read')
  }

useEffect(() => {
  async function loadData() {
    var rawResponse = await fetch(`http://${IPecole}:3000/mailbox-main-v?token=${token}`);
    var response = await rawResponse.json();

    if(response.result == true){
      setListMessages(response.msgVigneron)
      setNomCaviste(response.Vigneron.MessagesR.Nom)
      // console.log("NOM Vigneron", response.Vigneron.Nom)
  }
    
  } 
  loadData()
}, []);

 var listMessagesItem = listMessages.map((msg, i) => {
      
  var result = listMessages[i].Texte;

  console.log("ALORS ALORS",result)
  
      if(result.length > 75){
        result = result.slice(0,75)+'...' }

          return <ListItem
               key={i}
              title={msg.Texte}
              // subtitle={nomVigneron}
              subtitle={msg.Nom}
              // subtitle={i}
              // leftAvatar={
              //   // <Avatar rounded
              //   //   // source={require('../assets/vigneron.jpg')} 
              //   //   >
              //   //   <Accessory />
              //   // </Avatar>
              // }
              title={result}
              subtitle={nomCaviste}
              bottomDivider={true}
              onPress={() => {
                handleClick({id:msg._id, msg:msg.Texte})
                console.log("yo",msg.Texte) // OK, il a l'info 

             }
           } 
                          >     
                 </ListItem>
    });
 

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
 }

function mapStateToProps(state) {
  // console.log("state", state.token)
  return { token: state.token, userstatus: state.userstatus}
  
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
)(MailmainV);


