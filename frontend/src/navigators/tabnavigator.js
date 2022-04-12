import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

import SNewsfeed from '../student/newsfeed'
import SSearch from '../student/search'
import SCreatePost from '../student/createPost'
import SSetting from '../student/setting'
import SNotification from '../student/notification'

import TNewsfeed from '../tutor/newsfeed'
import TSearch from '../tutor/search'
import TCreatePost from '../tutor/createPost'
import TSetting from '../tutor/setting'
import TNotification from '../tutor/notification'

const Tab = createBottomTabNavigator();

const StdTabArr = [
    { route: 'SNewsfeed', label: 'Newsfeed', icon: 'home-outline', component: SNewsfeed },
    { route: 'SSearch', label: 'Search', icon: 'search-outline', component: SSearch },
    { route: 'SCreatePost', label: 'Create Post', icon: 'ios-add-circle-outline', component: SCreatePost },
    { route: 'SNotification', label: 'Notifications', icon: 'notifications-outline', component: SNotification },
    { route: 'Settings', label: 'Settings', icon: 'settings-outline', component: SSetting },
]

const TtrTabArr = [
    { route: 'TNewsfeed', label: 'Newsfeed', icon: 'home-outline', component: TNewsfeed },
    { route: 'TSearch', label: 'Search', icon: 'search-outline', component: TSearch },
    { route: 'TCreatePost', label: 'Create Post', icon: 'ios-add-circle-outline', component: TCreatePost },
    { route: 'TNotification', label: 'Notifications', icon: 'notifications-outline', component: TNotification },
    { route: 'TSettings', label: 'Settings', icon: 'settings-outline', component: TSetting },
]

const StdTabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = React.useRef(null);
  
    React.useEffect(() => {
      if (focused) {
        viewRef.current.animate({0: {scale: .5}, 1: {scale: 1.5}});
      } else {
        viewRef.current.animate({0: {scale: 1.5}, 1: {scale: 1}});
      }
    }, [focused])
  
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}
            >
            <Animatable.View
                ref={viewRef}
                duration={250}
                style={styles.container}
                >
                <Ionicons name={item.icon} color={focused ? '#000' : '#fff'} size={25}/>
            </Animatable.View>
        </TouchableOpacity>
    )
}

const TtrTabButton = (props) => {
    const { item, onPress, accessibilityState } = props;
    const focused = accessibilityState.selected;
    const viewRef = React.useRef(null);
  
    React.useEffect(() => {
      if (focused) {
        viewRef.current.animate({0: {scale: .5}, 1: {scale: 1.5}});
      } else {
        viewRef.current.animate({0: {scale: 1.5}, 1: {scale: 1}});
      }
    }, [focused])
  
    return (
        <TouchableOpacity
            onPress={onPress}
            activeOpacity={1}
            style={styles.container}
            >
            <Animatable.View
                ref={viewRef}
                duration={250}
                style={styles.container}
                >
                <Ionicons name={item.icon} color={focused ? '#000' : '#fff'} size={25}/>
            </Animatable.View>
        </TouchableOpacity>
    )
}

const MessengerButton = ({stack, screen}) => {
    const navigation = useNavigation()

    return (
        <TouchableOpacity onPress={() => navigation.navigate(stack, { screen: screen })} style={{marginRight: 30}} activeOpacity={0.7}>
            <Ionicons name="ios-chatbubble-outline" color='#fff' size={25}/>
        </TouchableOpacity>
    )
}

const StdTabNavigator = () => {
    return (
        <Tab.Navigator 
            screenOptions={{ 
                // headerShown: false,
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    borderTopStartRadius: 16,
                    borderTopEndRadius: 16,
                    elevation: 20,
                    backgroundColor: "#9CB1E5"
                } 
            }}
            >

            {StdTabArr.map( (item, index) =>
                item.route == "SNewsfeed" ? 
                <Tab.Screen key={index} name={item.label} component={item.component}
                    options={{
                        tabBarShowLabel: true,
                        headerShown: true, 
                        headerStyle: {
                            backgroundColor: '#2D52B0',
                        },
                        headerTitleStyle: {
                            color: 'white',
                            fontFamily: 'Nunito-Regular',
                            marginLeft: 40
                        },
                        headerTintColor: 'white',
                        headerRight: () => <MessengerButton stack="SStack" screen="SMessages"/>,
                        tabBarButton: (props) => <StdTabButton {...props} item={item} />
                    }}
                />
                :
                <Tab.Screen key={index} name={item.label} component={item.component}
                    options={{
                        tabBarShowLabel: true,
                        headerShown: true, 
                        headerStyle: {
                            backgroundColor: '#2D52B0',
                        },
                        headerTitleStyle: {
                            color: 'white',
                            fontFamily: 'Nunito-Regular',
                            marginLeft: 40
                        },
                        headerTintColor: 'white',
                        tabBarButton: (props) => <StdTabButton {...props} item={item} />
                    }}
                />
            )}
        </Tab.Navigator>
    )
}

const TtrTabNavigator = () => {
    return (
        <Tab.Navigator 
            screenOptions={{ 
                // headerShown: false,
                tabBarStyle: {
                    height: 60,
                    position: 'absolute',
                    borderTopStartRadius: 16,
                    borderTopEndRadius: 16,
                    elevation: 10,
                    backgroundColor: "#79E9AD"
                } 
            }}
            >

            {TtrTabArr.map( (item, index) =>
                item.route == "TNewsfeed" ? 
                <Tab.Screen key={index} name={item.label} component={item.component}
                    options={{
                        tabBarShowLabel: true,
                        headerShown: true, 
                        headerStyle: {
                            backgroundColor: '#1CAB5F',
                        },
                        headerTitleStyle: {
                            color: 'white',
                            fontFamily: 'Nunito-Regular',
                            marginLeft: 40
                        },
                        headerTintColor: 'white',
                        headerRight: () => <MessengerButton stack="TStack" screen="TMessages"/>,
                        tabBarButton: (props) => <TtrTabButton {...props} item={item} />
                    }}
                />
                :
                <Tab.Screen key={index} name={item.label} component={item.component}
                    options={{
                        tabBarShowLabel: true,
                        headerShown: true, 
                        headerStyle: {
                            backgroundColor: '#1CAB5F',
                        },
                        headerTitleStyle: {
                            color: 'white',
                            fontFamily: 'Nunito-Regular',
                            marginLeft: 40
                        },
                        headerTintColor: 'white',
                        tabBarButton: (props) => <TtrTabButton {...props} item={item} />
                    }}
                />
            )}
        </Tab.Navigator>
    )
}

export {
    StdTabNavigator,
    TtrTabNavigator
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})