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
        userInfoContainer: {
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 10
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
            marginTop: 5, 
            fontSize: 18,
            fontFamily: 'Nunito-Regular',
            color: '#000'
        },
        userRating: {
            flexDirection: 'row', 
            alignItems: 'center', 
            marginBottom: 20, 
            marginTop:5
        },
        userRatingCount: { 
            marginLeft: 5, 
            fontSize: 14,
            fontFamily: 'Nunito-Regular',
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
        button: {
            alignItems: 'center',
            marginTop: 5,
            marginBottom: 20,
        },
        modalList: {
            borderBottomWidth: 1,
            borderBottomColor: "#f5f5f5",
            backgroundColor: "#fff", 
            padding: 20
        },
        modalListText: {
            fontFamily: 'Nunito-Regular',
            fontSize: 18,
            color: '#000'
        },
        textButton: {
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
            color: '#fff',
        },
        saveButton: {
            width: '30%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#4378FF',
        },
        cancelButton: {
            width: '30%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#E05656',
        },
        tutorButtonContainer:{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 5,
            marginBottom: 20,
        },
        reqButton: {
            width: '30%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#49C081',
            marginRight: 10
        },
        enrollButton: {
            width: '30%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#4378FF',
        },
        announcementButtonContainer:{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 5,
            marginBottom: 20,
        },
        announcementButton: {
            width: '50%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#4378FF',
        },
    })
}