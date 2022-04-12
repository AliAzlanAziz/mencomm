import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    StatusBar,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Feather from 'react-native-vector-icons/Feather';
import validator from 'validator'
import axios from 'axios';
import { useTheme } from 'react-native-paper';
import createStyles from '../style/basic/resetPassword'
import { auth } from '../global/url'

const ResetPassword = ({ navigation, route }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const [success, setSuccess] = React.useState(false)
    const [successMsg, setSuccessMsg] = React.useState('')
    const [errMsg, setErrMsg] = React.useState('')
    const [error, setError] = React.useState(false)
    const [data, setData] = React.useState({
        password: 'jhonscott256',
        confirmPassword: 'jhonscott256',
    });

    const [check, setCheck] = React.useState({
        password: true,
        confirmPassword: true,
        secureTextEntry: true,
    });
    let ResetTimer

    const handleResetPassword = async () => {
        try {
            if(check.password && check.confirmPassword) {
                const res = await axios({
                    url: `${auth}/resetpassword/${route.params.resettoken}`,
                    method: 'post',
                    data: data
                })
                if(res.status == 200){
                    setSuccessMsg(res.data.message)
                    setSuccess(true)
                    SignedInTimer = setTimeout(() => {
                        setSuccessMsg('')
                        setSuccess(false)
                    }, 3000);
                    setData({
                        password: '',
                        confirmPassword: '',
                    })
                    setCheck({
                        password: false,
                        confirmPassword: false,
                        secureTextEntry: true,
                    })
                }
            }
        } catch (error) {
            setErrMsg(error?.response?.data?.message)
            setError(true)
            ResetTimer = setTimeout(() => {
                setError(false)
                setErrMsg('')
            }, 3000);
        }
    }

    React.useEffect(() => {
        return () => {
            clearInterval(ResetTimer)
        }
    })

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Reset Password!</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
            <Text style={styles.textFooter}>Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" color={colors.text} size={20}/>
                    <TextInput 
                        placeholder="Enter Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={check.secureTextEntry ? true : false}
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
                        secureTextEntry={check.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setData({...data, confirmPassword: val})}
                        onEndEditing={() => setCheck({...check, confirmPassword: true})}
                        value={data.confirmPassword}
                    />
                    <TouchableOpacity activeOpacity={0.5} onPress={() => setCheck({ ...check, secureTextEntry: !check.secureTextEntry })}>
                    {check.secureTextEntry ? 
                        <Feather name="eye-off" color="grey" size={20}/>
                        :
                        <Feather name="eye" color="grey" size={20}/>
                    }
                    </TouchableOpacity>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Signin')}>
                    <Text style={styles.forgetPasswordLink}>Proceed to Sign in</Text>
                </TouchableOpacity>
                {check.confirmPassword && (
                    data.confirmPassword === data.password ? null 
                    : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Passwords do not match.</Text>
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

                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => handleResetPassword()}>
                        <LinearGradient colors={['#5B1B9B', '#7063AD']} style={styles.button}>
                            <Text style={styles.buttonText}>Reset Password</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
      );
};
  
export default ResetPassword