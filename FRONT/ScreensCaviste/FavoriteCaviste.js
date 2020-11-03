import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, Text, SafeAreaView, StatusBar, FlatList, Modal } from 'react-native';
import { Button, ListItem, Input, Header } from 'react-native-elements';

import Carousel, { Pagination } from 'react-native-snap-carousel';
import { connect } from 'react-redux';

import AddVigneron from '../ScreensVigneron/AddVigneron';

function FavoriteCaviste({ navigation, token, userstatus }) {

    var IPmaison = "";
    var IPecole = "172.17.1.46";
  
    const [photo, setPhoto] = useState('')
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
    const [photoVi, setPhotoVi] = useState("Photo Vigneron")
  
    const [selectedValue, setSelectedValue] = useState("");
    const [isVisible, setIsVisible] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [pickerVisible, setPickerVisible] = useState(false);
  
    useEffect(() => {
      async function loadData() {
        var rawResponse = await fetch(`http://${IPecole}:3000/catalogue?token=${token}`);
        var response = await rawResponse.json();
        console.log("GET INFOS CATALOGUE", response)
  
        if (response.result == true) {
          setNom(response.catalogue.Nom)
          setMillesime(response.catalogue.Millesime)
          setCepage(response.catalogue.Cepage)
          setAOC(response.catalogue.AOC)
          // setPhoto()
  
          setDesc(response.catalogue.Desc)
          setCouleur(response.catalogue.Couleur)
          setDomaine()
  
          setNomVi(response.catalogue.user.Nom)
          setRegionVi(response.catalogue.user.Region)
          setDescVi(response.catalogue.user.Desc)
          setDescVi(response.catalogue.user.Desc)
          // setPhotoVi()
  
          // Map Vins
          // const cardVin = response.cave.map((i) => {
          //   return (
          //       <TouchableOpacity
          //         onPress={() => { setIsVisible(true); }}>
  
          //         <View style={{ flexDirection: "row" }}>
          //           <Card
          //             key={i}
          //             style={{ alignItems: 'center', justifyContent: 'center' }}
          //           // image={{ uri: '../assets/imagedefault-v.png' }}
          //           >
          //             <Text>
          //               {nom}
          //             </Text>
          //             <Text>
          //               {millesime}
          //             </Text>
          //             <Text>
          //               {AOC}
          //             </Text>
          //             <Text>
          //               {cepage}
          //             </Text>
          //           </Card>
          //         </View>
  
          //       </TouchableOpacity>
          //   )
          // })
  
          // setlisteVin(cardVin)
  
        } else {
          //CAVE VIDE
          setPopup(true)
        }
      }
      loadData()
    }, []);
  
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
                    <Image source={require('../assets/imagedefault-c.png')} style={{ margin: 10, width: 150, height: 150 }} />
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
                console.log("OK")
              }}
              style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center' }}
            >
              <Text
                style={{ color: '#DF2F2F' }}>OK</Text>
            </TouchableOpacity>
  
          </Overlay>
        </View>
      )
    }

    if (userstatus == "Vigneron") {
    return (<AddVigneron navigation={navigation} token={token} userstatus={userstatus}/>)
  } else {
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
                  <View style={{ flex: 1, backgroundColor: '#AAAAAA' }}>
                    <Text>CHOISIR UN TYPE DE VIN</Text>
                    <Picker
                      selectedValue={selectedValue}
                      style={{ height: 10, width: 150 }}
                      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                      <Picker.Item label="BLANCS" value="blanc" />
                      <Picker.Item label="ROUGES" value="rouge" />
                      <Picker.Item label="BULLES" value="bulles" />
                    </Picker>
                    </View>
    
                    <View style={{ flex: 1, backgroundColor: '#AAAAAA'  }}>
                    <Text style={{ paddingTop: 20 }}>AUTRES</Text>
                    <Picker
                      selectedValue={selectedValue}
                      style={{ height: 10, width: 150 }}
                      onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                    >
                      <Picker.Item label="DOMAINE" value="domaine" />
                      <Picker.Item label="PRODUCTEUR" value="producteur" />
                      <Picker.Item label="REGION" value="region" />
                    </Picker>
                    </View>
                  <Button
                    buttonStyle={{ ...styles.openButton }}
                    title='Rechercher'
                    onPress={() => {
                      setPickerVisible(!pickerVisible);
                    }}
                  >
                  </Button>
                </View>
              </View>
            </Modal>
    
            <Button
              onPress={() => {
                setPickerVisible(true);
              }}
              title='Filtres'
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
    
          {/* <View style={{ flex: 0.5, width: 100, height: 100 }}>
            <Modal visible={isVisibleModal} transparent={true}>
              <View style={{ margin: 20, padding: 20, backgroundColor: '#efefef' }}
              >
                <Text style={{ fontWeight: 'bold' }}>Pick a value</Text>
                <TouchableHighlight>
                  <Text style={{ margin: 20, padding: 20, alignItems: 'center', justifyContent: 'center' }}>TYPE</Text>
                  <Text style={{margin: 20, padding: 20, alignItems:'center', justifyContent: 'center'}}>DOMAINE</Text>
                </TouchableHighlight>
              </View>
            </Modal>
          </View> */}
    
          {/* <View style={{ flex: 1}}>
        <View style={{ flex: 1}}>
        <Picker
            selectedValue={selectedValue}
            style={{ height: 20, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="BLANCS" value="blanc" />
            <Picker.Item label="ROUGES" value="rouge" />
            <Picker.Item label="BULLES" value="bulles" />
          </Picker>
          </View>
    
          <View style={{ flex: 1}}>
          <Picker
            selectedValue={selectedValue}
            style={{ height: 20, width: 150 }}
            onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
          >
            <Picker.Item label="DOMAINE" value="domaine" />
            <Picker.Item label="PRODUCTEUR" value="producteur" />
            <Picker.Item label="REGION" value="region" />
          </Picker>
          </View>
          </View> */}
    
          <View style={styles.container}>
    
            <View style={styles.box1}>
    
              <ScrollView>
    
                <TouchableOpacity
                  onPress={() => {
                    setIsVisible(true);
                  }}>
                  <View style={{ flexDirection: "row" }}>
    
                    <Card style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Image source={require('../assets/imagedefault-c.png')} style={styles.img} />
    
                      <Text style={{ fontWeight: 'bold' }}>
                        Nom
                      </Text>
                      <Text>
                        Millesime
                      </Text>
                      <Text>
                        AOC
                      </Text>
                      <Text>
                        Cépage
                      </Text>
                    </Card>
    
                    <Card>
                      <Image source={require('../assets/imagedefault-c.png')} style={styles.img} />
    
                      <Text style={{ fontWeight: 'bold' }}>
                        Nom
                      </Text>
                      <Text>
                        Millesime
                      </Text>
                      <Text>
                        AOC
                      </Text>
                      <Text>
                        Cépage
                      </Text>
                    </Card>
                  </View>
    
                  <View style={{ flexDirection: "row" }}>
                    <Card>
                      <Image source={require('../assets/imagedefault-c.png')} style={styles.img} />
    
                      <Text style={{ fontWeight: 'bold' }}>
                        Nom
                      </Text>
                      <Text>
                        Millesime
                      </Text>
                      <Text>
                        AOC
                      </Text>
                      <Text>
                        Cépage
                      </Text>
                    </Card>
    
                    <Card>
                      <Image source={require('../assets/imagedefault-c.png')} style={styles.img} />
    
                      <Text style={{ fontWeight: 'bold' }}>
                        Nom
                      </Text>
                      <Text>
                        Millesime
                      </Text>
                      <Text>
                        AOC
                      </Text>
                      <Text>
                        Cépage
                      </Text>
                    </Card>
                  </View>
                  <View style={{ flexDirection: "row" }}>
                    <Card>
                      <Image source={require('../assets/imagedefault-c.png')} style={styles.img} />
    
                      <Text style={{ fontWeight: 'bold' }}>
                        Nom
                      </Text>
                      <Text>
                        Millesime
                      </Text>
                      <Text>
                        AOC
                      </Text>
                      <Text>
                        Cépage
                      </Text>
                    </Card>
    
                    <Card>
                      <Image source={require('../assets/imagedefault-c.png')} style={styles.img} />
                      <Text style={{ fontWeight: 'bold' }}>
                        Nom
                      </Text>
                      <Text>
                        Millesime
                      </Text>
                      <Text>
                        AOC
                      </Text>
                      <Text>
                        Cépage
                      </Text>
                    </Card>
                  </View>
                </TouchableOpacity>
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
  popup: {
    width: 300,
    height: 400,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    // fontFamily: "Gothic A1",
  },
  centeredView: {
    flex: 1,
    padding: 0,
    // marginTop: 20,
    // justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: 500,
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

function mapStateToProps(state) {
  return { token: state.token, userstatus: state.userstatus }
}

export default connect(
  mapStateToProps,
  null
)(FavoriteCaviste);