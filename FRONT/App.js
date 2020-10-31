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

const store = createStore(combineReducers({ userstatus, token }));

// STACK-NAVIGATION

var StackNavigator = createStackNavigator({
  First: FirstScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,

  AddVigneron: AddVigneron,
  CaveVigneron: CaveVigneron,
  ChatVigneron: ChatVigneron,
  MessageVigneron: MessageVigneron,
  Profil: ProfilVigneron,

  CatalogueCaviste: CatalogueCaviste,
  ChatCaviste: ChatCaviste,
  FavoriteCaviste: FavoriteCaviste,
  MessageVigneron : MessageCaviste,
  ProfilCaviste: ProfilCaviste,

},
  { headerMode: 'none' }
);

const Navigation = createAppContainer(StackNavigator);

function App() {
   
// console.log("Store", store.getState())

// const storeitems = store.getState()

// console.log ("status", storeitems.userstatus)
 
    return (

      <Provider store={store}>
        <Navigation/>    
      </Provider>
    ) 
  }

export default App;