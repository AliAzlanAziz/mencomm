import React from 'react';
import { 
    View,
    StatusBar
} from 'react-native';
import LottieView from 'lottie-react-native';

const Authenticating = () => {
    return(
        <View style={{
                flex: 1,
                backgroundColor: '#250545'
            }}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            
            <View style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <LottieView 
                    source={require('../asset/150-android-fingerprint.json')} 
                    autoPlay
                    autoSize
                />
            </View>
        </View>
    )
}

export default Authenticating