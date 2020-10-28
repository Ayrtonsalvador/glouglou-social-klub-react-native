import React, { useState, useEffect } from 'react';

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

// Navigation
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

// Reduce Store
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import userstatus from './reducers/userstatus';

// FONTS
import * as Font from 'expo-font';
import {AppLoading} from 'expo';

// Icones
import Icon from 'react-native-vector-icons/Ionicons';

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
        if (navigation.state.routeName == 'ProfileCaviste') {
          iconName = 'ios-person';
        } else if (navigation.state.routeName == 'FavorisCaviste') {
          iconName = 'ios-heart';
        } else if (navigation.state.routeName == 'ChatCaviste') {
          iconName = 'ios-chatboxes';
        } else if (navigation.state.routeName == 'CatalogueCaviste') {
          iconName = 'ios-search';
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
  Profil: ProfilCaviste,
  BottomNavigatorCaviste: BottomNavigatorCaviste,
},
  { headerMode: 'none' }
);

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
},
  { headerMode: 'none' }
);

 const NavigationVigneron = createAppContainer(StackNavigatorVigneron);
// const NavigationCaviste = createAppContainer(StackNavigatorCaviste);

// const getFonts = () => Font.loadAsync({
//   'GothicA1-Bold': 'https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100&display=swap', 
//   'GothicA1-Thin': 'https://fonts.googleapis.com/css2?family=Gothic+A1:wght@100;700&display=swap', 
// })

export default function App(userstatus) {

  // const [ fontsLoaded, setFontsLoaded ] = useState(false);


  // if(fontsLoaded){
  // if (userstatus == 'Caviste') {

    return (
      <Provider store={store}>
        {/* <NavigationCaviste /> */}
        <NavigationVigneron />
      </Provider>
     )
    // } else {
    //    return(
    //     <AppLoading
    //       startAsync={getFonts}
    //       onFinish={()=> setFontsLoaded(true)}
    //     />
    //    )
    //  }
    }
