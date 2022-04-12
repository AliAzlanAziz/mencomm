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
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import validator from 'validator'
import axios from 'axios';
import Authenticating from '../loading/authenticating'
import { useTheme } from 'react-native-paper';
import createStyles from '../style/basic/signin'
import { auth } from '../global/url'
import { AuthContext } from '../context/authContext'

const Signin = ({navigation}) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const { setAuth, loading, userType } = React.useContext(AuthContext)
    const [errMsg, setErrMsg] = React.useState('')
    const [error, setError] = React.useState(false)
    const [data, setData] = React.useState({
        email: 'aliazlan2002@gmail.com',
        password: 'jhonscott256'
    });

    // const [data, setData] = React.useState({
    //     email: '',
    //     password: ''
    // });

    // const [check, setCheck] = React.useState({
    //     email: false,
    //     password: false,
    //     secureTextEntry: true,
    // })

    const [check, setCheck] = React.useState({
        email: true,
        password: true,
        secureTextEntry: true,
    })
    let SignedInTimer

    const handleSignIn = async () => {
        try {
            if(check.email && check.password) {
                const res = await axios({
                    url: `${auth}/login`,
                    method: 'post',
                    data: data
                })
                if(res.status == 200){
                    setData({
                        email: '',
                        password: ''
                    })
                    setCheck({
                        email: false,
                        password: false,
                        secureTextEntry: true,
                    })
                    setAuth(res.data.token)
                    if(userType === ""){
                        navigation.navigate('Basic', { screen: 'Role', params: { user_type: '' }})
                    }
                }
            }
        } catch (error) {
            setErrMsg(error?.response?.data?.message)
            setError(true)
            SignedInTimer = setTimeout(() => {
                setError(false)
                setErrMsg('')
            }, 3000);
        }
    }

    React.useEffect(() => {
        return () => {
            clearInterval(SignedInTimer)
        }
    })

    if(loading){
        return <Authenticating />
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Sign In!</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.textFooter}>Email</Text>
                <View style={styles.action}>
                    <FontAwesome 
                        name="envelope-o"
                        color={colors.text}
                        size={20}
                    />
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
              
                <Text style={styles.textFooter}>Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" color={colors.text} size={20} />
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
                {error && 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{errMsg}</Text>
                    </Animatable.View>
                }
  
                <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('ForgotPassword')}>
                    <Text style={styles.forgetPasswordLink}>Forgot password?</Text>
                </TouchableOpacity>
                <View style={styles.button}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.signIn} onPress={() => handleSignIn()}>
                        <LinearGradient colors={['#5B1B9B', '#7063AD']} style={styles.signIn}>
                            <Text style={styles.textSignIn}>Sign In</Text>
                        </LinearGradient>
                    </TouchableOpacity>
    
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Signup')} style={styles.signUpButton}>
                        <Text style={styles.textSignUp}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
      );
};
  
export default Signin