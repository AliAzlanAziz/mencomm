import React from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import Modal from "react-native-modal"
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Report from '../components/report'
import axios from 'axios';
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/newsfeed'
import { std } from '../global/url'
import { AuthContext } from '../context/authContext'

const SNewsfeed = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const { token } = React.useContext(AuthContext)

    const [reportModalVisible, setReportModalVisible] = React.useState(false)
    const [data, setData] = React.useState([])

    const setRMVisibility = () => {
        setReportModalVisible(!reportModalVisible)
    }

    const getNewsfeed = async () => {
        try {
            const res = await axios({
                url: `${std}/newsfeed`,
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
        getNewsfeed()
        return () => {
            setData([])
        }
    }, [])

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'#2D52B0'} barStyle="light-content"/>

            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                {data.map(item => 
                    <View key={item.id}>
                        <View style={styles.post}>
                            <TouchableOpacity onPress={() => navigation.navigate('SStack', { screen: 'SOthersProfile', params: { id: item.userId } })} style={styles.cardUserInfo} activeOpacity={0.7}>
                                <Image source={{uri: item.avatar_url}} style={styles.cardAvatar} />
                                <View style={styles.cardNameDate}>
                                    <Text style={styles.cardName}>{item.name}</Text>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={styles.cardDate}>{new Date(item.created_on).toLocaleDateString()}</Text>
                                        <TouchableOpacity activeOpacity={0.5} onPress={() => setRMVisibility()} style={{marginTop: 5, marginLeft: 10}}>
                                            <Entypo name="dots-three-vertical" color={colors.text} size={20} />
                                        </TouchableOpacity>
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
                                    {/* {
                                    item?.tuition_type != '' && 
                                        <View style={styles.action}>
                                            <SimpleLineIcons name="home" color={colors.text} size={20} />
                                            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.tuition_type}</Text>
                                        </View>
                                    } */}
                                    <View style={styles.action}>
                                        <MaterialIcons name="payment" color={colors.text} size={20} />
                                        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.fee}</Text>
                                    </View>
                                    {/* {
                                    item?.address != '' && 
                                        <View style={styles.action}>
                                            <Ionicons name="location-outline" color={colors.text} size={20}/>
                                            <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">{item.address}</Text>
                                            <TouchableOpacity activeOpacity={0.7}>
                                                <FontAwesome name="map-o" color={colors.text} size={20}/>
                                            </TouchableOpacity>
                                        </View>
                                    } */}
                                    {/* {
                                    item?.start_date != '' &&
                                        <View style={styles.action}>
                                            <Fontisto name="date" color={colors.text} size={20} />
                                            <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                                                Start Date: {new Date(item.start_date).toDateString()}
                                            </Text>
                                        </View>
                                    } */}
                                    {/* {
                                    item?.description != '' &&
                                        <View style={styles.action}>
                                            <Ionicons name="information-circle-outline" color={colors.text} size={20} />
                                            <Text style={styles.text} numberOfLines={5} ellipsizeMode="tail">{item.description}</Text>
                                        </View>
                                    } */}
                                </View>
                                <View style={styles.seeDetailsLinkContainer}>
                                    <View style={styles.seeDetailsLink}>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('SStack', { screen: 'SPostDetails', params: { id: item.id } })}>
                                            <Text style={styles.seeDetailsText}>See Details</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Report userId={item.id} isPost={false} reportModalVisible={reportModalVisible} setRMVisibility={setRMVisibility} />
                    </View>)
                }
            </ScrollView>
        </View>
    )
}

export default SNewsfeed