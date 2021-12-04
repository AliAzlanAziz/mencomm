import {
    Platform,
    StyleSheet,
} from 'react-native';

export default createStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1, 
            backgroundColor: '#1CAB5F'
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
            color: '#05375a',
            fontSize: 18,
            color: colors.text,
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
        buttonContainer: {
            alignItems: 'center',
            marginTop: 30
        },
        button: {
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10
        },
        buttonText: {
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
            color:'#fff'
        }
    });
}