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
import * as Animatable from 'react-native-animatable'
import DropDownPicker from 'react-native-dropdown-picker';
import SearchBar from "react-native-dynamic-search-bar"
import Entypo from 'react-native-vector-icons/Entypo'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios'
import Modal from "react-native-modal";
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/search'
import { ttr } from '../global/url'
import { AuthContext } from '../context/authContext'

const TSearch = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const { token } = React.useContext(AuthContext)
    const [error, setError] = React.useState(false)
    const [errMsg, setErrMsg] = React.useState('')
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState('')
    const [items, setItems] = React.useState([
        {label: 'Home Tuition', value: 'Home Tuition'},
        {label: "Tutor's Home", value: 'Tutor\'s Home'},
        {label: "Academy", value: 'Academy'},
        {label: "None", value: ''}
    ]);
    
    const [people, setPeople] = React.useState(true)
    const [spinnerVisibility, setSpinnerVisibility] = React.useState(false)
    const [isFilterModalVisible, setFilterModalVisible] = React.useState(false)
    const [isReportModalVisible, setReportModalVisible] = React.useState(false)
    const [data, setData] = React.useState({
        rating: 0,
        name: '',
        grade: '',
        course: '',
        tuition_type: '',
        minfee: 0,
        maxfee: 99999999,
        nearbies: false,
    })
    let searchTimer
    const [posts, setPosts] = React.useState([])
    const [users, setUsers] = React.useState([])

    const handlePeopleSearch = async () => {
        setPosts([])
        // ? Visible the spinner
        setSpinnerVisibility(true)
        try {
            const res = await axios({
                url: `${ttr}/searchpeople`,
                method: 'post',
                headers: {
                    token: token,
                },
                data: data
            })
            if(res.status == 200){
                setUsers(res.data.students)
            }
        } catch (error) {
            setErrMsg(error?.response?.data?.message)
            setError(true)
            searchTimer = setTimeout(() => {
                setError(false)
                setErrMsg('')
            }, 3000)
        }
        // ? After you've done to implement your use-case
        // ? Do not forget to set false to spinner's visibility
        setSpinnerVisibility(false)
    };

    const handlePostSearch = async () => {
        setUsers([])
        // ? Visible the spinner
        setSpinnerVisibility(true)
        try {
            const res = await axios({
                url: `${ttr}/searchpost`,
                method: 'post',
                headers: {
                    token: token,
                },
                data: data
            })
            if(res.status == 200){
                setPosts(res.data.posts)
            }
        } catch (error) {
            setErrMsg(error?.response?.data?.message)
            setError(true)
            searchTimer = setTimeout(() => {
                setError(false)
                setErrMsg('')
            }, 3000)
        }
        // ? After you've done to implement your use-case
        // ? Do not forget to set false to spinner's visibility
        setSpinnerVisibility(false)
    };

    React.useEffect(() => {
        return () => {
            clearInterval(searchTimer)
        }
    })
    
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
                placeholder="Type name of person ..."
                style={styles.searchBar}
                onChangeText={(val) => setData({...data, name: val })}
                onEndEditing={people ? handlePeopleSearch : handlePostSearch}
                onSearchPress={people ? handlePeopleSearch : handlePostSearch}
            />

            <View style={styles.filterButtonContainer}>
                <TouchableOpacity onPress={() => setFilterModalVisible(true)} style={styles.filterButton} activeOpacity={0.7}>
                    <Text style={styles.textButton}>Filter <AntDesign name="filter" color={colors.backgroundColor} size={20}/></Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => setPeople(true)} style={people ? styles.selectedButton : styles.twoButton} activeOpacity={0.7}>
                    <Text style={people ? styles.selectedTextButton : styles.textButton}>People</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setPeople(false)} style={people ? styles.twoButton : styles.selectedButton} activeOpacity={0.7}>
                    <Text style={people ? styles.textButton : styles.selectedTextButton}>Post</Text>
                </TouchableOpacity>
            </View>
            {error > 0 && 
                <Animatable.View animation="fadeInLeft" duration={500}>
                    <Text style={styles.errorMsg}>{errMsg}</Text>
                </Animatable.View>
            }

            <ScrollView style={styles.scrollViewContainer} showsVerticalScrollIndicator={false}>
                <View style={styles.listContainer}>
                    {users.length>0 &&
                        <>
                            <Text style={styles.people}>People:</Text>
                            {
                            users.map(item => 
                                <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TOthersProfile', params: { id: item.userId} })} style={{flexDirection: 'row'}} activeOpacity={0.7} key={item._id}>
                                    <View style={styles.HeaderLeftImageView}>
                                        <Image style={styles.HeaderLeftImage} source={{uri: item.avatar_url || "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png"}}/>
                                    </View>
                                    <Text style={styles.User}>{item.name}</Text>
                                </TouchableOpacity>)
                            }
                        </>
                    }

                    {posts.length>0 &&
                        <>
                        <Text style={styles.people}>Posts:</Text>

                        {
                        posts.map(item => 
                            <View style={styles.post} key={item._id}>
                                <TouchableOpacity onPress={() => navigation.navigate('TStack', { screen: 'TOthersProfile', params: { id: item.userId} })} style={styles.cardUserInfo} activeOpacity={0.7}>
                                    <Image source={{uri: item.avatar_url || "https://mir-s3-cdn-cf.behance.net/project_modules/disp/ea7a3c32163929.567197ac70bda.png"}} style={styles.cardAvatar} />
                                    <View style={styles.cardNameDate}>
                                        <Text style={styles.cardName}>{item.name}</Text>
                                        <View style={{flexDirection: "row"}}>
                                            <Text style={styles.cardDate}>{new Date(item.created_on).toDateString()}</Text>
                                            <TouchableOpacity activeOpacity={0.5} onPress={() => setReportModalVisible(true)} style={{marginTop: 5, marginLeft: 10}}>
                                                <Entypo name="dots-three-vertical" color={colors.text} size={20} />
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </TouchableOpacity>
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
                                    </View>
                                    <View style={styles.seeDetailsLinkContainer}>
                                        <View style={styles.seeDetailsLink}>
                                            <TouchableOpacity activeOpacity={0.7} onPress={() => navigation.navigate('TStack', { screen: 'TPostDetails', params: { id: item._id } })}>
                                                <Text style={styles.seeDetailsText}>See Details</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </View>
                            </View>)
                            }
                        </>
                    }
                </View>
            </ScrollView>

            <Modal animationInTiming={500} style={{ margin: 0, justifyContent:"flex-end" }} isVisible={isFilterModalVisible} onBackdropPress={() => setFilterModalVisible(false)} onBackButtonPress={() => setFilterModalVisible(false)}>
                <StatusBar translucent={true} backgroundColor={"transparent"} barStyle="light-content"/>

                <View style={styles.modalList}>
                    <Text style={styles.modalListTextHeader}>Apply Filters</Text>
                </View>
                {people && 
                    <View style={styles.modalList}>
                        <TouchableOpacity style={styles.modalListRatingButton} onPress={() => data.rating > 0 ? setData({...data, rating: data.rating-1}) : null} activeOpacity={0.7}>
                            <Entypo name="minus" color={"#000"} size={25}/>
                        </TouchableOpacity>
                        <Text style={styles.modalListText}>Rating: {data.rating < 0 ? 0 : data.rating}</Text>
                        <TouchableOpacity style={styles.modalListRatingButton} onPress={() => data.rating < 5 ? setData({...data, rating: data.rating+1}) : null} activeOpacity={0.7}>
                            <Entypo name="plus" color={"#000"} size={22}/>
                        </TouchableOpacity>
                    </View>}
                {!people && 
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
                                onChangeValue={() => setData({...data, tuition_type: value})}
                            />
                        </View>
                    </View>}
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
                {!people && 
                    <View style={styles.modalList}>
                        <TextInput 
                            placeholder="Course to search for"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={ val => setData({...data, course: val})}
                            defaultValue={data.course}
                        />
                    </View>}
                {!people && 
                    <View style={styles.modalList}>
                        <TextInput 
                            placeholder="Minimum price"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={val => setData({...data, minfee: val})}
                            value={data.minfee.toString()}
                            keyboardType="numeric"
                        />
                        <Text style={styles.modalListText}> to </Text>
                        <TextInput 
                            placeholder="Maximum price"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={val => setData({...data, maxfee: val})}
                            value={data.maxfee.toString()}
                            keyboardType="numeric"
                        />
                    </View>}
                {people &&
                    <TouchableOpacity onPress={() => setData({...data, nearbies: !data.nearbies})} style={data.nearbies ? {...styles.modalList, backgroundColor: "#79E9AD"} : styles.modalList} activeOpacity={0.7}>
                        <Text style={styles.modalListText}>Nearbies <Ionicons name="location-outline" color={colors.text} size={20}/></Text>
                    </TouchableOpacity>}
                <View style={styles.modalList}>
                    <TouchableOpacity style={styles.doneButton} onPress={() => {setFilterModalVisible(false);people ? handlePeopleSearch() : handlePostSearch();}} activeOpacity={0.7}>
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

export default TSearch