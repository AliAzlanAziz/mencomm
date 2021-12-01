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
            <View style={styles.cardContainer}>
                <View style={styles.card}>
                    <View style={styles.cardUserInfo}>
                        <Image source={require('../asset/astronaut.png')} style={styles.cardAvatar} />
                        <View style={styles.cardUserInfoSeparator}>
                            <View style={styles.cardNameDate}>
                                <Text style={styles.cardName}>Ali Azlan Aziz</Text>
                                <Text style={styles.cardDate}>12/12/2020</Text>
                            </View>
                            <View style={styles.cardRating}>
                                <AirbnbRating
                                    defaultRating={Math.floor(4.8) === Math.ceil(4.8) ? Math.floor(4.8) : Math.ceil(4.8)}
                                    size={14}
                                    showRating={false}
                                    isDisabled={true}
                                    />
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardFeedbackContainer}>
                        <Text style={styles.cardFeedback}>He is the best student i ever met. Commodo voluptate sint adipisicing adipisicing veniam cillum in ex tempor ea minim incididunt aute ad. Est anim cupidatat Lorem laborum est proident eiusmod. Et fugiat non mollit culpa ad laboris eu enim Lorem irure consectetur nulla nulla. In ut eu elit proident eu ad. Elit pariatur incididunt aliquip in et incididunt tempor proident nostrud ex. Aliquip sit laboris non consequat tempor incididunt sint pariatur ipsum ipsum occaecat minim.</Text>
                    </View>
                </View>
            </View>            
        </ScrollView>
    )
}

export default OthersProfile