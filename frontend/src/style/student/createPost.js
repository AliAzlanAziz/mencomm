import {
    Dimensions,
    StyleSheet,
} from 'react-native';

export default createStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1, 
            backgroundColor: '#fff'
        },
        scrollView: {
            paddingHorizontal: 20,
            paddingVertical: 10,
        },
        textFooter: {
            fontFamily: 'Nunito-Regular',
            color: colors.text,
            fontSize: 18,
            marginTop: 5
        },
        textFooterTime: {
            fontFamily: 'Nunito-Regular',
            color: "#666666",
            fontSize: 14,
            marginTop: 5
        },
        textFooterGender: {
            fontFamily: 'Nunito-Regular',
            color: colors.text,
            fontSize: 18,
            marginTop: 15,
            marginBottom: -13
        },
        dropDownPicker: { 
            marginLeft: '20%',
        },
        tutionTypeContainer: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: "#f5f5f5",
            backgroundColor: "#fff",
            padding: 10
        },
        action: {
            flexDirection: 'row',
            marginTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
            paddingBottom: 5
        },
        actionBirthday: {
            flexDirection: 'row',
        },
        separatorBirthday: {
            marginTop: 14,
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
        },
        actionError: {
            flexDirection: 'row',
            marginTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#FF0000',
            paddingBottom: 5
        },
        textInput: {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            paddingLeft: 10,
            color: colors.text,
            fontFamily: 'Nunito-Regular'
        },
        textInputBirthday: {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            paddingLeft: 10,
            color: '#666666',
            marginTop: 2,
            fontFamily: 'Nunito-Regular'
        },
        textOutputBirthday: {
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            color: '#666666',
            marginTop: 2,
            marginLeft: 150,
            fontFamily: 'Nunito-Regular'
        },
        genderIcon: {
            marginTop: 13,
        },
        errorMsg: {
            fontFamily: 'Nunito-Regular',
            color: '#FF0000',
            fontSize: 14,
        },
        infoMsg: {
            fontFamily: 'Nunito-Regular',
            color: '#3048B2',
            fontSize: 14,
        },
        buttonContainer: {
            alignItems: 'center',
            marginVertical: 20
        },
        signupButton: {
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10
        },
        signinButton: {
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            borderColor: '#5B1B9B',
            borderWidth: 1,
            marginTop: 15
        },
        textSignin: {
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
            color: '#fff'
        },
        textSignup: {
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
            color: '#5B1B9B'
        },
        textFooterBirthday: {
            fontFamily: 'Nunito-Regular',
            color: colors.text,
            fontSize: 18,
            marginTop: 5,
        },
        actionBirthday: {
            marginTop: 10,
            flexDirection: 'row',
        },
        separatorBirthday: {
            marginTop: 14,
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
        },
        textInputBirthday: {
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            paddingLeft: 10,
            color: '#666666',
            marginTop: 2,
            fontFamily: 'Nunito-Regular'
        },
        textOutputBirthday: {
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            color: '#666666',
            marginTop: 2,
            marginLeft: 150,
            fontFamily: 'Nunito-Regular'
        },
        scheduleList: {
            marginTop: 10,
            paddingBottom: 10,
            width:'90%', 
            alignSelf:'center'
        },
        scheduleListItem: {
            flexDirection:'row', 
            justifyContent:'space-between', 
            marginTop: 3
        },
        scheduleListItemText: {
            fontFamily: 'Nunito-Regular',
            color: colors.text
        },
        map: {
            width: Dimensions.get("window").width,
            height: Dimensions.get("window").height
        }
    })
}