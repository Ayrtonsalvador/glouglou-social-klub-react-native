import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import MailreadV from '../ScreensVigneron/MailreadV';

function MailreadC({ navigation, token, userstatus, clickedMsg }) {

  var IPmaison = "192.168.1.22";
  var IPecole = "172.17.1.159";

  const [Texte, setTexte] = useState();
  const [texteSent, setTexteSent] = useState();
  const [response, setResponse] = useState();
  const [nomVigneron, setNomVigneron] = useState();
  const [nomCaviste, setNomCaviste] = useState();

  if (userstatus == "Vigneron") {
    return (<MailreadV navigation={navigation} token={token} userstatus={userstatus}/>)
  } else {
console.log("MESSAGE.MSG", message)
    
  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>

      <View style={{ alignItems: "center", flexDirection: "row", justifyContent:"space-around"}}>
      <Icon
        name="arrow-circle-o-left"
        size={20}
        color="#FFD15C"
        buttonStyle={{ backgroundColor: '#FF9900' }}
        onPress={() => {
          navigation.navigate('Main');
        }}/>
        <Image source={require('../assets/mescontacts.png')} style={{ width: 120, height: 80 }}></Image>
      </View>

      <ScrollView style={{ flex: 1, marginTop: 15 }}>
      <ListItem
        title={nomVigneron}
        subtitle={Texte}
        leftAvatar={
          <Avatar rounded
            source={require('../assets/vigneron.jpg')} >
          </Avatar>}
        bottomDivider={true}
      />
      </ScrollView >

      <KeyboardAvoidingView behavior="padding" enabled>

        <View style={{ flexDirection: "row" }}>
          <Input
            containerStyle={{ marginBottom: 5 }}
            placeholder={"Répondre \n"}
            multiline={true}
            onChangeText={(text) => setTexte(text)}
          />
        </View>

        <Button
          icon={
            <Icon
              name="send-o"
              size={20}
              color="#ffffff"
              style={{margin: 5}}
            />
              }
            title="Send"
            buttonStyle={{ backgroundColor: "#FFD15C", marginBottom: 5 }}
            type="solid"
         
            onPress={async () => {
              // var data = await fetch(`http://${IPmaison}:3000/mailbox-write`, {
              //   method: 'POST',
              //   headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
              //   body: `Texte=${Texte}&token=${token}&NomCaviste=${nomCaviste}&NomVigneron=${nomVigneron}`
              //   })
              // var body = await data.json()
              // console.log("RESPONSE MAIL WRITE-V", body)
              setNomVigneron()
              setResponse()
              }}/>
      </KeyboardAvoidingView>

    </View>
  );
}}


function mapStateToProps(state){
  console.log("MESSAGE ENVOYE MTP", state)
  return {token: state.token, userstatus : state.userstatus, message: state.message}
}

export default connect(
  mapStateToProps,
  null
)(MailreadC);