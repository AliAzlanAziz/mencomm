import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from './splash'
import Signup from './signup'
import Signin from './signin'
import Verify from './verify'
import ForgotPassword from './forgotPassword'
import ResetPassword from './resetPassword'
import Search from '../student/search'
import AllContracts from '../student/allContracts'
import Contract from '../student/contract'
import OthersProfile from '../student/othersProfile'
import UpdateInfo from '../student/updateInfo'
import Newsfeed from '../student/newsfeed'
import EditProfile from '../student/editProfile'
import PostDetails from '../student/postDetails'
import Profile from '../student/profile'
import Setting from '../student/setting'
import UpdatePassword from '../student/updatePassword'
import Announcement from '../student/announcement'
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
                            fontFamily: 'Nunito-Regular',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="Verify" 
                    component={Verify}
                    options={{ 
                        title: 'Verify', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#5B1B9B',
                        },
                        headerTitleStyle: {
                            fontFamily: 'Nunito-Regular',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="ForgotPassword" 
                    component={ForgotPassword}
                    options={{ 
                        title: 'Forgot Password', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#5B1B9B',
                        },
                        headerTitleStyle: {
                            fontFamily: 'Nunito-Regular',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="ResetPassword" 
                    component={ResetPassword}
                    options={{ 
                        title: 'Reset', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#5B1B9B',
                        },
                        headerTitleStyle: {
                            fontFamily: 'Nunito-Regular',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="Search" 
                    component={Search}
                    options={{ 
                        title: 'Search', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#2D52B0',
                        },
                        headerTitleStyle: {
                            fontFamily: 'Nunito-Regular',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="AllContracts" 
                    component={AllContracts}
                    options={{ 
                        title: 'All Contracts', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#2D52B0',
                        },
                        headerTitleStyle: {
                            fontFamily: 'Nunito-Regular',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="Contract" 
                    component={Contract}
                    options={{ 
                        title: 'Contract', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#2D52B0',
                        },
                        headerTitleStyle: {
                            fontFamily: 'Nunito-Regular',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="OthersProfile" 
                    component={OthersProfile}
                    options={{ 
                        title: 'Profile', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#2D52B0',
                        },
                        headerTitleStyle: {
                            fontFamily: 'Nunito-Regular',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="UpdateInfo" 
                    component={UpdateInfo}
                    options={{ 
                        title: 'Update Information', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#2D52B0',
                        },
                        headerTitleStyle: {
                            fontFamily: 'Nunito-Regular',
                            color: 'white',
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="Newsfeed" 
                    component={Newsfeed}
                    options={{ 
                        title: 'Newsfeed', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#2D52B0',
                        },
                        headerTitleStyle: {
                            fontFamily: 'Nunito-Regular',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="EditProfile" 
                    component={EditProfile}
                    options={{ 
                        title: 'Edit Profile', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#2D52B0',
                        },
                        headerTitleStyle: {
                            fontFamily: 'Nunito-Regular',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="PostDetails" 
                    component={PostDetails}
                    options={{ 
                        title: 'Post', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#2D52B0',
                        },
                        headerTitleStyle: {
                            fontFamily: 'Nunito-Regular',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="Profile" 
                    component={Profile}
                    options={{ 
                        title: 'Profile', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#2D52B0',
                        },
                        headerTitleStyle: {
                            fontFamily: 'Nunito-Regular',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="Setting" 
                    component={Setting}
                    options={{ 
                        title: 'Settings', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#2D52B0',
                        },
                        headerTitleStyle: {
                            fontFamily: 'Nunito-Regular',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="UpdatePassword" 
                    component={UpdatePassword}
                    options={{ 
                        title: 'Update Password', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#2D52B0',
                        },
                        headerTitleStyle: {
                            fontFamily: 'Nunito-Regular',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                <Stack.Screen 
                    name="Announcement" 
                    component={Announcement}
                    options={{ 
                        title: 'Announcement', 
                        headerShown:true, 
                        headerStyle: {
                            backgroundColor: '#2D52B0',
                        },
                        headerTitleStyle: {
                            fontFamily: 'Nunito-Regular',
                            color: 'white'
                        },
                        headerTintColor: 'white'
                    }}/>
                {/* <Stack.Screen 
                    name="Role" 
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