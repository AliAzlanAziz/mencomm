import React from 'react'
import {
    Text,
    View,
    TextInput,
    Image,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/announcement'

const Announcement = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const [isModalVisible, setModalVisible] = React.useState(false);
    const [height, setHeight] = React.useState(0);

    return (
        <ScrollView style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <TouchableOpacity style={styles.announcementContainer} onPress={() => setModalVisible(true)}>
                <Text style={styles.announcementText}>Make an announcement to the students...</Text>
            </TouchableOpacity>
            <Modal isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} onBackButtonPress={() => setModalVisible(false)}>
                <View style={{}}>
                    <StatusBar translucent={true} backgroundColor={colors.text} barStyle="light-content"/>
                    <View style={{marginBottom: 20, alignItems: 'center', justifyContent: 'center', width: '95%', backgroundColor: '#fff', borderRadius: 18}}>
                        <TextInput 
                            placeholder="Write something"
                            placeholderTextColor="#666666"
                            style={[styles.textInput, {height: height}]}
                            onContentSizeChange={(e) => { e.nativeEvent.contentSize.height < 200 ? setHeight(e.nativeEvent.contentSize.height) : setHeight(400)}}
                            multiline={true}
                            autoCapitalize="none"
                            onChangeText={() => {}}
                        />
                    </View>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.enrollButton}>
                        <Text style={styles.textButton}>Post <Ionicons name="ios-arrow-up-circle-outline" color={colors.backgroundColor} size={20}/></Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.cancelButton}>
                        <Text style={styles.textButton}>Cancel <Entypo name="circle-with-cross" color={colors.backgroundColor} size={18}/></Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            <View style={styles.postsContainer}>
                <View style={styles.post}>
                    <View style={styles.cardUserInfo}>
                        <Image source={require('../asset/astronaut.png')} style={styles.cardAvatar} />
                        <View style={styles.cardNameDate}>
                            <Text style={styles.cardName}>Ali Azlan Aziz</Text>
                            <Text style={styles.cardDate}>12/12/2020</Text>
                        </View>
                    </View>
                    <View style={styles.action}>
                        <Text style={styles.text}>
                            Adipisicing consequat aliquip quis consequat deserunt dolore. Et duis esse irure do sint tempor occaecat aute voluptate voluptate exercitation cupidatat esse proident. Elit sint quis do sunt minim. Anim culpa dolor elit aliquip adipisicing quis magna. Qui laborum enim proident Lorem ad occaecat et sunt laborum dolore quis. Laboris occaecat ipsum deserunt mollit qui cillum exercitation excepteur consequat occaecat. Nisi fugiat mollit excepteur excepteur nisi veniam pariatur magna deserunt.
                            Laboris nisi id deserunt labore. Dolore proident velit sint qui excepteur duis. Qui culpa anim proident aute velit aute ea laborum ut labore duis nulla do.
                        </Text>
                    </View>
                </View>

                <View style={styles.post}>
                    <View style={styles.cardUserInfo}>
                        <Image source={require('../asset/astronaut.png')} style={styles.cardAvatar} />
                        <View style={styles.cardNameDate}>
                            <Text style={styles.cardName}>Ali Azlan Aziz</Text>
                            <Text style={styles.cardDate}>12/12/2020</Text>
                        </View>
                    </View>
                    <View style={styles.action}>
                        <Text style={styles.text}>
                            Adipisicing consequat aliquip quis consequat deserunt dolore. Et duis esse irure do sint tempor occaecat aute voluptate voluptate exercitation cupidatat esse proident. Elit sint quis do sunt minim. Anim culpa dolor elit aliquip adipisicing quis magna. Qui laborum enim proident Lorem ad occaecat et sunt laborum dolore quis. Laboris occaecat ipsum deserunt mollit qui cillum exercitation excepteur consequat occaecat. Nisi fugiat mollit excepteur excepteur nisi veniam pariatur magna deserunt.
                        </Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Announcement