import {
    StyleSheet
} from 'react-native';

export default createStyles = (colors) => { 
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff'
        },
        userInfoContainer: {
            alignItems: 'center'
        },
        userInfo: {
            flexDirection: 'row',
            width: '90%',
            marginTop: 20,
            marginBottom: 10,
        },
        nameRateContainer: {
            marginTop: 10, 
            marginLeft: 10
        },
        image: {
            height: 80, 
            width: 80, 
            borderRadius: 50, 
        },
        name: {
            fontFamily: 'Nunito-Regular',
            fontSize: 18, 
            color: '#000'
        },
        userRating: {
            flexDirection: 'row', 
            alignItems: 'center', 
            marginBottom: 20, 
            marginTop:5
        },
        userRatingCount: { 
            fontFamily: 'Nunito-Regular',
            marginLeft: 5, 
            fontSize: 14
        },
        userInfoSection: {
            marginTop:  20,
            paddingHorizontal: 30,
            marginBottom: 25,
        },
        row: {
            flexDirection: 'row',
            marginBottom: 10,
        },
        text: {
            fontFamily: 'Nunito-Regular',
            color:"#000", 
            marginLeft: 10
        }
    })
}