import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'

const NavigatorEase = ({ navigation }) => {
    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={{backgroundColor: 'white'}}>
                <Text style={{fontFamily: 'Nunito-Regular', fontSize: 18, color: '#000', marginLeft: 20, paddingVertical: 20}}>Basic Screen</Text>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('Signin') }} style={styles.rowBasic}>
                <Text style={styles.rowText}>Sign In</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Signup') }} style={styles.rowBasic}>
                <Text style={styles.rowText}>Sign Up</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('Verify') }} style={styles.rowBasic}>
                <Text style={styles.rowText}>Verify</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('ForgotPassword') }} style={styles.rowBasic}>
                <Text style={styles.rowText}>Forgot Password</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('ResetPassword') }} style={styles.rowBasic}>
                <Text style={styles.rowText}>Reset Password</Text>
            </TouchableOpacity>
            <View style={{backgroundColor: 'white'}}>
                <Text style={{fontFamily: 'Nunito-Regular', fontSize: 18, color: '#000', marginLeft: 20, paddingVertical: 20}}>Student's Screen</Text>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('SAllContracts') }} style={styles.rowStudent}>
                <Text style={styles.rowText}>Student All Contracts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('SContract') }} style={styles.rowStudent}>
                <Text style={styles.rowText}>Student Contract</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('SNewsfeed') }} style={styles.rowStudent}>
                <Text style={styles.rowText}>Student Newsfeed</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('SPostDetails') }} style={styles.rowStudent}>
                <Text style={styles.rowText}>Student Post Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('SProfile') }} style={styles.rowStudent}>
                <Text style={styles.rowText}>Student Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('SEditProfile') }} style={styles.rowStudent}>
                <Text style={styles.rowText}>Student Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('SOthersProfile') }} style={styles.rowStudent}>
                <Text style={styles.rowText}>Student Other's Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('SSearch') }} style={styles.rowStudent}>
                <Text style={styles.rowText}>Student Search</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('SAnnouncement') }} style={styles.rowStudent}>
                <Text style={styles.rowText}>Student Announcement</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('SUpdateInfo') }} style={styles.rowStudent}>
                <Text style={styles.rowText}>Student Update Info</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('SSetting') }} style={styles.rowStudent}>
                <Text style={styles.rowText}>Student Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('SUpdatePassword') }} style={styles.rowStudent}>
                <Text style={styles.rowText}>Student Update Password</Text>
            </TouchableOpacity>
            <View style={{backgroundColor: 'white'}}>
                <Text style={{fontFamily: 'Nunito-Regular', fontSize: 18, color: '#000', marginLeft: 20, paddingVertical: 20}}>Tutor's Screen</Text>
            </View>
            <TouchableOpacity onPress={() => { navigation.navigate('TAllContracts') }} style={styles.rowTutor}>
                <Text style={styles.rowText}>Tutor All Contracts</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('TContract') }} style={styles.rowTutor}>
                <Text style={styles.rowText}>Tutor Contract</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('TNewsfeed') }} style={styles.rowTutor}>
                <Text style={styles.rowText}>Tutor Newsfeed</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('TPostDetails') }} style={styles.rowTutor}>
                <Text style={styles.rowText}>Tutor Post Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('TProfile') }} style={styles.rowTutor}>
                <Text style={styles.rowText}>Tutor Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('TEditProfile') }} style={styles.rowTutor}>
                <Text style={styles.rowText}>Tutor Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('TOthersProfile') }} style={styles.rowTutor}>
                <Text style={styles.rowText}>Tutor Other's Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('TSearch') }} style={styles.rowTutor}>
                <Text style={styles.rowText}>Tutor Search</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('TAnnouncement') }} style={styles.rowTutor}>
                <Text style={styles.rowText}>Tutor Announcement</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('TUpdateInfo') }} style={styles.rowTutor}>
                <Text style={styles.rowText}>Tutor Update Info</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('TSetting') }} style={styles.rowTutor}>
                <Text style={styles.rowText}>Tutor Setting</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { navigation.navigate('TUpdatePassword') }} style={styles.rowTutor}>
                <Text style={styles.rowText}>Tutor Update Password</Text>
            </TouchableOpacity>
        </ScrollView>
    )
}

export default NavigatorEase

const styles = StyleSheet.create({
    rowBasic: {
        backgroundColor: '#F5EDF7',
        elevation: 2,
        marginVertical: 5
    },
    rowStudent: {
        backgroundColor: '#E1EEF5',
        elevation: 2,
        marginVertical: 5
    },
    rowTutor: {
        backgroundColor: '#E9F6E3',
        elevation: 2,
        marginVertical: 5
    },
    rowText: {
        fontFamily: 'Nunito-Regular', 
        fontSize: 18, 
        color: '#000', 
        marginLeft: 20, 
        paddingVertical: 20
    }
})