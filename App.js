import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Welcome from './screens/Welcome';
import Situations from './screens/Situations';
import Topics from './screens/Topics';
import Phrases from './screens/Phrases';
import Map from './screens/Map';

const AppNavigator = createStackNavigator({
    Welcome: {
        screen: Welcome,
        navigationOptions: ({ navigation }) => ({
            title: 'Welcome!',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#2077d7',
            },
        }),
    },
    Situations: {
        screen: Situations,
        navigationOptions: ({ navigation }) => ({
            title: 'Situations',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#2077d7',
            },
        }),
    },
    Topics: {
        screen: Topics,
        navigationOptions: ({ navigation }) => ({
            title: 'Topics',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#2077d7',
            },
        }),
    },
    Phrases: {
        screen: Phrases,
        navigationOptions: ({ navigation }) => ({
            title: 'Phrases',
            headerTintColor: '#fff',
            headerStyle: {
                backgroundColor: '#2077d7',
            },
        }),
    },
    Map: {
        screen: Map
    }
});

export default createAppContainer(AppNavigator);
