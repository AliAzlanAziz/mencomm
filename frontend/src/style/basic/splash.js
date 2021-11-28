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
            backgroundColor: '#5B1B9B'
        },
        header: {
            flex: 2,
            justifyContent: 'center',
            alignItems: 'center'
        },
        footer: {
            flex: 1,
            backgroundColor: colors.background,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            paddingVertical: 50,
            paddingHorizontal: 30
        },
        logo: {
            width: height_logo,
            height: height_logo
        },
        title: {
            color: colors.text,
            fontSize: 25,
            fontWeight: 'bold'
        },
        text: {
            color: 'grey',
            marginTop:5
        },
        button: {
            alignItems: 'flex-end',
            marginTop: 30
        },
        signIn: {
            width: 150,
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 50,
            flexDirection: 'row'
        },
        textSign: {
            color: 'white',
            fontWeight: 'bold'
        }
    })
}