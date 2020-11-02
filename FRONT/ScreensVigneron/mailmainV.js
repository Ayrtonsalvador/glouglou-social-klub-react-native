import React, { useEffect, useState } from 'react';
import { View, ScrollView, KeyboardAvoidingView, Image } from 'react-native';
import { Button, ListItem, Input, Text, Header, Avatar, Accessory, BadgedAvatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';
import userstatus from '../reducers/userstatus';

function mailmainV({ navigation, pseudo, token, userstatus, MessagesR }) {

  const [listMessages, setListMessages] = useState([]);
  const [Nom, setNom] = useState();
  const [Texte, setTexte] = useState();
  const [nomVigneron, setNomVigneron] = useState();

useEffect(() => {
  async function loadData() {
    var rawResponse = await fetch(`http://172.17.1.159:3000/mailbox-main-v?token=${token}&msgVigneron=${MessagesR}`);
    var response = await rawResponse.json();

    if(response.result == true){
      setListMessages(response.msgVigneron)
    setNomVigneron(response.Vigneron.Nom)
    
    console.log("NOM", nomVigneron)
  }
    
  } 
  loadData()
}, []);

 var listMessagesItem = listMessages.map((msg, i) => {
      
          return <ListItem
              title={msg.Texte}
              subtitle={nomVigneron}
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
          onPress={() => {navigation.navigate('mailwritev');}} />
</Header>
<ScrollView style={{ flex: 1}}>
{listMessagesItem}
</ScrollView>
</View>
  )
 }

function mapStateToProps(state) {
  // console.log("state", state.token)
  return { token: state.token, userstatus: state.userstatus}
  
}

export default connect(
  mapStateToProps,
  null
)(mailmainV);





//     <View style={{ flex: 1 }}>

//       <Header
//         containerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCDF23' }}
//         centerComponent={{ text: 'MES CONTACTS GLOUGLOU', marginTop: 30 }}
//       >
//         <Image source={require('../assets/MainGlouGlou.png')} style={{ width: 20, height: 30 }}></Image>
//       </Header>
//       <Button
//         title="Go to message Jean pierre"
//         type="solid"
//         buttonStyle={{ backgroundColor: '#FF9900' }}
//         onPress={() => {
//           navigation.navigate('MessageCaviste');
//         }}>

//       </Button>
//       {/* {listMessagesItem} */}
//       {/* <ScrollView style={{ flex: 1, marginTop: 20 }}>
//         {/* <ListItem
//           title="Jean Pierre"
//           subtitle="Merci beaucoup"
//           style={{ backgroundColor: '#DEDDDD', borderRadius: 15 }}
//           leftAvatar={
//             <Avatar
//               rounded
//               source={require('../assets/vigneron.jpg')} >
//               <Accessory />
//             </Avatar>
//           }
//         /> */}


//         {/* <ListItem
//           title="La GlouGlou Team"
//           subtitle="Bienvenue au Club !"
//           style={{ backgroundColor: '#DEDDDD', borderRadius: 15 }}
//           leftAvatar={ <Avatar
//                                rounded
//                                 source={require('../assets/GGSC.png')} >
//                        <Accessory />
//                       </Avatar>
//                     }
//         /> */}

//       </ScrollView >

//       <KeyboardAvoidingView behavior="padding" enabled>

//         <View style={{ flexDirection: "column" }}>

//         <Input
//           containerStyle={{ marginBottom: 5 }}
//             placeholder='Destinataire'
//             onChangeText={(text) => setNomVigneron(text)}
//             value={nomVigneron} 
//         />

//           {/* <Button
//             buttonStyle={{ backgroundColor: "#FFD15C", marginBottom: 150 }}
//             type="solid"
//             title="Valider"
//             icon={
//               <Icon
//                 name='book'
//                 size={20}
//                 color="#ffffff"/>}
//           /> */}

//           <Input
//             containerStyle={{ marginBottom: 5 }}
//             placeholder={"Votre message \n"}
//             multiline={true}
//             onChangeText={(text) => {
//               setTexte(text);
//               setListMessages(Texte)
//               console.log("LIST MESSAGES",ListMessages, Texte)
//             }}
//             value={Texte}
//           />
          
          
//         </View>
//         <Button
//           icon={
//             <Icon
//               name="envelope-o"
//               size={20}
//               color="#ffffff"
//             />
//               }
//             title="Send"
//             buttonStyle={{ backgroundColor: "#FFD15C", marginBottom: 5 }}
//             type="solid"
         
           

        // />

//  */}

//         <Button
//           buttonStyle={{ backgroundColor: "#FFD15C", marginBottom: 5 }}
//           type="solid"
//           title="Contactez-nous"
//           icon={
//             <Icon
//               name='heart'
//               size={20}
//               color="#ffffff"
//             />
//           }
//         />
//       </KeyboardAvoidingView>

//     </View>