import { 
    StyleSheet,
} from 'react-native';

export default createStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1, 
            backgroundColor: '#fff'
        },
        settingsIcon: {
            alignSelf: 'center', 
            marginTop: 20, 
            marginBottom: 20
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
        }
    })
}