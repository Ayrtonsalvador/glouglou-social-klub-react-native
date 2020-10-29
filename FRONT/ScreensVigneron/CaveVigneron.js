import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, KeyboardAvoidingView, Overlay } from "react-native";
import { ListItem, Input, Header, Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

function CaveVigneron() {

  const [photo, setPhoto] = useState('')
  const [nom, setNom] = useState("Nom")
  const [domaine, setDomaine] = useState("Nom de domaine")
  const [ville, setVille] = useState("Ville")
  const [region, setRegion] = useState("Région")
  const [desc, setDesc] = useState("Description")
  const [couleur, setCouleur] = useState("Couleur")
  const [AOC, setAOC] = useState("AOC")
  const [cepage, setCepage] = useState("Cépage")
  const [millesime, setMillesime] = useState("Millesime")
  const [annee, setAnne] = useState("Année")

  const [image, setImage] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    async function loadData() {
      console.log("PROFIL")
      var rawResponse = await fetch(`http://192.168.1.22:3000/macave?token=${token}`);
      var response = await rawResponse.json();
      // console.log("GET INFOS VIGNERON", response)
      // console.log("Vigneron", response.user)

      if(response.result == true){
        setImage(response.user.Photo)
        setNom(response.user.Nom)
        setAOC(response.user.AOC)
        setCepage(response.user.Cepage)
        setMillesime(response.user.Millesime)
        setDesc(response.user.Desc)
      } 
    }
    loadData()
  }, []);


  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('../assets/macave.png')} style={{ width: 120, height: 80 }}></Image>

      <View style={styles.container}>

        <Card>
          <Card.Image source={require('../assets/imgdefault.png')} />

          <Text style={{ marginBottom: 10 }}>
            {nom}
          </Text>
          <Text style={{ marginBottom: 10}}>
            {annee}
          </Text>
          <Text style={{ marginBottom: 10}}>
            AOC {AOC}
          </Text>
          <Text style={{ marginBottom: 10}}>
            {domaine}
          </Text>

          <Text style={{ marginBottom: 10, color: '#9D2A29' }}>
            Couleur
          </Text>
          <Text style={{ marginBottom: 10}}>
            {couleur}
          </Text>
          <Text style={{ marginBottom: 10, color: '#9D2A29' }}>
            Description
          </Text>
          <Text style={{ marginBottom: 10}}>
            {desc}
          </Text>

          <Button
            icon={<Icon name='code' color='#ffffff' />}
            buttonStyle={{ borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0 }}
            title='VIEW NOW' />
        </Card>

        <Overlay></Overlay>

        <TouchableOpacity
                onPress={() => {
                  navigation.navigate('FirstScreen');
                }}
              >
                <Text
                  style={{ color: '#DF2F2F' }}>Supprimer la référence</Text>
              </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(
  mapStateToProps,
  null
)(CaveVigneron);

//POP-UP CAVE VIDE
// export default function CaveScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCDF23' }}>
//       <View style={styles.box}>
//         <Text>Votre cave est vide!</Text>
//         <Icon
//           name="glass"
//           size={100}
//           color="#000000"
//         />
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FBDF4C',
//     // fontFamily: "Gothic A1",
//   },
//   box: {
//     width: 300,
//     height: 500,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 15,
//     // fontFamily: "Gothic A1",
//   },
// });