import React from 'react';
import { View, Text, Button, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Situations extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: require('./../assets/data.json'),
            situations: [],
            isLoading: true,
            isConnected: false
        }
    }

    componentDidMount = () => {
        const situationsObject = this.state.data.situations;
        const situationsList = [];
        Object.keys(situationsObject).forEach((key, i) => {
            if (situationsObject[key].hasOwnProperty('icon')) {
                let obj = { 'text': key, 'icon': situationsObject[key]['icon'] }
                situationsList.push(obj);
            }
        })
        this.setState({
            situations: situationsList,
            isLoading: false
        })
    }

    renderSituations = (situations) => {
        return situations.map((obj, i) => {
            return <View style={styles.situationWrapper} key={i}>
                <TouchableOpacity
                    style={styles.imageWrapper}
                    activeOpacity={0.8}
                    onPress={() => this.navigateToTopics(obj.text)}>
                    <Icon name={obj.icon} size={40} color="#fff" />
                </TouchableOpacity>
                <Text  style={styles.situationText}>{obj.text}</Text>
            </View>
        })
    }
    navigateToTopics = (name) => {
        if (name != 'favourites') {
            this.props.navigation.navigate('Topics', {name: name})
        } else {
            this.props.navigation.navigate('Phrases', {topic: 'all', situation: name})
        }
    }
    render() {
        return (
            <View style={styles.container}>
                {this.state.isLoading ?
                    <ActivityIndicator size="large" color="#2077d7" />
                    :
                    this.renderSituations(this.state.situations)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        paddingTop: 50,
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        backgroundColor: '#fff',
        flex: 1,
        paddingHorizontal: 30
    },
    situationWrapper: {
        alignItems: 'center',
        marginBottom: 20
    },
    imageWrapper: {
        backgroundColor: '#2077d7',
        width: 120,
        height: 120,
        borderRadius: 8,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    situationText: {
        marginTop: 20,
        marginBottom: 20,
        textTransform: 'capitalize'
    }
})

export default Situations;
