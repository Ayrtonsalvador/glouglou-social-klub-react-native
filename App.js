console.disableYellowBox = true;

import React from 'react';

import FirstScreen from './screens/FirstScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ChatScreen from './screens/ChatScreen';
import CaveScreen from './screens/CaveScreen';
import ProfileScreen from './screens/ProfileScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Ionicons } from '@expo/vector-icons';

import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import pseudo from './reducers/pseudo';

const store = createStore(combineReducers({ pseudo }));

var BottomNavigator = createBottomTabNavigator({
  Home: HomeScreen,
  Map: MapScreen,
  Chat: ChatScreen,
  Cave: CaveScreen,
  Profile: ProfileScreen,
},
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ tintColor }) => {
        var iconName;
        if (navigation.state.routeName == 'Home') {
          iconName = 'ios-home';
        } else if (navigation.state.routeName == 'Map') {
          iconName = 'ios-navigate';
        } else if (navigation.state.routeName == 'Chat') {
          iconName = 'ios-chatboxes';
        } else if (navigation.state.routeName == 'Cave') {
          iconName = 'ios-wine';
        } else if (navigation.state.routeName == 'Profile') {
          iconName = 'ios-person';
        }

        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarOptions: {
      activeTintColor: '#130f40',
      inactiveTintColor: '#FFFFFF',
      style: {
        backgroundColor: '#FBDF4C',
      }
    }


  });

StackNavigator = createStackNavigator({
  First: FirstScreen,
  SignIn: SignInScreen,
  SignUp: SignUpScreen,
  BottomNavigator: BottomNavigator,
},
  { headerMode: 'none' }
);

const Navigation = createAppContainer(StackNavigator);

export default function App() {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}
