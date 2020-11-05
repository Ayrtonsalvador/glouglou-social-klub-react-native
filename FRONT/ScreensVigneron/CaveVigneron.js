import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { ListItem, Input, Header, Card, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import { withNavigationFocus } from 'react-navigation';

function CaveVigneron({ navigation, token, userstatus, isFocused }) {

  var IPecole = "172.17.1.46";
  var IPmaison = "192.168.1.22";

  const [photo, setPhoto] = useState(null)
  const [nom, setNom] = useState("Nom")
  const [domaine, setDomaine] = useState("Nom de domaine")
  const [ville, setVille] = useState("Ville")
  const [region, setRegion] = useState("Région")
  const [desc, setDesc] = useState("Description")
  const [couleur, setCouleur] = useState("Couleur")
  const [AOC, setAOC] = useState("AOC")
  const [cepage, setCepage] = useState("Cépage")
  const [millesime, setMillesime] = useState("Millesime")

  const [popup, setPopup] = useState(false)
  const [disabled, setDisabled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const [listeVin, setlisteVin] = useState([])
  const [listeModal, setlisteModal] = useState([])
  const [getIndex, setGetIndex] = useState()
  const [state, setState] = useState(false)

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(`http://${IPmaison}:3000/macave?token=${token}`);
      var response = await rawResponse.json();
      console.log("GET INFOS BOUTEILLE", response.cave)
      // console.log("CAVE", response.cave);
      if (response.result == true) {
        var cave = response.cave
        setlisteVin(cave)
      } else {
        // CAVE VIDE
        setPopup(true)
      }
    }
    loadData()
  }, [state]);

  if(isFocused && !state){
    console.log('FOCUSED');
    setState(true)
  }
  if(!isFocused && state) {
    console.log('IS NOT FOCUSED');
    setState(false)
  }

  // SUPPRIMER UNE REF
  var handleDeleteRef = async (nom) => {
    setlisteVin(listeVin.filter(object => object.nom != nom))
    setState(!state);
  }

  // Map Vins
  const cardVin = listeVin.map((vin, i) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsVisible(true);
          setNom(vin.Nom);
          setAOC(vin.AOC);
          setCepage(vin.Cepage);
          setDesc(vin.desc);
          setPhoto(vin.Photo);
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Card
            key={i}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >

            <View
              style={{ justifyContent: 'center', alignItems: 'center' }}
            >
              <Image source={{ uri: vin.Photo }} style={{ margin: 10, width: 150, height: 150 }} />
            </View>

            <Text>
              {vin.Nom}
            </Text>
            <Text>
              {vin.Millesime}
            </Text>
            <Text>
              {vin.AOC}
            </Text>
            <Text>
              {vin.Cepage}
            </Text>
          </Card>
        </View>
      </TouchableOpacity>
    )
  })


  // MODAL AFFICHAGE VIN
  if (isVisible) {
    return (
      <View>
        <Overlay
          onBackdropPress={() => { setIsVisible(false) }}
        >
          <ScrollView>
            <Card style={{ flex: 0.5, width: 100, height: 100 }}>

              <View style={{ justifyContent: 'center' }}>
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Image source={{ uri: photo }} style={{ margin: 10, width: 150, height: 150 }} />
                </View>

                <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                  <Text style={{ marginBottom: 10, fontWeight: 'bold' }}>
                    {nom}
                  </Text>
                  <Text style={{ marginBottom: 10, marginLeft: 5 }}>
                    {cepage}
                  </Text>
                </View>
                <Text style={{ marginBottom: 10 }}>
                  {AOC}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                  {millesime}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                  {cepage}
                </Text>

                <Text style={{ marginBottom: 10, color: '#9D2A29' }}>
                  Couleur
                  </Text>
                <Text style={{ marginBottom: 10 }}>
                  {couleur}
                </Text>
                <Text style={{ marginBottom: 10, color: '#9D2A29' }}>
                  Description
                  </Text>
                <Text style={{ marginBottom: 10 }}>
                  {desc}
                </Text>
              </View>
            </Card>
          </ScrollView>

          <TouchableOpacity
            onPress={async () => {
              setIsVisible(false);
              setState(true);
              await fetch(`http://${IPmaison}:3000/delete-ref/${nom}`, {
                method: 'DELETE'
              });
              handleDeleteRef(nom)
              // console.log("DELETED FRONT", nom)
            }}
            style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text
              style={{ color: '#DF2F2F' }}>Supprimer la référence</Text>
          </TouchableOpacity>

        </Overlay>
      </View>
    )
  }

  // POPUP FAVORIS VIDE
  if (popup) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCDF23' }}>
        <View style={styles.popup}>
          <View style={{ alignItems: "center", backgroundColor: "#FFFFFF" }}>
            < Image source={require('../assets/cavevide.png')} style={{ width: 120, height: 80 }}></Image>
          </View>
          <TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate('Favoris');
              }}
              style={{ color: '#9D2A29', marginTop: 60 }}>Ajouter un vin à ma cave</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }

  // Cave vigneron
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Image source={require('../assets/macave.png')} style={{ width: 120, height: 80 }}></Image>

      <View style={styles.container}>

        <View style={styles.box1}>

          <ScrollView>
            {cardVin}
          </ScrollView>

        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexWrap: 'wrap',
    flexDirection: 'row'
  },
  box1: {
    borderWidth: 0,
    marginBottom: 10,
    borderColor: '#808080',
    marginTop: 50,
    elevation: 10
  },
  img: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  popup: {
    width: 300,
    height: 400,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // fontFamily: "Gothic A1",
  },
});

var focusedAdd = withNavigationFocus(CaveVigneron)

function mapStateToProps(state) {
  // console.log("TOKEN CAVE", state.token)
  return { token: state.token, userstatus: state.userstatus }
}

export default connect(
  mapStateToProps,
  null,
)(focusedAdd);
