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
import axios from 'axios'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/contract'
import { ttr } from '../global/url'
import { AuthContext } from '../context/authContext'

const TContract = ({ navigation, route }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)
    
    const { token } = React.useContext(AuthContext)
    const [formData, setFormData] = React.useState({
        rating: 0,
        review: ''
    })
    const [data, setData] = React.useState(false)

    const getContract = async () => {
        try {
            const res = await axios({
                url: `${ttr}/contract/${route.params.id}`,
                method: 'get',
                headers: {
                    token: token,
                }
            })
            if(res.status == 200){
                setData(res.data)
                // console.log(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    const postFeedback = async () => {
        try {
            if(formData.rating){
                const res = await axios({
                    url: `${ttr}/createfeedback`,
                    method: 'post',
                    data: {
                        contractId: data.id,
                        review: formData.review,
                        rating: formData.rating,
                        userId: data.userId
                    },
                    headers: {
                        token: token,
                    }
                })
                if(res.status == 200){
                    getContract();
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getContract();
    }, []);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            {data !== false && 
                <View>
                    <View style={styles.userInfo}>
                        <Image source={{ uri: data.avatar_url }} style={styles.image}/>
                        <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
                            {data.name}
                        </Text>
                        <View style={styles.userRating}>
                            <AirbnbRating
                                defaultRating={Math.floor(data.rating) === Math.ceil(data.rating) ? Math.floor(data.rating) : Math.ceil(data.rating)}
                                size={18}
                                showRating={false}
                                isDisabled={true}
                                />
                            <Text style={styles.userRatingCount}>
                                {data.rating}
                            </Text>
                        </View>
                        <MaterialIcons name="verified" color="#474ACC" size={25} />
                    </View>
                    <View style={styles.action}>
                        <AntDesign name="book" color={colors.text} size={20} />
                        <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
                            {data.course}
                        </Text>
                    </View>
                    <View style={styles.action}>
                        <SimpleLineIcons name="graduation" color={colors.text} size={20} />
                        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                            {data.grade}
                        </Text>
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
                        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                            {data.fee}
                        </Text>
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
                        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                            Start Date: {new Date(data.start_date).toLocaleDateString()}
                        </Text>
                    </View>
                    {data?.schedule?.length > 0 &&
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
                    {data.std_rating &&
                        <>
                            <View style={styles.review}>
                                <MaterialIcons name="feedback" color={colors.text} size={20}/>
                                <Text style={styles.text}>
                                    Feedback:
                                </Text>
                                <AirbnbRating
                                    defaultRating={data.std_rating}
                                    size={20}
                                    showRating={false}
                                    isDisabled={true} //to be handle according to the situation
                                />
                            </View>
                            {
                                data?.std_review?.length > 0 &&
                                <View style={styles.scheduleList}>
                                    <Text style={styles.text}>
                                        {data.std_review}
                                    </Text>
                                </View> 
                            }
                        </>
                    }
                    {data.ttr_rating &&
                        <>
                            <View style={styles.review}>
                                <FontAwesome name="star-o" color={colors.text} size={20}/>
                                <Text
                                    style={styles.text}>
                                    Review:
                                </Text>
                                <AirbnbRating
                                    defaultRating={data.ttr_rating}
                                    size={20}
                                    showRating={false}
                                    isDisabled={true} //to be handle according to the situation
                                />
                            </View>
                            {
                                data?.ttr_review?.length > 0 &&
                                <View style={styles.scheduleList}>
                                    <Text style={styles.text}>
                                        {data.ttr_review}
                                    </Text>
                                </View> 
                            }
                        </>
                    }
                    {!data.ttr_rating &&
                        <>
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
                                    onFinishRating={(val) => setFormData({...formData, rating: val})}
                                />
                            </View>
                            <TextInput 
                                placeholder="Write feedback"
                                placeholderTextColor="#666666"
                                style={styles.textInput}
                                multiline={true}
                                autoCapitalize="none"
                                value={formData.review}
                                onChangeText={(val) => setFormData({...formData, review: val})}
                            />
                            <View style={styles.button}>
                                <TouchableOpacity activeOpacity={0.7} onPress={() => postFeedback()} style={styles.saveButton}>
                                    <Text style={styles.textButton}>Done   <FontAwesome name="save" color={colors.backgroundColor} size={20}/></Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    }
                    {/* <View style={styles.cancelButtonContainer}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('#')} style={styles.cancelButton}>
                            <Text style={styles.textButton}>Cancel <Entypo name="circle-with-cross" color={colors.backgroundColor} size={18}/></Text>
                        </TouchableOpacity>
                    </View> */}
                </View>}
        </ScrollView>
    )
}

export default TContract