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

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Icon from 'react-native-vector-icons/FontAwesome';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import userstatus from './reducers/userstatus';
import token from './reducers/token';

// ATTENTION ADRESS IP

const store = createStore(combineReducers({ userstatus, token }));

// STACK-NAVIGATION

var BottomNavigator = createBottomTabNavigator({
  Profil: ProfilCaviste,
  Catalogue: CatalogueCaviste,
  Favoris: FavoriteCaviste,
  Chat: ChatCaviste,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName == 'Profil') {
          iconName = 'user';
        } else if (navigation.state.routeName == 'Catalogue') {
          iconName = 'home';
        } else if (navigation.state.routeName == 'Chat') {
          iconName = 'envelope';
        } else if (navigation.state.routeName == 'Favoris') {
          iconName = 'glass';
        }

        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#FFAE34',
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

var StackNavigator = createStackNavigator({
  First: FirstScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  Message: MessageCaviste,
  Favoris: FavoriteCaviste,
  BottomNavigator: BottomNavigator,
},
  { headerMode: 'none' }
);

const AppContainer = createAppContainer(StackNavigator);

function App() {

  return (

    <Provider store={store}>
      <AppContainer />
    </Provider>
  )
}

export default App;
