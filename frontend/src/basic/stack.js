import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './splash'
import Signup from './signup'
import Signin from './signin'
import Verify from './verify'
import ForgotPassword from './forgotpassword'
import ResetPassword from './resetpassword'
import Role from './role'

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen 
                    name="Splash" 
                    component={Splash} 
                    options={{ 
                        title: 'MenComm', 
                        headerShown:false 
                    }}/>
                <Stack.Screen 
                    name="Signin" 
                    component={Signin} 
                    options={{ 
                        title: 'Sign In', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#5B1B9B',
                        },
                        headerTitleStyle: {
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="Signup" 
                    component={Signup}
                    options={{ 
                        title: 'Sign Up', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#5B1B9B',
                        },
                        headerTitleStyle: {
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="verify" 
                    component={Verify}
                    options={{ 
                        title: 'Verify', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#5B1B9B',
                        },
                        headerTitleStyle: {
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="forgotpassword" 
                    component={ForgotPassword}
                    options={{ 
                        title: 'Forgot Password', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#5B1B9B',
                        },
                        headerTitleStyle: {
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="resetpassword" 
                    component={ResetPassword}
                    options={{ 
                        title: 'Reset', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#5B1B9B',
                        },
                        headerTitleStyle: {
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                {/* <Stack.Screen 
                    name="role" 
                    component={Role}
                    options={{ 
                        title: 'Roles', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#5B1B9B',
                        },
                        headerTitleStyle: {
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/> */}
                </Stack.Navigator>
        </NavigationContainer>
    );
};

export default StackNavigator