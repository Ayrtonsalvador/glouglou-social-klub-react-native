import React, { useEffect } from 'react';

// Screens Communs
import FirstScreen from './Screens/FirstScreen.js';
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

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Ionicons } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/FontAwesome';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import userstatus from './reducers/userstatus';

// ATTENTION ADRESS IP 

const store = createStore(combineReducers({ userstatus }));


// STACK-NAVIGATION CAVISTES
var BottomNavigatorCaviste = createBottomTabNavigator({
  ProfileCaviste: ProfilCaviste,
  FavorisCaviste: FavoriteCaviste,
  ChatCaviste: ChatCaviste,
  CatalogueCaviste: CatalogueCaviste,

},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        var type;
        if (navigation.state.routeName == 'ProfileCaviste') {
          iconName = 'user';
        } else if (navigation.state.routeName == 'FavorisCaviste') {
          iconName = 'heart';
        } else if (navigation.state.routeName == 'ChatCaviste') {
          iconName = 'commenting-o';
        } else if (navigation.state.routeName == 'CatalogueCaviste') {
          iconName = 'search';
        }

        return <Icon name={iconName} size={25} color={tintColor} />;
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

StackNavigatorCaviste = createStackNavigator({
  First: FirstScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  MessageCaviste: MessageCaviste,
  ProfilCav: ProfilCaviste,
  BottomNavigatorCaviste: BottomNavigatorCaviste,
},
  { headerMode: 'none' }
);

const NavigationCaviste = createAppContainer(StackNavigatorCaviste);

// STACK-NAVIGATION VIGNERON
var BottomNavigatorVigneron = createBottomTabNavigator({
  ProfileVigneron: ProfilVigneron,
  Cave: CaveVigneron,
  Vin: AddVigneron,
  ChatVigneron: ChatVigneron,

},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName == 'ProfileVigneron') {
          iconName = 'user';
        } else if (navigation.state.routeName == 'ChatVigneron') {
          iconName = 'commenting-o';
        } else if (navigation.state.routeName == 'Cave') {
          iconName = 'home';
        } else if (navigation.state.routeName == 'Vin') {
          iconName = 'glass';
        }

        return <Icon name={iconName} size={25} color={tintColor} />;
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
  ProfilVi: ProfilVigneron,
  BottomNavigatorVigneron: BottomNavigatorVigneron,
},
  { headerMode: 'none' }
);

const NavigationVigneron = createAppContainer(StackNavigatorVigneron);

export default function App(userstatus) {

  // Faire passer les userInfo : nom, statut et token depuis les pages Sign-up/Sign-in à App.js

  // if (userstatus == 'Caviste') {
    return (
      <Provider store={store}>
        {/* <NavigationCaviste /> */}
        <NavigationVigneron />
      </Provider>
     )} 
// else {
  //   return (
  //     <Provider store={store}>
  //       <NavigationVigneron />
  //     </Provider>
  //   )
  // }
  // }
