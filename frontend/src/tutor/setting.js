import React from "react"
import { 
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    Image
} from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/setting'
import { AuthContext } from '../context/authContext'

const TSetting = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const { profile, removeAuthState } = React.useContext(AuthContext)

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TProfile' })} style={styles.userInfo} activeOpacity={0.7}>
                <Image source={{uri: profile.avatar_url}} style={styles.image}/>
                <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">{profile.name}</Text>
            </TouchableOpacity>
            <View>
                <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TEditProfile'}) } style={styles.rowFirst} activeOpacity={0.5}>
                    <MaterialCommunityIcons name="account-edit-outline" color='#000' size={18} style={styles.rowIcon}/>
                    <Text style={styles.rowText}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TUpdateInfo'}) } style={styles.row} activeOpacity={0.5}>
                    <MaterialCommunityIcons name="update" color='#000' size={18} style={styles.rowIcon}/>
                    <Text style={styles.rowText}>Update Information</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'Role', params: { user_type: 'ttr' } }) } style={styles.row} activeOpacity={0.5}>
                    <MaterialCommunityIcons name="toggle-switch-outline" color='#000' size={18} style={styles.rowIcon}/>
                    <Text style={styles.rowText}>Switch Roles</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TAllContracts'}) } style={styles.row} activeOpacity={0.5}>
                    <MaterialCommunityIcons name="file-outline" color='#000' size={18} style={styles.rowIcon}/>
                    <Text style={styles.rowText}>Contracts</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TAllUserPost'}) } style={styles.row} activeOpacity={0.5}>
                    <MaterialCommunityIcons name="post-outline" color='#000' size={18} style={styles.rowIcon}/>
                    <Text style={styles.rowText}>My Posts</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TFeedback'}) } style={styles.row} activeOpacity={0.5}>
                    <MaterialCommunityIcons name="star-outline" color='#000' size={18} style={styles.rowIcon}/>
                    <Text style={styles.rowText}>My feedbacks</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => removeAuthState() } style={styles.row} activeOpacity={0.5}>
                    <MaterialCommunityIcons name="logout" color='#000' size={18} style={styles.rowIcon}/>
                    <Text style={styles.rowText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default TSetting