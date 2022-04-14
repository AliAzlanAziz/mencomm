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
import Modal from "react-native-modal"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/announcement'
import { ttr } from '../global/url'
import { AuthContext } from '../context/authContext'
import { postAnnouncementNotification } from '../utils/postNotifications'

const TAnnouncement = ({ navigation, route }) => {
    const { colors } = useTheme()
    const styles = createStyles(colors)

    const { token } = React.useContext(AuthContext)

    const [isModalVisible, setModalVisible] = React.useState(false)
    const [height, setHeight] = React.useState(0)
    const [announcement, setAnnouncement] = React.useState('')

    const [data, setData] = React.useState({data: []})

    const getAnnouncements = async () => {
        try {
            const res = await axios({
                url: `${ttr}/announcements/${route.params.id}`,
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

    const postAnnouncement = async () => {
        try {
            if(announcement.length > 0){
                const res = await axios({
                    url: `${ttr}/createannouncement`,
                    method: 'post',
                    data: {
                        id: route.params.id,
                        description: announcement
                    },
                    headers: {
                        token: token
                    }
                })
                if(res.status == 200){
                    // console.log(JSON.stringify(res.data))
                    // setData(res.data.data)
                    postAnnouncementNotification(token, route.params.id)
                    getAnnouncements();
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getAnnouncements();
    }, []);

    return (
        <ScrollView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <TouchableOpacity style={styles.announcementContainer} onPress={() => setModalVisible(true)} activeOpacity={0.7}>
                <Text style={styles.announcementText}>Make an announcement to the students...</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} onBackButtonPress={() => setModalVisible(false)}>
                <View>
                    <StatusBar translucent={true} backgroundColor={colors.text} barStyle="light-content"/>
                    <View style={{marginBottom: 20, alignItems: 'center', justifyContent: 'center', width: '95%', backgroundColor: '#fff', borderRadius: 18}}>
                        <TextInput 
                            placeholder="Write something"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {height: height}]}
                            onContentSizeChange={(e) => { e.nativeEvent.contentSize.height < 200 ? setHeight(e.nativeEvent.contentSize.height) : setHeight(400)}}
                            multiline={true}
                            autoCapitalize="none"
                            onChangeText={(val) => setAnnouncement(val)}
                        />
                    </View>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => {setModalVisible(false);postAnnouncement();}} style={styles.enrollButton} activeOpacity={0.7}>
                        <Text style={styles.textButton}>Post <Ionicons name="ios-arrow-up-circle-outline" color={colors.backgroundColor} size={20}/></Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton} activeOpacity={0.7}>
                        <Text style={styles.textButton}>Cancel <Entypo name="circle-with-cross" color={colors.backgroundColor} size={18}/></Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={styles.postsContainer}>
                {
                    data?.data?.map(item => <View style={styles.post} key={item._id}>
                        <View style={styles.cardUserInfo}>
                            <Image source={{ uri: data.avatar_url }} style={styles.cardAvatar} />
                            <View style={styles.cardNameDate}>
                                <Text style={styles.cardName}>{data.name}</Text>
                                <Text style={styles.cardDate}>{new Date(item.time).toDateString()}</Text>
                            </View>
                        </View>
                        <View style={styles.action}>
                            <Text style={styles.text}>{item.description}</Text>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

export default TAnnouncement