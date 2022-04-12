import {
    Platform,
    StyleSheet,
} from 'react-native';

export default createStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff'
        },
        tutionTypeInput: {
            flexDirection: 'row', 
            marginVertical: 10, 
        },
        iconLabelWrapper: {
            flexDirection: 'row', 
            marginTop: 20, 
            marginLeft: 10
        },
        labelText: {
            fontFamily: 'Nunito-Regular',
            fontSize: 16,
            color: '#000',
            marginTop: 2,
            marginLeft: 5
        },
        dropDownPicker: { 
            marginVertical: 10, 
            marginLeft: '10%'
        },
        scrollView: { 
            paddingHorizontal: 10
        },
        InputWrapper: {
            padding: 10, 
        },
        infoMsg: {
            fontFamily: 'Nunito-Regular',
            color: '#3048B2',
            fontSize: 14,
        },
        tutionType: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            marginHorizontal: 20,
            marginTop: 20,
            borderBottomWidth: 2,
            borderBottomColor: '#f2f2f2',
            paddingBottom: 20,
        },
        text: {
            fontFamily: 'Nunito-Regular',
            paddingLeft: 10,
            marginTop: 2,
            color: colors.text
        },
        picker: {
            width: '33%',
            height: 50,
            borderColor: '#000',
            borderWidth: 1,
            borderRadius: 15,
            elevation: 5,
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
            paddingBottom: 10
        },
        textInput: {
            fontFamily: 'Nunito-Regular',
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            paddingLeft: 10,
            color: colors.text,
            borderBottomWidth: 1,
            borderRadius: 10,
        },
        button: {
            marginLeft: 0
        },
        courseButton: {
            width: '33%',
            height: 40,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#4378FF',
            marginVertical: 10
        },
        saveButton: {
            width: '100%',
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#4378FF',
            marginVertical: 10
        },
        textSave: {
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
            color: '#fff'
        }, 
    })
}