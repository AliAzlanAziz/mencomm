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
        userInfo: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
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
            marginBottom: 20, 
            marginTop:5
        },
        userRatingCount: { 
            fontFamily: 'Nunito-Regular',
            marginLeft: 5, 
            fontSize: 14
        },
        action: {
            flexDirection: 'row',
            marginHorizontal: 10,
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
            paddingBottom: 5,
        },
        schedule: {
            flexDirection: 'row',
            marginHorizontal: 10,
        },
        scheduleList: {
            paddingBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
            width:'85%', 
            marginLeft:40
        },
        scheduleListItem: {
            flexDirection:'row', 
            justifyContent:'space-between', 
            marginTop: 3
        },
        scheduleListItemText: {
            fontFamily: 'Nunito-Regular',
            color: colors.text
        },
        review: {
            flexDirection: 'row',
            marginHorizontal: 10,
            width:'72%', 
            marginVertical: 5
        },
        text: {
            fontFamily: 'Nunito-Regular',
            paddingLeft: 10,
            marginTop: 2,
            width: '85%',
            color: colors.text
        },
        textInput: {
            fontFamily: 'Nunito-Regular',
            marginLeft: 40,
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            width: '85%',
            height: 40, 
            borderColor: 'gray', 
            borderBottomWidth: 1,
        },
        button: {
            marginLeft: 40
        },
        saveButton: {
            width: '25%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#33C979',
            marginVertical: 10
        },
        textButton: {
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
            color: '#fff'
        }, 
        cancelButtonContainer: {
            alignItems: 'center'
        },
        cancelButton: {
            width: '60%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#E05656',
            marginBottom: 10
        }
    })
}