import React from 'react'
import {
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/announcement'

const SAnnouncement = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const [isModalVisible, setModalVisible] = React.useState(false);
    const [height, setHeight] = React.useState(0);
    const [data, setData] = React.useState([
        {id: 1, name: 'Dr. Abdul Aziz', date: '12/12/2020', text: 'Adipisicing consequat aliquip quis consequat deserunt dolore. Et duis esse irure do sint tempor occaecat aute voluptate voluptate exercitation cupidatat esse proident. Elit sint quis do sunt minim. Anim culpa dolor elit aliquip adipisicing quis magna. Qui laborum enim proident Lorem ad occaecat et sunt laborum dolore quis. Laboris occaecat ipsum deserunt mollit qui cillum exercitation excepteur consequat occaecat. Nisi fugiat mollit excepteur excepteur nisi veniam pariatur magna deserunt. Laboris nisi id deserunt labore. Dolore proident velit sint qui excepteur duis. Qui culpa anim proident aute velit aute ea laborum ut labore duis nulla do.', img: require('../asset/logo.png') },
        {id: 2, name: 'Dr. Abdul Aziz', date: '12/12/2020', text: 'Adipisicing consequat aliqre. Dolore proident velit sint qui excepteur duis. Qui culpa anim proident aute velit aute ea laborum ut labore duis nulla do.', img: require('../asset/logo.png') },
        {id: 3, name: 'Dr. Abdul Aziz', date: '12/12/2020', text: 'Adipisicing conmpor occaecat auteident. Elit sint quis do sunt minim. Anim culpa dolor elit aliquip adipisicing quis magna. Qui laborum enim proident Lorem ad occaecat et sunt laborum dolore quis. Laboris occaecat ipsum deserunt mollit qui cillum exercitation excepteur consequat occaecat. Nisi fugiat mollit excepteur excepteur nisi veniam pariatur magna deserunt. Laboris nisi id deserunt labore. Dolore proident velit sint qui excepteur duis. Qui culpa anim proident aute velit aute ea laborum ut labore duis nulla do.', img: require('../asset/logo.png') },
        {id: 4, name: 'Dr. Abdul Aziz', date: '12/12/2020', text: 'Adipisicing consequat aliquip quis consequat deserunt dolore. Et duis esse irure do sint tempor occaecat aute voluptate voluptate exercitation cupidatat esse proident. Elit sint quis do sunt minim. Anim culpa dolor elit aliquip adipisicing quis magna. Qui laborum enim proident Lorem ad occaecat et sunt laborum dolore quis. Laboris occaecat ipsum deserunt mollit qui cillum exercitation excepteur consequat occaecat. Nisi fugiat mollit excepteur excepteur nisi veniam pariatur magna deserunt. Laboris nisi id deserunt labore. Dolore proident velit sint qui excepteur duis. Qui culpa anim proident aute velit aute ea laborum ut labore duis nulla do.', img: require('../asset/logo.png') },
        {id: 5, name: 'Dr. Abdul Aziz', date: '12/12/2020', text: 'Adipisicing dent aute velit aute ea laborum ut labore duis nulla do.', img: require('../asset/logo.png') },
        {id: 6, name: 'Dr. Abdul Aziz', date: '12/12/2020', text: 'Adipisicing consequat aliquiptate exerpa dolor elit aliquip adipisicing quis magna. Qui laborum enim proident Lorem ad occaecat et sunt laborum dolore quis. Laboris occaecat ipsum deserunt mollit qui cillum exercitation excepteur consequat occaecat. Nisi fugiat mollit excepteur excepteur nisi veniam pariatur magna deserunt. Laboris nisi id deserunt labore. Dolore proident velit sint qui excepteur duis. Qui culpa anim proident aute velit aute ea laborum ut labore duis nulla do.', img: require('../asset/logo.png') }
    ])

    return (
        <ScrollView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.announcementContainer}>
                <Text style={styles.announcementText}>Announcements</Text>
            </View>

            <View style={styles.postsContainer}>
                {
                    data.map(item => <View style={styles.post} key={item.id}>
                        <View style={styles.cardUserInfo}>
                            <Image source={item.img} style={styles.cardAvatar} />
                            <View style={styles.cardNameDate}>
                                <Text style={styles.cardName}>{item.name}</Text>
                                <Text style={styles.cardDate}>{item.date}</Text>
                            </View>
                        </View>
                        <View style={styles.action}>
                            <Text style={styles.text}>{item.text}</Text>
                        </View>
                    </View>
                )}
            </View>
        </ScrollView>
    )
}

export default SAnnouncement