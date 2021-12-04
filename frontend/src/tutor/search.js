import React from "react"
import { 
    View,
    Text,
    StatusBar,
    TouchableOpacity,
} from "react-native"
import SearchBar from "react-native-dynamic-search-bar"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Modal from "react-native-modal";
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/search'

const TSearch = () => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const [searchText, setSearchText] = React.useState("")
    const [spinnerVisibility, setSpinnerVisibility] = React.useState(false)
    const [isModalVisible, setModalVisible] = React.useState(false);

    const handleOnChangeText = (text) => {
        // ? Visible the spinner
        setSearchText(text)
        setSpinnerVisibility(true)
        
        // ? After you've done to implement your use-case
        // ? Do not forget to set false to spinner's visibility
        setSpinnerVisibility(false)
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <SearchBar
                height={50}
                fontSize={18}
                fontColor="#000"
                iconColor="#000"
                shadowColor="#000"
                cancelIconColor="#000"
                backgroundColor="#fff"
                spinnerVisibility={spinnerVisibility}
                placeholder="Search ..."
                style={styles.searchBar}
                onChangeText={handleOnChangeText}
            />

            <View style={styles.buttonContainer}>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.saveButton}>
                        <Text style={styles.textButton}>Filter <AntDesign name="filter" color={colors.backgroundColor} size={20}/></Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Modal isVisible={isModalVisible}>
                <StatusBar translucent={true} backgroundColor={colors.text} barStyle="light-content"/>
                <View style={{ flex: 1 }}>
                    <TouchableOpacity onPress={() => setModalVisible(false)}>
                        <Text>Hello haghas!</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

export default TSearch