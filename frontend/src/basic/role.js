import React from 'react'
import { 
    View,
    Text,
    TouchableOpacity,
    Dimensions,
    StyleSheet,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import { useTheme } from '@react-navigation/native';

const Role = ({ navigation }) => {
    const { colors } = useTheme();

    return(
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.header}>
                <Animatable.Image animation="bounceIn" duraton="1500" source={require('../asset/user-shield-icon-13-256.png')} style={styles.logo} resizeMode="stretch"/>
            </View>
            <Animatable.View style={[styles.footer, { backgroundColor: colors.background }]} animation="fadeInUpBig">
                <Text style={[styles.title, { color: colors.text}]}>Select Roles</Text>
                <Text style={styles.text}> Are You a Dedicated Tutor willing to Teach the young minds or Are you a ambitious Student Willing to learn from the best</Text>
                <View style={styles.button}> 
                    <View style={styles.sbutton}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Role')}>
                            <LinearGradient colors={['#016aab', '#0148ab']} style={styles.signIn}>
                                <Text style={styles.textSign}>Student</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.tbutton}>
                        <TouchableOpacity onPress={()=>navigation.navigate('Role')}>
                            <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.signIn}>
                                <Text style={styles.textSign}>Tutor</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: '#5B1B9B'
    },
    header: {
        flex: 2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    footer: {
        flex: 1,
        backgroundColor: 'white',
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
        fontWeight: 'bold'
    },
    text: {
        color: 'grey',
        marginTop:5
    },
    button: {
        marginTop: 30,
        flexDirection:'row'
    },
    sbutton: {
        alignItems: 'flex-start',
    },
    tbutton: {
        alignItems: 'flex-end',
        marginLeft:50
    },
    signIn: {
        width: 150,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 50,
        flexDirection: 'row'
    },
    textSign: {
        color: 'white',
        fontWeight: 'bold'
    }
})
