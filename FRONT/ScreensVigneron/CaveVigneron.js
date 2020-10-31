import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, Image, SafeAreaView, KeyboardAvoidingView } from "react-native";
import { ListItem, Input, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { connect } from 'react-redux';

import MyNavigation from './MyNavigation'

function CaveVigneron() {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Image source={require('../assets/macave.png')} style={{ width: 120, height: 80}}></Image>

      <View style={styles.container}>

        <KeyboardAvoidingView behavior="position" enabled>

          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text>Cave Vigneron</Text>
          </View>

        </KeyboardAvoidingView>

             </View>
             <MyNavigation/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

function mapStateToProps(state) {
  return { token: state.token }
}

export default connect(
  mapStateToProps,
  null
)(CaveVigneron);

//POP-UP CAVE VIDE
// export default function CaveScreen() {
//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FCDF23' }}>
//       <View style={styles.box}>
//         <Text>Votre cave est vide!</Text>
//         <Icon
//           name="glass"
//           size={100}
//           color="#000000"
//         />
//       </View>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundColor: '#FBDF4C',
//     // fontFamily: "Gothic A1",
//   },
//   box: {
//     width: 300,
//     height: 500,
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     borderRadius: 15,
//     // fontFamily: "Gothic A1",
//   },
// });