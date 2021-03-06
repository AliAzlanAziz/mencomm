import {
    StyleSheet,
} from 'react-native';

export default createStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff'
        },
        userInfo: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            height: 100, 
            width: 100, 
            borderRadius: 50, 
            marginTop: 20,
            backgroundColor: '#fff'
        },
        name: {
            fontFamily: 'Nunito-Regular',
            marginTop: 5, 
            fontSize: 18, 
            color: '#000'
        },
        userRating: {
            flexDirection: 'row', 
            alignItems: 'center', 
            marginTop:5
        },
        userRatingCount: { 
            fontFamily: 'Nunito-Regular',
            marginLeft: 5, 
            fontSize: 14
        },
        userInfoInput: {
            paddingHorizontal: 20,
        },
        action: {
            marginTop: 10,
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',    
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
        textInput: {
            fontFamily: 'Nunito-Regular',
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            paddingLeft: 10,
            color: colors.text,
        },
        textInputBirthday: {
            fontFamily: 'Nunito-Regular',
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : 2,
            paddingLeft: 10,
            color: '#000',
        },
        textOutputBirthday: {
            fontFamily: 'Nunito-Regular',
            marginTop: Platform.OS === 'ios' ? 0 : 2,
            color: '#000',
        },
        errorMsg: {
            fontFamily: 'Nunito-Regular',
            color: '#FF0000',
            fontSize: 14,
        },
        infoMsg: {
            fontFamily: 'Nunito-Regular',
            color: '#00A0FF',
            fontSize: 14,
        },
        button: {
            alignItems: 'center'
        },
        saveButton: {
            width: '33%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#33C979',
            marginVertical: 10
        },
        textSave: {
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
            color: '#fff'
        },
        modalList: {
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: "#f5f5f5",
            backgroundColor: "#fff", 
            padding: 20
        },
        modalListTextHeader: {
            fontFamily: 'Nunito-Bold',
            fontSize: 20,
            color: '#000'
        },
        modalListText: {
            fontFamily: 'Nunito-Regular',
            fontSize: 18,
            color: '#000'
        },
    })
}