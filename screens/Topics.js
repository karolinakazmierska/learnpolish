import React from 'react';
import { View, Text, Button, Image, FlatList, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Phrases extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: require('./../assets/data.json'),
            topics: [],
            isLoading: true
        }
    }
    componentDidMount = () => {
        let situation = this.props.navigation.getParam('name');
        if (situation) {
            const topicsObject = this.state.data.situations[situation].topics;
            if (topicsObject) {
                const topicsList = [];
                Object.keys(topicsObject).forEach((key, i) => {
                    let topic = key;
                    if (topicsObject[key].hasOwnProperty('text')) {
                        let obj = { 'text': topicsObject[key]['text'], 'id': i, 'situationName': situation, 'topicName': topic }
                        topicsList.push(obj);
                    }
                });
                this.setState({
                    topics: topicsList,
                    isLoading: false
                })
            }
        }
    }

    render() {
        return (
            <View style={styles.container}>
            {this.state.isLoading ?
                <ActivityIndicator size="large" color="#2077d7" />
                :
                <FlatList
                    data={this.state.topics}
                    renderItem={(item) => <TouchableOpacity
                        style={[styles.item, (item.item['topicName'] == 'vocab' ? {backgroundColor:'red'} : null)]}
                        onPress={() => this.props.navigation.navigate('Phrases', {topic: item.item['topicName'], situation: item.item['situationName']})} >
                            <Text style={styles.text}>{item.item['text']}</Text>
                            <Icon name='chevron-right' size={20} color="#fff" style={{textAlign: 'right'}} />
                        </TouchableOpacity> }
                    keyExtractor={item => item.id.toString()}
                />
            }
            </View>
        )
    }
}

export default Phrases;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        padding: 20,
        paddingTop: 40,
        justifyContent: 'space-around',
        flexWrap: 'wrap',
        backgroundColor: '#fff'
    },
    item: {
        borderRadius: 5,
        backgroundColor: '#2077d7',
        paddingVertical: 16,
        paddingHorizontal: 10,
        marginBottom: 10,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    vocabItem: {
        backgroundColor: '#dc2d15'
    },
    text: {
        color: '#fff'
    }
})
