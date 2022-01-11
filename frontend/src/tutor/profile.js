import React from 'react'
import {
    Text,
    View,
    TextInput,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/profile'

const TProfile = ({navigation}) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)
    
    const [user, setUser] = React.useState({
        name: 'Ali Azlan Aziz', 
        rating: 4.8,
        img: require('../asset/astronaut.png'),
        address: 'R-442, Sector 8, North Karachi, Karachi, Pakistan',
        email: 'aliazlan123@mail.com'
    })

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.userInfoContainer}>
                <View style={styles.userInfo}>
                    <Image source={require('../asset/astronaut.png')} style={styles.image}/>
                    <View style={styles.nameRateContainer}>
                        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{user.name}</Text>
                        <View style={styles.userRating}>
                            <AirbnbRating
                                defaultRating={Math.floor(user.rating) === Math.ceil(user.rating) ? Math.floor(user.rating) : Math.ceil(user.rating)}
                                size={18}
                                showRating={false}
                                isDisabled={true}
                                />
                            <Text style={styles.userRatingCount}>{user.rating}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="email" color="#000" size={20}/>
                    <Text style={styles.text}>{user.email}</Text>
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="map-marker-radius" color="#000" size={20}/>
                    <Text style={styles.text}>{user.address}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default TProfile