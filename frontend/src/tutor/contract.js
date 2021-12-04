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
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/contract'

const TContract = ({ navigation }) => {
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
                <MaterialIcons name="verified" color="#474ACC" size={25} />
            </View>
            <View style={styles.action}>
                <AntDesign name="book" color={colors.text} size={20} />
                <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
                    Object Oriented Programming
                </Text>
            </View>
            <View style={styles.action}>
                <SimpleLineIcons name="graduation" color={colors.text} size={20} />
                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                    Under Graduation
                </Text>
            </View>
            <View style={styles.action}>
                <SimpleLineIcons name="home" color={colors.text} size={20} />
                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                    Home tuition
                </Text>
            </View>
            <View style={styles.action}>
                <MaterialIcons name="payment" color={colors.text} size={20} />
                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                    10000 PKR
                </Text>
            </View>
            <View style={styles.action}>
                <Ionicons name="location-outline" color={colors.text} size={20}/>
                <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
                    R-442 Sector 8, North Karachi
                </Text>
                <TouchableOpacity>
                    <FontAwesome name="map-o" color={colors.text} size={20}/>
                </TouchableOpacity>
            </View>
            <View style={styles.action}>
                <Fontisto name="date" color={colors.text} size={20} />
                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                    18th Dec 2020, Wednesday
                </Text>
            </View>
            <View style={styles.schedule}>
                <MaterialIcons name="schedule" color={colors.text} size={20} />
                <Text style={styles.text}>
                    Schedule:
                </Text>
            </View>
            <View style={styles.scheduleList}>
                <View style={styles.scheduleListItem}>
                    <Text style={styles.scheduleListItemText}>Monday</Text>
                    <Text style={styles.scheduleListItemText}>06:00PM - 08:00PM</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 3}}>
                    <Text style={styles.scheduleListItemText}>Monday</Text>
                    <Text style={styles.scheduleListItemText}>06:00PM - 08:00PM</Text>
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', marginTop: 3}}>
                    <Text style={styles.scheduleListItemText}>Monday</Text>
                    <Text style={styles.scheduleListItemText}>06:00PM - 08:00PM</Text>
                </View>
            </View>
            <View style={styles.review}>
                <MaterialIcons name="feedback" color={colors.text} size={20}/>
                <Text style={styles.text}>
                    Feedback:
                </Text>
                <AirbnbRating
                    defaultRating={5}
                    size={20}
                    showRating={false}
                    isDisabled={true} //to be handle according to the situation
                />
            </View>
            <View style={styles.scheduleList}>
                <Text style={styles.text}>
                    Best Student I ever taught, May you live long and successful.
                </Text>
            </View>
            <View style={styles.review}>
                <FontAwesome name="star-o" color={colors.text} size={20}/>
                <Text
                    style={styles.text}>
                    Review:
                </Text>
                <AirbnbRating
                    defaultRating={0}
                    size={20}
                    showRating={false}
                    isDisabled={false} //to be handle according to the situation
                />
            </View>
            <TextInput 
                    placeholder="Write feedback"
                    placeholderTextColor="#666666"
                    style={styles.textInput}
                    multiline={true}
                    autoCapitalize="none"
                    onChangeText={() => {}}
                />
            <View style={styles.button}>
                <TouchableOpacity onPress={() => navigation.navigate('#')} style={styles.saveButton}>
                    <Text style={styles.textButton}>Done   <FontAwesome name="save" color={colors.backgroundColor} size={20}/></Text>
                </TouchableOpacity>
            </View>
            <View style={styles.cancelButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('#')} style={styles.cancelButton}>
                    <Text style={styles.textButton}>Cancel <Entypo name="circle-with-cross" color={colors.backgroundColor} size={18}/></Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default TContract