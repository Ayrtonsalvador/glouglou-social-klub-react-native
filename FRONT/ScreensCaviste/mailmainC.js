import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import MailmainV from '../ScreensVigneron/MailmainV';


function MailmainC({ navigation, pseudo, token, MessagesR, userstatus }) {
  
  var IPmaison = "";
  var IPecole = "172.17.1.46";

  const [listMessages, setListMessages] = useState([]);
  const [Nom, setNom] = useState();
  const [Texte, setTexte] = useState();
  const [nomCaviste, setNomCaviste] = useState();

useEffect(() => {
  async function loadData() {
    var rawResponse = await fetch(`http://172.17.1.159:3000/mailbox-main?token=${token}&msgCaviste=${MessagesR}`);
    var response = await rawResponse.json();

    if(response.result == true){
      setListMessages(response.msgCaviste)
    setNomCaviste(response.Caviste.Nom)
    
    console.log("NOM", nomCaviste)
  }
    
  } 
  loadData()
}, []);

 var listMessagesItem = listMessages.map((msg, i) => {
      
          return <ListItem
              title={msg.Texte}
              subtitle={nomCaviste}
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