import {
    StyleSheet
} from 'react-native';

export default styles = StyleSheet.create({
    view: {
        flex: 1
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
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
    nameContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 320,
    },
    nameText: {
        fontFamily: 'Nunito-Regular',
        marginLeft: 15,
        color: '#000',
        fontSize: 18,
        width: 170,
    },
    dateText: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '300',
        color: '#151515',
        fontSize: 13,
    },
    msgContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: 320,
    },
    subjectText: {
        fontFamily: 'Nunito-Regular',
        color: '#151515',
        fontSize: 12,
        marginLeft: 15,
        width: 170
    },
    prcText: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '300',
        color: '#151515',
        fontSize: 13
    }
});