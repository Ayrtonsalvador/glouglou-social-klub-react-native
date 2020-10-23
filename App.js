console.disableYellowBox = true;

import React from 'react';

import FirstScreen from './Screens/FirstScreen.js';
import SignInScreen from './Screens/SignInScreen';
import SignUpScreen from './Screens/SignUpScreen';

import CatalogueCaviste from './ScreensCaviste/CatalogueCaviste';
import ChatCaviste from './ScreensCaviste/ChatCaviste';
import FavoriteCaviste from './ScreensCaviste/FavoriteCaviste';
import MessageCaviste from './ScreensCaviste/MessageCaviste';
import ProfilCaviste from './ScreensCaviste/ProfilCaviste';

import AddVigneron from './ScreensVigneron/AddVigneron';
import CaveVigneron from './ScreensVigneron/CaveVigneron';
import MessageVigneron from './ScreensVigneron/MessageVigneron';
import ProfilVigneron from './ScreensVigneron/ProfilVigneron';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Ionicons } from '@expo/vector-icons';

import Icon from 'react-native-vector-icons/FontAwesome';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import pseudo from './reducers/pseudo';

const store = createStore(combineReducers({ pseudo }));

// STACK-NAVIGATION CAVISTES
var BottomNavigatorCaviste = createBottomTabNavigator({
  Profile: ProfileScreen,
  Catalogue: CatalogueCaviste,
  Chat: ChatScreenVi,
  Cave: CaveScreen,

},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName == 'Catalogue') {
          iconName = 'heart';
        } else if (navigation.state.routeName == 'Chat') {
          iconName = 'comment-dots';
        } else if (navigation.state.routeName == 'Cave') {
          iconName = 'search';
          // si vigneron
        } else if (navigation.state.routeName == 'Profile') {
          iconName = 'user';
        }

        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#130f40',
      inactiveTintColor: '#FFFFFF',
     
  
      style: {
        backgroundColor: '#FCDF23',
        height: 40,
        shadowColor: 'transparent',
        borderColor : '#FCDF23',
        
      }
    }

  });

  StackNavigatorCaviste = createStackNavigator({
  First: FirstScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  BottomNavigatorCaviste: BottomNavigatorCaviste,
},
  { headerMode: 'none' }
);

const NavigationCaviste = createAppContainer(StackNavigatorCaviste);

// STACK-NAVIGATION VIGNERON
var BottomNavigatorVigneron = createBottomTabNavigator({
  Profile: ProfileScreen,
  Catalogue: CatalogueCaviste,
  Chat: ChatScreenVi,
  Cave: CaveScreen,

},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName == 'Catalogue') {
          iconName = 'heart';
        } else if (navigation.state.routeName == 'Chat') {
          iconName = 'comment-dots';
        } else if (navigation.state.routeName == 'Cave') {
          iconName = 'search';
          // si vigneron
        } else if (navigation.state.routeName == 'Profile') {
          iconName = 'user';
        }

        return <Icon name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#130f40',
      inactiveTintColor: '#FFFFFF',
     
  
      style: {
        backgroundColor: '#FCDF23',
        height: 40,
        shadowColor: 'transparent',
        borderColor : '#FCDF23',
        
      }
    }

  });

  StackNavigatorVigneron = createStackNavigator({
  First: FirstScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  BottomNavigatorVigneron: BottomNavigatorVigneron,
},
  { headerMode: 'none' }
);

const NavigationVigneron = createAppContainer(StackNavigatorVigneron);



export default function App() {
  //if .. else
  return (
    <Provider store={store}>
      <NavigationCaviste />
      <NavigationVigneron />
    </Provider>
  );
}
