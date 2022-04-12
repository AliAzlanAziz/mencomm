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
import { useTheme } from 'react-native-paper';
import createStyles from '../style/tutor/updatePassword'

const TUpdatePassword = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const [data, setData] = React.useState({
        password: '',
        confirmPassword: '',
        secureTextEntry: true,
        isValidPassword: true,
        passwordMatch: true
    });

    const handlePasswordChange = (val) => {
        if( val.trim().length >= 8 ) {
            setData({
                ...data,
                password: val,
                isValidPassword: true
            });
        } else {
            setData({
                ...data,
                password: val,
                isValidPassword: false
            });
        }
    }

    const handleConfirmPasswordChange = (val) => {
        setData({
            ...data,
            confirmPassword: val,
        });
    }

    const handlePasswordMatch = () => {
        if( data.password === data.confirmPassword ){
            setData({
                ...data,
                passwordMatch: true
            });
        } else {
            setData({
                ...data,
                passwordMatch: false
            });
        }
    }

    const updateSecureTextEntry = () => {
        setData({
            ...data,
            secureTextEntry: !data.secureTextEntry
        });
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.header}>
                <Text style={styles.textHeader}>Update Password!</Text>
            </View>
            <Animatable.View animation="fadeInUpBig" style={styles.footer}>
                <Text style={styles.textFooter}>Password</Text>
                <View style={styles.action}>
                    <Feather name="lock" color={colors.text} size={20}/>
                    <TextInput 
                        placeholder="Enter Old Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={() => {}}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry} activeOpacity={0.7}>
                        {data.secureTextEntry ? 
                            <Feather name="eye-off" color="grey" size={20}/>
                            :
                            <Feather name="eye" color="grey" size={20}/>
                        }
                    </TouchableOpacity>
                </View>

                <View style={styles.action}>
                    <Feather name="lock" color={colors.text} size={20}/>
                    <TextInput 
                        placeholder="Enter Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handlePasswordChange(val)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry} activeOpacity={0.7}>
                        {data.secureTextEntry ? 
                            <Feather name="eye-off" color="grey" size={20}/>
                            :
                            <Feather name="eye" color="grey" size={20}/>
                        }
                    </TouchableOpacity>
                </View>
                {data.isValidPassword ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Password must be 8 characters long.</Text>
                    </Animatable.View>
                }

                <View style={styles.action}>
                    <Feather name="lock" color={colors.text} size={20}/>
                    <TextInput 
                        placeholder="Confirm Password"
                        placeholderTextColor="#666666"
                        secureTextEntry={data.secureTextEntry ? true : false}
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => handleConfirmPasswordChange(val)}
                        onEndEditing={(e)=> handlePasswordMatch(e.nativeEvent.text)}
                    />
                    <TouchableOpacity onPress={updateSecureTextEntry} activeOpacity={0.7}>
                        {data.secureTextEntry ? 
                            <Feather name="eye-off" color="grey" size={20} />
                            :
                            <Feather name="eye" color="grey" size={20}/>
                        }
                    </TouchableOpacity>
                </View>
                { data.passwordMatch ? null : 
                    <Animatable.View animation="fadeInLeft" duration={500}>
                        <Text style={styles.errorMsg}>Passwords do not match.</Text>
                    </Animatable.View>
                }

                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={() => {}} activeOpacity={0.7}>
                        <LinearGradient colors={['#1CAB5F', '#2ADE7E']} style={styles.button}>
                            <Text style={styles.buttonText}>Reset Password</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
      );
};
  
export default TUpdatePassword