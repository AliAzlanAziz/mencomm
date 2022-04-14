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
import axios from 'axios'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/othersProfile'
import { std } from '../global/url'
import { AuthContext } from '../context/authContext'

const SOthersProfile = ({ navigation, route }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)
    const { token } = React.useContext(AuthContext)

    const [data, setData] = React.useState([])

    const getOthersProfile = async () => {
        try {
            const res = await axios({
                url: `${std}/feedbacks`,
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
        getOthersProfile();
    }, []);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
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
        </ScrollView>
    )
}

export default SOthersProfile