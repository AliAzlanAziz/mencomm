import React from 'react';
import { 
    View, 
    Text, 
    TouchableOpacity, 
    TextInput,
    StatusBar
} from 'react-native'
import * as Animatable from 'react-native-animatable'
import LinearGradient from 'react-native-linear-gradient'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Feather from 'react-native-vector-icons/Feather'
import validator from 'validator'
import axios from 'axios'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/basic/forgotPassword'
import { auth } from '../global/url'

const ForgotPassword = ({ navigation }) => {
    const { colors } = useTheme()
    const styles = createStyles(colors)

    const [success, setSuccess] = React.useState(false)
    const [successMsg, setSuccessMsg] = React.useState('')
    const [error, setError] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState('')
    const [data, setData] = React.useState({
        email: 'aliazlan2002@gmail.com',
    })
    const [check, setCheck] = React.useState({
        email: true,
    })
    // const [data, setData] = React.useState({
    //     email: '',
    // })
    // const [check, setCheck] = React.useState({
    //     email: false,
    // })
    let recoverTimer

    const handleRecoverPassword = async () => {
        try {
            const res = await axios({
                url: `${auth}/resetlink`,
                method: 'post',
                data: data
            })
            if(res.status == 200){
                //set user info context
                setSuccessMsg(res.data.message)
                setSuccess(true)
                recoverTimer = setTimeout(() => {
                    setSuccess(false)
                    setSuccessMsg('')
                }, 3000)
            }
        } catch (error) {
            setErrMsg(error?.response?.data?.message)
            setError(true)
            recoverTimer = setTimeout(() => {
                setError(false)
                setErrMsg('')
            }, 3000)
        }
    } 

    React.useEffect(() => {
        return () => {
            clearInterval(recoverTimer)
        }
    })

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Recover Password!</Text>
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
                {error > 0 && 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>{errMsg}</Text>
                    </Animatable.View>
                }
                {success > 0 && 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.infoMsg}>{successMsg}</Text>
                    </Animatable.View>
                }

                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.button}onPress={() => handleRecoverPassword()}>
                        <LinearGradient colors={['#5B1B9B', '#7063AD']} style={styles.button}>
                            <Text style={styles.buttonText}>Next</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
      )
}
  
export default ForgotPassword