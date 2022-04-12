import React from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar
} from 'react-native';
import { CommonActions } from "@react-navigation/native";
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Authenticating from '../loading/authenticating'
import axios from 'axios';
import { useTheme } from '@react-navigation/native';
import { auth } from '../global/url'
import { AuthContext } from '../context/authContext'

const Role = ({ navigation, route }) => {
    const { colors } = useTheme();
    const { user_type } = route.params 
    const { token, setProfileUpdated, setUserType, loading } = React.useContext(AuthContext)

    const hanldeRoleSwitch = async (role) => {
        try {
            const res = await axios({
                url: `${auth}/switchrole`,
                method: 'post',
                headers: {
                    token: token
                },
                data: { user_type: role }
            })

            if(res.status == 200){
                setProfileUpdated(true)
                if(role == 'std'){
                    setUserType('0')
                    // navigation.dispatch({
                    //     ...CommonActions.reset({
                    //         index: 0,
                    //         routes: [
                    //         {
                    //             name: "STab",
                    //             state: {
                    //                 routes: [
                    //                     {
                    //                         name: "SNewsfeed",
                    //                     }
                    //                 ]
                    //             }
                    //         }
                    //         ]
                    //     })
                    // });
                }else{
                    setUserType('1')
                    // navigation.dispatch({
                    //     ...CommonActions.reset({
                    //         index: 0,
                    //         routes: [
                    //         {
                    //             name: "TTab",
                    //             state: {
                    //                 routes: [
                    //                     {
                    //                         name: "TNewsfeed",
                    //                     }
                    //                 ]
                    //             }
                    //         }
                    //         ]
                    //     })
                    // });
                }
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    if(loading){
        return <Authenticating />
    }

    return(
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.header}>
                {
                user_type === '' ?
                    <Animatable.Image animation="bounceIn" duraton="1500" source={require('../asset/settingsblank.png')} style={styles.logo}/>
                    :
                    user_type === 'std' ? 
                        <Animatable.Image animation="bounceIn" duraton="1500" source={require('../asset/student.png')} style={styles.logo}/>
                        :
                        <Animatable.Image animation="bounceIn" duraton="1500" source={require('../asset/tutor.png')} style={styles.logo}/>
                }
            </View>
            <Animatable.View style={[styles.footer, { backgroundColor: "#fff" }]} animation="fadeInUpBig">
                <Text style={[styles.title, { color: colors.text}]}>Select Roles</Text>
                <Text style={styles.text}>Are You a Dedicated Tutor willing to Teach the young minds or Are you a ambitious Student Willing to learn from the best</Text>
                <View style={user_type === '' ? styles.twoButtons : styles.oneButton}> 
                    {
                    user_type === '' ? 
                        <>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => hanldeRoleSwitch('ttr')}>
                                <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                                    <Text style={styles.textSign}>Tutor</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.7} onPress={() => hanldeRoleSwitch('std')}>
                                <LinearGradient colors={['#016aab', '#0148ab']} style={styles.signIn}>
                                    <Text style={styles.textSign}>Student</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </>
                    :
                        user_type === 'std' ? 
                            <TouchableOpacity activeOpacity={0.7} onPress={() => hanldeRoleSwitch('ttr')}>
                                <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                                    <Text style={styles.textSign}>Tutor</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                            :
                            <TouchableOpacity activeOpacity={0.7} onPress={() => hanldeRoleSwitch('std')}>
                                <LinearGradient colors={['#016aab', '#0148ab']} style={styles.signIn}>
                                    <Text style={styles.textSign}>Student</Text>
                                </LinearGradient>
                            </TouchableOpacity>
                    }
                </View>
            </Animatable.View>
        </View>
    )
}

export default Role

const { height } = Dimensions.get('screen')
const height_logo = height * 0.7 * 0.4

var styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        width: "100%",
        backgroundColor: '#fff',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        paddingVertical: 50,
        paddingHorizontal: 30
    },
    logo: {
        width: height_logo,
        height: height_logo
    },
    title: {
        color: '#05375a',
        fontSize: 25,
        fontFamily: 'Nunito-Bold'
    },
    text: {
        color: 'grey',
        marginTop:5,
        fontFamily: 'Nunito-Regular'
    },
    oneButton: {
        marginTop: 20,
        flexDirection:'row',
        justifyContent: 'center'
    },
    twoButtons: {
        marginTop: 20,
        flexDirection:'row',
        justifyContent: 'space-between'
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
    },
    textSign: {
        color: 'white',
        fontFamily: 'Nunito-Bold'
    }
})
