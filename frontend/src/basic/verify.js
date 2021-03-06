import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    StatusBar
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Verify = ({ navigation, route }) => {
    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <Animatable.View 
                animation="bounceIn"
                style={styles.card}>
                <MaterialIcons 
                    name="verified-user"
                    color="#000"
                    size={50}
                    style={styles.icon} />
                <Text style={styles.text}>A verification email has been sent to {route.params.email}.{'\n'}Please verify the account first.</Text>
            </Animatable.View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#5B1B9B',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: 30
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
        borderRadius: 30,
        padding: 20
    },
    text: {
        fontFamily: 'Nunito-Regular',
        fontSize: 22,
        marginTop: 10
    },
})

export default Verify