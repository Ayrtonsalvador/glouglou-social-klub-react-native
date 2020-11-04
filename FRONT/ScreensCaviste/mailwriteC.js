import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import MailwriteV from '../ScreensVigneron/MailwriteV';


function MailwriteC({ navigation, pseudo, token, Nom , userstatus}) {
  
  var IPmaison = "192.168.1.22";
  var IPecole = "172.17.1.159";

  const [Texte, setTexte] = useState();
  const [nomVigneron, setNomVigneron] = useState();

  // useEffect(() => {
  //   async function loadData() {
  //     var rawResponse = await fetch(`http://172.17.1.159:3000/mailbox-write-getuser?token=${token}`);
  //     var response = await rawResponse.json();
  //     console.log("MAIL WRITE RESPONSE", response)

  //     if (response.result == true) {
  //       setNom(response.user.Nom)
  //     }
  //   }     
  //   loadData()
  //   }, []);


  if (userstatus == "Vigneron") {
    return (<MailwriteV navigation={navigation} token={token} userstatus={userstatus}/>)
  } else {

  return (
    <View style={{ flex: 1 }}>

      <Header
        containerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCDF23' }}
        centerComponent={{ text: 'REDIGER NOUVEAU MESSAGE', marginTop: 30 }}
      >
        <Image source={require('../assets/MainGlouGlou.png')} style={{ width: 20, height: 30 }}></Image>
      </Header>
      <Button
        title="Go back to Mailbox"
        type="solid"
        buttonStyle={{ backgroundColor: '#FF9900' }}
        onPress={() => {
          navigation.navigate('Main');
        }}>

      </Button>
 
      <ScrollView style={{ flex: 1, marginTop: 20 }}>
        
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

        <View style={{ flexDirection: "column" }}>

        <Input
          containerStyle={{ marginBottom: 5 }}
            placeholder='Destinataire'
            onChangeText={(text) => setNomVigneron(text)}
            value={nomVigneron} 
        />

          <Input
            containerStyle={{ marginBottom: 5 }}
            placeholder={"Votre message \n"}
            multiline={true}
            onChangeText={(text) => {
                setTexte(text);      }}
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
            title=" Send"
            buttonStyle={{ backgroundColor: "#FFD15C", marginBottom: 5 }}
            type="solid"
         
            onPress={async () => {
             
              var data = await fetch(`http://${IPecole}:3000/mailbox-write`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: `Texte=${Texte}&token=${token}&NomVigneron=${nomVigneron}&Nom=${Nom}`
                })
              var body = await data.json()
              setNomVigneron('');
              setTexte('');
              } 
          
            } // onPress

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

function mapStateToProps(state) {
  console.log("state", state.token)
  return { token: state.token, userstatus : state.userstatus}
  
}

export default connect(
  mapStateToProps,
  null
)(MailwriteC);