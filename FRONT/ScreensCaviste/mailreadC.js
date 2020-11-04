import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import MailreadV from '../ScreensVigneron/MailreadV';

function MailreadC({ navigation, pseudo, props, token, userstatus, clickedMsg }) {

  var IPmaison = "192.168.1.22";
  var IPecole = "172.17.1.46";

  const [listMessage, setListMessage] = useState([]);
  const [Texte, setTexte] = useState();

  // const [clickedMsg, setClickedMsg] = useState();
  const [selectedId, setSelectedId] = useState(null);
  
 
   console.log("CA MARCHE", clickedMsg)
  

  useEffect(() => { async () => { var data = await fetch(`http://${IPecole}:3000/mailbox-read`)
      var body = await data.json()
      console.log("RESPONSE", body)}  
  }, [listMessage]);

  if (userstatus == "Vigneron") {
    return (<MailreadV navigation={navigation} token={token} userstatus={userstatus}/>)
  } else {

    
  return (
    <View style={{ flex: 1 }}>

      <Header
        containerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCDF23'}}
        centerComponent={{ text: 'MES CONTACTS GLOUGLOU', marginTop: 30 }}
      >
      <Image source={require('../assets/MainGlouGlou.png')} style={{width:20, height: 30}}></Image>
      </Header>
      <Button
            title="Go back to Mailbox"
            type="solid"
            buttonStyle={{ backgroundColor: '#FF9900' }}
            onPress={() => {
              navigation.navigate('Main');
            }}>
            </Button>
      {/* {listMessageItem} */}
      <ScrollView style={{ flex: 1, marginTop: 15 }}>
      <ListItem
              title={"Vigneron"}
              subtitle={"Oui, nous sommes disponibles"}
              leftAvatar={
              <Avatar rounded
                       source={require('../assets/vigneron.jpg')} >
              <Accessory />
              </Avatar>}
              bottomDivider={true}
              // {clickedItem}
          />
              
      </ScrollView >

      <KeyboardAvoidingView behavior="padding" enabled>

        <View style={{ flexDirection: "row" }}>
        <Input
            containerStyle={{ marginBottom: 5 }}
            placeholder={"Votre message \n"}
            multiline={true}
            onChangeText={(text) => {
                setTexte(text);      }}
            value={Texte}
          />
          {/* <Input
            containerStyle={{ marginBottom: 5 }}
            placeholder='To:'
            onChangeText={(text) => setTexte(text)}
            value={Texte}
          /> */}
        </View>
        <Button
          icon={
            <Icon
              name="envelope-o"
              size={20}
              color="#ffffff"
            />
          }
          title=" Répondre"
          buttonStyle={{ backgroundColor: "#FFD15C", marginBottom: 5 }}
          type="solid"
          // Envoi du message au back en appuyant sur Send
          onPress={() => {
           
            setTexte('')
          }}
        />

        <Button
          buttonStyle={{ backgroundColor: "#FFD15C", marginBottom: 5 }}
          type="solid"
          title=" Contactez-nous"
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
}}


function mapStateToProps(state){
  return {token: state.token, userstatus : state.userstatus}
}

export default connect(
  mapStateToProps,
  null
)(MailreadC);