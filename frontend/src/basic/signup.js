import React from 'react'
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    Platform,
    StatusBar,
    ScrollView,
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RNSingleSelect from "@freakycoder/react-native-single-select"
import DatePicker from '@react-native-community/datetimepicker'
import Geolocation from 'react-native-geolocation-service'
import Geocoder from 'react-native-geocoding'
import validator from 'validator'
import axios from 'axios';
import { useTheme } from 'react-native-paper'
import createStyles from '../style/basic/signup'
import { ageLimit } from '../utils/checkdate'
import { auth } from '../global/url'

const genderData = [
    {
        id: 1,
        value: "Male"
    },
    {
        id: 2,
        value: "Female"
    }
]

const Signup = ({ navigation }) => {
    const { colors } = useTheme()
    const styles = createStyles(colors)

    const [show, setShow] = React.useState(false)
    const [signedUP, setSignedUp] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState('')
    const [error, setError] = React.useState(false)
    let SignedUpTimer

    const onDateChange = (val) => {
        const currentDate = val.nativeEvent.timestamp || data.birthday
        setShow(Platform.OS === 'ios')
        setCheck({...check, birthday: true})
        setData({...data, birthday: new Date(currentDate)})
    }
    
    const [check, setCheck] = React.useState({
        firstname: true,
        birthday: true,
        gender: true,
        email: true,
        password: true,
        confirmPassword: true,
        secureTextEntry: true,
        location: true
    })

    // const [check, setCheck] = React.useState({
    //     firstname: false,
    //     birthday: false,
    //     gender: false,
    //     email: false,
    //     password: false,
    //     confirmPassword: false,
    //     secureTextEntry: true,
    //     location: false
    // })

    const [data, setData] = React.useState({
        firstname: 'Ali',
        lastname: 'Azlan',
        birthday: new Date("1999-12-16"),
        gender: 'Male',
        email: 'aliazlan2002@gmail.com',
        password: 'jhonscott',
        confirmPassword: 'jhonscott',
        location: {
            address: 'North Karachi, Sector 8, R-442',
            longitude: '',
            latitude: ''
        },
    })

    // const [data, setData] = React.useState({
    //     firstname: '',
    //     lastname: '',
    //     birthday: new Date(),
    //     gender: '',
    //     email: '',
    //     password: '',
    //     confirmPassword: '',
    //     location: {
    //         address: '',
    //         longitude: '',
    //         latitude: ''
    //     },
    // })

    const getLocation = () => {
        Geocoder.init("") //AIzaSyASfv0sgGQ5pQTeT-N0eYn4ius8-S-2Wuk
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                // Geocoder.from(position.coords.latitude, position.coords.longitude)
                //     .then(json => {
                //         var addressComponent = json.results[0].address_components[0]
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

    const handleSignUp = async () => {
        try {
            if(check.firstname && check.birthday && check.gender && check.email && check.password) {
                const email = data.email
                const res = await axios({
                    url: `${auth}/register`,
                    method: 'post',
                    data: data
                })

                if(res.status == 201){
                    setSignedUp(true)
                    setCheck({
                        firstname: false,
                        birthday: false,
                        gender: false,
                        email: false,
                        password: false,
                        confirmPassword: false,
                        secureTextEntry: true,
                        location: false
                    })
                    setData({
                        firstname: '',
                        lastname: '',
                        birthday: new Date(),
                        gender: '',
                        email: '',
                        password: '',
                        confirmPassword: '',
                        location: {
                            address: '',
                            longitude: '',
                            latitude: ''
                        },
                    })
                    SignedUpTimer = setTimeout(() => {
                        setSignedUp(false)
                        navigation.navigate('Verify', {email: email})
                    }, 3000);
                }
            }
        } catch (error) {
            setErrMsg(error.response.data.message)
            setError(true)
            SignedUpTimer = setTimeout(() => {
                setError(false)
                setErrMsg('')
            }, 3000);
        }
    }

    React.useEffect(() => {
        return () => {
            clearInterval(SignedUpTimer)
        }
    })

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Sign Up Now!</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer} >
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.textFooter}>First Name*</Text>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color={colors.text} size={20}/>
                        <TextInput 
                            placeholder="First Name"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setData({...data, firstname: val})}
                            onEndEditing={() => setCheck({...check, firstname: true})}
                            value={data.firstname}
                        />
                        {validator.isLength(data.firstname, {min:2}) ? 
                            <Animatable.View animation="bounceIn" >
                                <Feather name="check-circle" color="green" size={20}/>
                            </Animatable.View>
                        : null}
                    </View>
                    {check.firstname && (
                        validator.isLength(data.firstname, {min:2, max:256}) ? null 
                        : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>First Name must contain from 2 to 256 characters.</Text>
                        </Animatable.View>
                    )}

                    <Text style={styles.textFooter}>Last Name</Text>
                    <View style={styles.action}>
                        <FontAwesome name="user-o" color={colors.text} size={20}/>
                        <TextInput 
                            placeholder="Last Name"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setData({...data, lastname: val})}
                            value={data.lastname}
                        />
                        {validator.isLength(data.lastname, {min:1}) ? 
                            <Animatable.View animation="bounceIn">
                                <Feather name="check-circle" color="green" size={20}/>
                            </Animatable.View>
                        : null}
                    </View>

                    <Text style={styles.textFooterBirthday}>Birthday*</Text>
                    <TouchableOpacity onPress={() => setShow(!show)} style={styles.actionBirthday}>
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

                    <Text style={styles.textFooterGender}>Gender*</Text>
                    <View style={styles.action}>
                        <FontAwesome name="genderless" color={colors.text} size={20} style={styles.genderIcon}/>
                        <RNSingleSelect
                            data={genderData}
                            placeholder="Your Gender"
                            onSelect={(item) => { setData({...data, gender: item.value}); setCheck({...check, gender: true}) }}
                            darkMode={false}
                            width={365}
                            menuBarContainerHeight={100}
                            searchEnabled={false}
                            value={data.gender}
                        />
                    </View>
                    {check.gender && (
                        validator.isIn(data.gender ,['Male','Female']) ? null 
                        :
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Select from the given options</Text>
                        </Animatable.View>
                    )}

                    <Text style={styles.textFooter}>Location</Text>
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
                            value={data?.location?.address}
                        />
                        <TouchableOpacity onPress={() => getLocation()}>
                            <Ionicons name="location-outline" color={colors.text} size={20}/>
                        </TouchableOpacity>
                    </View>
                        
                    <Text style={styles.textFooter}>Email*</Text>
                    <View style={styles.action}>
                        <FontAwesome name="envelope-o" color={colors.text} size={20}/>
                        <TextInput 
                            placeholder="Your Email"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setData({...data, email: validator.trim(val)})}
                            onEndEditing={() => setCheck({...check, email: true})}
                            value={data.email}
                        />
                        {check.email && (
                            validator.isEmail(data.email) ? 
                            <Animatable.View animation="bounceIn" >
                                <Feather name="check-circle" color="green" size={20} />
                            </Animatable.View>
                            : null
                        )}
                    </View>
                    {check.email && (
                        validator.isEmail(data.email) ? null 
                        : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Email must be in proper format.</Text>
                        </Animatable.View>
                    )}
                
                    <Text style={styles.textFooter}>Password*</Text>
                    <View style={styles.action}>
                        <Feather name="lock" color={colors.text} size={20}/>
                        <TextInput 
                            placeholder="Your Password"
                            placeholderTextColor="#666666"
                            secureTextEntry={check.secureTextEntry}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setData({...data, password: val})}
                            onEndEditing={() => setCheck({...check, password: true})}
                            value={data.password}
                        />
                        <TouchableOpacity activeOpacity={0.5} onPress={() => setCheck({ ...check, secureTextEntry: !check.secureTextEntry })}>
                        {check.secureTextEntry ? 
                            <Feather name="eye-off" color="grey" size={20}/>
                            :
                            <Feather name="eye" color="grey" size={20}/>
                        }
                        </TouchableOpacity>
                    </View>
                    {check.password && (
                        validator.isLength(data.password, {min: 8}) ? null 
                        : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                        </Animatable.View>
                    )}

                    <View style={styles.action}>
                        <Feather name="lock" color={colors.text} size={20}/>
                        <TextInput 
                            placeholder="Confirm Password"
                            placeholderTextColor="#666666"
                            secureTextEntry={check.secureTextEntry}
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setData({...data, confirmPassword: val})}
                            onEndEditing={() => setCheck({...check, confirmPassword: true})}
                            value={data.confirmPassword}
                        />
                        <TouchableOpacity onPress={() => setCheck({ ...check, secureTextEntry: !check.secureTextEntry })}>
                        {check.secureTextEntry ? 
                            <Feather name="eye-off" color="grey" size={20}/>
                            :
                            <Feather name="eye" color="grey" size={20}/>
                        }
                        </TouchableOpacity>
                    </View>
                    {check.confirmPassword && (
                        data.confirmPassword === data.password ? null 
                        : 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>Passwords do not match.</Text>
                        </Animatable.View>
                    )}
                    {signedUP && 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.infoMsg}>Successfully Signed Up.</Text>
                        </Animatable.View>
                    }
                    {error && 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.errorMsg}>{errMsg}</Text>
                        </Animatable.View>
                    }

                    <View style={styles.buttonContainer}>
                        <TouchableOpacity onPress={() => handleSignUp()} style={styles.signupButton}>
                            <LinearGradient colors={['#5B1B9B', '#7063AD']} style={styles.signupButton}>
                                    <Text style={styles.textSignin}>Sign Up</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('Signin')} style={styles.signinButton}>
                            <Text style={styles.textSignup}>Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </Animatable.View>
        </View>
      )
}
  
export default Signup