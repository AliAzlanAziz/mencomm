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
import Modal from "react-native-modal"
import Entypo from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import Report from '../components/report'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/othersProfile'
import { std } from '../global/url'
import { AuthContext } from '../context/authContext'

const SOthersProfile = ({ navigation, route }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)
    const { token } = React.useContext(AuthContext)

    const [reportModalVisible, setReportModalVisible] = React.useState(false)
    const [user, setUser] = React.useState(false)
    const [data, setData] = React.useState([])

    const setRMVisibility = () => {
        setReportModalVisible(!reportModalVisible)
    }

    const getOthersProfile = async () => {
        try {
            const res = await axios({
                url: `${std}/othersprofile/${route.params.id}`,
                method: 'get',
                headers: {
                    token: token
                }
            })
            if(res.status == 200){
                setUser(res.data.user)
                setData(res.data.contracts)
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getOthersProfile();
    }, []);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            {user &&
                <View style={styles.userInfo}>
                    <Image source={{uri: user.avatar_url}} style={styles.image}/>
                    <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">{user.name}</Text>
                    <View style={styles.userRating}>
                        <AirbnbRating
                            defaultRating={Math.floor(user.rating) === Math.ceil(user.rating) ? Math.floor(user.rating) : Math.ceil(user.rating)}
                            size={18}
                            showRating={false}
                            isDisabled={true}
                            />
                        <Text style={styles.userRatingCount}>{user.rating}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('SStack', { screen: 'SChat' })} style={styles.saveButton}>
                        <Text style={styles.textSave}>Message <Entypo name="message" color={colors.backgroundColor} size={20}/></Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => setRMVisibility()} style={{marginLeft: 10}}>
                        <Entypo name="dots-three-horizontal" color={colors.text} size={20} />
                    </TouchableOpacity>
                </View>}
            <View style={styles.cardContainer}>
                {data.map(item => <View style={styles.card} key={item.id}>
                    <View style={styles.cardUserInfo}>
                        <Image source={{uri: item.avatar_url}} style={styles.cardAvatar} />
                        <View style={styles.cardUserInfoSeparator}>
                            <View style={styles.cardNameDate}>
                                <Text style={styles.cardName}>{item.name}</Text>
                                <Text style={styles.cardDate}>{new Date(item.created_on).toDateString()}</Text>
                            </View>
                            <View style={styles.cardRating}>
                                <AirbnbRating
                                    defaultRating={Math.floor(item.rating) === Math.ceil(item.rating) ? Math.floor(item.rating) : Math.ceil(item.rating)}
                                    size={14}
                                    showRating={false}
                                    isDisabled={true}
                                    />
                            </View>
                        </View>
                    </View>
                    {item?.review?.length > 0 && 
                        <View style={styles.cardFeedbackContainer}>
                            <Text style={styles.cardFeedback}>{item.review}</Text>
                        </View>}
                </View>)}
            </View>
            <Report userId={user.id} isPost={false} reportModalVisible={reportModalVisible} setRMVisibility={setRMVisibility} />
        </ScrollView>
    )
}

export default SOthersProfile