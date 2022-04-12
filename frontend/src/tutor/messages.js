import React from 'react'
import { 
    StyleSheet,
    FlatList,
    Text,
    View,
    Image,
    TouchableOpacity
} 
from 'react-native'

const TMessages = ({ navigation }) => {
    const [data, setData] = React.useState( [
        {id:'1',user:'John',image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',time:'4 mins ago',messagetext:'Hello Developer'},
        {id:'2',user:'John',image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',time:'4 mins ago',messagetext:'Hello Developer'},
        {id:'3',user:'John',image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',time:'4 mins ago',messagetext:'Hello Developer'},
        {id:'4',user:'John',image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',time:'4 mins ago',messagetext:'Hello Developer'}
    ])

    const renderItem = ({item}) => {
        return(
            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('TStack', { screen: 'TChat', params: { userName:item.user }})}>
                <View style={styles.listContainer}>
                    <View style={styles.HeaderLeftImageView}>
                        <Image style={styles.HeaderLeftImage} source={{uri: item.image}}/>
                    </View>
                    <View style={styles.userInfo}>
                        <View style={{flexDirection:'row', alignItems: 'space-between'}}>
                            <Text style={styles.user}> {item.user} </Text>
                            <Text style={styles.time}>{item.time} </Text>
                        </View>
                        <Text style={styles.Text}> {item.messagetext} </Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={data}
                keyExtractor = {(item,index) => {
                    return index.toString()
                }}
                renderItem={renderItem}
                />
        </View>
    )
}

export default TMessages

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },
    listContainer:{
        flex:1,
        width:'100%',
        height:'100%',
        paddingVertical:10,
        marginTop:3,
        backgroundColor: 'white',
        flexDirection: 'row',
    },
    HeaderLeftImage:{
        width:'100%',
        height:'100%',
        borderRadius:50,
    },
    HeaderLeftImageView:{
        width:50,
        height:50,
        borderRadius:40/2,
        marginLeft:15,
    },
    userInfo: {
        marginLeft:5, 
        marginTop: 5
    },
    Text:{
        color: "#878787",
    },
    time: {
        color:'#64676B',
        marginLeft: 5
    },
    user:{
        color:'#0E9D50'
    }
})
