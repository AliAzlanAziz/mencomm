import React from 'react';
import { 
    View,
    Text,
    TouchableOpacity,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Authenticating from '../loading/authenticating'
import { useTheme } from '@react-navigation/native';
import createStyles from '../style/basic/splash'
import { AuthContext } from '../context/authContext'

const Splash = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const { loading } = React.useContext(AuthContext)
    const [speed, setSpeed] = React.useState(0.7)

    if(loading){
        return <Authenticating />
    }

    return(
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.header}>
                <LottieView 
                    source={require('../asset/75992-online-classes.json')} 
                    onAnimationFinish={()=> setSpeed(0)}
                    speed={speed}
                    loop={false}
                    autoPlay
                    />
            </View>
            <Animatable.View style={styles.footer} animation="fadeInUpBig">
                <Text style={styles.title}>Welcome to the MenComm App</Text>
                <Text style={styles.text}>Sign in with account</Text>
                <View style={styles.button}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('Signup')}>
                        <LinearGradient colors={['#08d4c4', '#01ab9d']} style={styles.buttonContainer}>
                            <Text style={styles.textButton}>Get Started</Text>
                            <MaterialIcons name="navigate-next" color="#fff" size={20}/>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </Animatable.View>
        </View>
    )
}

export default Splash