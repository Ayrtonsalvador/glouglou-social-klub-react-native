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
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);

  const [colorText, setColorText] = useState('#FFFFFF');
  const [colorIcon, setColorIcon] = useState('#FFFFFF');

  useEffect(() => {
    async function loadData() {
      var rawResponse = await fetch(`http://172.17.1.46:3000/catalogue?token=${token}`);
      var response = await rawResponse.json();
      // console.log("GET INFOS CATALOGUE", response)

      if (response.result == true) {
        setNom(response.catalogue.Nom)
        setMillesime(response.catalogue.Millesime)
        setCepage(response.catalogue.Cepage)
        setAOC(response.catalogue.AOC)
        // setPhoto()

        setDesc(response.catalogue.Desc)
        setCouleur(response.catalogue.Couleur)
        setDomaine()

        // setNomVi(response.catalogue.user.Nom)
        // setRegionVi(response.catalogue.user.Region)
        // setDescVi(response.catalogue.user.Desc)
        // setDescVi(response.catalogue.user.Desc)
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
                    Nom
                    {nom}
                  </Text>
                  <Text style={{ marginBottom: 10, marginLeft: 5 }}>
                    Millésime
                    {millesime}
                  </Text>
                </View>
                <Text style={{ marginBottom: 10 }}>
                  AOC
                  {AOC}
                </Text>
                <Text style={{ marginBottom: 10 }}>
                  Cepage
                  {cepage}
                </Text>
                <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                <Icon
                  name="ios-heart" size={30} 
                  style={{alignItems:'center', justifyContent: 'center'}}
                  // onPress={() => { 
                  //   setColorIcon('#FFAE34');
                  //   setColorText('#DF2F2F')
                  // color = {colorIcon}
                  //   }}
                    >
                </Icon>
                </View>
              </View>
            </Card>
            <Card>
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
                  Jean Pierre DUPONT
                  </Text>
              </View> 
                <View>
                  <Text style={{ margin: 10 }}>
                    Description
                  </Text>
                  <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                  <Icon
                  name="md-chatboxes" size={30} 
                  style={{alignItems:'center', justifyContent: 'center'}}
                  onPress={() => { 
                    navigation.navigate('MessageCaviste')
                    // color='#FFFFFF'
                    }}>
                </Icon>
                </View>
              </View>
            </Card>
          </ScrollView>

          <TouchableOpacity
            onPress={async () => {
              console.log("OK")
            }}
            style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text>AJOUTÉ EN FAVORIS</Text>
          </TouchableOpacity>

        </Overlay>
      </View>
    )
  }

  if (userstatus == "Vigneron") {
    return (<CaveVigneron navigation={navigation} token={token} userstatus={userstatus} />)
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
              <Button
                  buttonStyle={{ ...styles.openButton }}
                  title='Rechercher'
                  onPress={() => {
                    setPickerVisible(!pickerVisible);
                  }}
                >
                </Button>
                <View style={{ flex: 1}}>
                  <Picker
                    selectedValue={selectedValue}
                    style={{ height: 10, width: 150, color:'#FFFFFF' }}
                    onValueChange={(itemValue, itemIndex) => setSelectedValue(itemValue)}
                  >
                    <Picker.Item label="TYPES DE VINS" value="none" />
                    <Picker.Item label="BLANCS" value="blanc"/>
                    <Picker.Item label="ROUGES" value="rouge" />
                    <Picker.Item label="ROSÉS" value="rosé" />
                    <Picker.Item label="BULLES" value="bulles"/>
                  </Picker>
                </View>

                <View style={{ flex: 1}}>
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
