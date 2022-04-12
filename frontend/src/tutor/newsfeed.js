import React from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import Modal from "react-native-modal"
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/newsfeed'

const TNewsfeed = ({ navigation }) => {
    const { colors } = useTheme()
    const styles = createStyles(colors)

    const [isModalVisible, setModalVisible] = React.useState(false)
    
    const [data, setData] = React.useState([
        {id:1, img: require('../asset/astronaut.png'), name: 'Dr. Abdul Aziz', date: '12/12/2020', course: 'Object Oriented Programming', grade: 'Under Grad', tuitionType: 'Home Tuition', fee: '10000 PKR', address: 'R-442, Sector-8, North Karachi, North Karachi, North Karachi, Karachi, Pakistan', start_date: '18th Dec 2020, Wednesday', desc: 'Et ut elit duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipisicing non elit.'},
        {id:2, img: require('../asset/astronaut.png'), name: 'Dr. Abdul Aziz', date: '12/12/2020', course: 'Object Oriented Programming', grade: 'Under Grad', tuitionType: 'Home Tuition', fee: '10000 PKR', address: 'R-442, Sector-8, North Karachi, Karachi, Pakistan', start_date: '18th Dec 2020, Wednesday', desc: 'Et ut elit duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipisicing duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipis non elit.'},
        {id:3, img: require('../asset/astronaut.png'), name: 'Dr. Abdul Aziz', date: '12/12/2020', course: 'Object Oriented Programming', grade: 'Under Grad', tuitionType: 'Home Tuition', fee: '10000 PKR', address: 'R-442, Sector-8, North Karachi, Karachi, Pakistan', start_date: '18th Dec 2020, Wednesday', desc: 'Et ut elit duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mol duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipis lit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipisicing non elit.'},
        {id:4, img: require('../asset/astronaut.png'), name: 'Dr. Abdul Aziz', date: '12/12/2020', course: 'Object Oriented Programming', grade: 'Under Grad', tuitionType: 'Home Tuition', fee: '10000 PKR', address: 'R-442, Sector-8, North Karachi, Karachi, Pakistan', start_date: '18th Dec 2020, Wednesday', desc: 'Et ut elit duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipisicing non elit.'},
        {id:5, img: require('../asset/astronaut.png'), name: 'Dr. Abdul Aziz', date: '12/12/2020', course: 'Object Oriented Programming', grade: 'Under Grad', tuitionType: 'Home Tuition', fee: '10000 PKR', address: 'R-442, Sector-8, North Karachi, Karachi, Pakistan', start_date: '18th Dec 2020, Wednesday', desc: 'Et ut elit duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipis duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipis Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipisicing non elit.'},
    ])
    
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>

            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                {data.map(item => <View style={styles.post} key={item.id}>
                    <View style={styles.cardUserInfo}>
                        <Image source={item.img} style={styles.cardAvatar} />
                        <View style={styles.cardNameDate}>
                            <Text style={styles.cardName}>{item.name}</Text>
                            <View style={{flexDirection: "row"}}>
                                <Text style={styles.cardDate}>{item.date}</Text>
                                <TouchableOpacity onPress={() => setModalVisible(true)} style={{marginTop: 5, marginLeft: 10}} activeOpacity={0.7}>
                                    <Entypo name="dots-three-vertical" color={colors.text} size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={styles.postInfoContainer}>
                        <View style={styles.postInfo}>
                            <View style={styles.action}>
                                <AntDesign name="book" color={colors.text} size={20} />
                                <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">{item.course}</Text>
                            </View>
                            <View style={styles.action}>
                                <SimpleLineIcons name="graduation" color={colors.text} size={20} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.grade}</Text>
                            </View>
                            <View style={styles.action}>
                                <SimpleLineIcons name="home" color={colors.text} size={20} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.tuitionType}</Text>
                            </View>
                            <View style={styles.action}>
                                <MaterialIcons name="payment" color={colors.text} size={20} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.fee}</Text>
                            </View>
                            <View style={styles.action}>
                                <Ionicons name="location-outline" color={colors.text} size={20}/>
                                <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">{item.address}</Text>
                                <TouchableOpacity activeOpacity={0.7}>
                                    <FontAwesome name="map-o" color={colors.text} size={20}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.action}>
                                <Fontisto name="date" color={colors.text} size={20} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                                    Start Date: {item.start_date}
                                </Text>
                            </View>
                            <View style={styles.action}>
                                <Ionicons name="information-circle-outline" color={colors.text} size={20} />
                                <Text style={styles.text} numberOfLines={5} ellipsizeMode="tail">{item.desc}</Text>
                            </View>
                        </View>
                        <View style={styles.seeDetailsLinkContainer}>
                            <View style={styles.seeDetailsLink}>
                                <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TPostDetails'})} activeOpacity={0.7}>
                                    <Text style={styles.seeDetailsText}>See Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>)
                }
            </ScrollView>
            <Modal animationInTiming={500} style={{ margin: 0, justifyContent:"flex-end" }} isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} onBackButtonPress={() => setModalVisible(false)}>
                <StatusBar translucent={true} backgroundColor={"#1CAB5F"} barStyle="light-content"/>
                <TouchableOpacity style={styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Report User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Report Post</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Report Both</Text>
                </TouchableOpacity>
            </Modal>
        </View>
    )
}

export default TNewsfeed