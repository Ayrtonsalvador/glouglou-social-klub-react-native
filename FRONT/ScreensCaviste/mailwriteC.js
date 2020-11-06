import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import MailwriteV from '../ScreensVigneron/MailwriteV';


function MailwriteC({ navigation, token, userstatus, message }) {

  var IPecole = "192.168.1.22";

  const [Texte, setTexte] = useState();
  const [photo, setPhoto] = useState();
  const [nomCaviste, setNomCaviste] = useState();
  const [nomVigneron, setNomVigneron] = useState();
  const [send, setSend] = useState(false);
  const [newMsg, setNewMsg] = useState([]);
  const [placeholderTo, setPalceholderTo] = useState();
  const [placeholderMsg, setPalceholderMsg] = useState();
  const [ok, setOk] = useState(true);

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(`http://${IPecole}:3000/mailbox-write?token=${token}`);
      var response = await rawResponse.json();
      // console.log("RESPONSE WRITE C", response)

      if (response.result == true) {
        setNomCaviste(response.Caviste.Nom)
        setPhoto(response.Caviste.Photo)
        // console.log("NOM Cav", response.Caviste.Nom)
      }
    }
    loadData()
  }, []);

  if(message != null && ok){
    setPalceholderTo(message)
    setOk(false);
  }

  if (userstatus == "Vigneron") {
    return (<MailwriteV navigation={navigation} token={token} userstatus={userstatus} />)

  } else {

    var MsgSend = newMsg.map((msg, i) => {
      return (
        // <View>
        // <Text style={{ marginBottom: 10, fontWeight: '500' }}>Envoyé à:</Text>
        <ListItem
          title={nomVigneron}
          subtitle={msg}
          style={{ backgroundColor: '#DEDDDD', borderRadius: 15 }}
          leftAvatar={<Avatar
            rounded
            source={{ uri: photo }}>
          </Avatar>
          }
        />
        // </View>
      )
    })

    return (
      <View style={{ flex: 1 }}>

        <View style={{ alignItems: "center", flexDirection: "row", justifyContent: "space-around" }}>
          <Icon
            name="arrow-circle-o-left"
            size={20}
            color="#FFD15C"
            buttonStyle={{ backgroundColor: '#FF9900' }}
            onPress={() => {
              navigation.navigate('Main');
            }} />
          <Image source={require('../assets/mescontacts.png')} style={{ width: 120, height: 80 }}></Image>
        </View>

        <ScrollView style={{ flex: 1, marginTop: 20 }}>
          {MsgSend}
        </ScrollView >

        <KeyboardAvoidingView behavior="padding" enabled>

          <View style={{ flexDirection: "column" }}>

            <Input
              containerStyle={{ marginBottom: 5 }}
              placeholder="A :"
              onChangeText={(text) =>
                setNomVigneron(text)
              }
              value={placeholderTo}
            />

            <Input
              containerStyle={{ marginBottom: 5 }}
              placeholder={"Votre message \n"}
              multiline={true}
              onChangeText={(text) => {
                setTexte(text);
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
              />
            }
            title="Send"
            buttonStyle={{ backgroundColor: "#FFD15C", marginBottom: 5 }}
            type="solid"

            onPress={async () => {

              setSend(true);
              setNewMsg([...newMsg, Texte])

              var data = await fetch(`http://${IPecole}:3000/mailbox-write`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `Texte=${Texte}&NomCaviste=${nomCaviste}&NomVigneron=${nomVigneron}&PhotoFF=${photo}&token=${token}`
              })
              var body = await data.json()
              // console.log("RESPONSE MAIL WRITE-V", body)
              // console.log("Nom Caviste", nomCaviste)
              // console.log("Nom Caviste", nomVigneron)
              // console.log("Texte envoyé", Texte)
            }} />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  console.log("STATE WRITE C", state.message)
  return { token: state.token, userstatus: state.userstatus, message: state.message }

}

export default connect(
  mapStateToProps,
  null
)(MailwriteC);