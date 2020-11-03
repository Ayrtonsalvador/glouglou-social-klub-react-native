import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Picker, TouchableHighlight, Modal } from "react-native";
import { Button, Card, Badge, Overlay, Avatar } from 'react-native-elements';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';

import CaveVigneron from '../ScreensVigneron/CaveVigneron';

function CatalogueCaviste({ userstatus, navigation, token }) {

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
  const [pickerVisible, setPickerVisible] = useState(false);
  const [error, setError] = useState(false);

  const [listeVin, setlisteVin] = useState([])
  const [colorText, setColorText] = useState('#FFD15C');
  const [colorIcon, setColorIcon] = useState('#C4C4C4');

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(`http://${IPecole}:3000/catalogue?token=${token}`);
      var response = await rawResponse.json();
      console.log("GET INFOS CATALOGUE", response.catalogue)

      if (response.result == true) {
        // Catalogue
        var catalogue = response.catalogue;
        setlisteVin(catalogue);

        // Version Juliette
        // var catalogue = response.catalogue;
        // setlisteVin([...listeVin, catalogue]);
      } else {
        //ERREUR RECHERCHE
        setError(true)
      }
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

          setNomVi(vin.IdVigneron.Nom);
          setRegionVi(vin.IdVigneron.Ville);
          setDescVi(vin.IdVigneron.Desc);

        }}>
        <View style={{ flexDirection: "row" }}>
          <Card
            key={i}
            style={{ alignItems: 'center', justifyContent: 'center' }}
          >
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
          onBackdropPress={() => {
            setIsVisible(false);
            setColorIcon('#C4C4C4')
          }}
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
                <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                  <Icon
                    name="ios-heart"
                    size={30}
                    color={colorIcon}
                    style={{ alignItems: 'center', justifyContent: 'center' }}
                    onPress={() => {
                      handlePressLike();
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
                  source={require('../assets/vigneron.jpg')}
                ></Avatar>
                <Text style={{ margin: 10, color: '#9D2A29' }}>
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

    // Catalogue Caviste
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
                  title='Rechercher'
                  onPress={() => {
                    setPickerVisible(!pickerVisible);
                  }}
                >
                </Button>
                <View style={{ flex: 1 }}>
                  <Picker
                    selectedValue={selectedValue}
                    style={{ height: 10, width: 150, color: '#FFFFFF' }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                  >
                    <Picker.Item label="TYPES DE VINS" value="none" />
                    <Picker.Item label="BLANCS" value="blanc" />
                    <Picker.Item label="ROUGES" value="rouge" />
                    <Picker.Item label="ROSÉS" value="rosé" />
                    <Picker.Item label="BULLES" value="bulles" />
                  </Picker>
                </View>

                <View style={{ flex: 1 }}>
                  <Picker
                    selectedValue={selectedValue}
                    style={{ height: 10, width: 150 }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                  >
                    <Picker.Item label="AUTRES CHOIX" value="none" />
                    <Picker.Item label="DOMAINE" value="domaine" />
                    <Picker.Item label="PRODUCTEUR" value="producteur" />
                    <Picker.Item label="REGION" value="region" />
                  </Picker>
                </View>
              </View>
            </View>
          </Modal>

          <Button
            onPress={() => {
              setPickerVisible(true);
            }}
            title='FILTRES'
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
    height: 450,
    width: 250,
    backgroundColor: "#FFFFFF",
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
  }
});


function mapStateToProps(state) {
  return { token: state.token, userstatus: state.userstatus }
}

export default connect(
  mapStateToProps,
  null
)(CatalogueCaviste);
//}

// Carousel fiche produit

// function FirstScreen() {

//     const [activeIndex, setactiveIndex] = useState(0);

//     const carouselItems = [{ title: "BOIRE BIEN, BOIRE MIEUX", text: 'GlouGlou Social Club réunit les amateurs de vins et met en relation les producteurs indépendants et professionnels de la restauration.' },
//     { title: "CÔTÉS VIGNERONS", text: 'Nous participons au dévellopement des producteurs indépendants grâce à notre catalogue de références à disposition des cavistes.' },
//     { title: "CÔTÉS CAVISTES", text: "Nous aidons les restaurateurs à étoffer leur carte grâce à une préselection de références de petits producteurs." },]

//     const Item = ({ title, text }) => (
//         <View style={styles.item}>
//             <Text style={styles.title}>{title}</Text>
//             <Text style={styles.text}>{text}</Text>
//         </View>
//     );

//     const renderItem = ({ item, i }) => (
//         <Item key={i} title={item.title} text={item.text} />
//     );

//     const pagi = ({ item, activeIndex }) => (
//         <Pagination
//             dotsLength={item.length}
//             activeDotIndex={activeIndex}
//             containerStyle={{ backgroundColor: '#FFFFFF' }}
//             dotStyle={{
//                 width: 10,
//                 height: 10,
//                 borderRadius: 5,
//                 marginHorizontal: 8,
//                 backgroundColor: "#FFD15C"
//             }}
//             inactiveDotStyle={{
//                 width: 5,
//                 height: 5,
//                 borderRadius: 5,
//                 marginHorizontal: 8,
//                 backgroundColor: 'FFF2A0'
//             }}
//             inactiveDotOpacity={0.4}
//             inactiveDotScale={0.6}
//         />
//     )

//     return (

//         // <View style={{backgroundColor: '#FCDF23'}}> 
// // {/* 
// //             <View style={{ flex: 1, alignItems: 'center' }}>
// //                 <Image source={require('../assets/GGSC.png')} style={{ width: 200, height: 200, margin: 40 }} />
// //             </View> */}

//         <SafeAreaView style={{flex: 1, backgroundColor:'#FCDF23', paddingTop: 50, }}>
//             <View style={{ flex: 1, flexDirection:'row', justifyContent: 'center', }}>
//                 <Carousel
//                 useScrollView
//                     layout={"default"}
//                     ref={ref => carousel = ref}
//                     data={carouselItems}
//                     sliderWidth={300}
//                     itemWidth={300}
//                     renderItem={renderItem}
//                     onSnapToItem={index => setactiveIndex({ activeIndex: index })} />
//                 {/* {pagi} */}
//                 </View>
//             </SafeAreaView >


// // {/*         
// //                     <View style={{ flex:1, justifyContent:'flex-end', borderColor: '#FFD15C', margin:10}}>
// //                     <Text style={styles.txt}
// //                     onPress={() => {
// //                         navigation.navigate('SignIn');
// //                     }}>S'IDENTIFIER</Text>


// //                     <Text style={{backgroundColor: '#FFAE34', margin:10}}
// //                     onPress={() => {
// //                     navigation.navigate('SignUp');
// //                     }}>S'INSCRIRE</Text>

// //                     </View> */}

// // </View>

//     );
// }


// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexWrap: 'wrap',
//     flexDirection: 'row'
//   },
//   box1: {
//     borderWidth: 0,
//     marginBottom: 10,
//     borderColor: '#808080',
//     marginTop: 50,
//     elevation: 10
//   },
//   img: {
//     width: 80,
//     height: 80,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   popup: {
//     width: 300,
//     height: 400,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 15,
//     // fontFamily: "Gothic A1",
//   },
// });

// export default FirstScreen;
