import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import MailwriteV from '../ScreensVigneron/MailwriteV';
import URL from '../URL'

function MailwriteC({ navigation, token, userstatus, message }) {

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
      var rawResponse = await fetch(`${URL}/mailbox-main/${token}`);
      var response = await rawResponse.json();

      if (response.result == true) {
        setNomCaviste(response.Caviste.Nom)
        setPhoto(response.Caviste.Photo)
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
      )
    })

    return (
      <View style={{ flex: 1 }}>

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

              var data = await fetch(`${URL}/mailbox-write`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `Texte=${Texte}&NomCaviste=${nomCaviste}&NomVigneron=${nomVigneron}&PhotoFF=${photo}&token=${token}`
              })

            }} />
        </KeyboardAvoidingView>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return { token: state.token, userstatus: state.userstatus, message: state.message }
}

export default connect(
  mapStateToProps,
  null
)(MailwriteC);