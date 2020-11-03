import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import userstatus from '../reducers/userstatus';

function MailmainV({ navigation, pseudo, token, userstatus, MessagesR }) {

  var IPmaison = "";
  var IPecole = "";

  const [listMessages, setListMessages] = useState([]);
  const [Nom, setNom] = useState();
  const [Texte, setTexte] = useState();
  const [nomVigneron, setNomVigneron] = useState();

useEffect(() => {
  async function loadData() {
    var rawResponse = await fetch(`http://${IPecole}:3000/mailbox-main-v?token=${token}&msgVigneron=${MessagesR}`);
    var response = await rawResponse.json();

    if(response.result == true){
      setListMessages(response.msgVigneron)
    setNomVigneron(response.Vigneron.Nom)
    
    console.log("NOM", nomVigneron)
  }
    
  } 
  loadData()
}, []);

 var listMessagesItem = listMessages.map((msg, i) => {
      
          return <ListItem
              title={msg.Texte}
              subtitle={nomVigneron}
              // subtitle={i}
              // leftAvatar={
              //   // <Avatar rounded
              //   //   // source={require('../assets/vigneron.jpg')} 
              //   //   >
              //   //   <Accessory />
              //   // </Avatar>
              // }
              bottomDivider={true}
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

export default connect(
  mapStateToProps,
  null
)(MailmainV);


