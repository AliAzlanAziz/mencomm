import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    Image,
    StatusBar,
    ScrollView,
} from 'react-native';
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/enrolled'

const TEnrolled = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const [data, setData] = React.useState([
        {id:1,  name: "Mark Doe Mark Doe Mark Doe Mark Doe", image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
        {id:2,  name: "Clark Man",  image:"https://bootdey.com/img/Content/avatar/avatar6.png"},
        {id:3,  name: "Jaden Boor", image:"https://bootdey.com/img/Content/avatar/avatar5.png"},
        {id:4,  name: "Srick Tree", image:"https://bootdey.com/img/Content/avatar/avatar4.png"},
        {id:5,  name: "Erick Doe",  image:"https://bootdey.com/img/Content/avatar/avatar3.png"},
        {id:6,  name: "Francis Doe",image:"https://bootdey.com/img/Content/avatar/avatar2.png"},
        {id:8,  name: "Matilde Doe",image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
        {id:9,  name: "John Doe",   image:"https://bootdey.com/img/Content/avatar/avatar4.png"},
        {id:10, name: "Fermod Doe", image:"https://bootdey.com/img/Content/avatar/avatar7.png"},
        {id:11, name: "Danny Doe",  image:"https://bootdey.com/img/Content/avatar/avatar1.png"},
    ])

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>

            {data.map(item => <View style={styles.row} key={item.id}>
                <TouchableOpacity style={styles.nameImageContainer}>
                    <Image source={{ uri: item.image }} style={styles.pic}/>
                    <Text style={styles.nameText} numberOfLines={1} ellipsizeMode="tail">{item.name}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Text style={styles.buttonText}>Cancel</Text>
                </TouchableOpacity>
            </View>)}

        </ScrollView>
    )
}

export default TEnrolled