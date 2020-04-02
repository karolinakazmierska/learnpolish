import React from 'react';
import { View, Text, Button, Image, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Constants, Audio } from 'expo-av';
import sounds from './../assets/sounds/soundMap';

class Phrases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: require('./../assets/data.json'),
            phrases: [],
            isLoading: true
        }
    }
    componentDidMount = () => {
        let topic = this.props.navigation.getParam('topic');
        let situation = this.props.navigation.getParam('situation');
        if (topic && situation) {
            const phrases =  this.state.data.situations[situation].topics[topic].phrases;
            const phrasesList = [];
            if (phrases) {
                phrases.forEach(obj => {
                    obj.visible = 'EN';
                    phrasesList.push(obj)
                })
                this.setState({
                    phrases: phrasesList,
                    isLoading: false
                })
            }
        }
    }
    toggleLanguage = (obj) => {
        let newState = this.state.phrases;
        newState.forEach(o => {
            if (o == obj) {
                o['visible'] == 'EN' ? o['visible'] = 'PL' : o['visible'] = 'EN'
            }
        })
        this.setState({
            phrases: newState
        })
    }
    async playSound(soundID) {
        let topic = this.props.navigation.getParam('topic');
        let situation = this.props.navigation.getParam('situation');

        const soundObject = new Audio.Sound();
        if (sounds[soundID]) {
            try {
                await soundObject.loadAsync(sounds[soundID]);
                await soundObject.playAsync();
            } catch (error) {
                console.log(error)
            }
        }
    }
    renderPhrases = (phrases) => {
        return phrases.map((obj, i) => {
            let cssEN = {lineHeight: 52};
            let cssPL = {backgroundColor: '#2077d7', color: '#fff', lineHeight: 52};
            let css = (obj['visible'] == 'EN' ? cssEN : cssPL);
            return (
                <TouchableOpacity
                    style={[styles.phraseWrapper, css]}
                    key={i}
                    onPress={() => this.toggleLanguage(obj)}
                >
                    <Text style={css}>{obj[obj['visible']]}</Text>
                    {obj['visible'] == 'PL' &&
                        <TouchableOpacity style={styles.soundIcon} onPress={() => this.playSound(obj['soundID'])}>
                            <Icon name='play-circle' size={40} color="#fff" />
                        </TouchableOpacity>
                    }
                </TouchableOpacity>
            )
        })
    }
    render() {
        return(
            <View style={styles.container}>
                {this.state.isLoading ?
                    <ActivityIndicator size="large" color="#2077d7" />
                    :
                    this.renderPhrases(this.state.phrases)
                }
            </View>
        )
    }
}

export default Phrases;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column'
    },
    phraseWrapper: {
        paddingVertical: 4,
        paddingLeft: 20,
        backgroundColor: '#fff',
        marginTop: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    soundIcon: {
        paddingHorizontal: 24,
        display: 'flex',
        justifyContent: 'center'
    }
})
