import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, KeyboardAvoidingView, TouchableOpacity } from "react-native";
import { ListItem, Input, Header, Card, Overlay } from 'react-native-elements';

import { connect } from 'react-redux';
import { ScrollView } from 'react-native-gesture-handler';

import CaveVigneron from '../ScreensVigneron/CaveVigneron';

function CatalogueCaviste({userstatus, navigation}) {

  var IPmaison = "";
  var IPecole = "172.17.1.153";

  useEffect(() => {
    async function loadData() {
      
      var rawResponse = await fetch(`http://${IPecole}:3000/catalogue`);
      var response = await rawResponse.json();

      console.log("GET INFOS BOUTEILLE", response)
      // console.log("Vigneron", response.user)      
        // setNom(response.cave.Nom)
        // setAOC(response.cave.AOC)
        // setCepage(response.cave.Cepage)
        // setMillesime(response.cave.Millesime)
        // setDesc(response.cave.Desc)
        // setCouleur(response.cave.Couleur)
        // setDomaine(response.cave.)
        // setVille()
        // setRegion()
        // setPhoto()
    }
    loadData()
  }, []);

  // if (Catalogue > 0) {
  //   CatalaogueItems = Catalogue.map((url, i) => { return (
  //   <Card style={{ alignItems: 'center', justifyContent: 'center' }}>
  //   <Image source={require('../assets/imagedefault-v.png')} style={styles.img} />

  //   <Text>
  //     {nom}
  //   </Text>
  //   <Text>
  //     {millesime}
  //   </Text>
  //   <Text>
  //     {AOC}
  //   </Text>
  //   <Text>
  //     {cepage}
  //   </Text>
  // </Card>

  // <Card>
  // ) });
  
  if (userstatus == "Vigneron") {
    return (<CaveVigneron navigation={navigation}/>)
  } else {

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../assets/macave.png')} style={{ width: 120, height: 80 }}></Image>
{/*   
        <View style={styles.container}>
  
          <View style={styles.box1}>
  
            <ScrollView>
              <TouchableOpacity
                onPress={() => {
                  setIsVisible(true);
                }}>
                <View style={{ flexDirection: "row" }}>
  
                  <Card style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../assets/imagedefault-v.png')} style={styles.img} />
  
                    <Text>
                      {nom}
                    </Text>
                    <Text>
                      {millesime}
                    </Text>
                    <Text>
                      {AOC}
                    </Text>
                    <Text>
                      {cepage}
                    </Text>
                  </Card>
  
                  <Card>
                    <Image source={require('../assets/imagedefault-v.png')} style={styles.img} />
  
                    <Text>
                      {nom}
                    </Text>
                    <Text>
                    {millesime}
                    </Text>
                    <Text>
                      {AOC}
                    </Text>
                    <Text>
                      {cepage}
                    </Text>
                  </Card>
                </View>
  
                <View style={{ flexDirection: "row" }}>
                  <Card>
                    <Image source={require('../assets/imagedefault-v.png')} style={styles.img} />
  
                    <Text>
                      {nom}
                    </Text>
                    <Text>
                    {millesime}
                    </Text>
                    <Text>
                      {AOC}
                    </Text>
                    <Text>
                    {cepage}
                    </Text>
                  </Card>

                  
                </View>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View> */}
      </View>
    );
  }}

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

// export default FirstScreen;