import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, LinkingOptions } from '@react-navigation/native'

import Splash from '../basic/splash'
import NavigatorEase from '../basic/navigatorEase'
import Signup from '../basic/signup'
import Signin from '../basic/signin'
import Verify from '../basic/verify'
import ForgotPassword from '../basic/forgotPassword'
import ResetPassword from '../basic/resetPassword'
import Role from '../basic/role'

import SSearch from '../student/search'
import SAllContracts from '../student/allContracts'
import SContract from '../student/contract'
import SOthersProfile from '../student/othersProfile'
import SUpdateInfo from '../student/updateInfo'
import SNewsfeed from '../student/newsfeed'
import SEditProfile from '../student/editProfile'
import SPostDetails from '../student/postDetails'
import SFeedback from '../student/feedback'
import SAllUserPost from '../student/allUserPost'
import SProfile from '../student/profile'
import SSetting from '../student/setting'
import SUpdatePassword from '../student/updatePassword'
import SAnnouncement from '../student/announcement'
import SCreatePost from '../student/createPost'
import SNotification from '../student/notification';
import SMessages from '../student/messages';
import SChat from '../student/chat';

import TChat from '../tutor/chat'; 
import TMessages from '../tutor/messages';
import TNotification from '../tutor/notification';
import TSearch from '../tutor/search'
import TAllContracts from '../tutor/allContracts'
import TContract from '../tutor/contract'
import TOthersProfile from '../tutor/othersProfile'
import TUpdateInfo from '../tutor/updateInfo'
import TNewsfeed from '../tutor/newsfeed'
import TEditProfile from '../tutor/editProfile'
import TPostDetails from '../tutor/postDetails'
import TFeedback from '../tutor/feedback'
import TAllUserPost from '../tutor/allUserPost'
import TProfile from '../tutor/profile'
import TSetting from '../tutor/setting'
import TUpdatePassword from '../tutor/updatePassword'
import TAnnouncement from '../tutor/announcement'
import TRequested from '../tutor/requested'
import TEnrolled from '../tutor/enrolled'
import TCreatePost from '../tutor/createPost'

import Map from '../components/map'

import { StdTabNavigator, TtrTabNavigator } from '../navigators/tabnavigator'

const Stack = createNativeStackNavigator();

import { AuthContext } from '../context/authContext';

const BasicStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            <Stack.Screen 
                name="Splash" 
                component={Splash} 
                options={{ 
                    title: 'MenComm', 
                    headerShown:false 
                }}/>
            <Stack.Screen 
                name="Role" 
                component={Role}
                options={{ 
                    title: 'Roles', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#5B1B9B',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white',
                    },
                    headerTintColor: 'white'
                }}/>
            {/* <Stack.Screen 
                name="NavigatorEase"
                component={NavigatorEase} 
                options={{
                    title: 'Navigator Ease To Debug Screen', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#5B1B9B',
                    },
                    headerTitleStyle: {
                        color: 'white',
                        fontFamily: 'Nunito-Regular',
                    },
                    headerTintColor: 'white',
                }}/> */}
            <Stack.Screen 
                name="Signin" 
                component={Signin} 
                options={{ 
                    title: 'Sign In', 
                    headerShown: true, 
                    headerStyle: {
                        backgroundColor: '#5B1B9B',
                    },
                    headerTitleStyle: {
                        color: 'white',
                        fontFamily: 'Nunito-Regular',
                    },
                    headerTintColor: 'white',
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
                    title: 'Reset Password', 
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
        </Stack.Navigator>
    );
};

const StdStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            {/* <Stack.Screen 
                name="SSearch" 
                component={SSearch}
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
                }}/> */}
            <Stack.Screen 
                name="Map" 
                component={Map}
                options={{ 
                    headerShown: false,
                }}/>
            <Stack.Screen 
                name="Role" 
                component={Role}
                options={{ 
                    title: 'Roles', 
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
                name="SAllContracts" 
                component={SAllContracts}
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
                name="SContract"
                component={SContract}
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
                name="SOthersProfile" 
                component={SOthersProfile}
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
                name="SUpdateInfo" 
                component={SUpdateInfo}
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
            {/* <Stack.Screen 
                name="SNewsfeed" 
                component={SNewsfeed}
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
                }}/> */}
            <Stack.Screen 
                name="SEditProfile" 
                component={SEditProfile}
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
                name="SPostDetails" 
                component={SPostDetails}
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
                name="SFeedback" 
                component={SFeedback}
                options={{ 
                    title: 'Feedbacks', 
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
                name="SAllUserPost" 
                component={SAllUserPost}
                options={{ 
                    title: 'All Posts', 
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
                name="SProfile" 
                component={SProfile}
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
            {/* <Stack.Screen 
                name="SSetting" 
                component={SSetting}
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
                }}/> */}
            <Stack.Screen 
                name="SUpdatePassword" 
                component={SUpdatePassword}
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
                name="SAnnouncement" 
                component={SAnnouncement}
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
                name="SCreatePost" 
                component={SCreatePost}
                options={{ 
                    title: 'Create Post', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#2D52B0',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/> */}
            <Stack.Screen 
                name="SMessages" 
                component={SMessages} 
                options={
                    ({route}) =>({ 
                    title: "Messages", 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#2D52B0',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                })}/>
            {/* <Stack.Screen 
                name="SNotification" 
                component={SNotification} 
                options={
                    ({route}) =>({ 
                    title: "Chat", 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#2D52B0',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                })}/> */}
            <Stack.Screen 
                name="SChat" 
                component={SChat} 
                options={
                    ({route}) =>({ 
                    title: route.params.userName, 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#2D52B0',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                })}/>
        </Stack.Navigator>
    );
};

const TtrStackNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{headerShown: true}}>
            {/* <Stack.Screen 
                name="TSearch" 
                component={TSearch}
                options={{ 
                    title: 'Search', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/> */}
            <Stack.Screen 
                name="Role" 
                component={Role}
                options={{ 
                    title: 'Roles', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white',
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TAllContracts" 
                component={TAllContracts}
                options={{ 
                    title: 'All Contracts', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TContract" 
                component={TContract}
                options={{ 
                    title: 'Contract', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TOthersProfile" 
                component={TOthersProfile}
                options={{ 
                    title: 'Profile', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TUpdateInfo" 
                component={TUpdateInfo}
                options={{ 
                    title: 'Update Information', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white',
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TNewsfeed" 
                component={TNewsfeed}
                options={{ 
                    title: 'Newsfeed', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TEditProfile" 
                component={TEditProfile}
                options={{ 
                    title: 'Edit Profile', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TPostDetails" 
                component={TPostDetails}
                options={{ 
                    title: 'Post', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TFeedback" 
                component={TFeedback}
                options={{ 
                    title: 'Feedbacks', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TAllUserPost" 
                component={TAllUserPost}
                options={{ 
                    title: 'All Posts', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TProfile" 
                component={TProfile}
                options={{ 
                    title: 'Profile', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TSetting" 
                component={TSetting}
                options={{ 
                    title: 'Settings', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TUpdatePassword" 
                component={TUpdatePassword}
                options={{ 
                    title: 'Update Password', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TAnnouncement" 
                component={TAnnouncement}
                options={{ 
                    title: 'Announcement', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TRequested" 
                component={TRequested}
                options={{ 
                    title: 'Requests', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TEnrolled" 
                component={TEnrolled}
                options={{ 
                    title: 'Enrolls', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TCreatePost" 
                component={TCreatePost}
                options={{ 
                    title: 'Create Post', 
                    title: 'Messenger', 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#2D52B0',
                    },
                    headerTitleStyle: {
                        color: 'white'
                    },
                    headerTintColor: 'white'
                }}/>
            <Stack.Screen 
                name="TMessages" 
                component={TMessages} 
                options={
                    ({route}) =>({ 
                    title: "Messages", 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                })}/>
            <Stack.Screen 
                name="TNotification" 
                component={TNotification} 
                options={
                    ({route}) =>({ 
                    title: "Notification", 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#1CAB5F',
                    },
                    headerTitleStyle: {
                        fontFamily: 'Nunito-Regular',
                        color: 'white'
                    },
                    headerTintColor: 'white'
                })}/>
            <Stack.Screen 
                name="TChat" 
                component={TChat} 
                options={
                    ({route}) =>({ 
                    title: route.params.userName, 
                    headerShown:true, 
                    headerStyle: {
                        backgroundColor: '#0E9D50',
                    },
                    headerTitleStyle: {
                        color: 'white'
                    },
                    headerTintColor: 'white'
                })}/>
        </Stack.Navigator>
    );
};

const MainNavigator = () => {
    const deepLinking = {
        prefixes: ['https://connec.com', 'connec://',  ],
        config: {
            screens:{
                Basic: {
                    screens: {
                        ResetPassword: {
                            path: 'resetpassword/:resettoken'
                        }
                    }
                }
            }
        }
    }

    const { loggedIn, profileUpdated, userType } = React.useContext(AuthContext)

    return (
        <NavigationContainer linking={deepLinking}>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {loggedIn && !profileUpdated && userType != "" ? 
                    <>
                        {userType === "0" ? 
                            <>
                                <Stack.Screen name="STab" component={StdTabNavigator}/>
                                <Stack.Screen name="SStack" component={StdStackNavigator}/>
                            </>
                            :
                            <>
                                <Stack.Screen name="TTab" component={TtrTabNavigator}/>
                                <Stack.Screen name="TStack" component={TtrStackNavigator}/>
                            </>
                        }
                    </>
                    :
                    <Stack.Screen name="Basic" component={BasicStackNavigator}/>
                }
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export { 
    MainNavigator
}