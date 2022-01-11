import { 
    Dimensions,
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
        buttonContainer: {
            width: '90%', 
            alignSelf: 'center'
        },
        filterButton: {
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
    })
}