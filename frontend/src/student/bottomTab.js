import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StyleSheet, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';
import SNewsfeed from './newsfeed'
import SSearch from './search'
import SPostDetails from './postDetails'
import SSetting from './setting'
import SContract from './contract'

const Tab = createBottomTabNavigator();

const TabArr = [
    { route: 'SNewsfeed', label: 'Newsfeed', icon: 'home-outline', component: SNewsfeed },
    { route: 'SSearch', label: 'Search', icon: 'search-outline', component: SSearch },
    { route: 'SPostDetails', label: 'Post Details', icon: 'ios-add-circle', component: SPostDetails },
    { route: 'Settings', label: 'Settings', icon: 'settings-outline', component: SSetting },
    { route: 'SContract', label: 'Contract', icon: 'document-outline', component: SContract },
]

const TabButton = (props) => {
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
                duration={1000}
                style={styles.container}
                >
                <Ionicons name={item.icon} color={focused ? '#2D52B0' : '#000'} size={20}/>
            </Animatable.View>
        </TouchableOpacity>
    )
}
  

const BottomTab = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator 
                screenOptions={{ 
                    tabBarStyle: {
                        height: 60,
                        position: 'absolute',
                        borderTopStartRadius: 16,
                        borderTopEndRadius: 16,
                        elevation: 10
                    } 
                }}
                >
                {TabArr.map( (item, index) =>
                    <Tab.Screen key={index} name={item.route} component={item.component}
                        options={{
                            tabBarShowLabel: true,
                            tabBarButton: (props) => <TabButton {...props} item={item} />
                        }}
                    />
                )}
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default BottomTab

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})