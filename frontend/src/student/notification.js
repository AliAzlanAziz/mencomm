import React from 'react'
import { 
    StatusBar,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    Image
 } from 'react-native'
import axios from 'axios'
import { auth } from '../global/url'
import { AuthContext } from '../context/authContext'
import { postReadNotification } from '../utils/postNotifications'

const SNotification = ({ navigation }) => {
    const { token } = React.useContext(AuthContext)

    const [data, setData] = React.useState([])

    const getNotifications = async () => {
        try {
            const res = await axios({
                url: `${auth}/getnotifications`,
                method: 'get',
                headers: {
                    token: token,
                }
            })
            if(res.status == 200){
                setData(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleNotifPress = (notifId, read, postId, contractId) => {
        if(!read){
            postReadNotification(token, notifId)
        }

        if(postId != undefined){
            navigation.navigate('SStack', { screen: 'SPostDetails', params: { id: postId }})
        }else{
            navigation.navigate('SStack', { screen: 'SContract', params: { id: contractId }})
        }
    }

    React.useEffect(() => {
        getNotifications();
    }, []);

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => handleNotifPress(item?.id, item?.read, item?.postId, item?.contractId)}>
                <View style={item.read ? styles.row : styles.rowUnique}>
                    <Image source={{ uri: item.avatar_url }} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                            <Text style={styles.dateText}>{new Date(item.time).toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.subjectText} numberOfLines={3} ellipsizeMode="tail">{item.description}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return(
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            {
                data.length > 0 ?
                    <FlatList 
                        extraData={data}
                        data={data}
                        keyExtractor = {(item) => {
                            return item.id;
                        }}
                        renderItem={renderItem}
                    />
                :
                    <View style={styles.noItemsContainer}>
                        <Text style={styles.noItemsText}>No notification to show</Text>
                    </View>
            }
        </View>
    );
}

export default SNotification

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#fff',
        borderBottomWidth: 1,
        padding: 10,
    },
    rowUnique: {
        flexDirection: 'row',
        alignItems: 'center',
        borderColor: '#DCDCDC',
        backgroundColor: '#FFF2F2',
        borderBottomWidth: 1,
        padding: 10,
    },
    pic: {
        borderRadius: 50,
        width: 60,
        height: 60,
    },
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    nameText: {
        fontFamily: 'Nunito-Regular',
        marginLeft: 10,
        color: '#000',
        fontSize: 18,
        width: '65%',
    },
    dateText: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '300',
        color: '#151515',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    subjectText: {
        fontFamily: 'Nunito-Regular',
        color: '#151515',
        fontSize: 16,
        marginLeft: 10,
        width: '65%',
    },
    prcText: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '300',
        color: '#151515',
        fontSize: 13
    },
    noItemsContainer: {
        alignItems: 'center', 
        justifyContent: 'center', 
        marginTop: 20
    },
    noItemsText: {
        fontFamily: 'Nunito-Regular',
        marginLeft: 10,
        color: '#000',
        fontSize: 18,
    }
});