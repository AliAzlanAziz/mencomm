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
import axios from 'axios';
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/newsfeed'
import { ttr } from '../global/url'
import { AuthContext } from '../context/authContext'

const TAllUsersPost = ({ navigation }) => {
    const { colors } = useTheme()
    const styles = createStyles(colors)

    const { token } = React.useContext(AuthContext)

    const [isModalVisible, setModalVisible] = React.useState(false)
    
    // const [data, setData] = React.useState([
    //     {id:1, img: require('../asset/astronaut.png'), name: 'Dr. Abdul Aziz', date: '12/12/2020', course: 'Object Oriented Programming', grade: 'Under Grad', tuitionType: 'Home Tuition', fee: '10000 PKR', address: 'R-442, Sector-8, North Karachi, North Karachi, North Karachi, Karachi, Pakistan', start_date: '18th Dec 2020, Wednesday', desc: 'Et ut elit duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipisicing non elit.'},
    //     {id:2, img: require('../asset/astronaut.png'), name: 'Dr. Abdul Aziz', date: '12/12/2020', course: 'Object Oriented Programming', grade: 'Under Grad', tuitionType: 'Home Tuition', fee: '10000 PKR', address: 'R-442, Sector-8, North Karachi, Karachi, Pakistan', start_date: '18th Dec 2020, Wednesday', desc: 'Et ut elit duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipisicing duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipis non elit.'},
    //     {id:3, img: require('../asset/astronaut.png'), name: 'Dr. Abdul Aziz', date: '12/12/2020', course: 'Object Oriented Programming', grade: 'Under Grad', tuitionType: 'Home Tuition', fee: '10000 PKR', address: 'R-442, Sector-8, North Karachi, Karachi, Pakistan', start_date: '18th Dec 2020, Wednesday', desc: 'Et ut elit duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mol duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipis lit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipisicing non elit.'},
    //     {id:4, img: require('../asset/astronaut.png'), name: 'Dr. Abdul Aziz', date: '12/12/2020', course: 'Object Oriented Programming', grade: 'Under Grad', tuitionType: 'Home Tuition', fee: '10000 PKR', address: 'R-442, Sector-8, North Karachi, Karachi, Pakistan', start_date: '18th Dec 2020, Wednesday', desc: 'Et ut elit duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipisicing non elit.'},
    //     {id:5, img: require('../asset/astronaut.png'), name: 'Dr. Abdul Aziz', date: '12/12/2020', course: 'Object Oriented Programming', grade: 'Under Grad', tuitionType: 'Home Tuition', fee: '10000 PKR', address: 'R-442, Sector-8, North Karachi, Karachi, Pakistan', start_date: '18th Dec 2020, Wednesday', desc: 'Et ut elit duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipis duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipis Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipisicing non elit.'},
    // ])

    const [data, setData] = React.useState([])

    const getUserPost = async () => {
        try {
            const res = await axios({
                url: `${ttr}/allposts`,
                method: 'get',
                headers: {
                    token: token
                }
            })

            if(res.status == 200){
                setData(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getUserPost()
        return () => {
            setData([])
        }
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'#1CAB5F'} barStyle="light-content"/>

            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
            {data.map(item => <View style={styles.post} key={item.id}>
                    <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TOthersProfile', params: { id: item.userId } })} style={styles.cardUserInfo} activeOpacity={0.7}>
                        <Image source={{uri: item.avatar_url}} style={styles.cardAvatar} />
                        <View style={styles.cardNameDate}>
                            <Text style={styles.cardName}>{item.name}</Text>
                            <View style={{flexDirection: "row"}}>
                                <Text style={styles.cardDate}>{new Date(item.created_on).toLocaleDateString()}</Text>
                            </View>
                        </View>
                    </TouchableOpacity>
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
                            {
                            item?.tuition_type != '' && 
                                <View style={styles.action}>
                                    <SimpleLineIcons name="home" color={colors.text} size={20} />
                                    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.tuition_type}</Text>
                                </View>
                            }
                            <View style={styles.action}>
                                <MaterialIcons name="payment" color={colors.text} size={20} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.fee}</Text>
                            </View>
                            {
                            item?.address != '' && 
                                <View style={styles.action}>
                                    <Ionicons name="location-outline" color={colors.text} size={20}/>
                                    <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">{item.address}</Text>
                                    <TouchableOpacity activeOpacity={0.7}>
                                        <FontAwesome name="map-o" color={colors.text} size={20}/>
                                    </TouchableOpacity>
                                </View>
                            }
                            {
                            item?.start_date != '' &&
                                <View style={styles.action}>
                                    <Fontisto name="date" color={colors.text} size={20} />
                                    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                                        Start Date: {new Date(item.start_date).toDateString()}
                                    </Text>
                                </View>
                            }
                            {
                            item?.description != '' &&
                                <View style={styles.action}>
                                    <Ionicons name="information-circle-outline" color={colors.text} size={20} />
                                    <Text style={styles.text} numberOfLines={5} ellipsizeMode="tail">{item.description}</Text>
                                </View>
                            }
                            
                        </View>
                        <View style={styles.seeDetailsLinkContainer}>
                            <View style={styles.seeDetailsLink}>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('TStack', { screen: 'TPostDetails', params: { id: item.id } })}>
                                    <Text style={styles.seeDetailsText}>See Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>)
                }
            </ScrollView>
        </View>
    )
}

export default TAllUsersPost