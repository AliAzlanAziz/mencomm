import React from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    TextInput,
    TouchableOpacity,
} from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import * as Animatable from 'react-native-animatable';
import Modal from "react-native-modal"
import ImagePicker from 'react-native-image-crop-picker';
import { Avatar } from 'react-native-paper';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from '@react-native-community/datetimepicker';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import validator from 'validator'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/editProfile'
import { ageLimit } from '../utils/checkdate';

const TEditProfile = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)
    
    const [isModalVisible, setModalVisible] = React.useState(false)
    const [show, setShow] = React.useState(false);

    const [data, setData] = React.useState({
        name: 'Dr. Abdul Aziz',
        birthday: new Date('1994-12-03T11:11:06.279Z'),
        location: {
            address: 'R-442, Sector-8, North Karachi, Karachi, Pakistan',
            longitude: '',
            latitude: ''
        },
        email: 'aliazlan123@mail.com',
        rating: 4.8,
        image: 'https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png'
    });

    const [check, setCheck] = React.useState({
        name: false,
        birthday: false,
        email: false,
        location: false
    })

    const onDateChange = (val) => {
        const currentDate = val.nativeEvent.timestamp || data.birthday;
        setShow(Platform.OS === 'ios');
        setCheck({...check, birthday: true})
        setData({...data, birthday: new Date(currentDate)});
    };

    const getLocation = () => {
        Geocoder.init("")
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                // Geocoder.from(position.coords.latitude, position.coords.longitude)
                //     .then(json => {
                //         var addressComponent = json.results[0].address_components[0];
                //         console.log(addressComponent)
                //     })
                //     .catch(error => console.warn(error))
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message)
            },
            { 
                enableHighAccuracy: true, 
                timeout: 15000, 
                maximumAge: 10000 
            }
        ) 
    }

    const takePhotoFromCamera = () => {
        ImagePicker.openCamera({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            setData({...data, image: image.path})
            setModalVisible(false)
        });
    }
    
      const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7
        }).then(image => {
            setData({...data, image: image.path})
            setModalVisible(false)
        });
    }

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.userInfo}>
                <TouchableOpacity onPress={() => {setModalVisible(true)}} activeOpacity={0.7}>
                    <Image source={{uri: data.image}} style={styles.image}/>
                    {/* <ImageBackground
                        source={{
                        uri: data.image,
                        }}
                        style={{height: 100, width: 100}}
                        imageStyle={{borderRadius: 15}}
                        >
                        <View
                            style={{
                                flex: 1,
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <MaterialCommunityIcons
                                name="camera"
                                size={35}
                                color="#fff"
                                style={{
                                opacity: 0.7,
                                alignItems: 'center',
                                justifyContent: 'center',
                                borderWidth: 1,
                                borderColor: '#fff',
                                borderRadius: 10,
                                }}
                            />
                        </View>
                    </ImageBackground> */}
                </TouchableOpacity>
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
            </View>

            <View style={styles.userInfoInput}>
                <View style={styles.action}>
                    <FontAwesome name="user-o" color={colors.text} size={20}/>
                    <TextInput 
                        placeholder="Name"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setData({...data, name: val})}
                        onEndEditing={() => setCheck({...check, name: true})}
                        defaultValue={data.name}
                    />
                    {validator.isLength(data.name, {min:2}) ? 
                        <Animatable.View animation="bounceIn">
                            <Feather name="check-circle" color="green" size={20}/>
                        </Animatable.View>
                    : null}
                </View>
                {check.name && (
                    validator.isLength(data.name, {min:2, max:256}) ? null 
                    : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Name must contain from 2 to 256 characters.</Text>
                    </Animatable.View>
                )}

                <TouchableOpacity onPress={() => setShow(!show)} style={styles.actionBirthday} activeOpacity={0.7}>
                    <Fontisto name="date" color={colors.text} size={20}/>
                    <Text style={styles.textInputBirthday}>Your Birthday</Text>
                    <Text style={styles.textOutputBirthday}>{ (data.birthday.toISOString().split('T')[0] !== new Date().toISOString().split('T')[0]) ? data.birthday.toISOString().split('T')[0] : null}</Text>
                </TouchableOpacity>
                <View style={styles.separatorBirthday}></View>
                {show && (
                    <DatePicker value={data.birthday} mode={"date"} display="calendar" onChange={(val) => {onDateChange(val)}}/>
                )}
                {check.birthday && (ageLimit(data.birthday) ? 
                    null 
                    : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>You must be from 13 to 80 years old.</Text>
                    </Animatable.View>
                )}

                <View style={styles.action}>
                    <Ionicons name="location-outline" color={colors.text} size={20}/>
                    <TextInput 
                        placeholder="Your Address or Use Current Location"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={
                            (val) => setData({
                                ...data, 
                                location: {
                                    ...data.location, 
                                    address: val
                                }
                            })}
                        defaultValue={data.location.address}
                    />
                    <TouchableOpacity onPress={() => getLocation()} activeOpacity={0.7}>
                        <Ionicons name="location-outline" color={colors.text} size={20}/>
                    </TouchableOpacity>
                </View>

                <View style={styles.action}>
                    <FontAwesome name="envelope-o" color={colors.text} size={20}/>
                    <TextInput 
                        placeholder="Your Email"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => {setData({...data, email: val});  setCheck({...check, email: true})}}
                        defaultValue={data.email}
                    />
                    {validator.isEmail(data.email) ? 
                        <Animatable.View animation="bounceIn" >
                            <Feather name="check-circle" color="green" size={20} />
                        </Animatable.View>
                    : null}
                </View>
                {check.email && (
                    validator.isEmail(data.email) ? null 
                    : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Email must be in proper format.</Text>
                    </Animatable.View>
                )}
                {check.email && (<Animatable.View animation="fadeInLeft" duration={200}>
                        <Text style={styles.infoMsg}>Remember, If you change your email then you will be logout and will be required to verify your email to login again.</Text>
                    </Animatable.View>
                )}
            </View>

            <View style={styles.button}>
                <TouchableOpacity onPress={() => navigation.navigate('#')} style={styles.saveButton} activeOpacity={0.7}>
                    <Text style={styles.textSave}>Save   <FontAwesome name="save" color={colors.backgroundColor} size={20}/></Text>
                </TouchableOpacity>
            </View>

            <Modal animationInTiming={500} style={{ margin: 0, justifyContent:"flex-end" }} isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} onBackButtonPress={() => setModalVisible(false)}>
                <StatusBar translucent={true} backgroundColor={"#000"} barStyle="light-content"/>
                <View style={styles.modalList}>
                    <Text style={styles.modalListTextHeader}>Upload Image</Text>
                </View>
                <TouchableOpacity style={styles.modalList} onPress={() => takePhotoFromCamera()} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} onPress={() => choosePhotoFromLibrary()} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Choose From Library</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} onPress={() => setModalVisible(false)} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Cancel</Text>
                </TouchableOpacity>
            </Modal>
        </ScrollView>
    )
}

export default TEditProfile
