import {
    StyleSheet,
} from 'react-native';

export default createStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff'
        },
        announcementContainer: {
            width: '95%',
            alignSelf: 'center',
            marginTop: 20,
            marginBottom: 10,
            borderRadius: 18,
            backgroundColor: '#fff',
            elevation:5,
        },
        announcementText: {
            alignSelf: 'center',
            fontFamily: 'Nunito-Regular',
            fontSize: 18,
            color: '#000',
            padding: 30
        },
        postsContainer: {
            marginBottom: 30
        },
        post: {
            flex: 1, 
            width:'100%', 
            marginTop: 20, 
            borderTopWidth: 1, 
            borderBottomWidth: 1, 
            borderRadius:5, 
            borderColor: '#C9CED3'
        },
        cardUserInfo: {
            flexDirection: 'row', 
            width: '95%'
        },
        cardAvatar: {
            height:50, 
            width: 50, 
            borderRadius: 50, 
            margin: 10
        },
        cardNameDate: {
            flex: 1,
            flexDirection: 'row', 
            justifyContent: 'space-between',
            marginTop: 15,
        },
        cardName: {
            fontFamily: 'Nunito-Regular',
            fontSize: 18, 
            color: '#000'
        },
        cardDate: {
            fontFamily: 'Nunito-Regular',
            fontSize: 14, 
            color: '#000',
            marginTop: 4,
        },
        action: {
            flexDirection: 'row',
            alignSelf: 'center',
            marginBottom: 10,
        },
        text: {
            fontFamily: 'Nunito-Regular',
            paddingLeft: 10,
            marginTop: 2,
            width: '95%',
            color: colors.text
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
    })
}