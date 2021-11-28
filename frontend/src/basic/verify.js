import React from 'react';
import { 
    View, 
    Text,
    StyleSheet,
    StatusBar
} from 'react-native';

import * as Animatable from 'react-native-animatable';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Verify = () => {
    const email = "K180357@gmail.com"
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
                <Text style={styles.text}>A verification email has been sent to {email} Please verify the account first.</Text>
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
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        borderBottomLeftRadius: 30,
        borderBottomRightRadius: 30,
        paddingHorizontal: 20,
        paddingVertical: 20,
    },
    text: {
        fontSize: 25,
        marginTop: 10
    },
})

export default Verify