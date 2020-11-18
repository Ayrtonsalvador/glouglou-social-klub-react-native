import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

function MailreadV({ navigation, userstatus, token, message}) {

  var IPecole = "172.17.1.153";

  const [Texte, setTexte] = useState();
  const [photo, setPhoto] = useState();
  const [nomVigneron, setNomVigneron] = useState();
  const [nomCaviste, setNomCaviste] = useState();

  const [newMsg, setNewMsg] = useState([]); 
  const [placeholderMsg, setPalceholderMsg] = useState();

    useEffect(() => {
      async function loadData() {
        var rawResponse = await fetch(`http://${IPecole}:3000/mailbox-main-v/${token}`);
        var response = await rawResponse.json();
  
        if (response.result == true) {
          setNomVigneron(response.Vigneron.Nom)
          setPhoto(response.Vigneron.Photo)
        }
      }
      loadData()
    }, []);

    var MsgSend = newMsg.map((msg, i) => {
      return (
        <ListItem
          key={i}
          title={nomVigneron}
          subtitle={msg}
          style={{ backgroundColor: '#DEDDDD', borderRadius: 15 }}
          bottomDivider={true}
          leftAvatar={<Avatar
            rounded
            source={{uri: photo}} >
          </Avatar>
          }
        />
      )
    })

  return (
    <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>

      <Header 
       leftComponent={<Icon
        name="arrow-circle-o-left"
        size={30}
        color="#FFD15C"
        buttonStyle={{ backgroundColor: '#FF9900' }}
        onPress={() => {
          navigation.navigate('Main');
        }}/>}
          centerComponent={<Image source={require('../assets/mescontacts.png')} style={{ width: 120, height: 100, marginTop: -20 }}></Image>}
             containerStyle={{
              backgroundColor: '#FFFFFF', height: 80}}
             />

      <ScrollView style={{ flex: 1, marginTop: 15 }}>
      <ListItem
        title={message.Nom}
        subtitle={message.Texte}
        leftAvatar={
          <Avatar rounded
            source={{uri: message.Photo}} >
          </Avatar>}
        bottomDivider={true}
      />
      {MsgSend}
      </ScrollView >

      <KeyboardAvoidingView behavior="padding" enabled>

        <View style={{ flexDirection: "row" }}>
          <Input
            containerStyle={{ marginBottom: 5 }}
            placeholder={"Répondre \n"}
            multiline={true}
            onChangeText={(text) => {
              setTexte(text);
              setNomCaviste(message.Nom);
            }}
            value={placeholderMsg}
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
              var data = await fetch(`http://${IPecole}:3000/mailbox-write-v`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `Texte=${Texte}&NomCaviste=${nomCaviste}&NomVigneron=${nomVigneron}&PhotoFF=${photo}&token=${token}`
                })

              setNewMsg([...newMsg, Texte])
              setPalceholderMsg("")
              }}/>
      </KeyboardAvoidingView>
    </View>
  );
}

function mapStateToProps(state) {
  return { token: state.token, userstatus: state.userstatus, message: state.message.message }
}

export default connect(
  mapStateToProps,
  null,
)(MailreadV);