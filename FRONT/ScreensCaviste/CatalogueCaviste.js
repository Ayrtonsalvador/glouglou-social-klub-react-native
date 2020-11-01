import React, { useState } from 'react';

// import Carousel, { Pagination } from 'react-native-snap-carousel';

import { StyleSheet, Text, View, Image, TouchableOpacity, Picker, TouchableHighlight, Modal } from "react-native";
import { Button, Card, Badge, Overlay, ListItem, Carousel } from 'react-native-elements';
import { connect } from 'react-redux';

import Icon from 'react-native-vector-icons/Ionicons';
import { ScrollView } from 'react-native-gesture-handler';

function CatalogueCaviste() {

  const [selectedValue, setSelectedValue] = useState("");
  const [isVisible, setIsVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [pickerVisible, setPickerVisible] = useState(false);

  // MODAL AFFICHAGE VIN
  if (isVisible) {
    return (
      <View>
        {/* <Overlay
          onBackdropPress={() => { setIsVisible(false) }}
        > */}
          <Carousel
            onPress={(index) => setActiveSlide(index)}
            inactiveSlideOpacity={0.4}
            pagingEnabled
            showsHorizontalScrollIndicator={false}
          >
            <View>
              <Card style={{ flex: 0.5, width: 100, height: 100 }}>

                <View style={{ justifyContent: 'center' }}>

                  <View style={{ flexDirection: "row", justifyContent: 'center' }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>
                      Nom
                  </Text>
                  </View>
                  <Text style={{ marginBottom: 10, color: '#9D2A29' }}>
                    AOC
              </Text>
                  <Text style={{ marginBottom: 10, color: '#9D2A29' }}>
                    Millésime
                  </Text>
                  <Text style={{ marginBottom: 10, color: '#9D2A29' }}>
                    Cépage
                  </Text>

                  <Text style={{ marginBottom: 10, color: '#9D2A29' }}>
                    Couleur
                  </Text>
                  <Text style={{ marginBottom: 10, color: '#9D2A29' }}>
                    Description
                  </Text>
                </View>
              </Card>
            </View>
            <View>
            <View
                    style={{ justifyContent: 'center', alignItems: 'center' }}
                  >
                    <Image source={require('../assets/imagedefault-c.png')} style={{ margin: 10, width: 150, height: 150 }} />
                  </View>
            </View>


          <TouchableOpacity
            onPress={async () => {
              console.log("OK")
            }}
            style={{ marginTop: 15, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text
              style={{ color: '#DF2F2F' }}>OK</Text>
          </TouchableOpacity>
          </Carousel>
        {/* </Overlay> */}
      </View>
    )
  }

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>

      {/* <View style={styles.centeredView}>
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
              <ListItem title='TYPE DE VIN' />
              <ListItem title='TYPE DE VIN' />
              <ListItem title='TYPE DE VIN' />
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
      </View> */}

      {/* <View style={styles.centeredView}>
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
              <View style={{ flex: 1 }}>
                <Text>TYPE DE VIN</Text>
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
      </View>*/}

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
    marginTop: 20,
    // justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    height: 300,
    width: 250,
    backgroundColor: "white",
    borderRadius: 15,
    // margin: 20,
    padding: 35,
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

// var Catalogue = [{
//   Vigneron: "Mathieu Vieules",
//   Domaine: "Domaine Philémon",
//   Region: "Sud Ouest",
//   Ville: "Villeuneuve-sur-Ver",
//   Nom: "Duras",
//   Couleur: "Rouge",
//   AOC: "AOC Gaillac",
//   Desc: "Les notes d'épices et de poivre s'associent aux tanins souples offrant un bon compromis en bouche. A boire sur les viandes en sauce, les fromages affinés.",
//   Cepage: "Gaillacois",
//   Millesime: "2018",
//   Photo: "../assets/imgdefault.png",
// }];

// // if (Catalogue > 0) {
// //   CatalaogueItems = Catalogue.map((url, i) => {   return () });
//    <Card>
//      <Image source={require('../assets/MainGlouGlou.png')} style={{ width: 20, height: 30 }}></Image>
//       <Badge status="success" value="homme" />
//       <Badge status="success" value="70 ans" />
//       <Badge status="success" value="barbe" />
//       <Badge status="success" value="joyeux !" />
//       <Badge status="success" value="cheveux gris" />
//     </Card>


//   return (
//     <View style={{ flex: 1 }}>
//       <Header
//         containerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}
//         centerComponent={{ text: 'Favorite Caviste', marginTop: 30 }}
//       >
//         <Image source={require('../assets/MainGlouGlou.png')} style={{ width: 20, height: 30 }}></Image>
//       </Header>

//       <ScrollView style={{ marginTop: 25 }}>
//         <Text h4 style={{ textAlign: 'center' }}>John's Gallery</Text>
//         {/* {UrlGallery} */}
//       </ScrollView>
//     </View>
//   );
// }

function mapStateToProps(state) {
  return { token: state.token }
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
//     container: {
//         flex: 1,
//         marginTop: StatusBar.currentHeight || 0,
//     },
//     item: {
//         marginHorizontal: 50,
//         backgroundColor: '#FFFFFF',

//     },
//     title: {

//         fontWeight : 'bold',
//         color : "#FFAE34",
//         fontSize: 20,
//         marginTop: 20,
//         marginHorizontal: 20,
//     },
//     text: {
//         fontSize: 18,
//         marginVertical: 20,
//         marginHorizontal: 20,
//     }
// });

// export default FirstScreen;