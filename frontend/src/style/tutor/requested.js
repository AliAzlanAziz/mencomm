import {
    StyleSheet,
} from 'react-native';

export default createStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
        },
        row: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderColor: '#DCDCDC',
            backgroundColor: '#fff',
            borderBottomWidth: 1,
            padding: 10,
        },
        pic: {
            borderRadius: 50,
            width: 60,
            height: 60,
        },
        nameImageContainer: {
            flex: 1, 
            flexDirection: 'row', 
            alignItems:'center'
        },
        buttonsContainer: {
            flexDirection: 'row'
        },
        acceptButton: {
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 40, 
            width:80, 
            marginRight: 10,
            borderRadius:15, 
            backgroundColor: '#49C081'
        },
        rejectButton: {
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 40, 
            width:80, 
            borderRadius:15, 
            backgroundColor: '#E05656'
        },
        nameText: {
            fontFamily: 'Nunito-Regular',
            marginLeft: 10,
            color: '#000',
            fontSize: 18,
            width: '65%'
        },
        buttonText: {
            fontFamily: 'Nunito-Regular',
            color: '#fff',
            fontSize: 18,
        },
    })
}