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
    },
    Situations: {
        screen: Situations
    },
    Topics: {
        screen: Topics
    },
    Phrases: {
        screen: Phrases
    },
    Map: {
        screen: Map
    }
});

export default createAppContainer(AppNavigator);
