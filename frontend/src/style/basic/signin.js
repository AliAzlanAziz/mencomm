import {
    Platform,
    StyleSheet,
} from 'react-native';

export default createStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1, 
            backgroundColor: '#551A91'
        },
        header: {
            flex: 1,
            justifyContent: 'flex-end',
            paddingHorizontal: 20,
            paddingBottom: 50
        },
        footer: {
            flex: 3,
            backgroundColor: colors.background,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingHorizontal: 20,
            paddingVertical: 30
        },
        textHeader: {
            fontFamily: 'Nunito-Bold',
            color: '#fff',
            fontSize: 30
        },
        textFooter: {
            fontFamily: 'Nunito-Regular',
            color: colors.text,
            fontSize: 18
        },
        action: {
            flexDirection: 'row',
            marginTop: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
            paddingBottom: 5
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
        errorMsg: {
            fontFamily: 'Nunito-Regular',
            color: '#FF0000',
            fontSize: 14,
        },
        button: {
            alignItems: 'center',
            marginTop: 30
        },
        signIn: {
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
        },
        signUpButton: {
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            borderColor: '#5B1B9B',
            borderWidth: 1,
            marginTop: 15
        },
        forgetPasswordLink:{
            fontFamily: 'Nunito-Regular',
            color: '#5B1B9B', 
            marginTop:15
        },
        textSignIn: {
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
            color: '#fff'
        },
        textSignUp: {
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
            color: '#5B1B9B'
        }
    });
}