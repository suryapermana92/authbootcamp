import React from 'react';
import { View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Expo from 'expo';
import firebase from 'firebase'

import RequestOTPScreen from './src/screens/RequestOTPScreen';
import VerifyOTPScreen from './src/screens/VerifyOTPScreen';

import TodoScreen from './src/screens/TodoScreen';

export default class App extends React.Component {
  componentWillMount() {
    const config = {
      apiKey: 'AIzaSyBkjhihX3MymQcoYCHIKWjfsq0vJqbdRks',
      authDomain: 'todoapp-fbe30.firebaseapp.com',
      databaseURL: 'https://todoapp-fbe30.firebaseio.com',
      projectId: 'todoapp-fbe30',
      storageBucket: '',
      messagingSenderId: '595197834721'
    };
    firebase.initializeApp(config);
  }
  render() {
    const MainNavigator = StackNavigator({
      request: { screen: RequestOTPScreen },
      verify: { screen: VerifyOTPScreen },
      todo: { screen: TodoScreen }
    });
    return (
      <View style={{ flex: 1, paddingTop: Expo.Constants.statusBarHeight }}>
        <MainNavigator />
      </View>
    );
  }
}
