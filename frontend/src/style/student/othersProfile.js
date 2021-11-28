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
            borderRadius: 15, 
            marginTop: 20
        },
        name: {
            marginTop: 5, 
            fontSize: 18, 
            color: '#000'
        },
        userRating: {
            flexDirection: 'row', 
            alignItems: 'center', 
            marginBottom: 10, 
            marginTop:5
        },
        userRatingCount: { 
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
            fontSize: 18,
            fontWeight: 'bold',
            color: '#fff'
        }
    })
}