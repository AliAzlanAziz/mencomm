import React from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
} from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/profile'
import { AuthContext } from '../context/authContext'

const SProfile = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const { profile } = React.useContext(AuthContext)

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.userInfoContainer}>
                <View style={styles.userInfo}>
                    <Image source={{uri: profile.avatar_url }} style={styles.image}/>
                    <View style={styles.nameRateContainer}>
                        <Text style={styles.name} numberOfLines={1} ellipsizeMode="tail">{profile.name}</Text>
                        <View style={styles.userRating}>
                            <AirbnbRating
                                defaultRating={Math.floor(profile.rating) === Math.ceil(profile.rating) ? Math.floor(profile.rating) : Math.ceil(profile.rating)}
                                size={18}
                                showRating={false}
                                isDisabled={true}
                                />
                            <Text style={styles.userRatingCount}>{profile.rating}</Text>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.userInfoSection}>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="email" color="#000" size={20}/>
                    <Text style={styles.text}>{profile.email}</Text>
                </View>
                <View style={styles.row}>
                    <MaterialCommunityIcons name="map-marker-radius" color="#000" size={20}/>
                    <Text style={styles.text}>{profile.location.address}</Text>
                </View>
            </View>
        </ScrollView>
    )
}

export default SProfile