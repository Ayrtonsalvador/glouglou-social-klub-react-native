import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Picker, TouchableHighlight, Modal } from "react-native";
import { Button, Card, Badge, Overlay, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import { withNavigationFocus } from 'react-navigation';

import CaveVigneron from '../ScreensVigneron/CaveVigneron';

function CatalogueCaviste({ userstatus, navigation, token, isFocused }) {

  var IPecole = "172.17.1.153";

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

  const [selectedValue, setSelectedValue] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);
  const [error, setError] = useState(false);

  const [id, setId] = useState();
  const [listeVin, setlisteVin] = useState([])
  const [colorText, setColorText] = useState('#FFD15C');
  const [colorIcon, setColorIcon] = useState('#C4C4C4');


  useEffect(() => {
    async function loadData() {

      if ( userstatus == "Caviste") {

      var rawResponse = await fetch(`http://${IPecole}:3000/catalogue?token=${token}`);
      var response = await rawResponse.json();

      if (response.result == true) {
        // Catalogue
        var catalogue = response.catalogue;
        setlisteVin(catalogue);
        console.log("CATALOGUE", catalogue)
        // Version Juliette
        // var catalogue = response.catalogue;
        // setlisteVin([...listeVin, catalogue]);
      } else {
        // ERREUR RECHERCHE
        setError(true)
      }}
    }
    loadData()
  }, []);

  const handlePressLike = () => {
    console.log("ADD FAVORIS")
    setColorIcon('#DF2F2F');
  }

  const handlePressMessage = () => {
    navigation.navigate('Write')
    setIsVisible(false);
  }

  //  MAP VIN ALL
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
          setId(vin._id);

          setNomVi(vin.IdVigneron.Nom);
          setRegionVi(vin.IdVigneron.Ville);
          setDescVi(vin.IdVigneron.Desc);
          setPhotoVi(vin.IdVigneron.Photo);

        }}>
        <View style={{ flexDirection: "row" }}>
          <Card
            key={i}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
            <Image source={{ uri: vin.Photo }} style={{ margin: 10, width: 220, height: 220, borderRadius: 5 }} />

            <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', margin: 5 }}>
              {vin.Nom}
            </Text>
            <Text style={{ margin: 5 }}>
              {vin.Millesime}
            </Text>
            </View>
            <Text>
              {vin.AOC}
            </Text>
            <Text style={{ fontWeight: "200", margin: 5 }}>
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
            setColorIcon('#C4C4C4')
          }}
        >
          <ScrollView containerStyle={{ borderRadius: 30 }}>
            <Card style={{ flex: 0.5, width: 100, height: 100, borderRadius: 15 }}>

              <View style={{ justifyContent: 'center' }}>
                <View
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                >
                  <Image source={{ uri: photo }} style={{ margin: 10, width: 150, height: 150, borderRadius: 5 }} />
                </View>

                <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                  <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
                    {nom}
                  </Text>
                  <Text style={{ marginBottom: 10, marginLeft: 5 }}>
                    {millesime}
                  </Text>
                </View>
                <Text style={{ marginBottom: 10 }}>
                  {AOC}
                </Text>
                <Text style={{ marginBottom: 10, fontWeight: "200"}}>
                  {cepage}
                </Text>
                <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                  <Icon
                    name="ios-heart"
                    size={30}
                    color={colorIcon}
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    onPress={async () => {
                      handlePressLike();
                      var data = await fetch(`http://${IPmaison}:3000/add-favoris`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: `NomFF=${nom}&CouleurFF=${couleur}&MillesimeFF=${millesime}&CepageFF=${cepage}&DescFF=${desc}&AOCFF=${AOC}&NomViFF=${nomVi}&RegionViFF=${regionVi}&DescViFF=${descVi}&IdFF=${id}&PhotoFF=${photo}&PhotoViFF=${photoVi}&tokenFF=${token}`
                      })
                      var response = await data.json()
                      console.log('AJOUT FAVORIS', response)
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
                <Text style={{ margin: 10, fontWeight: "200" }}>
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
                     handlePressMessage();
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

  // Message Erreur chargement
  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCDF23' }}>
        <View style={styles.popup}>
          <View style={{ alignItems: "center", backgroundColor: "#FFFFFF" }}>
            <Text>Erreur de chargement ! Veuillez réessayer</Text>
          </View>
        </View>
      </View>
    );
  }


  if (userstatus == "Vigneron") {
    return (<CaveVigneron navigation={navigation} token={token} userstatus={userstatus} />)
  } else {

    // CATALOGUE CAVISTE
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={pickerVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Button
                  buttonStyle={{ ...styles.openButton }}
                  title='RECHERCHER'
                  onPress={async () => {
                    setPickerVisible(!pickerVisible);

                    var filtre = await fetch(`http://${IPmaison}:3000/filtre`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                      body: `filtreFF=${selectedValue}`
                    })

                    var filtredata = await filtre.json()
                    console.log(filtredata.catalogue)
                    setlisteVin(filtredata.catalogue)

                  }}
                >
                </Button>
                <View style={{ flex: 1 }}>
                  <Picker
                    selectedValue={selectedValue}
                    style={{ height: 10, width: 150, color: '#FFFFFF' }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                  >
                    <Picker.Item label="LES BLANCS" value="Blanc" />
                    <Picker.Item label="LES ROUGES" value="Rouge" />
                    <Picker.Item label="LES ROSÉS" value="Rosé" />
                    <Picker.Item label="LES BULLES" value="Bulles" />
                  </Picker>
                </View>

              </View>
            </View>
          </Modal>

          <Button
            onPress={() => {
              setPickerVisible(true);
            }}
            title=' FILTRES'
            buttonStyle={styles.openButton}
            icon={
              <Icon
                name='ios-arrow-down'
                size={20}
                color="#ffffff"
              />
            }
          >
          </Button>
        </View>

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
    marginTop: 50,
    elevation: 10
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
    backgroundColor: "#FFFFFF",
    borderRadius: 15,
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
  }
});

var focusedAdd = withNavigationFocus(CatalogueCaviste)

function mapStateToProps(state) {
  // console.log("STATE CATALOGUE", state.token)
  return { token: state.token, userstatus: state.userstatus }
}

export default connect(
  mapStateToProps,
  null
)(focusedAdd);
