import React, { useState } from 'react';

import Carousel, { Pagination } from 'react-native-snap-carousel';

import { StyleSheet, Text, View, Image, SafeAreaView, StatusBar, FlatList, ScrollView } from "react-native";
import { Button, ListItem, Input, Header, Card, Badge } from 'react-native-elements';
import { connect } from 'react-redux';

import NavigationC from './NavigationC'
import Icon from 'react-native-vector-icons/FontAwesome5';

function CatalogueCaviste() {

  var Catalogue = [{
    Vigneron: "Mathieu Vieules",
    Domaine: "Domaine Philémon",
    Region: "Sud Ouest",
    Ville: "Villeuneuve-sur-Ver",
    Nom: "Duras",
    Couleur: "Rouge",
    AOC: "AOC Gaillac",
    Desc: "Les notes d'épices et de poivre s'associent aux tanins souples offrant un bon compromis en bouche. A boire sur les viandes en sauce, les fromages affinés.",
    Cepage: "Gaillacois",
    Millesime: "2018",
    Photo: "../assets/imgdefault.png",
  }];

  // if (Catalogue > 0) {
  //   CatalaogueItems = Catalogue.map((url, i) => {   return () });
     <Card>
       <Image source={require('../assets/MainGlouGlou.png')} style={{ width: 20, height: 30 }}></Image>
        <Badge status="success" value="homme" />
        <Badge status="success" value="70 ans" />
        <Badge status="success" value="barbe" />
        <Badge status="success" value="joyeux !" />
        <Badge status="success" value="cheveux gris" />
      </Card>
  

    return (
      <View style={{ flex: 1 }}>
        <Header
          containerStyle={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#FFFFFF' }}
          centerComponent={{ text: 'Favorite Caviste', marginTop: 30 }}
        >
          <Image source={require('../assets/MainGlouGlou.png')} style={{ width: 20, height: 30 }}></Image>
        </Header>

        <ScrollView style={{ marginTop: 25 }}>
          <Text h4 style={{ textAlign: 'center' }}>John's Gallery</Text>
          {/* {UrlGallery} */}
        </ScrollView>

        <NavigationC/>
      </View>
    );
  }

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