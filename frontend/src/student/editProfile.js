import React from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
    TextInput,
    TouchableOpacity
} from 'react-native'
import { AirbnbRating } from 'react-native-ratings'
import * as Animatable from 'react-native-animatable';
import Modal from "react-native-modal"
import ImagePicker from 'react-native-image-crop-picker';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DatePicker from '@react-native-community/datetimepicker';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import validator from 'validator'
import axios from 'axios';
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/editProfile'
import { ageLimit } from '../utils/checkdate';
import { auth } from '../global/url'
import { AuthContext } from '../context/authContext'

const createFormData = (image) => {
    const data = new FormData();
  
    data.append('image_data', {
      name: `${Date.now()}`,
      type: image.type,
      uri: Platform.OS === 'ios' ? image.path.replace('file://', '') : image.path,
    })

    return data;
};

const SEditProfile = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)
    
    const { profile, setProfileUpdated, token } = React.useContext(AuthContext)

    const [success, setSuccess] = React.useState(false)
    const [successMsg, setSuccessMsg] = React.useState('')
    const [error, setError] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState('')
    const [isModalVisible, setModalVisible] = React.useState(false)
    const [show, setShow] = React.useState(false);

    const [data, setData] = React.useState({
        name: profile.name,
        birthday: new Date(profile.birthday),
        location: profile.location,
        email: profile.email,
    });

    const [check, setCheck] = React.useState({
        name: false,
        birthday: false,
        email: false,
        location: false
    })
    let ProfileEdited

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
            compressImageQuality: 0.7,
            includeBase64: true,
            mediaType: 'photo'
        }).then(image => {
            // console.log(image)
            uploadImage(image)
            setModalVisible(false)
        }).catch(error => {
            console.log(error)
        });
    }
    
    const choosePhotoFromLibrary = () => {
        ImagePicker.openPicker({
            compressImageMaxWidth: 300,
            compressImageMaxHeight: 300,
            cropping: true,
            compressImageQuality: 0.7,
            includeBase64: true,
            mediaType: 'photo'
        }).then(image => {
            // console.log(image)
            uploadImage(image)
            setModalVisible(false)
        }).catch(error => {
            console.log(error)
        });
    }

    const handleSave = async () => {
        try {
            if(check.name || check.birthday || check.email || check.location) {
                const res = await axios({
                    url: `${auth}/editprofile`,
                    method: 'post',
                    headers: {
                        token: token
                    },
                    data: data
                })

                if(res.status == 200){
                    setCheck({
                        name: false,
                        birthday: false,
                        email: false,
                        location: false
                    })
                    setProfileUpdated(true)
                    setSuccess(true)
                    setSuccessMsg(res.data.message)

                    ProfileEdited = setTimeout(() => {
                        setSuccess(false)
                        setSuccessMsg('')
                    }, 3000);
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImage = async (image) => {
        try {
            if(!image.path) throw new Error('Cannot upload image!');
            const res = await axios({
                url: `${auth}/uploadimage`,
                method: 'post',
                headers: {
                    token: token,
                },
                data: {image_data: image},
            })
            if(res.status == 200){
                setProfileUpdated(true)
                setSuccessMsg('Image uploaded successfully');
                setSuccessMsg(true);
                ProfileEdited = setTimeout(() => {
                    setSuccessMsg(false)
                    setSuccessMsg('');
                }, 3000);
            }
        } catch (err) {
            // console.error(err);
            setErrMsg('Something went wrong!')
            setError(true)
            ProfileEdited = setTimeout(() => {
                setError(false)
                setErrMsg('')
            }, 3000);
        }
    };

    React.useEffect(() => {
        return () => {
            clearInterval(ProfileEdited)
        }
    })

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.userInfo}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {setModalVisible(true)}}>
                    <Image source={{uri: profile.avatar_url}} style={styles.image}/>
                </TouchableOpacity>
                <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">{profile.name}</Text>
                <View style={styles.userRating}>
                    <AirbnbRating
                        defaultRating={Math.floor(profile.rating) === Math.ceil(profile.rating) ? Math.floor(profile.rating) : Math.ceil(profile.rating)}
                        size={18}
                        showRating={false}
                        isDisabled={true}
                        />
                    <Text style={styles.userRatingCount}>{profile.rating > 0 ? profile.rating : ''}</Text>
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

                <TouchableOpacity activeOpacity={0.7} onPress={() => setShow(!show)} style={styles.actionBirthday}>
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
                    <TouchableOpacity activeOpacity={0.7} onPress={() => getLocation()}>
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
                {success && 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.infoMsg}>{successMsg}</Text>
                    </Animatable.View>
                }
                {error && 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{errMsg}</Text>
                    </Animatable.View>
                }
            </View>

            <View style={styles.button}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => handleSave()} style={styles.saveButton}>
                    <Text style={styles.textSave}>Save   <FontAwesome name="save" color={colors.backgroundColor} size={20}/></Text>
                </TouchableOpacity>
            </View>

            <Modal animationInTiming={500} style={{ margin: 0, justifyContent:"flex-end" }} isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} onBackButtonPress={() => setModalVisible(false)}>
                <StatusBar translucent={true} backgroundColor={"#000"} barStyle="light-content"/>
                <View style={styles.modalList}>
                    <Text style={styles.modalListTextHeader}>Upload Image</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} style={styles.modalList} onPress={() => takePhotoFromCamera()}>
                    <Text style={styles.modalListText}>Take Photo</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.modalList} onPress={() => choosePhotoFromLibrary()}>
                    <Text style={styles.modalListText}>Choose From Library</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.modalList} onPress={() => setModalVisible(false)}>
                    <Text style={styles.modalListText}>Cancel</Text>
                </TouchableOpacity>
            </Modal>
        </ScrollView>
    )
}

export default SEditProfile
