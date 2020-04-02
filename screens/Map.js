import React from 'react';
import { View, Text, Button, Image, FlatList, ScrollView, TouchableOpacity, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import MapView from 'react-native-maps';
import { Marker, Callout } from 'react-native-maps';
import icons from './../assets/icons/iconsMap';

const coordinates = {
    'Warsaw': { latitude: 52.231838, longitude: 21.0038063, latitudeDelta: 0.04, longitudeDelta: 0.04 }
}

class Map extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: require('./../assets/data.json'),
            city: '',
            places: [],
            categories: [],
            isLoading: true
        }
    }

    componentDidMount = () => {
        const city = this.props.navigation.getParam('city');
        const icons = this.state.data.icons;
        const places = this.state.data.places;

        if (city && icons && places) {
            const placesList = [];
            const categoriesList = [];
            const usedCategories = [];

            Object.keys(places).forEach((key, i) => {
                placesList.push(places[key]);
                if (!usedCategories.includes(places[key]['category'])) {
                    usedCategories.push(places[key]['category']);
                    let obj = {
                        'name': places[key]['category'],
                        'isActive': true
                    }
                    icons.forEach(icon => {
                        if (icon.name && icon.name == places[key]['category']) {
                            if (icon.icon) { obj.icon = icon.icon; }
                            if (icon.color) { obj.color = icon.color; }
                        }
                    })
                    categoriesList.push(obj);
                }
            })

            this.setState({
                city: city,
                places: placesList,
                categories: categoriesList,
                isLoading: false
            })
        }
    }
    getCoordinates = () => {
        let city = this.state.city;
        return coordinates[city];
    }
    goToPhrases = (situation) => {
        this.props.navigation.navigate('Topics', {name: situation})
    }
    getIconColor = (category) => {
        var color;
        this.state.categories.forEach(cat => {
            if (cat.name == category) {
                color = cat.color;
            }
        })
        return icons[color];
    }
    displayMarkers = () => {
        let categories = this.state.categories;
        let activeCategories = [];
        categories.forEach(c => {
            if (c.isActive) {
                activeCategories.push(c.name);
            }
        });
        let places = this.state.places;
        let filteredPlaces = places.filter(function(place) {
            if (activeCategories.includes(place.category)) {
                return place;
            }
        })

        return filteredPlaces.map((place, i) => (
            <Marker
                coordinate={place.coordinates}
                title={place.name}
                description={place.description}
                key={i}
                image={this.getIconColor(place.category)}>

                <Callout style={styles.callout} onPress={() => {this.goToPhrases(place.category)}}>
                    <Text style={styles.calloutTitle}>{place.name}</Text>
                    <Text style={styles.calloutDesc}>{place.description}</Text>
                    <View style={styles.calloutFooter}>
                        <Text style={styles.calloutCat}>{place.category}</Text>
                        <TouchableOpacity
                            style={styles.calloutPhrasesContainer}>
                            <Text style={styles.calloutPhrases}>Useful phrases</Text>
                            <Icon name='chevron-right' size={12} color='#dc2d15' />
                        </TouchableOpacity>
                    </View>
                </Callout>

            </Marker>
        ))
    }
    displayCategories = () => {
        return this.state.categories.map((cat, i) => (
            <View key={i} style={styles.catWrapper}>
                <TouchableOpacity
                    style={[styles.catIcon, (cat.isActive ? {backgroundColor:cat.color} : {backgroundColor:'grey'})]}
                    onPress={() => this.toggleCategoryDisplay(cat)}>
                    <Icon name={cat.icon} size={20} color="#fff" />
                </TouchableOpacity>
                <Text style={styles.catText}>{cat.name}</Text>
            </View>
        ))
    }
    toggleCategoryDisplay = (cat) => {
        let newCategories = this.state.categories;
        newCategories.forEach(o => {
            if (o.icon == cat.icon) {
                o.isActive ? o.isActive = false : o.isActive = true;
            }
        })
        this.setState({
            categories: newCategories
        })
    }
    render() {
        return (
            <View style={styles.container}>
            {this.state.isLoading ?
                <ActivityIndicator size="large" color="#2077d7" />
                :
                <View>
                    <MapView
                        style={styles.mapStyle}
                        initialRegion={this.getCoordinates()} >
                        {this.displayMarkers()}
                    </MapView>
                    <ScrollView style={styles.details} horizontal>
                        {this.displayCategories()}
                    </ScrollView>
                </View>
            }
            </View>
    )}
}

export default Map;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    mapStyle: {
        width: Dimensions.get('window').width,
        height: Dimensions.get('window').height / 2,
        flex: 5
    },
    details: {
        flex: 1,
        flexDirection: 'row',
        paddingHorizontal: 15,
    },
    catWrapper: {
        margin: 16
    },
    catIcon: {
        borderRadius: 500,
        backgroundColor: 'green',
        height: 50,
        width: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    catText: {
        textAlign: 'center',
        marginTop: 6
    },
    callout: {
        height: 'auto',
        display: 'flex',
        flexDirection: 'column',
        padding: 6
    },
    calloutTitle: {
        fontWeight: 'bold'
    },
    calloutDesc: {
        width: Dimensions.get('window').width * 0.7
    },
    calloutFooter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10
    },
    calloutCat: {
        color: '#C8C8C8'
    },
    calloutPhrasesContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center'
    },
    calloutPhrases: {
        color: '#dc2d15',
        fontWeight: 'bold',
        marginRight: 5
    }
})
