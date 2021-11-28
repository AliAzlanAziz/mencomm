import React from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
} from 'react-native'
import { VStack, Box, Divider } from 'native-base';
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/updateInfo'

const UpdateInfo = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    return (
        <ScrollView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
        </ScrollView>
    )
}

export default UpdateInfo