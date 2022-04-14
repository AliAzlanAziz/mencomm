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
import Modal from "react-native-modal"
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import axios from 'axios'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/postDetails'
import { ttr } from '../global/url'
import { AuthContext } from '../context/authContext'

const TPostDetails = ({ navigation, route }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const { token } = React.useContext(AuthContext)

    const [isModalVisible, setModalVisible] = React.useState(false)
    const [data, setData] = React.useState(false)

    const getPost = async () => {
        try {
            const res = await axios({
                url: `${ttr}/post/${route.params.id}`,
                method: 'get',
                headers: {
                    token: token
                }
            })
            if(res.status == 200){
                // console.log(JSON.stringify(res.data))
                setData(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getPost();
    }, []);

    return (
        <View style={styles.container}>
            <StatusBar translucent={false} backgroundColor={"#1CAB5F"} barStyle="light-content"/>
            <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            {data &&
                    <View style={{marginLeft: 5}}>
                        <View style={styles.userInfoContainer}>
                            <TouchableOpacity style={styles.userInfo} activeOpacity={0.7} onPress={() => navigation.navigate('TStack', { screen: 'TOthersProfile', params: { id: data.userId } })}>
                                <Image source={{uri: data.avatar_url || 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png'}} style={styles.image}/>
                                <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">{data.name}</Text>
                                <View style={styles.userRating}>
                                    <AirbnbRating
                                        defaultRating={Math.floor(data.rating) === Math.ceil(data.rating) ? Math.floor(data.rating) : Math.ceil(data.rating)}
                                        size={18}
                                        showRating={false}
                                        isDisabled={true}
                                        />
                                    <Text style={styles.userRatingCount}>{data.rating}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(true)}>
                                <Entypo name="dots-three-horizontal" color={colors.text} size={20} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.action}>
                            <AntDesign name="book" color={colors.text} size={20} />
                            <Text style={styles.text}>{data.course}</Text>
                        </View>
                        <View style={styles.action}>
                            <SimpleLineIcons name="graduation" color={colors.text} size={20} />
                            <Text style={styles.text}>{data.grade}</Text>
                        </View>
                        {
                        data?.tuition_type != '' && 
                            <View style={styles.action}>
                                <SimpleLineIcons name="home" color={colors.text} size={20} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{data.tuition_type}</Text>
                            </View>
                        }
                        <View style={styles.action}>
                            <MaterialIcons name="payment" color={colors.text} size={20} />
                            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{data.fee}</Text>
                            {/* <StripeProvider publishableKey={"pk_test_emED6Iluek2T2xHVDyJCDmHh00EpY66lve"}>
                                <TouchableOpacity activeOpacity={0.5} onPress={() => subscribe()}>
                                    <Ionicons name="ios-card-outline" color={colors.text} size={20}/>
                                </TouchableOpacity>
                            </StripeProvider> */}
                        </View>
                        {
                        data?.address != '' && 
                            <View style={styles.action}>
                                <Ionicons name="location-outline" color={colors.text} size={20}/>
                                <Text style={styles.text}>{data.address}</Text>
                                <TouchableOpacity activeOpacity={0.5}>
                                    <FontAwesome name="map-o" color={colors.text} size={20}/>
                                </TouchableOpacity>
                            </View>
                        }
                        <View style={styles.action}>
                            <Fontisto name="date" color={colors.text} size={20} />
                            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">Start Date: {new Date(data.start_date).toDateString()}</Text>
                        </View>
                        {
                        data?.schedule.length > 0 &&
                            <>
                                <View style={styles.schedule}>
                                    <MaterialIcons name="schedule" color={colors.text} size={20} />
                                    <Text style={styles.text}>Schedule:</Text>
                                </View>
                                <View style={styles.scheduleList}>
                                    {data?.schedule?.map(item => <View style={styles.scheduleListItem} key={item.day}>
                                            <Text style={styles.scheduleListItemText}>{item.day}</Text>
                                            <Text style={styles.scheduleListItemText}>{new Date(item.start_time).toTimeString().split(':')[0]}:{new Date(item.start_time).toTimeString().split(':')[1]} - {new Date(item.end_time).toTimeString().split(':')[0]}:{new Date(item.end_time).toTimeString().split(':')[1]}</Text>
                                        </View>
                                    )}
                                </View>
                            </>
                        }
                        {
                        data?.description != '' &&
                            <View style={styles.action}>
                                <Ionicons name="information-circle-outline" color={colors.text} size={20} />
                                <Text style={styles.text}>{data.description}</Text>
                            </View>
                        }
                    </View>
                }
                <View style={styles.tutorButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TRequested', params: { id: data.id } })} style={styles.reqButton} activeOpacity={0.7}>
                        <Text style={styles.textButton}>Requests <AntDesign name="exclamationcircleo" color={colors.backgroundColor} size={18}/></Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TEnrolled', params: { id: data.id } })} style={styles.enrollButton} activeOpacity={0.7}>
                        <Text style={styles.textButton}>Enrolled <MaterialCommunityIcons name="location-enter" color={colors.backgroundColor} size={18}/></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.announcementButtonContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TAnnouncement', params: { id: data.id } })} style={styles.announcementButton} activeOpacity={0.7}>
                        <Text style={styles.textButton}>Announcments <FontAwesome name="sticky-note-o" color={colors.backgroundColor} size={16}/></Text>
                    </TouchableOpacity>
                </View>
                <Modal animationInTiming={500} style={{ margin: 0, justifyContent:"flex-end" }} isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} onBackButtonPress={() => setModalVisible(false)}>
                    <TouchableOpacity style={styles.modalList} activeOpacity={0.7}>
                        <Text style={styles.modalListText}>Report Post</Text>
                    </TouchableOpacity>
                </Modal>
            </ScrollView>
        </View>
    )
}

export default TPostDetails