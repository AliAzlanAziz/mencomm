import React from "react"
import { 
    View,
    Image,
    Text,
    ScrollView,
    StatusBar,
    TouchableOpacity,
    TextInput
} from "react-native"
import DropDownPicker from 'react-native-dropdown-picker';
import SearchBar from "react-native-dynamic-search-bar"
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Modal from "react-native-modal";
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/search'

const SSearch = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(null)
    const [items, setItems] = React.useState([
        {label: 'Home Tuition', value: 'hometuition'},
        {label: "Tutor's Home", value: 'tutorshome'},
        {label: "Academy", value: 'academy'}
    ]);
    const [searchText, setSearchText] = React.useState("")
    const [spinnerVisibility, setSpinnerVisibility] = React.useState(false)
    const [isFilterModalVisible, setFilterModalVisible] = React.useState(false)
    const [isReportModalVisible, setReportModalVisible] = React.useState(false)
    const [data, setData] = React.useState({
        rate: 0,
        grade: '',
        min: '',
        max: '',
        nearbies: false
    })
    const [posts, setPosts] = React.useState([
        {id:1, img: require('../asset/astronaut.png'), name: 'Dr. Abdul Aziz', date: '12/12/2020', course: 'Object Oriented Programming', grade: 'Under Grad', tuitionType: 'Home Tuition', fee: '10000 PKR', address: 'R-442, Sector-8, North Karachi, North Karachi, North Karachi, Karachi, Pakistan', start_date: '18th Dec 2020, Wednesday', desc: 'Et ut elit duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipisicing non elit.'},
        {id:2, img: require('../asset/astronaut.png'), name: 'Dr. Abdul Aziz', date: '12/12/2020', course: 'Object Oriented Programming', grade: 'Under Grad', tuitionType: 'Home Tuition', fee: '10000 PKR', address: 'R-442, Sector-8, North Karachi, Karachi, Pakistan', start_date: '18th Dec 2020, Wednesday', desc: 'Et ut elit duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipisicing duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipis non elit.'},
        {id:3, img: require('../asset/astronaut.png'), name: 'Dr. Abdul Aziz', date: '12/12/2020', course: 'Object Oriented Programming', grade: 'Under Grad', tuitionType: 'Home Tuition', fee: '10000 PKR', address: 'R-442, Sector-8, North Karachi, Karachi, Pakistan', start_date: '18th Dec 2020, Wednesday', desc: 'Et ut elit duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mol duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipis lit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipisicing non elit.'},
        {id:4, img: require('../asset/astronaut.png'), name: 'Dr. Abdul Aziz', date: '12/12/2020', course: 'Object Oriented Programming', grade: 'Under Grad', tuitionType: 'Home Tuition', fee: '10000 PKR', address: 'R-442, Sector-8, North Karachi, Karachi, Pakistan', start_date: '18th Dec 2020, Wednesday', desc: 'Et ut elit duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipisicing non elit.'},
        {id:5, img: require('../asset/astronaut.png'), name: 'Dr. Abdul Aziz', date: '12/12/2020', course: 'Object Oriented Programming', grade: 'Under Grad', tuitionType: 'Home Tuition', fee: '10000 PKR', address: 'R-442, Sector-8, North Karachi, Karachi, Pakistan', start_date: '18th Dec 2020, Wednesday', desc: 'Et ut elit duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipis duis aute est. Et culpa ad culpa sit. Cillum non eiusmod voluptate officia pariatur minim voluptate cupidatat aliqua ex magna amet excepteur. Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipis Non eu velit enim quis aute commodo laboris voluptate id exercitation duis. In in irure sit commodo occaecat mollit laboris ea consectetur ut proident. Culpa tempor laborum elit voluptate aute laborum cupidatat et reprehenderit. Dolore cupidatat et et sint voluptate adipisicing non elit.'},
    ])
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
                    <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={styles.saveButton} activeOpacity={0.7}>
                        <Text style={styles.textButton}>Filter <AntDesign name="filter" color={colors.backgroundColor} size={20}/></Text>
                    </TouchableOpacity>
                </View>
            </View>

            {searchText.length>0 &&
                <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                    <View style={styles.listContainer}>
                        <Text style={styles.people}>People:</Text>

                        <TouchableOpacity style={{flexDirection: 'row'}} activeOpacity={0.7}>
                            <View style={styles.HeaderLeftImageView}>
                                <Image style={styles.HeaderLeftImage} source={{uri: "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png"}}/>
                            </View>
                            <Text style={styles.User}>Sir Abdul Aziz</Text>
                        </TouchableOpacity>

                        <Text style={styles.people}>Posts:</Text>
                        {posts.map(item => <View style={styles.post} key={item.id}>
                            <View style={styles.cardUserInfo}>
                                <Image source={item.img} style={styles.cardAvatar} />
                                <View style={styles.cardNameDate}>
                                    <Text style={styles.cardName}>{item.name}</Text>
                                    <View style={{flexDirection: "row"}}>
                                        <Text style={styles.cardDate}>{item.date}</Text>
                                        <TouchableOpacity activeOpacity={0.5} onPress={() => setReportModalVisible(true)} style={{marginTop: 5, marginLeft: 10}}>
                                            <Entypo name="dots-three-vertical" color={colors.text} size={20} />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.postInfoContainer}>
                                <View style={styles.postInfo}>
                                    <View style={styles.action}>
                                        <AntDesign name="book" color={colors.text} size={20} />
                                        <Text style={styles.text} numberOfLines={3} ellipsizeMode="tail">{item.course}</Text>
                                    </View>
                                    <View style={styles.action}>
                                        <SimpleLineIcons name="graduation" color={colors.text} size={20} />
                                        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.grade}</Text>
                                    </View>
                                    <View style={styles.action}>
                                        <MaterialIcons name="payment" color={colors.text} size={20} />
                                        <Text style={styles.text} numberOfLines={1} ellipsizeMode="tail">{item.fee}</Text>
                                    </View>
                                    <View style={styles.action}>
                                        <Ionicons name="location-outline" color={colors.text} size={20}/>
                                        <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">{item.address}</Text>
                                        <TouchableOpacity activeOpacity={0.5}>
                                            <FontAwesome name="map-o" color={colors.text} size={20}/>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                <View style={styles.seeDetailsLinkContainer}>
                                    <View style={styles.seeDetailsLink}>
                                        <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('SStack', { screen: 'SPostDetails' })}>
                                            <Text style={styles.seeDetailsText}>See Details</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>)
                        }
                    </View>
                </ScrollView>
            }

            <Modal animationInTiming={500} style={{ margin: 0, justifyContent:"flex-end" }} isVisible={isFilterModalVisible} onBackdropPress={() => setFilterModalVisible(false)} onBackButtonPress={() => setFilterModalVisible(false)}>
                <StatusBar translucent={true} backgroundColor={"#2D52B0"} barStyle="light-content"/>

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
                <TouchableOpacity onPress={() => setData({...data, nearbies: !data.nearbies})} style={data.nearbies ? {...styles.modalList, backgroundColor: "#79E9AD"} : styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Nearbies <Ionicons name="location-outline" color={colors.text} size={20}/></Text>
                </TouchableOpacity>
                <View style={styles.modalList}>
                    <TouchableOpacity style={styles.doneButton} onPress={() => setFilterModalVisible(false)} activeOpacity={0.7}>
                        <Text style={styles.doneButtonText}>Done</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal animationInTiming={500} style={{ margin: 0, justifyContent:"flex-end" }} isVisible={isReportModalVisible} onBackdropPress={() => setModalVisible(false)} onBackButtonPress={() => setModalVisible(false)}>
                <StatusBar translucent={true} backgroundColor={"#2D52B0"} barStyle="light-content"/>
                <TouchableOpacity style={styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Report User</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Report Post</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.modalList} activeOpacity={0.7}>
                    <Text style={styles.modalListText}>Report Both</Text>
                </TouchableOpacity>
            </Modal>
        </View>
    );
}

export default SSearch