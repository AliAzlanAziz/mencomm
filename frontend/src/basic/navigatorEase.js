import React from 'react'
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native'

const NavigatorEase = ({ navigation }) => {
    const [basic, setBasic] = React.useState([
        {id:1, name: 'Signin', label: 'Sign In'},
        {id:2, name: 'Signup', label: 'Sign Up'},
        {id:3, name: 'Verify', label: 'Verify'},
        {id:4, name: 'ForgotPassword', label: 'Forgot Password'},
        {id:5, name: 'ResetPassword', label: 'Reset Password'},
    ])

    const [student, setStudent] = React.useState([
        {id:1, name: 'SAllContracts', label: 'Student All Contracts'},
        {id:2, name: 'SContract', label: 'Student Contract'},
        {id:3, name: 'SNewsfeed', label: 'Student Newsfeed'},
        {id:4, name: 'SPostDetails', label: 'Student Post Details'},
        {id:5, name: 'SFeedback', label: 'Student\'s Feedbacks'},
        {id:6, name: 'SAllUserPost', label: 'Student\'s All Posts'},
        {id:7, name: 'SProfile', label: 'Student Profile'},
        {id:8, name: 'SEditProfile', label: 'Student Edit Profile'},
        {id:9, name: 'SOthersProfile', label: 'Student Other\'s Profile'},
        {id:10, name: 'SSearch', label: 'Student Search'},
        {id:11, name: 'SAnnouncement', label: 'Student Announcement'},
        {id:12, name: 'SUpdateInfo', label: 'Student Update Info'},
        {id:13, name: 'SSetting', label: 'Student Setting'},
        {id:14, name: 'SUpdatePassword', label: 'Student Update Password'},
        {id:15, name: 'SCreatePost', label: 'Student Create Post'}
    ])

    const [tutor, setTutor] = React.useState([
        {id:1, name: 'TAllContracts', label: 'Tutor All Contracts'},
        {id:2, name: 'TContract', label: 'Tutor Contract'},
        {id:3, name: 'TNewsfeed', label: 'Tutor Newsfeed'},
        {id:4, name: 'TPostDetails', label: 'Tutor Post Details'},
        {id:5, name: 'TFeedback', label: 'Tutor\'s Feedbacks'},
        {id:6, name: 'TAllUserPost', label: 'Tutor\'s All Posts'},
        {id:7, name: 'TProfile', label: 'Tutor Profile'},
        {id:8, name: 'TEditProfile', label: 'Tutor Edit Profile'},
        {id:9, name: 'TOthersProfile', label: 'Tutor Other\'s Profile'},
        {id:10, name: 'TSearch', label: 'Tutor Search'},
        {id:11, name: 'TAnnouncement', label: 'Tutor Announcement'},
        {id:12, name: 'TRequested', label: 'Tutor Requested'},
        {id:13, name: 'TEnrolled', label: 'Tutor Enrolls'},
        {id:14, name: 'TUpdateInfo', label: 'Tutor Update Info'},
        {id:15, name: 'TSetting', label: 'Tutor Setting'},
        {id:16, name: 'TUpdatePassword', label: 'Tutor Update Password'},
        {id:17, name: 'TCreatePost', label: 'Tutor Create Post'}
    ])

    return (
        <ScrollView style={{backgroundColor: '#fff'}}>
            <View style={{backgroundColor: 'white'}}>
                <Text style={{fontFamily: 'Nunito-Regular', fontSize: 18, color: '#000', marginLeft: 20, paddingVertical: 20}}>Basic Screen</Text>
            </View>
            {basic.map(item => <TouchableOpacity onPress={() => { navigation.navigate(item.name) }} style={styles.rowBasic} key={item.id}>
                <Text style={styles.rowText}>{item.label}</Text>
            </TouchableOpacity>)}

            <View style={{backgroundColor: 'white'}}>
                <Text style={{fontFamily: 'Nunito-Regular', fontSize: 18, color: '#000', marginLeft: 20, paddingVertical: 20}}>Student's Screen</Text>
            </View>
            {student.map(item => <TouchableOpacity onPress={() => { navigation.navigate(item.name) }} style={styles.rowStudent} key={item.id}>
                <Text style={styles.rowText}>{item.label}</Text>
            </TouchableOpacity>)}
            
            <View style={{backgroundColor: 'white'}}>
                <Text style={{fontFamily: 'Nunito-Regular', fontSize: 18, color: '#000', marginLeft: 20, paddingVertical: 20}}>Tutor's Screen</Text>
            </View>
            {tutor.map(item => <TouchableOpacity onPress={() => { navigation.navigate(item.name) }} style={styles.rowTutor} key={item.id}>
                <Text style={styles.rowText}>{item.label}</Text>
            </TouchableOpacity>)}
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