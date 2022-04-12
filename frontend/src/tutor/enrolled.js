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
import createStyles from '../style/tutor/enrolled'
import { ttr } from '../global/url'
import { AuthContext } from '../context/authContext'

const TEnrolled = ({ navigation, route }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const { token } = React.useContext(AuthContext)

    // const [data, setData] = React.useState([
    //     {id:1,  name: "Mark Doe Mark Doe Mark Doe Mark Doe", avatar_url:"https://bootdey.com/img/Content/avatar/avatar7.png"},
    //     {id:2,  name: "Clark Man",  avatar_url:"https://bootdey.com/img/Content/avatar/avatar6.png"},
    //     {id:3,  name: "Jaden Boor", avatar_url:"https://bootdey.com/img/Content/avatar/avatar5.png"},
    //     {id:4,  name: "Srick Tree", avatar_url:"https://bootdey.com/img/Content/avatar/avatar4.png"},
    //     {id:5,  name: "Erick Doe",  avatar_url:"https://bootdey.com/img/Content/avatar/avatar3.png"},
    //     {id:6,  name: "Francis Doe",avatar_url:"https://bootdey.com/img/Content/avatar/avatar2.png"},
    //     {id:8,  name: "Matilde Doe",avatar_url:"https://bootdey.com/img/Content/avatar/avatar1.png"},
    //     {id:9,  name: "John Doe",   avatar_url:"https://bootdey.com/img/Content/avatar/avatar4.png"},
    //     {id:10, name: "Fermod Doe", avatar_url:"https://bootdey.com/img/Content/avatar/avatar7.png"},
    //     {id:11, name: "Danny Doe",  avatar_url:"https://bootdey.com/img/Content/avatar/avatar1.png"},
    // ])

    const [data, setData] = React.useState([])

    const getAllEnrolls = async () => {
        try {
            const res = await axios({
                url: `${ttr}/enrolls/${route.params.id}`,
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

    const postRejectEnroll = async (postId, reqId) => {
        try {
            const res = await axios({
                url: `${ttr}/rejectenroll`,
                method: 'post',
                data: {
                    postId, reqId
                },
                headers: {
                    token: token
                }
            })
            if(res.status == 200){
                // console.log(JSON.stringify(res.data))
                // setData(res.data.data)
                getAllEnrolls();
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getAllEnrolls();
    }, []);

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>

            {data.map(item => <View style={styles.row} key={item.reqId}>
                <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TOthersProfile', params: { id: data.userId } })} style={styles.nameImageContainer} activeOpacity={0.7}>
                    <Image source={{ uri: item.avatar_url }} style={styles.pic}/>
                    <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={() => postRejectEnroll(item.postId, item.reqId)} style={styles.button} activeOpacity={0.7}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity> */}
            </View>)}

        </ScrollView>
    )
}

export default TEnrolled