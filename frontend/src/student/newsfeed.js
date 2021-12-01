import React from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/newsfeed'

const Newfeed = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const [toggleText, setToggleText] = React.useState(false)
    
    const handleLongPress =  () => {
        setToggleText(true)
        setTimeout(() => {setToggleText(false)}, 10000)
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>

            <ScrollView>
                <View style={styles.post}>
                    <View style={styles.cardUserInfo}>
                        <Image source={require('../asset/astronaut.png')} style={styles.cardAvatar} />
                        <View style={styles.cardNameDate}>
                            <Text style={styles.cardName}>Ali Azlan Aziz</Text>
                            <Text style={styles.cardDate}>12/12/2020</Text>
                        </View>
                    </View>
                    <View style={styles.postInfoContainer}>
                        <View style={styles.postInfo}>
                            <View style={styles.action}>
                                <AntDesign name="book" color={colors.text} size={20} />
                                <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
                                    Object Oriented Programming
                                </Text>
                            </View>
                            <View style={styles.action}>
                                <SimpleLineIcons name="graduation" color={colors.text} size={20} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                                    Under Graduation
                                </Text>
                            </View>
                            <View style={styles.action}>
                                <SimpleLineIcons name="home" color={colors.text} size={20} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                                    Home tuition
                                </Text>
                            </View>
                            <View style={styles.action}>
                                <MaterialIcons name="payment" color={colors.text} size={20} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                                    10000 PKR
                                </Text>
                            </View>
                            <View style={styles.action}>
                                <Ionicons name="location-outline" color={colors.text} size={20}/>
                                <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
                                    R-442 Sector 8, North Karachi
                                </Text>
                                <TouchableOpacity>
                                    <FontAwesome name="map-o" color={colors.text} size={20}/>
                                </TouchableOpacity>
                            </View>
                            <View style={styles.action}>
                                <Fontisto name="date" color={colors.text} size={20} />
                                <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">
                                    Start Date: 18th Dec 2020, Wednesday
                                </Text>
                            </View>
                            <View style={styles.action}>
                                <Ionicons name="information-circle-outline" color={colors.text} size={20} />
                                <Text style={styles.text} numberOfLines={5} ellipsizeMode="tail">
                                    Adipisicing consequat aliquip quis consequat deserunt dolore. Et duis esse irure do sint tempor occaecat aute voluptate voluptate exercitation cupidatat esse proident. Elit sint quis do sunt minim. Anim culpa dolor elit aliquip adipisicing quis magna. Qui laborum enim proident Lorem ad occaecat et sunt laborum dolore quis. Laboris occaecat ipsum deserunt mollit qui cillum exercitation excepteur consequat occaecat. Nisi fugiat mollit excepteur excepteur nisi veniam pariatur magna deserunt.
                                    Laboris nisi id deserunt labore. Dolore proident velit sint qui excepteur duis. Qui culpa anim proident aute velit aute ea laborum ut labore duis nulla do.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.detailsText}>
                            <View style={styles.button}>
                                <TouchableOpacity onPress={() => navigation.navigate('#')}>
                                    <Text style={styles.textSave}>See Details</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>

            <View style={{justifyContent: 'flex-end', alignItems: 'flex-end'}}>
                <TouchableOpacity onPress={() => navigation.navigate('#')} onLongPress={() => handleLongPress()} style={{position: 'absolute'}}>
                    {(toggleText === true) ? 
                        <Text style={{fontSize: 10, color: '#000', fontWeight: '700'}}>Create Post</Text> 
                        : 
                        null
                    }
                    <Ionicons name="ios-add-circle" color={'#4378FF'} size={50} style={{marginRight: 10, marginBottom: 80}}/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default Newfeed