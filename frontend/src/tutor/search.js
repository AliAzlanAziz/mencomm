import React from "react"
import { 
    View,
    Text,
    StatusBar,
    TouchableOpacity,
    TextInput
} from "react-native"
import DropDownPicker from 'react-native-dropdown-picker';
import SearchBar from "react-native-dynamic-search-bar"
import Ionicons from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Modal from "react-native-modal";
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/search'

const TSearch = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const [open, setOpen] = React.useState(false)
    const [searchText, setSearchText] = React.useState("")
    const [value, setValue] = React.useState(null)
    const [items, setItems] = React.useState([
        {label: 'Home Tuition', value: 'hometuition'},
        {label: "Tutor's Home", value: 'tutorshome'},
        {label: "Academy", value: 'academy'}
    ]);
    const [spinnerVisibility, setSpinnerVisibility] = React.useState(false)
    const [isModalVisible, setModalVisible] = React.useState(false);
    const [data, setData] = React.useState({
        rate: 0,
        grade: '',
        min: '',
        max: ''
    })

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
                <View style={styles.filterButton}>
                    <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.saveButton} activeOpacity={0.7}>
                        <Text style={styles.textButton}>Filter <AntDesign name="filter" color={colors.backgroundColor} size={20}/></Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Modal animationInTiming={500} style={{ margin: 0, justifyContent:"flex-end" }} isVisible={isModalVisible} onBackdropPress={() => setModalVisible(false)} onBackButtonPress={() => setModalVisible(false)}>
                <StatusBar translucent={true} backgroundColor={"#1CAB5F"} barStyle="light-content"/>

                <View style={styles.modalList}>
                    <Text style={styles.modalListTextHeader}>Apply Filters</Text>
                </View>
                <View style={styles.modalList}>
                    <TouchableOpacity style={styles.modalListRatingButton} onPress={() => data.rate > 0 ? setData({...data, rate: data.rate-1}) : null} activeOpacity={0.7}>
                        <Entypo name="minus" color={"#000"} size={25}/>
                    </TouchableOpacity>
                    <Text style={styles.modalListText}>Rating: {data.rate}</Text>
                    <TouchableOpacity style={styles.modalListRatingButton} onPress={() => data.rate < 5 ? setData({...data, rate: data.rate+1}) : null} activeOpacity={0.7}>
                        <Entypo name="plus" color={"#000"} size={22}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.tutionTypeContainer}>
                    <Text style={styles.labelText}>Preferred Tuition Type:</Text>
                    <View style={styles.dropDownPicker}>
                        <DropDownPicker
                            containerStyle={{
                                width: '50%',
                            }}
                            textStyle={{
                                fontFamily: 'Nunito-Regular',
                            }}
                            labelStyle={{
                                fontFamily: 'Nunito-Regular',
                            }}
                            modalProps={{
                                animationType: "fade",
                                transparent: false
                            }}
                            listMode="MODAL"
                            modalTitle="Select an item"
                            searchable={false}
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                        />
                    </View>
                </View>
                <View style={styles.modalList}>
                    <TextInput 
                        placeholder="Grade/Level to search for"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={ val => setData({...data, grade: val})}
                        defaultValue={data.grade}
                    />
                </View>
                <View style={styles.modalList}>
                    <TextInput 
                        placeholder="Minimum price"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={ val => setData({...data, min: val})}
                        defaultValue={data.min}
                        keyboardType="numeric"
                    />
                    <Text style={styles.modalListText}> to </Text>
                    <TextInput 
                        placeholder="Maximum price"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={ val => setData({...data, max: val})}
                        value={data.max}
                        keyboardType="numeric"
                    />
                </View>
                <TouchableOpacity style={styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Nearbies <Ionicons name="location-outline" color={colors.text} size={20}/></Text>
                </TouchableOpacity>
                <View style={styles.modalList}>
                    <TouchableOpacity style={styles.doneButton} onPress={() => setModalVisible(false)} activeOpacity={0.7}>
                        <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </View>
    );
}

export default TSearch