import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import MailreadV from '../ScreensVigneron/MailreadV';

function MailreadC({ navigation, token, userstatus, message}) {

  var IPecole = "172.17.1.46";

  const [Texte, setTexte] = useState();
  const [texteSent, setTexteSent] = useState();
  const [response, setResponse] = useState();
  const [nomVigneron, setNomVigneron] = useState();
  const [nomCaviste, setNomCaviste] = useState();
  const [send, setSend] = useState();
  const [newMsg, setNewMsg] = useState([]); 
  const [placeholderMsg, setPalceholderMsg] = useState("Répondre \n");

  // Récupérer les messages reçus par le caviste
  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(`http://${IPecole}:3000/mailbox-main?token=${token}`);
      var response = await rawResponse.json();
      // console.log("RESPONSE MAIL READ C", response)

      if (response.result == true) {
        setNomCaviste(response.Caviste.Nom)
      }
    }
    loadData()
  }, []);

    var MsgSend = newMsg.map((msg, i) => {
      return (
        <ListItem
          key={i}
          title={nomCaviste}
          subtitle={msg}
          style={{ backgroundColor: '#DEDDDD', borderRadius: 15 }}
          bottomDivider={true}
          leftAvatar={<Avatar
            rounded
            source={require('../assets/GGSC.png')} >
          </Avatar>
          }
        />
      )
    })

  if (userstatus == "Vigneron") {
    return (<MailreadV navigation={navigation} token={token} userstatus={userstatus} message={message}/>)
  } else {
    
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
        title={message.Nom}
        subtitle={message.Texte}
        leftAvatar={
          <Avatar rounded
            source={require('../assets/vigneron.jpg')} >
          </Avatar>}
        bottomDivider={true}
      />
      {MsgSend}
      </ScrollView >

      <KeyboardAvoidingView behavior="padding" enabled>

        <View style={{ flexDirection: "row" }}>
          <Input
            containerStyle={{ marginBottom: 5 }}
            placeholder={placeholderMsg}
            multiline={true}
            onChangeText={(text) => {
              setTexte(text);
              setNomVigneron(message.Nom);
            }}
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
              var data = await fetch(`http://${IPecole}:3000/mailbox-write`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `Texte=${Texte}&NomCaviste=${nomCaviste}&NomVigneron=${nomVigneron}&token=${token}`
                })
              var body = await data.json()
              setNewMsg([...newMsg, Texte])
              setPalceholderMsg("")
              }}/>
      </KeyboardAvoidingView>
    </View>
  );
}}


function mapStateToProps(state){
  // console.log("MESSAGE STATE", state.message.message)
  return {token: state.token, userstatus : state.userstatus, message: state.message.message}
}

export default connect(
  mapStateToProps,
  null
)(MailreadC);