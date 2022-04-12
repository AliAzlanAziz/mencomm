import React from "react"
import { 
    View,
    Text,
    StatusBar,
    TouchableOpacity,
} from "react-native"
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/setting'

const TSetting = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <Ionicons name="settings-outline" color='#000' size={50} style={styles.settingsIcon}/>
            
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TEditProfile'}) } style={styles.rowFirst} activeOpacity={0.5}>
                    <MaterialCommunityIcons name="account-edit-outline" color='#000' size={18} style={styles.rowIcon}/>
                    <Text style={styles.rowText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TUpdateInfo'}) } style={styles.row} activeOpacity={0.5}>
                    <MaterialCommunityIcons name="update" color='#000' size={18} style={styles.rowIcon}/>
                    <Text style={styles.rowText}>Update Information</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Role') } style={styles.row} activeOpacity={0.5}>
                    <MaterialCommunityIcons name="toggle-switch-outline" color='#000' size={18} style={styles.rowIcon}/>
                    <Text style={styles.rowText}>Switch Roles</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TAllContracts'}) } style={styles.row} activeOpacity={0.5}>
                    <MaterialCommunityIcons name="file-outline" color='#000' size={18} style={styles.rowIcon}/>
                    <Text style={styles.rowText}>Contracts</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Signin') } style={styles.row} activeOpacity={0.5}>
                    <MaterialCommunityIcons name="logout" color='#000' size={18} style={styles.rowIcon}/>
                    <Text style={styles.rowText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TSetting