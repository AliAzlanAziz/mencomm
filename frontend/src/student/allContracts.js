//resolve styling problem of using width in text ouput instead of flex
import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    FlatList,
    StatusBar,
} from 'react-native';
import styles from '../style/student/allContracts'

const AllContracts = () => {
    const [data, setData] = React.useState([
        {id:1,  name: "Mark Doe",    status:"Object Oriented Programming", price:"10000 PKR", image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
        {id:2,  name: "Clark Man",   status:"Object Oriented Programming", price:"10000 PKR", image:"https://bootdey.com/img/Content/avatar/avatar6.png"} ,
        {id:3,  name: "Jaden Boor",  status:"Object Oriented Programming", price:"10000 PKR", image:"https://bootdey.com/img/Content/avatar/avatar5.png"} ,
        {id:4,  name: "Srick Tree",  status:"Object Oriented Programming", price:"10000 PKR", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:5,  name: "Erick Doe",   status:"Object Oriented Programming", price:"10000 PKR", image:"https://bootdey.com/img/Content/avatar/avatar3.png"} ,
        {id:6,  name: "Francis Doe", status:"Object Oriented Programming", price:"10000 PKR", image:"https://bootdey.com/img/Content/avatar/avatar2.png"} ,
        {id:8,  name: "Matilde Doe", status:"Object Oriented Programming", price:"10000 PKR", image:"https://bootdey.com/img/Content/avatar/avatar1.png"} ,
        {id:9,  name: "John Doe",    status:"Object Oriented Programming", price:"10000 PKR", image:"https://bootdey.com/img/Content/avatar/avatar4.png"} ,
        {id:10, name: "Fermod Doe",  status:"Object Oriented Programming", price:"10000 PKR", image:"https://bootdey.com/img/Content/avatar/avatar7.png"} ,
        {id:11, name: "Danny Doe",   status:"Object Oriented Programming", price:"10000 PKR", image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
    ])

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity>
                <View style={styles.row}>
                    <Image source={{ uri: item.image }} style={styles.pic} />
                    <View>
                        <View style={styles.nameContainer}>
                            <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                            <Text style={styles.dateText}>01/12/2021</Text>
                        </View>
                        <View style={styles.msgContainer}>
                            <Text style={styles.subjectText} numberOfLines={1} ellipsizeMode="tail">{item.status}</Text>
                            <Text style={styles.prcText}>{item.price}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return(
        <View style={styles.view}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <FlatList 
                extraData={data}
                data={data}
                keyExtractor = {(item) => {
                    return item.id;
                }}
                renderItem={renderItem}/>
        </View>
    );
}

export default AllContracts