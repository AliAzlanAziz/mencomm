import {
    StyleSheet,
} from 'react-native';

export default createStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#f6f6f6'
        },
        userInfo: {
            justifyContent: 'center',
            alignItems: 'center',
        },
        image: {
            height: 100,
            width: 100,
            borderRadius: 50,
            marginTop: 20
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
            marginBottom: 10,
            marginTop: 5
        },
        userRatingCount: {
            fontFamily: 'Nunito-Regular',
            marginLeft: 5,
            fontSize: 14
        },
        button: {
            alignItems: 'center'
        },
        saveButton: {
            width: '40%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#4378FF',
            marginTop: 2,
            marginBottom: 20,
        },
        textSave: {
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
            color: '#fff'
        },
        cardContainer: {
            alignItems: 'center'
        },
        card: { 
            backgroundColor: '#7C9FF7', 
            marginVertical: 10, 
            borderRadius: 15, 
            width: '95%'
        },
        cardUserInfo: {
            flexDirection: 'row', 
            width: '95%'
        },
        cardAvatar: {
            height:50, 
            width: 50, 
            borderRadius: 30, 
            margin: 10
        },
        cardUserInfoSeparator: {
            flex: 1,
            flexDirection: 'row', 
            justifyContent: 'space-between'
        },
        cardNameDate: {
            marginTop: 15
        },
        cardName: {
            fontFamily: 'Nunito-Regular',
            fontSize: 18, 
            color: '#000'
        },
        cardDate: {
            fontFamily: 'Nunito-Regular',
            fontSize: 14, 
            color: '#000'
        },
        cardRating: {
            marginTop: 18
        },
        cardFeedbackContainer: {
            alignSelf:'center', 
            width: '90%', 
            marginBottom: 20
        },
        cardFeedback: {
            fontFamily: 'Nunito-Regular',
            fontSize: 15, 
            color: '#000'
        }
    })
}