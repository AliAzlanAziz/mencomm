import React from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    Alert
} from 'react-native'
// import { StripeProvider } from '@stripe/stripe-react-native';
// import { useStripe } from "@stripe/stripe-react-native";
import { AirbnbRating } from 'react-native-ratings'
import Modal from "react-native-modal"
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Entypo from 'react-native-vector-icons/Entypo'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/postDetails'

const SPostDetails = ({ navigation }) => {
    // const stripe = useStripe();
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const [isModalVisible, setModalVisible] = React.useState(false)
    const [enrolled, setEnrolled] = React.useState(false)

    const [data, setData] = React.useState({
        name: 'Dr. Abdul Aziz', 
        rating: 4.8,
        img: require('../asset/logo.png'),
        course: 'Object Oriented Programming',
        grade: 'Under Grad',
        tuitionType: 'Home Tuition',
        fee: '10000 PKR',
        address: 'R-442 Sector 8, North Karachi',
        start_date: '18th Dec 2020, Wednesday',
        capacity: 100,
        schedule: [
            { day: 'Monday', start_time: '06:00 PM', end_time: '08:00 PM' },
            { day: 'Tuesday', start_time: '06:00 PM', end_time: '08:00 PM' },
            { day: 'Wednesday', start_time: '06:00 PM', end_time: '08:00 PM' }
        ],
        desc: 'Aliqua exercitation aliquip fugiat qui labore adipisicing sunt eu. Reprehenderit aliquip irure ut ullamco. Ex ut eu consequat ipsum.\n Laboris anim adipisicing ex et adipisicing occaecat labore reprehenderit voluptate mollit laborum. Culpa sint nisi quis sunt dolor. Reprehenderit incididunt amet aliqua culpa proident exercitation deserunt esse consectetur. Laborum velit duis ad fugiat magna anim nulla voluptate.\n Cillum ea amet amet dolore mollit laboris occaecat sunt voluptate excepteur. Excepteur et excepteur Lorem ex officia enim nulla. Duis exercitation elit occaecat esse commodo adipisicing id minim labore ea aute.Esse non Lorem elit ad ea ad aliquip qui eiusmod dolor laboris qui. Non sit dolor dolore quis. Veniam veniam adipisicing occaecat minim ullamco ex reprehenderit dolor commodo. Sint duis incididunt pariatur duis laborum. Occaecat minim tempor cillum veniam adipisicing ut esse pariatur officia est.\n Mollit laborum dolor incididunt laboris est eu pariatur nulla ullamco quis ea commodo eiusmod laboris. Velit non irure veniam qui proident ut velit. Ullamco enim occaecat fugiat sunt.\n Aliquip est pariatur nulla laboris eiusmod amet fugiat. Enim ut mollit dolore exercitation. Culpa laborum aute veniam proident commodo quis ea eu do ullamco nisi.'
    })

    // const subscribe = async () => {
    //     try {
    //         // sending request
    //         const response = await fetch("http://localhost:5000/api/v1/pay/payment", {
    //             method: "POST",
    //             body: JSON.stringify({ name }),
    //             headers: {
    //             "Content-Type": "application/json",
    //             },
    //         });
    //         const data = await response.json();

    //     if (!response.ok) return Alert.alert(data.message);
    //     const clientSecret = data.clientSecret;
    //     const initSheet = await stripe.initPaymentSheet({
    //         paymentIntentClientSecret: clientSecret,
    //     });

    //     if (initSheet.error) return Alert.alert(initSheet.error.message);
    //     const presentSheet = await stripe.presentPaymentSheet({
    //         clientSecret,
    //     });

    //     if (presentSheet.error) return Alert.alert(presentSheet.error.message);
    //         Alert.alert("Payment complete, thank you!");
    //     } catch (err) {
    //         console.error(err);
    //         Alert.alert("Something went wrong, try again later!");
    //     }
    // };

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('SStack', { screen: 'SOthersProfile' })} style={styles.userInfo} activeOpacity={0.7}>
                    <Image source={data.img} style={styles.image}/>
                    <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">{data.name}</Text>
                    <View style={styles.userRating}>
                        <AirbnbRating
                            defaultRating={Math.floor(data.rating) === Math.ceil(data.rating) ? Math.floor(data.rating) : Math.ceil(data.rating)}
                            size={18}
                            showRating={false}
                            isDisabled={true}
                            />
                        <Text style={styles.userRatingCount}>{data.rating}</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(true)}>
                        <Entypo name="dots-three-horizontal" color={colors.text} size={20} />
                    </TouchableOpacity>
                </TouchableOpacity>
                <View style={styles.action}>
                    <AntDesign name="book" color={colors.text} size={20} />
                    <Text style={styles.text}>{data.course}</Text>
                </View>
                <View style={styles.action}>
                    <SimpleLineIcons name="graduation" color={colors.text} size={20} />
                    <Text style={styles.text}>{data.grade}</Text>
                </View>
                <View style={styles.action}>
                    <SimpleLineIcons name="home" color={colors.text} size={20} />
                    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{data.tuitionType}</Text>
                </View>
                <View style={styles.action}>
                    <MaterialIcons name="payment" color={colors.text} size={20} />
                    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{data.fee}</Text>
                    {/* <StripeProvider publishableKey={"pk_test_emED6Iluek2T2xHVDyJCDmHh00EpY66lve"}>
                        <TouchableOpacity activeOpacity={0.5} onPress={() => subscribe()}>
                            <Ionicons name="ios-card-outline" color={colors.text} size={20}/>
                        </TouchableOpacity>
                    </StripeProvider> */}
                </View>
                <View style={styles.action}>
                    <Ionicons name="location-outline" color={colors.text} size={20}/>
                    <Text style={styles.text}>{data.address}</Text>
                    <TouchableOpacity activeOpacity={0.5}>
                        <FontAwesome name="map-o" color={colors.text} size={20}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.action}>
                    <Fontisto name="date" color={colors.text} size={20} />
                    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">Start Date: {data.start_date}</Text>
                </View>
                <View style={styles.action}>
                    <Ionicons name="ios-people-outline" color={colors.text} size={20} />
                    <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">Capacity: {data.capacity}</Text>
                </View>
                <View style={styles.schedule}>
                    <MaterialIcons name="schedule" color={colors.text} size={20} />
                    <Text style={styles.text}>Schedule:</Text>
                </View>
                <View style={styles.scheduleList}>
                    {data.schedule.map(item => <View style={styles.scheduleListItem} key={item.day}>
                            <Text style={styles.scheduleListItemText}>{item.day}</Text>
                            <Text style={styles.scheduleListItemText}>{item.start_time} - {item.end_time}</Text>
                        </View>
                    )}
                </View>
                <View style={styles.action}>
                    <Ionicons name="information-circle-outline" color={colors.text} size={20} />
                    <Text style={styles.text}>{data.desc}</Text>
                </View>
            </View>
            <View style={styles.button}>
                {!enrolled && (
                    <TouchableOpacity onPress={() => setEnrolled(true)} style={styles.saveButton} activeOpacity={0.7}>
                        <Text style={styles.textButton}>Enroll <Ionicons name="ios-arrow-up-circle-outline" color={colors.backgroundColor} size={20}/></Text>
                    </TouchableOpacity>
                )}
                {enrolled && (
                    <TouchableOpacity onPress={() => setEnrolled(false)} style={styles.cancelButton} activeOpacity={0.7}>
                        <Text style={styles.textButton}>Cancel <Entypo name="circle-with-cross" color={colors.backgroundColor} size={18}/></Text>
                    </TouchableOpacity>
                )}
            </View>
            <View style={styles.announcementButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('SStack', { screen: 'SAnnouncement' })} style={styles.announcementButton} activeOpacity={0.7}>
                    <Text style={styles.textButton}>Announcments <FontAwesome name="sticky-note-o" color={colors.backgroundColor} size={16}/></Text>
                </TouchableOpacity>
            </View>
            <Modal animationInTiming={500} style={{ margin: 0, justifyContent:"flex-end" }} isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} onBackButtonPress={() => setModalVisible(false)}>
                <StatusBar translucent={false} backgroundColor={"#000"} barStyle="light-content"/>
                <TouchableOpacity style={styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Report Post</Text>
                </TouchableOpacity>
            </Modal>
        </ScrollView>
    )
}

export default SPostDetails