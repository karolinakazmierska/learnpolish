import React from 'react';
import { View, Text, Button, StyleSheet, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const windowWidth = Dimensions.get('window').width;

class Welcome extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.img} source={require('./../assets/warsaw.jpg')} resizeMode={'contain'} />
                <ScrollView style={styles.scroll}>
                    <TouchableOpacity
                        onPress={ () => this.props.navigation.navigate('Situations', {title: 'Navigated'}) }
                        style={[styles.btn, styles.btnBlue]}
                    >
                        <Text style={styles.title}>Learn Polish in everyday situations</Text>
                        <Text style={styles.txt}>Choose where you are and get personalized and ready to use phrases</Text>
                        <View style={styles.chevron}>
                            <Icon name='chevron-right' size={20} color="#fff" style={{textAlign: 'right'}} />
                            <Icon name='chevron-right' size={20} color="#fff" style={{textAlign: 'right'}} />
                            <Icon name='chevron-right' size={20} color="#fff" style={{textAlign: 'right'}} />
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={ () => this.props.navigation.navigate('Map', {city: 'Warsaw'}) }
                        style={[styles.btn, styles.btnRed]}
                    >
                        <Text style={styles.title}>Discover Warsaw</Text>
                        <Text style={styles.txt}>Check our personalized list of recommendations for bars, museums, and other places of interest!</Text>
                        <View style={styles.chevron}>
                            <Icon name='chevron-right' size={20} color="#fff" style={{textAlign: 'right'}} />
                            <Icon name='chevron-right' size={20} color="#fff" style={{textAlign: 'right'}} />
                            <Icon name='chevron-right' size={20} color="#fff" style={{textAlign: 'right'}} />
                        </View>
                    </TouchableOpacity>

                </ScrollView>
            </View>
        );
    }
}

export default Welcome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#fff',
    },
    img: {
        width: windowWidth,
        height: windowWidth*0.614
    },
    scroll: {
        marginTop: -20,
        width: '100%',
        borderRadius: 20,
        backgroundColor: '#fff',
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    btn: {
        borderRadius: 16,
        padding: 16,
        marginBottom: 14
    },
    title: {
        color: '#fff',
        fontWeight: 'bold',
        lineHeight: 28,
        fontSize: 18,
        paddingRight: 8,
        marginBottom: 8
    },
    txt: {
        color: '#fff',
        lineHeight: 20
    },
    btnBlue: {
        backgroundColor: '#2077d7'
    },
    btnRed: {
        backgroundColor: '#dc2d15'
    },
    chevron: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end'
    }
})
