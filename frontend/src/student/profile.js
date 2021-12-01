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
import createStyles from '../style/student/profile'

const Profile = ({navigation}) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)
    
    return (
        <ScrollView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.userInfoContainer}>
                <View style={styles.userInfo}>
                    <Image source={require('../asset/astronaut.png')} style={styles.image}/>
                    <View style={styles.nameRateContainer}>
                        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">Dr. Abdul Aziz</Text>
                        <View style={styles.userRating}>
                            <AirbnbRating
                                defaultRating={Math.floor(4.8) === Math.ceil(4.8) ? Math.floor(4.8) : Math.ceil(4.8)}
                                size={18}
                                showRating={false}
                                isDisabled={true}
                                />
                            <Text style={styles.userRatingCount}>4.8</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="map-marker-radius" color="#000" size={20}/>
                    <Text style={styles.text}>Kolkata, India</Text>
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="phone" color="#000" size={20}/>
                    <Text style={styles.text}>+91-900000009</Text>
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="email" color="#000" size={20}/>
                    <Text style={styles.text}>john_doe@email.com</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default Profile