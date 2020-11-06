import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Picker, TouchableHighlight, Modal } from 'react-native';
import { Button, Card, Badge, Overlay, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux';

import { withNavigationFocus } from 'react-navigation';

import AddVigneron from '../ScreensVigneron/AddVigneron';
// import MailwriteC from './MailwriteC';

function FavoriteCaviste({ navigation, token, userstatus, isFocused, sendMessage, message }) {

  var IPecole = "172.17.1.159";

  const [photo, setPhoto] = useState(null)
  const [nom, setNom] = useState("Nom")
  const [millesime, setMillesime] = useState("Millesime")
  const [cepage, setCepage] = useState("Cépage")
  const [AOC, setAOC] = useState("AOC")
  const [domaine, setDomaine] = useState("Nom de domaine")

  const [region, setRegion] = useState("Région")
  const [desc, setDesc] = useState("Description")
  const [couleur, setCouleur] = useState("Couleur")

  const [nomVi, setNomVi] = useState("Nom Vigneron")
  const [regionVi, setRegionVi] = useState("Région Vigneron")
  const [descVi, setDescVi] = useState("Description Vigneron")
  const [photoVi, setPhotoVi] = useState(null)

  const [isVisible, setIsVisible] = useState(false);

  const [listeVin, setlisteVin] = useState([])
  const [colorText, setColorText] = useState('#FFD15C');
  const [state, setState] = useState(false);

  useEffect(() => {

    async function loadData() {

      if (userstatus == "Caviste") {

        var rawResponse = await fetch(`http://${IPecole}:3000/favoris?token=${token}`);
        var response = await rawResponse.json();

        if (response.result == true) {
          var favoris = response.favCaviste.Favoris;
          setlisteVin(favoris);
          console.log('FAVORIS', favoris);
        }
      }
    }

    loadData()
  }, [state]);

  if (isFocused && !state) {
    setState(true)
  }
  if (!isFocused && state) {
    setState(false)
  }

  const handlePressMessage = () => {
    navigation.navigate('Write')
    setIsVisible(false);
  }

  // SUPPRIMER UNE REF
  var handleDeleteLike = async (nom) => {
    setlisteVin(listeVin.filter(object => object.nom != nom))
    setState(!state);
  }

  // MAP VINS
  const cardVin = listeVin.map((vin, i) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setIsVisible(true);

          setNom(vin.Nom);
          setAOC(vin.AOC);
          setCepage(vin.Cepage);
          setMillesime(vin.Millesime);
          setCouleur(vin.Couleur);
          setDesc(vin.Desc);
          setPhoto(vin.Photo);

          setNomVi(vin.NomVi);
          setRegionVi(vin.regionVi);
          setDescVi(vin.DescVi);
          setPhotoVi(vin.PhotoVi);
        }}>

        <View style={{ flexDirection: "row" }}>
          <Card
            key={i}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Image source={{ uri: vin.Photo }} style={{ margin: 10, width: 250, height: 250, borderRadius: 5 }} />

            <Text style={{ fontWeight: 'bold', margin: 10 }}>
              {vin.Nom}
            </Text>
            <Text style={{ marginLeft: 10 }}>
              {vin.Millesime}
            </Text>
            <Text style={{ marginLeft: 10 }}>
              {vin.AOC}
            </Text>
            <Text style={{ marginLeft: 10, marginBottom: 15 }}>
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
          onBackdropPress={() => {
            setIsVisible(false);
          }}
        >
          <ScrollView containerStyle={{ borderRadius: 30 }}>
            <Card style={{ flex: 0.5, width: 100, height: 100 }}>

              <View style={{ justifyContent: 'center' }}>
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Image source={{ uri: photo }} style={{ margin: 10, width: 200, height: 200, borderRadius: 5 }} />
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
                <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                  <Icon
                    name="ios-heart"
                    size={30}
                    color="#DF2F2F"
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    onPress={async () => {

                      var rawResponse = await fetch(`http://${IPecole}:3000/delete-favoris/${nom}/${token}`, {
                        method: 'DELETE'
                      });
                      var response = await rawResponse.json();
                      console.log("FAVORIS", response.Favoris);
                      handleDeleteLike(nom)
                      setIsVisible(false);
                      setState(!state);
                    }}
                  >
                  </Icon>
                </View>
              </View>
            </Card>
            <Card style={{ flex: 0.5, width: 100, height: 100 }}>
              <View>
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
            <Card>
              <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                <Avatar
                  rounded
                  source={{ uri: photoVi }}
                ></Avatar>
                <Text style={{ margin: 10, color: '#9D2A29', fontWeight: "bold" }}>
                  {nomVi}
                </Text>
              </View>
              <View>
                <Text style={{ margin: 10 }}>
                  {regionVi}
                </Text>
                <Text style={{ margin: 10 }}>
                  {descVi}
                </Text>
                <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                  <Icon
                    name="md-chatboxes"
                    size={30}
                    color={colorText}
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                      sendMessage(nomVi)
                      setIsVisible(false);
                      navigation.navigate('Write')
                    }}>
                  </Icon>
                </View>
              </View>
            </Card>
          </ScrollView>
        </Overlay>
      </View>
    )
  }

  // POPUP FAVORIS VIDE
  if (cardVin.length == 0 && userstatus == "Caviste") {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCDF23' }}>
        <View style={styles.popup}>
          <View style={{ alignItems: "center", backgroundColor: "#FFFFFF" }}>
            < Image source={require('../assets/cavevide.png')} style={{ width: 300, height: 300 }}></Image>
          </View>
          <TouchableOpacity>
            <Text
              onPress={() => {
                navigation.navigate('Catalogue');
              }}
              style={{ color: '#9D2A29', marginTop: 60 }}>Ajouter un vin à mes favoris</Text>
          </TouchableOpacity>

        </View>
      </View>
    );
  }

  if (userstatus == "Vigneron") {
    return (<AddVigneron navigation={navigation} token={token} userstatus={userstatus} />)
  } else {

    // FAVORIS CAVISTE
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
    elevation: 10,

  },
  img: {
    width: 80,
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  centeredView: {
    flex: 1,
    padding: 0,
    // marginTop: 20,
    // justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: 300,
    width: 250,
    backgroundColor: "white",
    borderRadius: 15,
    // margin: 20,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  openButton: {
    flexDirection: 'row',
    margin: 5,
    backgroundColor: "#FFD15C",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
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

var focusedAdd = withNavigationFocus(FavoriteCaviste)

function mapDispatchToProps(dispatch) {
  return {
    sendMessage: function (message) {
      dispatch({ type: 'addMessage', message: message })
    }
  }
}

function mapStateToProps(state) {
  return { token: state.token, userstatus: state.userstatus }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(focusedAdd);