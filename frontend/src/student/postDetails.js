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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/postDetails'

const PostDetails = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const [enrolled, setEnrolled] = React.useState(false)

    return (
        <ScrollView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.userInfo}>
                <Image source={require('../asset/logo.png')} style={styles.image}/>
                <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">Dr. Abdul Aziz</Text>
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
            <View style={styles.action}>
                <AntDesign name="book" color={colors.text} size={20} />
                <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">Object Oriented Programming</Text>
            </View>
            <View style={styles.action}>
                <SimpleLineIcons name="graduation" color={colors.text} size={20} />
                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">Under Graduation</Text>
            </View>
            <View style={styles.action}>
                <SimpleLineIcons name="home" color={colors.text} size={20} />
                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">Home tuition</Text>
            </View>
            <View style={styles.action}>
                <MaterialIcons name="payment" color={colors.text} size={20} />
                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">10000 PKR</Text>
            </View>
            <View style={styles.action}>
                <Ionicons name="location-outline" color={colors.text} size={20}/>
                <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">R-442 Sector 8, North Karachi</Text>
                <TouchableOpacity>
                    <FontAwesome name="map-o" color={colors.text} size={20}/>
                </TouchableOpacity>
            </View>
            <View style={styles.action}>
                <Fontisto name="date" color={colors.text} size={20} />
                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">18th Dec 2020, Wednesday</Text>
            </View>
            <View style={styles.action}>
                <Ionicons name="ios-people-outline" color={colors.text} size={20} />
                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">Capacity: 100</Text>
            </View>
            <View style={styles.schedule}>
                <MaterialIcons name="schedule" color={colors.text} size={20} />
                <Text style={styles.text}>Schedule:</Text>
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
            <View style={styles.action}>
                <Ionicons name="information-circle-outline" color={colors.text} size={20} />
                <Text style={styles.text}>
                    Adipisicing consequat aliquip quis consequat deserunt dolore. Et duis esse irure do sint tempor occaecat aute voluptate voluptate exercitation cupidatat esse proident. Elit sint quis do sunt minim. Anim culpa dolor elit aliquip adipisicing quis magna. Qui laborum enim proident Lorem ad occaecat et sunt laborum dolore quis. Laboris occaecat ipsum deserunt mollit qui cillum exercitation excepteur consequat occaecat. Nisi fugiat mollit excepteur excepteur nisi veniam pariatur magna deserunt.
                    Laboris nisi id deserunt labore. Dolore proident velit sint qui excepteur duis. Qui culpa anim proident aute velit aute ea laborum ut labore duis nulla do.
                </Text>
            </View>
            <View style={styles.button}>
                {!enrolled && (
                    <TouchableOpacity onPress={() => setEnrolled(true)} style={styles.saveButton}>
                        <Text style={styles.textButton}>Enroll <Ionicons name="ios-arrow-up-circle-outline" color={colors.backgroundColor} size={20}/></Text>
                    </TouchableOpacity>
                )}
                {enrolled && (
                    <TouchableOpacity onPress={() => setEnrolled(false)} style={styles.cancelButton}>
                        <Text style={styles.textButton}>Cancel <Entypo name="circle-with-cross" color={colors.backgroundColor} size={18}/></Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.tutorButtonContainer}>
                <TouchableOpacity onPress={() => setEnrolled(true)} style={styles.reqButton}>
                    <Text style={styles.textButton}>Requests <AntDesign name="exclamationcircleo" color={colors.backgroundColor} size={18}/></Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setEnrolled(false)} style={styles.enrollButton}>
                    <Text style={styles.textButton}>Enrolled <MaterialCommunityIcons name="location-enter" color={colors.backgroundColor} size={18}/></Text>
                </TouchableOpacity>
            </View>
            <View style={styles.announcementButtonContainer}>
                <TouchableOpacity onPress={() => setEnrolled(true)} style={styles.announcementButton}>
                    <Text style={styles.textButton}>Announcments <FontAwesome name="sticky-note-o" color={colors.backgroundColor} size={16}/></Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default PostDetails