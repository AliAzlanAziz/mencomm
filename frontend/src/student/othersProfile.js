import React from 'react'
import { AirbnbRating } from 'react-native-ratings'
import {
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/othersProfile'

const OthersProfile = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    return (
        <ScrollView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.userInfo}>
                <Image source={require('../asset/logo.png')} style={styles.image}/>
                <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
                    Dr. Abdul Aziz
                </Text>
                <View style={styles.userRating}>
                    <AirbnbRating
                        defaultRating={Math.floor(4.8) === Math.ceil(4.8) ? Math.floor(4.8) : Math.ceil(4.8)}
                        size={18}
                        showRating={false}
                        isDisabled={true}
                        />
                    <Text style={styles.userRatingCount}>
                        4.8
                    </Text>
                </View>
            </View>
            <View style={styles.button}>
                <TouchableOpacity onPress={() => navigation.navigate('#')} style={styles.saveButton}>
                    <Text style={styles.textSave}>Message <Entypo name="message" color={colors.backgroundColor} size={20}/></Text>
                </TouchableOpacity>
            </View>
            
        </ScrollView>
    )
}

export default OthersProfile