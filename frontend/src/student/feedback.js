import React from 'react'
import { AirbnbRating } from 'react-native-ratings'
import {
    Text,
    View,
    Image,
    ScrollView,
    StatusBar,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/feedback'

const TFeedback = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const [user, setUser] = React.useState({
        id: 1, 
        name: 'Ali Azlan Aziz', 
        rating: 4.8,
        ratingCount: 452,
        img: require('../asset/astronaut.png')
    })

    const [data, setData] = React.useState([
        {id: 1, name: 'Dr. Abdul Aziz', date: '12/12/2020', rating: 5, text: 'Adipisicing consequat aliquip quis consequat deserunt dolore. Et duis esse irure do sint tempor occaecat aute voluptate voluptate exercitation cupidatat esse proident. Elit sint quis do sunt minim. Anim culpa dolor elit aliquip adipisicing quis magna. Qui laborum enim proident Lorem ad occaecat et sunt laborum dolore quis. Laboris occaecat ipsum deserunt mollit qui cillum exercitation excepteur consequat occaecat. Nisi fugiat mollit excepteur excepteur nisi veniam pariatur magna deserunt. Laboris nisi id deserunt labore. Dolore proident velit sint qui excepteur duis. Qui culpa anim proident aute velit aute ea laborum ut labore duis nulla do.', img: require('../asset/logo.png') },
        {id: 2, name: 'Dr. Ashraf', date: '12/12/2020', rating: 4, text: 'Adipisicing consequat aliqre. Dolore proident velit sint qui excepteur duis. Qui culpa anim proident aute velit aute ea laborum ut labore duis nulla do.', img: require('../asset/logo.png') },
        {id: 3, name: 'Dr. Haider Azeem', date: '12/12/2020', rating: 5, text: 'Adipisicing conmpor occaecat auteident. Elit sint quis do sunt minim. Anim culpa dolor elit aliquip adipisicing quis magna. Qui laborum enim proident Lorem ad occaecat et sunt laborum dolore quis. Laboris occaecat ipsum deserunt mollit qui cillum exercitation excepteur consequat occaecat. Nisi fugiat mollit excepteur excepteur nisi veniam pariatur magna deserunt. Laboris nisi id deserunt labore. Dolore proident velit sint qui excepteur duis. Qui culpa anim proident aute velit aute ea laborum ut labore duis nulla do.', img: require('../asset/logo.png') },
        {id: 4, name: 'Imtiaz Khan', date: '12/12/2020', rating: 4, text: 'Adipisicing consequat aliquip quis consequat deserunt dolore. Et duis esse irure do sint tempor occaecat aute voluptate voluptate exercitation cupidatat esse proident. Elit sint quis do sunt minim. Anim culpa dolor elit aliquip adipisicing quis magna. Qui laborum enim proident Lorem ad occaecat et sunt laborum dolore quis. Laboris occaecat ipsum deserunt mollit qui cillum exercitation excepteur consequat occaecat. Nisi fugiat mollit excepteur excepteur nisi veniam pariatur magna deserunt. Laboris nisi id deserunt labore. Dolore proident velit sint qui excepteur duis. Qui culpa anim proident aute velit aute ea laborum ut labore duis nulla do.', img: require('../asset/logo.png') },
        {id: 5, name: 'Prof. Mohit Kumar', date: '12/12/2020', rating: 5, text: 'Adipisicing dent aute velit aute ea laborum ut labore duis nulla do.', img: require('../asset/logo.png') },
        {id: 6, name: 'Dr. Haris Ahmed', date: '12/12/2020', rating: 5, text: 'Adipisicing consequat aliquiptate exerpa dolor elit aliquip adipisicing quis magna. Qui laborum enim proident Lorem ad occaecat et sunt laborum dolore quis. Laboris occaecat ipsum deserunt mollit qui cillum exercitation excepteur consequat occaecat. Nisi fugiat mollit excepteur excepteur nisi veniam pariatur magna deserunt. Laboris nisi id deserunt labore. Dolore proident velit sint qui excepteur duis. Qui culpa anim proident aute velit aute ea laborum ut labore duis nulla do.', img: require('../asset/logo.png') }
    ])

    return (
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.userInfo}>
                <Image source={user.img} style={styles.image}/>
                <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">{user.name}</Text>
                <View style={styles.userRating}>
                    <AirbnbRating
                        defaultRating={Math.floor(user.rating) === Math.ceil(user.rating) ? Math.floor(user.rating) : Math.ceil(user.rating)}
                        size={18}
                        showRating={false}
                        isDisabled={true}
                        />
                    <Text style={styles.userRatingCount}>{user.rating}</Text>
                </View>
            </View>
            <View style={styles.cardContainer}>
                {data.map(item => <View style={styles.card} key={item.id}>
                    <View style={styles.cardUserInfo}>
                        <Image source={item.img} style={styles.cardAvatar} />
                        <View style={styles.cardUserInfoSeparator}>
                            <View style={styles.cardNameDate}>
                                <Text style={styles.cardName}>{item.name}</Text>
                                <Text style={styles.cardDate}>{item.date}</Text>
                            </View>
                            <View style={styles.cardRating}>
                                <AirbnbRating
                                    defaultRating={Math.floor(item.rating) === Math.ceil(item.rating) ? Math.floor(item.rating) : Math.ceil(item.rating)}
                                    size={14}
                                    showRating={false}
                                    isDisabled={true}
                                    />
                            </View>
                        </View>
                    </View>
                    <View style={styles.cardFeedbackContainer}>
                        <Text style={styles.cardFeedback}>{item.text}</Text>
                    </View>
                </View>)}
            </View>            
        </ScrollView>
    )
}

export default TFeedback