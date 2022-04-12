import { 
    StyleSheet,
} from 'react-native';

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
        filterButtonContainer: {
            width: '90%', 
            alignSelf: 'center'
        },
        buttonContainer: {
            flexDirection: 'row',
            margin: 10,
            justifyContent: 'center'
        },
        textButton: {
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
            color: '#000',
        },
        selectedTextButton: {
            fontFamily: 'Nunito-Bold',
            fontSize: 18,
            color: '#fff',
        },
        errorMsg: {
            fontFamily: 'Nunito-Regular',
            color: '#FF0000',
            fontSize: 14,
        },
        twoButton: {
            width: '20%',
            height: 40,
            marginLeft: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#fff',
            elevation: 2
        },
        selectedButton: {
            width: '20%',
            height: 40,
            marginLeft: 10,
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: '#2D52B0',
            elevation: 2
        },
        filterButton: {
            width: '40%',
            height: 40,
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 10,
            borderRadius: 10,
            backgroundColor: '#fff',
            elevation: 2,
        },
        modalList: {
            flexDirection: 'row',
            justifyContent: 'center',
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
        modalListTextHeader: {
            fontFamily: 'Nunito-Bold',
            fontSize: 20,
            color: '#000'
        },
        modalListRatingButton: {
            marginHorizontal: 20
        },
        labelText: {
            fontFamily: 'Nunito-Regular',
            fontSize: 16, 
            color: '#000', 
            marginTop: 22, 
            marginLeft: 10
        },
        dropDownPicker: { 
            marginLeft: '10%'
        },
        tutionTypeContainer: {
            flexDirection: 'row',
            borderBottomWidth: 1,
            borderBottomColor: "#f5f5f5",
            backgroundColor: "#fff", 
            padding: 10
        },
        textInput: {
            fontFamily: 'Nunito-Regular',
            flex: 1,
            marginTop: Platform.OS === 'ios' ? 0 : -12,
            paddingLeft: 10,
            color: colors.text,
            borderBottomWidth: 1,
            width: '20%'
        },
        doneButton: {
            justifyContent: 'center', 
            alignItems: 'center', 
            height: 50, 
            width: '50%', 
            borderRadius:15, 
            backgroundColor: '#E05656'
        },
        doneButtonText: {
            fontFamily: 'Nunito-Regular',
            color: '#fff',
            fontSize: 18,
        },
        listContainer:{
            flex:1,
            width:'90%',
            backgroundColor: 'white',
            alignSelf: 'center'
        },
        HeaderLeftImage:{
            width:'100%',
            height:'100%',
            borderRadius:50,
        },
        HeaderLeftImageView:{
            width:50,
            height:50,
            borderRadius:20,
            marginLeft:15,
        },
        User:{
            color:'#000',
            fontSize: 16,
            marginTop: 5,
            marginLeft: 5 
        },
        scrollViewContainer: {
            marginBottom: 60
        },
        post: {
            flex: 1, 
            width:'100%', 
            marginBottom: 20,
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
        people: {
            fontFamily: 'Nunito-Bold',
            fontSize: 16,
            color: "#000",
            marginVertical: 15
        }
    })
}