import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StatusBar,
    ScrollView,
} from 'react-native';
import axios from 'axios'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/requested'
import { ttr } from '../global/url'
import { AuthContext } from '../context/authContext'
import { postNotification } from '../utils/postNotifications';

const TRequested = ({ navigation, route }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const { token } = React.useContext(AuthContext)

    const [data, setData] = React.useState([])

    const getAllRequests = async () => {
        try {
            const res = await axios({
                url: `${ttr}/requests/${route.params.id}`,
                method: 'get',
                headers: {
                    token: token
                }
            })
            if(res.status == 200){
                // console.log(JSON.stringify(res.data))
                setData(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const postAcceptRequest = async (postId, reqId, userId) => {
        try {
            const res = await axios({
                url: `${ttr}/acceptrequest`,
                method: 'post',
                data: {
                    postId, reqId, userId
                },
                headers: {
                    token: token
                }
            })
            if(res.status == 200){
                // console.log(JSON.stringify(res.data))
                // setData(res.data.data)
                postNotification(token, userId, postId, undefined, 'accepted your request to get enrolled')
                getAllRequests();
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getAllRequests();
    }, []);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>

            {data.map(item => 
                <View style={styles.row} key={item.reqId}>
                    <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TOthersProfile', params: { id: data.userId } })} style={styles.nameImageContainer} activeOpacity={0.7}>
                        <Image source={{ uri: item.avatar_url }} style={styles.pic}/>
                        <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                    </TouchableOpacity>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={() => postAcceptRequest(item.postId, item.reqId, item.userId)} style={styles.acceptButton} activeOpacity={0.7}>
                            <Text style={styles.buttonText}>Accept</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity style={styles.rejectButton} activeOpacity={0.7}>
                            <Text style={styles.buttonText}>Reject</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>)}

        </ScrollView>
    )
}

export default TRequested