import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Header, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import MailreadV from '../ScreensVigneron/MailreadV';
import URL from '../URL'

function MailreadC({ navigation, token, userstatus, message }) {

  const [Texte, setTexte] = useState();
  const [photo, setPhoto] = useState();
  const [nomVigneron, setNomVigneron] = useState();
  const [nomCaviste, setNomCaviste] = useState();
  const [newMsg, setNewMsg] = useState([]);
  const [placeholderMsg, setPalceholderMsg] = useState();

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(`${URL}/mailbox-read/${token}`);
      var response = await rawResponse.json();

      if (response.result == true) {
        setNomCaviste(response.Caviste.Nom)
        setPhoto(response.Caviste.Photo)
      }
    }
    loadData()
  }, []);


  // MAP MESSAGE 
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
          source={{ uri: photo }}>
        </Avatar>
        }
      />
    )
  })

  //REDIRECTON SCREN VIGNERON
  if (userstatus == "Vigneron") {
    return (<MailreadV navigation={navigation} token={token} userstatus={userstatus} message={message} />)
  } else {

  // AFFICHAGE MESSAGE CAVISITE
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
            }} />}
          centerComponent={<Image source={require('../assets/mescontacts.png')} style={{ width: 120, height: 100, marginTop: -20 }}></Image>}

          containerStyle={{
            backgroundColor: '#FFFFFF', height: 80
          }}
        />


        <ScrollView style={{ flex: 1, marginTop: 15 }}>
          <ListItem
            title={message.Nom}
            subtitle={message.Texte}
            leftAvatar={
              <Avatar rounded
                source={{ uri: message.Photo }} >
              </Avatar>}
            bottomDivider={true}
          />
          {MsgSend}
        </ScrollView >

        <KeyboardAvoidingView behavior="padding" enabled>

          <View style={{ flexDirection: "row" }}>
            <Input
              containerStyle={{ marginBottom: 5 }}
              placeholder={"R??pondre \n"}
              multiline={true}
              onChangeText={(text) => {
                setTexte(text);
                setNomVigneron(message.Nom);
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
                style={{ margin: 5 }}
              />
            }
            title="Send"
            buttonStyle={{ backgroundColor: "#FFD15C", marginBottom: 5 }}
            type="solid"

            onPress={async () => {
              var data = await fetch(`http://${IPecole}:3000/mailbox-write`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `Texte=${Texte}&NomCaviste=${nomCaviste}&NomVigneron=${nomVigneron}&PhotoFF=${photo}&token=${token}`
              })
              setNewMsg([...newMsg, Texte])
              setPalceholderMsg("")
            }} />
        </KeyboardAvoidingView>
      </View>
    );
  }
}


function mapStateToProps(state) {
  return { token: state.token, userstatus: state.userstatus, message: state.message.message }
}

export default connect(
  mapStateToProps,
  null
)(MailreadC);