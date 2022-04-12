import React from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'
import Entypo from 'react-native-vector-icons/Entypo'
import axios from 'axios'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/announcement'
import { std } from '../global/url'
import { AuthContext } from '../context/authContext'

const SAnnouncement = ({ navigation, route }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const { token } = React.useContext(AuthContext)

    const [isReportModalVisible, setReportModalVisible] = React.useState(false);
    const [isRMModalVisible, setRMModalVisible] = React.useState(false);
    const [data, setData] = React.useState(false)

    const handleReportPost = () => {
        setReportModalVisible(false);
        setRMModalVisible(true);
    }

    const getAnnouncements = async () => {
        try {
            const res = await axios({
                url: `${std}/announcements/${route.params.id}`,
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
        getAnnouncements();
    }, []);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar translucent={true} backgroundColor={'#2D52B0'} barStyle="light-content"/>
            <View style={styles.announcementContainer}>
                <Text style={styles.announcementText}>Announcements</Text>
            </View>

            <View style={styles.postsContainer}>
                {
                    data?.data?.map(item => <View style={styles.post} key={item._id}>
                        <View style={styles.cardUserInfo}>
                            <Image source={{ uri: data.avatar_url }} style={styles.cardAvatar} />
                            <View style={styles.cardNameDate}>
                                <Text style={styles.cardName}>{data.name}</Text>
                                <View style={{flexDirection: 'row', marginTop: 5}}>
                                    <Text style={styles.cardDate}>{new Date(item.time).toDateString()}</Text>
                                    <TouchableOpacity activeOpacity={0.7} onPress={() => setReportModalVisible(true)} style={{marginLeft: 5}}>
                                        <Entypo name="dots-three-vertical" color={colors.text} size={20} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={styles.action}>
                            <Text style={styles.text}>{item.description}</Text>
                        </View>
                    </View>
                )}
            </View>
            <Modal animationInTiming={500} style={{ margin: 0, justifyContent:"flex-end" }} isVisible={isReportModalVisible} onBackdropPress={() => setReportModalVisible(false)} onBackButtonPress={() => setReportModalVisible(false)}>
                <TouchableOpacity onPress={() => handleReportPost()} style={styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Report Post</Text>
                </TouchableOpacity>
            </Modal>
            <Modal animationInTiming={500} style={{ margin: 0, justifyContent:"flex-end" }} isVisible={isRMModalVisible} onBackdropPress={() => setRMModalVisible(false)} onBackButtonPress={() => setRMModalVisible(false)}>
                <TouchableOpacity style={styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Violence</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Harrassment</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Suicide or Self-injury</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Spam</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Hate Speech</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Terrorism</Text>
                </TouchableOpacity>
            </Modal>
        </ScrollView>
    )
}

export default SAnnouncement