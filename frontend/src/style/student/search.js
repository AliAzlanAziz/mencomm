import { 
    Dimensions,
    StyleSheet,
} from 'react-native';

const { height } = Dimensions.get('screen')
const height_logo = height * 0.7 * 0.4

export default createStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff'
        },
        searchBar: {
            marginTop: 10,
            height: 50,
            borderRadius: 15,
            elevation: 2
        },
        buttonContainer: {
            width: '90%', 
            alignSelf: 'center'
        },
        button: {
            marginTop: 10,
        },
        textButton: {
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
            color: '#000',
        },
        saveButton: {
            width: '40%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#fff',
            elevation: 2
        },
    })
}