import React, { useState } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { Button, Input, Header, Icon, Avatar } from 'react-native-elements';
//import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

function ProfilVigneron({ navigation }) {

  const [uploaded, setUploaded] = useState('plus')
  const [photo, setPhoto] = useState('')
  const [nom, setNom] = useState('')
  const [domaine, setDomaine] = useState('')
  const [ville, setVille] = useState('')
  const [region, setRegion] = useState('')
  const [desc, setDesc] = useState('')

  // Demander accès à la bibliothèque photo


  return (

  <View style={{ flex: 1 }}>

      {/* <Header
    containerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FCDF23' }}
    centerComponent={{ text: 'AJOUTER UN NOUVEAU VIN', marginTop: 30 }}
   >
    <Image source={require('../assets/MainGlouGlou.png')} style={{ width: 20, height: 30 }}></Image>
   </Header> */}

    <View style={styles.container}>

      <KeyboardAvoidingView behavior="position" enabled>

      <View style={styles.box1}>

        <Image source={require('../assets/monprofil.png')} style={{ width: 120, height: 80 }}></Image>

        <Avatar
          rounded

          icon={{ name: 'plus', type: 'font-awesome' }}
          size="large"
          overlayContainerStyle={{ backgroundColor: '#FFAE34' }}
          containerStyle={{ marginTop: 15}}
        >
        </Avatar>

        <TouchableOpacity> 
             <Text style={{color:'#AAAAAA', marginTop: 20}}>Changer ma photo</Text>
         </TouchableOpacity>

        <View style={styles.box2}>
          <Input
            containerStyle={{ marginBottom: 20, width: '80%' }}
            inputStyle={{ marginLeft: 10 }}
            placeholder='Nom'
            errorStyle={{ color: 'red' }}
            errorMessage=''
            onChangeText={(val) => setNom(val)}
          />
          <Input
            containerStyle={{ marginBottom: 20, width: '80%' }}
            inputStyle={{ marginLeft: 10 }}
            placeholder='Nom de domaine'
            errorStyle={{ color: 'red' }}
            errorMessage=''
            onChangeText={(val) => setDomaine(val)}
          />
          <Input
            containerStyle={{ marginBottom: 20, width: '80%' }}
            inputStyle={{ marginLeft: 10 }}
            placeholder='Ville'
            errorStyle={{ color: 'red' }}
            errorMessage=''
            onChangeText={(val) => setVille(val)}
          />
          <Input
            containerStyle={{ marginBottom: 20, width: '80%' }}
            inputStyle={{ marginLeft: 10 }}
            placeholder='Région'
            errorStyle={{ color: 'red' }}
            errorMessage=''
            onChangeText={(val) => setRegion(val)}
          />
          <Input
            containerStyle={{ marginBottom: 20, width: '80%' }}
            placeholder={"Description \n"}
            multiline={true}
            inputStyle={{ marginLeft: 10 }}
            errorStyle={{ color: 'red' }}
            errorMessage=''
            onChangeText={(val) => setDesc(val)}
             
          />
         
              
            
         
            <Button onPress={async() => { 
              
              const data = await fetch("http://172.17.1.159:3000/info-update", {
                method: 'POST',
                headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                body: `photo=${photo}&nom=${nom}&domaine=${domaine}&ville=${ville}&region=${region}&desc=${desc}`
                })
              var body = await data.json()
              setUploaded("check-circle"); 
              
            }}
              Icon={{ name: 'cog', type: 'font-awesome', color: '#AAAAAA' }}
              type='font-awesome'
              title="Changer mes paramètres"
             /> 

         
            
         
         <TouchableOpacity> 
             <Text style={{color:'#9D2A29'}}>Déconnexion</Text>
         </TouchableOpacity>


        </View>

      </View>

      </KeyboardAvoidingView>

    </View>

</View>

  )}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // fontFamily: "Gothic A1",
  },
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // fontFamily: "Gothic A1",
  },
  box2: {
    // width: '80%',
    // height: '70%',
    width: 350,
    height: 400,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

function mapStateToProps(state){
  return {token: state.token}
}

export default connect(
  mapStateToProps,
  null
)(ProfilVigneron);
