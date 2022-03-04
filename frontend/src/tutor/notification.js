import React from 'react'
import { 
    StyleSheet,
    Text,
    View,
    FlatList,
    Image
} from 'react-native'

const TNotification = () => {
    const [data,setData]= React.useState([
        {id:'1', from:'Tom', Action:'Requested to join classroom', image:'https://media.istockphoto.com/photos/cute-kitten-in-nature-picture-id502888545', date:'12-9-2021', time:'10:00 PM' },
        {id:'2', from:'Mohit', Action:'Requested to join classroom', image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg', date:'12-9-2021', time:'10:00 PM' },
        {id:'3', from:'Ali', Action:'Requested to join classroom', image:'https://media.istockphoto.com/photos/colorful-sunset-at-davis-lake-picture-id1184692500', date:'12-9-2021', time:'10:00 PM' },
        {id:'4', from:'Haris',Action:'Requested to join classroom', image:'https://media.istockphoto.com/photos/cute-kitten-in-nature-picture-id502888545', date:'12-9-2021', time:'10:00 PM' },
        {id:'1', from:'Tom', Action:'Requested to join classroom', image:'https://media.istockphoto.com/photos/cute-kitten-in-nature-picture-id502888545', date:'12-9-2021', time:'10:00 PM' },
        {id:'1', from:'Tom', Action:'Requested to join classroom', image:'https://media.istockphoto.com/photos/cute-kitten-in-nature-picture-id502888545', date:'12-9-2021', time:'10:00 PM' },
    ])

    const renderItem = ({item}) => {
        return(
            <View style={styles.listContainer}>
                <View style={styles.HeaderLeftImageView}>
                    <Image style={styles.HeaderLeftImage} source={{uri:item.image}}/>
                </View>
                <View style={{marginLeft:10}}>
                    <View style={{flexDirection:'row'}}>
                        <Text style={styles.User}> {item.from} </Text>
                        <Text style={styles.Text}> {item.Action} </Text>
                    </View>
                    <Text style={{color:'#64676B'}}>{item.time} </Text>
                </View>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <FlatList
            data = {data}
            keyExtractor = {(item,index) => {
                return index.toString()
           }}
            renderItem={renderItem}/>
        </View>
    )
}

export default TNotification

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',
    },
    listContainer:{
        flex:1,
        width:'100%',
        height:'100%',
        paddingVertical:15,
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
    User:{
        color:'#0E9D50',
        fontSize:15
    },
    Text:{
        color:'black',
        marginLeft:5,
    }
})