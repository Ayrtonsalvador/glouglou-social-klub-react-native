import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import userstatus from '../reducers/userstatus';

function MailreadV({ navigation, userstatus, token, }) {

  var IPecole = "172.17.1.153";

  const [listMessage, setListMessage] = useState([]);
  const [Texte, setTexte] = useState();
  const [selectedId, setSelectedId] = useState(null);
  //  console.log("CA MARCHE", clickedMsg)

  useEffect(() => { async () => { var data = await fetch(`http://${IPecole}:3000/mailbox-read-v`)
      var body = await data.json()
      console.log("RESPONSE", body)}  
  }, [listMessage]);

  var listMessageItem = listMessage.map((messageData, i) => {

    var msg = messageData.message


    return <ListItem
    title={msg}
    subtitle={messageData}
    leftAvatar={
              <Avatar rounded
                       source={require('../assets/vigneron.jpg')} >
              <Accessory />
              </Avatar>}
              bottomDivider={true}
    
  />
  
  //     (<ListItem
  //       title={msg.nom}
  //       subtitle="Parfait et toi ?"
  //       style={{ backgroundColor: '#DEDDDD', borderRadius: 15 }}
  //       leftAvatar={
  //         <Avatar
  //           rounded
  //           source={{
  //             uri:
  //               'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg',
  //           }}
  //           badge={3}
  //         >
  //           <Accessory />
  //         </Avatar>
  //       }
  //       bottomDivider={true}
  //     />)
  });

  return (
    <View style={{ flex: 1 , backgroundColor: "#FFFFFF"}}>

      <View style={{ alignItems: "center" }}>
        < Image source={require('../assets/mescontacts.png')} style={{ width: 120, height: 80 }}></Image>
      </View>

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
      {listMessageItem}
      <ScrollView style={{ flex: 1, marginTop: 15 }}>
        {/* <ListItem
          title="Jean Pierre"
          subtitle="Merci beaucoup"
          style={{ backgroundColor: '#DEDDDD', borderRadius: 15 }}
          leftAvatar={
            <Avatar
              rounded
              source={require('../assets/vigneron.jpg')} >
              <Accessory />
            </Avatar>
          }
        /> */}
              

        {/* <ListItem
          title="La GlouGlou Team"
          subtitle="Bienvenue au Club !"
          style={{ backgroundColor: '#DEDDDD', borderRadius: 15 }}
          leftAvatar={ <Avatar
                               rounded
                                source={require('../assets/GGSC.png')} >
                       <Accessory />
                      </Avatar>
                    }
        /> */}
      
      </ScrollView >

      <KeyboardAvoidingView behavior="padding" enabled>

        <View style={{ flexDirection: "row" }}>
          <Input
            containerStyle={{ marginBottom: 5 }}
            placeholder='Your message'
            onChangeText={(text) => setTexte(text)}
            value={Texte}
          />
          <Input
            containerStyle={{ marginBottom: 5 }}
            placeholder='To:'
            onChangeText={(text) => setTexte(text)}
            value={Texte}
          />
        </View>
        <Button
          icon={
            <Icon
              name="envelope-o"
              size={20}
              color="#ffffff"
            />
          }
          title="Send"
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
          title="Contactez-nous"
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
}

function mapStateToProps(state){
  return {token: state.token, userstatus: state.userstatus}
}

export default connect(
  mapStateToProps,
  null
)(MailreadV);