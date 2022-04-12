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
            marginTop: 5,
            marginBottom: 10
        },
        name: {
            fontFamily: 'Nunito-Regular',
            marginTop: 5, 
            fontSize: 18, 
            color: '#000'
        },
        rowFirst: {
            flexDirection: 'row', 
            paddingVertical: 20, 
            borderTopWidth: 1, 
            borderBottomWidth: 1, 
            borderColor: '#f2f2f2'
        },
        row: {
            flexDirection: 'row', 
            paddingVertical: 20, 
            borderBottomWidth: 1, 
            borderColor: '#f2f2f2'
        },
        rowIcon: {
            marginLeft: 20
        },
        rowText: {
            color: '#000', 
            fontSize: 18, 
            fontFamily: 'Nunito-Regular', 
            marginLeft: 10
        },
        image: {
            height: 70, 
            width: 70, 
            borderRadius: 50, 
            marginTop: 20
        },
    })
}