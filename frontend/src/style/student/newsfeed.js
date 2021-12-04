import {
    StyleSheet,
} from 'react-native';

export default createStyles = (colors) => {
    return StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: '#fff',
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
        postInfoContainer: {
            borderTopWidth: 1, 
            borderColor: '#DCE2E9'
        },
        postInfo: {
            marginLeft: 10, 
            marginTop: 10
        },
        detailsText : {
            borderTopWidth: 1, 
            borderColor: '#DCE2E9'
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
            marginHorizontal: 10,
            marginBottom: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#f2f2f2',
            paddingBottom: 5,
        },
        text: {
            fontFamily: 'Nunito-Regular',
            paddingLeft: 10,
            marginTop: 2,
            width: '85%',
            color: colors.text
        },
        seeDetailsLinkContainer : {
            borderTopWidth: 1, 
            borderColor: '#DCE2E9'
        },
        seeDetailsLink: {
            marginLeft: 40
        },
        seeDetailsText: {
            fontFamily: 'Nunito-Bold',
            margin: 10,
            fontSize: 12,
            color: '#4378FF'
        },
        createPostButtonContainer: {
            justifyContent: 'flex-end', 
            alignItems: 'flex-end'
        },
        createPostButton: {
            position: 'absolute'
        },
        infoMsg: {
            fontSize: 12, 
            fontFamily: 'Nunito-Bold',
            color: '#00A0FF',
            marginRight: 10,
        },
        plusIcon: {
            marginRight: 10, 
            marginBottom: 80
        }
    })
}