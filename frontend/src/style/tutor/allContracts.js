import {
    StyleSheet
} from 'react-native';

export default styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
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
    },
    nameText: {
        fontFamily: 'Nunito-Regular',
        marginLeft: 10,
        color: '#000',
        fontSize: 18,
        width: '65%',
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
    },
    subjectText: {
        fontFamily: 'Nunito-Regular',
        color: '#151515',
        fontSize: 12,
        marginLeft: 10,
        width: '65%',
    },
    prcText: {
        fontFamily: 'Nunito-Regular',
        fontWeight: '300',
        color: '#151515',
        fontSize: 13
    }
});