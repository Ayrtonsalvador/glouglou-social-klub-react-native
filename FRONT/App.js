import React, { useState } from 'react';
import { connect } from 'react-redux';

// Screens Communs
import FirstScreen from './Screens/FirstScreen';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';

// Screens Cavistes
import CatalogueCaviste from './ScreensCaviste/CatalogueCaviste';
import ChatCaviste from './ScreensCaviste/ChatCaviste';
import FavoriteCaviste from './ScreensCaviste/FavoriteCaviste';
import MessageCaviste from './ScreensCaviste/MessageCaviste';
import ProfilCaviste from './ScreensCaviste/ProfilCaviste';

// Screens Vignerons
import AddVigneron from './ScreensVigneron/AddVigneron';
import CaveVigneron from './ScreensVigneron/CaveVigneron';
import ChatVigneron from './ScreensVigneron/ChatVigneron';
import MessageVigneron from './ScreensVigneron/MessageVigneron';
import ProfilVigneron from './ScreensVigneron/ProfilVigneron';

import { createAppContainer} from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import { Ionicons } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/FontAwesome';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import userstatus from './reducers/userstatus';
import token from './reducers/token';

// ATTENTION ADRESS IP

<<<<<<< HEAD
=======
// ATTENTION ADRESS IP 
>>>>>>> 2d75cb924e25ea19879e870c3ec8ea7bf24ca372
const store = createStore(combineReducers({ userstatus, token }));

// STACK-NAVIGATION

var StackNavigator = createStackNavigator({
  First: FirstScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
<<<<<<< HEAD
=======
  MessageCaviste: MessageCaviste,
  Profil: ProfilCaviste,
  BottomNavigatorCaviste: BottomNavigatorCaviste,
},
  { headerMode: 'none' }
);
>>>>>>> 2d75cb924e25ea19879e870c3ec8ea7bf24ca372

  // ProfilVigneron: ProfilVigneron,
  // AddVigneron: AddVigneron,
  // CaveVigneron: CaveVigneron,
  // ChatVigneron: ChatVigneron,
  // MessageVigneron: MessageVigneron,

  // ProfilCaviste: ProfilCaviste,
  // CatalogueCaviste: CatalogueCaviste,
  // FavoriteCaviste: FavoriteCaviste,
  // MessageCaviste : MessageCaviste,
  // ChatCaviste: ChatCaviste,

<<<<<<< HEAD
=======
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName == 'ProfileVigneron') {
          iconName = 'ios-person';
        } else if (navigation.state.routeName == 'ChatVigneron') {
          iconName = 'md-chatboxes';
        } else if (navigation.state.routeName == 'Cave') {
          iconName = 'ios-home';
        } else if (navigation.state.routeName == 'Vin') {
          iconName = 'ios-wine';
        }

        return <Icon name={iconName} size={30} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#130f40',
      inactiveTintColor: '#FFFFFF',
      showLabel: false,
      adaptive: true,
      style: {
        backgroundColor: '#FCDF23',
        height: 40,
        shadowColor: 'transparent',
        borderColor: '#FCDF23',

      }
    }

  });

StackNavigatorVigneron = createStackNavigator({
  First: FirstScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  MessageVigneron: MessageVigneron,
  Profil: ProfilVigneron,
  BottomNavigatorVigneron: BottomNavigatorVigneron,
>>>>>>> 2d75cb924e25ea19879e870c3ec8ea7bf24ca372
},
  { headerMode: 'none' }
);

<<<<<<< HEAD
const AppContainer = createAppContainer(StackNavigator);
=======
  // const NavigationCaviste = createAppContainer(StackNavigatorCaviste);
  const NavigationVigneron = createAppContainer(StackNavigatorVigneron);


// const getFonts = () => Font.loadAsync({
//   'GothicA1-Bold': 'https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100&display=swap', 
//   'GothicA1-Thin': 'https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;700&display=swap', 
// })
>>>>>>> 2d75cb924e25ea19879e870c3ec8ea7bf24ca372

function App() {
   
// console.log("Store", store.getState())

// const storeitems = store.getState()

// console.log ("status", storeitems.userstatus)
 
    return (

      <Provider store={store}>
<<<<<<< HEAD
        <AppContainer/>    
=======
        <NavigationVigneron />
        {/* <NavigationCaviste /> */}
>>>>>>> 2d75cb924e25ea19879e870c3ec8ea7bf24ca372
      </Provider>
    ) 
  }

export default App;