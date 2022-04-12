import React from 'react'
import {
    Text,
    View,
    TextInput,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    StyleSheet
} from 'react-native'       
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Marker } from "react-native-maps"

//https://github.com/NikValdez/react-native-maps/blob/master/App.js link from where map help is taken
//https://www.youtube.com/watch?v=qlELLikT3FU

const Map = ({ navigation }) => {
    const [ region, setRegion ] = React.useState({
		latitude: 24.8569,
		longitude: 67.2647,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})

    return (
        <View style={styles.container}>
            <GooglePlacesAutocomplete
                placeholder="Search"
                // fetchDetails={true}
                // GooglePlacesSearchQuery={{
                //     rankby: "distance"
                // }}
                onFail={error => console.error(error)}
                onPress={(data, details = null) => {
                    // 'details' is provided when fetchDetails = true
                    console.log(data, details)
                    // setRegion({
                    //     latitude: details.geometry.location.lat,
                    //     longitude: details.geometry.location.lng,
                    //     latitudeDelta: 0.0922,
                    //     longitudeDelta: 0.0421
                    // })
                }}
                query={{
                    key: "AIzaSyASfv0sgGQ5pQTeT-N0eYn4ius8-S-2Wuk",
                    language: "en",
                    // components: "country:pk",
                    // types: "establishment",
                    // radius: 30000,
                    // location: `${region.latitude}, ${region.longitude}`
                }}
                styles={{
                    container: { flex: 1, position: "absolute", width: "90%", zIndex: 1, marginTop:60, },
                    listView: { backgroundColor: "white" }
                }}
            />
            <MapView style={styles.map} initialRegion={region} provider="google">
                <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
            </MapView>
        </View>
    )
}

export default Map

var styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        alignItems: 'center',
    },
    map: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        // ...StyleSheet.absoluteFillObject,
        // width: Dimensions.get("window").width,
        // height: Dimensions.get("window").height,
    }
})