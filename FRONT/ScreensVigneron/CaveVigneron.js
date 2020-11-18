import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { Card, Overlay } from 'react-native-elements';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import { withNavigationFocus } from 'react-navigation';

function CaveVigneron({ navigation, token, userstatus, isFocused }) {

  var IPecole = "172.17.1.153";

  const [photo, setPhoto] = useState(null)
  const [nom, setNom] = useState()
  const [desc, setDesc] = useState()
  const [couleur, setCouleur] = useState()
  const [AOC, setAOC] = useState()
  const [cepage, setCepage] = useState()
  const [millesime, setMillesime] = useState()

  const [isVisible, setIsVisible] = useState(false);

  const [listeVin, setlisteVin] = useState([])
  const [state, setState] = useState(false)

  useEffect(() => {

    async function loadData() {

      if (userstatus == "Vigneron") {

        var rawResponse = await fetch(`http://${IPecole}:3000/macave/${token}`);
        var response = await rawResponse.json();
        if (response.result == true) {
          var cave = response.cave
          setlisteVin(cave)
        } else {
          setPopup(true)
        }
      }
    }
    loadData()
  }, [state]);

  // SUPPRIMER UNE REF
  var handleDeleteRef = async (nom) => {
    setlisteVin(listeVin.filter(object => object.nom != nom))
    setState(!state);
  }

  // MAP BOUTEILLES CAVE
  const cardVin = listeVin.map((vin, i) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsVisible(true);
          setNom(vin.Nom);
          setAOC(vin.AOC);
          setCouleur(vin.Couleur)
          setCepage(vin.Cepage);
          setDesc(vin.Desc);
          setPhoto(vin.Photo);
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Card
            key={i}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Image source={{ uri: vin.Photo }} style={{ margin: 10, width: 250, height: 250 }} />

            <Text style={{ fontWeight: 'bold', margin: 10 }}>
              {vin.Nom}
            </Text>
            <Text style={{ marginLeft: 10 }}>
              {vin.Millesime}
            </Text>
            <Text style={{ marginLeft: 10 }}>
              {vin.AOC}
            </Text>
            <Text style={{ marginLeft: 10, marginBottom: 10 }}>
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
          <ScrollView containerStyle={{ borderRadius: 30 }}>
            <Card style={{ flex: 0.5, width: 100, height: 100, borderRadius: 15 }}>

              <View style={{ justifyContent: 'center' }}>
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Image source={{ uri: photo }} style={{ margin: 10, width: 200, height: 200 }} />
                </View>

                <Text style={{ fontWeight: 'bold', margin: 10 }}>
                  {nom}
                </Text>
                <Text style={{ marginLeft: 10 }}>
                  {millesime}
                </Text>
                <Text style={{ marginLeft: 10 }}>
                  {AOC}
                </Text>
                <Text style={{ marginLeft: 10, marginBottom: 15 }}>
                  {cepage}
                </Text>

                <Text style={{ marginLeft: 10, color: '#9D2A29' }}>
                  Couleur
                  </Text>
                <Text style={{ marginLeft: 10, marginBottom: 15 }}>
                  {couleur}
                </Text>
                <Text style={{ marginLeft: 10, color: '#9D2A29' }}>
                  Description
                  </Text>
                <Text style={{ marginLeft: 10 }}>
                  {desc}
                </Text>
              </View>
            </Card>
          </ScrollView>

          <TouchableOpacity
            onPress={async () => {
              setIsVisible(false);
              setState(true);
              await fetch(`http://${IPecole}:3000/delete-ref/${nom}`, {
                method: 'DELETE'
              });
              handleDeleteRef(nom)
            }}
            style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text
              style={{ color: '#DF2F2F', marginTop: 15, marginBottom: 15, }}>Supprimer la référence</Text>
          </TouchableOpacity>

        </Overlay>
      </View>
    )
  }

  // AFFICHAGE FAVORIS VIDE
  if (cardVin.length == 0 && userstatus == "Vigneron") {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCDF23' }}>
        <View style={styles.popup}>
          <View style={{ alignItems: "center", backgroundColor: "#FFFFFF" }}>
            < Image source={require('../assets/cavevide.png')} style={{ width: 300, height: 300 }}></Image>
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

  // CAVE VIGNERON
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
    marginTop: 0,
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
  },
});

var focusedAdd = withNavigationFocus(CaveVigneron)

function mapStateToProps(state) {
  return { token: state.token, userstatus: state.userstatus }
}

export default connect(
  mapStateToProps,
  null,
)(focusedAdd);
