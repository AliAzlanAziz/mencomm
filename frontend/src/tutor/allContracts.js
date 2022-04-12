import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    StatusBar,
} from 'react-native';
import axios from 'axios'
import styles from '../style/student/allContracts'
import { std } from '../global/url'
import { AuthContext } from '../context/authContext'

const TAllContracts = ({ navigation }) => {
    const { token } = React.useContext(AuthContext)

    const [data, setData] = React.useState([])

    const getAllContracts = async () => {
        try {
            const res = await axios({
                url: `${std}/allcontracts`,
                method: 'get',
                headers: {
                    token: token,
                }
            })
            if(res.status == 200){
                setData(res.data.data)
                // console.log(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    React.useEffect(() => {
        getAllContracts();
    }, []);

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('TStack', { screen: 'TContract', params: { id: item.id }})}>
                <View style={styles.row}>
                    <Image source={{ uri: item.avatar_url }} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                            <Text style={styles.dateText}>{new Date(item.start_date).toLocaleDateString()}</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.subjectText} numberOfLines={1} ellipsizeMode="tail">{item.course}</Text>
                            <Text style={styles.prcText}>{item.fee}</Text>
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
                        <Text style={styles.noItemsText}>No contracts to show</Text>
                    </View>
            }
        </View>
    );
}

export default TAllContracts