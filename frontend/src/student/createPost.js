import React from 'react'
import {
    Text,
    View,
    TextInput,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import DatePicker from '@react-native-community/datetimepicker'
import TimePicker from '@react-native-community/datetimepicker'
import Fontisto from 'react-native-vector-icons/Fontisto'
import Ionicons from 'react-native-vector-icons/Ionicons'
import DropDownPicker from 'react-native-dropdown-picker';
import Geolocation from 'react-native-geolocation-service'
import Geocoder from 'react-native-geocoding'
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete"
import MapView, { Marker } from "react-native-maps"
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/createPost'

const SCreatePost = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const [ region, setRegion ] = React.useState({
		latitude: 24.8569,
		longitude: 67.2647,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})
    const [showMap, setShowMap] = React.useState(false)
    const [showDatePicker, setShowDatePicker] = React.useState(false)
    const [showStartTimePicker, setShowStartTimePicker] = React.useState(false)
    const [showEndTimePicker, setShowEndTimePicker] = React.useState(false)

    const [openTutionTypeList, setOpenTuitionTypeList] = React.useState(false)
    const [tutionTypeValue, setTutionTypeValue] = React.useState(null)
    const [tuitionTypeChoices, setTuitionTypeChoices] = React.useState([
        {label: 'Home Tuition', value: 'hometuition'},
        {label: "Tutor's Home", value: 'tutorshome'},
        {label: "Academy", value: 'academy'}
    ])

    const [openDayList, setOpenDayList] = React.useState(false)
    const [dayValue, setDayValue] = React.useState('')
    const [dayChoices, setDayChoices] = React.useState([
        {id:1, label: 'Monday', value: 'Monday'},
        {id:2, label: "Tuesday", value: 'Tuesday'},
        {id:3, label: "Wednesday", value: 'Wednesday'},
        {id:4, label: "Thursday", value: 'Thursday'},
        {id:5, label: "Friday", value: 'Friday'},
        {id:6, label: "Saturday", value: 'Saturday'},
        {id:7, label: "Sunday", value: 'Sunday'},
    ]);

    const [check, setCheck] = React.useState({
        courseName: false,
        grade: false,
        tuitionType: false,
        fee: false,
        startDate: false,
        schedule: false,
        location: false,
        day: false,
        startTime: false,
        endTime: false
    })

    const [startTime, setStartTime] = React.useState(new Date())
    const [endTime, setEndTime] = React.useState(new Date())
    const [data, setData] = React.useState({
        courseName: '',
        grade: '',
        tuitionType: '',
        fee: '',
        startDate: new Date(),
        capacity: '',
        schedule: [],
        location: {
            address: '',
            longitude: '',
            latitude: ''
        },
        desc: ''
    })

    const handleTuitionPickerClose = () => {
        if(tutionTypeValue!==null){
            setData({...data, tuitionType: tutionTypeValue})
            setCheck({...check, tuitionType: true})
        }
    }

    const addToSchedule = () => {
        if(dayValue !== '' && check.startTime && check.endTime){
            let exist = -1
            for(let i=0; i<data.schedule.length; i++){
                if(data.schedule[i].day === dayValue){
                    exist = i
                    break
                }
            }

            if(data.schedule.length === 0){
                data.schedule.push({ day: dayValue, startTime: startTime, endTime: endTime })
            }else if(exist === -1){
                data.schedule.push({ day: dayValue, startTime: startTime, endTime: endTime })
            }else{
                data.schedule[exist].startTime = startTime
                data.schedule[exist].endTime = endTime
            }
            setDayValue(null)
            setCheck({...check, day: false, startTime: false, endTime: false})
        }
    }

    const onStartDateSelect = (val) => {
        const currentDate = val.nativeEvent.timestamp || data.startDate
        setShowDatePicker(Platform.OS === 'ios')
        setData({...data, startDate: new Date(currentDate)})
        setCheck({...check, startDate: true})
    }

    const OnStartTimeSelect = (val) => {
        const time = val.nativeEvent.timestamp || startTime
        setShowStartTimePicker(Platform.OS === 'ios')
        setStartTime(time)
        setCheck({...check, startTime: true})
    }

    const OnEndTimeSelect = (val) => {
        const time = val.nativeEvent.timestamp || endTime
        setShowEndTimePicker(Platform.OS === 'ios')
        setEndTime(time)
        setCheck({...check, endTime: true})
    }

    const getLocation = () => {
        Geocoder.init("AIzaSyASfv0sgGQ5pQTeT-N0eYn4ius8-S-2Wuk")
        Geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                // Geocoder.from(position.coords.latitude, position.coords.longitude)
                //     .then(json => {
                //         var addressComponent = json.results[0].address_components[0]
                //         console.log(addressComponent)
                //     })
                //     .catch(error => console.warn(error))
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message)
            },
            { 
                enableHighAccuracy: true, 
                timeout: 15000, 
                maximumAge: 10000 
            }
        ) 
    }

    return (
        // <View style={{ marginTop: 50, flex: 1 }}>
        showMap === false ? 
            <View style={styles.container}>
                <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.textFooter}>Course Name*</Text>
                    <View style={styles.action}>
                        <AntDesign name="book" color={colors.text} size={20} />
                        <TextInput 
                            placeholder="Course Name"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setData({...data, courseName: val})}
                            onEndEditing={() => setCheck({...check, courseName: true})}
                        />
                    </View>

                    <Text style={styles.textFooter}>Grade/Level*</Text>
                    <View style={styles.action}>
                        <SimpleLineIcons name="graduation" color={colors.text} size={20} />
                        <TextInput 
                            placeholder="Grade/Level"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setData({...data, grade: val})}
                            onEndEditing={() => setCheck({...check, grade: true})}
                        />
                    </View>

                    <View style={{flexDirection: 'row'}}>
                        <Text style={styles.textFooter}>Tuition Type*</Text>
                        <View style={styles.tutionTypeContainer}>
                            <View style={styles.dropDownPicker}>
                                <DropDownPicker
                                    containerStyle={{
                                        width: '60%',
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
                                    placeholder='Select tuition type'
                                    modalTitle="Select tuition type"
                                    searchable={false}
                                    open={openTutionTypeList}
                                    value={tutionTypeValue}
                                    items={tuitionTypeChoices}
                                    setOpen={setOpenTuitionTypeList}
                                    setValue={setTutionTypeValue}
                                    setItems={setTuitionTypeChoices}
                                    onClose={() => handleTuitionPickerClose()}
                                />
                            </View>
                        </View>
                    </View>

                    <Text style={styles.textFooter}>Fee*</Text>
                    <View style={styles.action}>
                        <MaterialIcons name="payment" color={colors.text} size={20} />
                        <TextInput 
                            placeholder="Fee"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setData({...data, fee: val})}
                            onEndEditing={() => setCheck({...check, fee: true})}
                            keyboardType='numeric'
                        />
                    </View>

                    <Text style={styles.textFooter}>Location*</Text>
                    <View style={styles.action}>
                        <Ionicons name="location-outline" color={colors.text} size={20}/>
                        <TextInput 
                            placeholder="Your Address or Click left icon for Current Location"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={
                                (val) => setData({
                                    ...data, 
                                    location: {
                                        ...data.location, 
                                        address: val
                                    }
                                })}
                            onEndEditing={() => setCheck({...check, location: true})}
                        />
                        <TouchableOpacity activeOpacity={0.5} onPress={() => setShowMap(false)}>
                            <Ionicons name="location-outline" color={colors.text} size={20}/>
                        </TouchableOpacity>
                    </View>

                    <Text style={styles.textFooterBirthday}>Start Date*</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setShowDatePicker(!showDatePicker)} style={styles.actionBirthday}>
                        <Fontisto name="date" color={colors.text} size={20}/>
                        <Text style={styles.textInputBirthday}>Start Date</Text>
                        <Text style={styles.textOutputBirthday}>{data.startDate.toISOString().split('T')[0]}</Text>
                    </TouchableOpacity>
                    <View style={styles.separatorBirthday}></View>
                    {showDatePicker && (
                        <DatePicker 
                            value={data.startDate} 
                            mode={"date"} 
                            display="calendar" 
                            onChange={val => onStartDateSelect(val)}
                            minimumDate={new Date()}
                        />
                    )}

                    <Text style={styles.textFooter}>Capacity of Students*</Text>
                    <View style={styles.action}>
                        <Ionicons name="ios-people-outline" color={colors.text} size={20} />
                        <TextInput 
                            placeholder="Capacity"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setData({...data, capacity: val})}
                            keyboardType="number-pad"
                        />
                    </View>
                
                    <Text style={styles.textFooter}>Schedule*</Text>
                    <View style={styles.tutionTypeContainer}>
                        <DropDownPicker
                            containerStyle={{
                                width: '40%',
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
                            placeholder='Select a day'
                            modalTitle="Select a day"
                            searchable={false}
                            open={openDayList}
                            value={dayValue}
                            items={dayChoices}
                            setOpen={setOpenDayList}
                            setValue={setDayValue}
                            setItems={setDayChoices}
                        />
                        <TouchableOpacity activeOpacity={0.7} onPress={() => addToSchedule()} style={styles.actionBirthday}>
                            <Text style={{...styles.textFooterTime, color:"#000", marginLeft: 20}}>
                            Add to schedule
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setShowStartTimePicker(!showStartTimePicker)} style={styles.actionBirthday}>
                            <Text style={styles.textFooterTime}>
                                {
                                    check.startTime === true ? startTime.toTimeString().split(':')[0]+':'+startTime.toTimeString().split(':')[1] : 'Tap here to select start time'
                                }
                            </Text>
                        </TouchableOpacity>
                        <Text style={{fontSize: 18, marginTop: 10}}>-</Text>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setShowEndTimePicker(!showEndTimePicker)} style={styles.actionBirthday}>
                            <Text style={styles.textFooterTime}>
                                {
                                    check.endTime === true ? endTime.toTimeString().split(':')[0]+':'+endTime.toTimeString().split(':')[1] : 'Tap here to select end time'
                                }
                            </Text>
                        </TouchableOpacity>
                    </View>
                    {
                        data.schedule.length > 0 ? 
                        (<View style={styles.scheduleList}>
                            {data.schedule.map(item => <View style={styles.scheduleListItem} key={item.day}>
                                    <Text style={styles.scheduleListItemText}>{item.day}</Text>
                                    <Text style={styles.scheduleListItemText}>{item.startTime.toTimeString().split(':')[0]}:{item.startTime.toTimeString().split(':')[1]} - {item.endTime.toTimeString().split(':')[0]}:{item.endTime.toTimeString().split(':')[1]}</Text>
                                </View>
                            )}
                        </View>) 
                        : null
                    }
                    
                    <View style={styles.separatorBirthday}></View>
                    {showStartTimePicker && (
                        <TimePicker 
                            value={startTime} 
                            mode={"time"} 
                            display="clock" 
                            onChange={val => OnStartTimeSelect(val)}
                        />
                    )}
                    {showEndTimePicker && (
                        <TimePicker 
                            value={endTime} 
                            mode={"time"} 
                            display="clock" 
                            onChange={val => OnEndTimeSelect(val)}
                        />
                    )}

                    <Text style={styles.textFooter}>Description*</Text>
                    <View style={styles.action}>
                        <Ionicons name="ios-people-outline" color={colors.text} size={20} />
                        <TextInput 
                            placeholder="Description"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            autoCapitalize="none"
                            onChangeText={(val) => setData({...data, desc: val})}
                        />
                    </View>
                
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity activeOpacity={0.7} onPress={() => {}} style={styles.signupButton}>
                            <LinearGradient colors={['#0B2F89', '#2D52B0']} style={styles.signupButton}>
                                <Text style={styles.textSignin}>Create Post</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </View>
                </ScrollView>
            </View>
            :
            <View style={{ flex: 1 }}>
                {/* <GooglePlacesAutocomplete
                    placeholder="Search"
                    // fetchDetails={true}
                    // GooglePlacesSearchQuery={{
                    //     rankby: "distance"
                    // }}
                    onFail={error => console.error(error)}
                    onPress={(data, details = null) => {
                        // 'details' is provided when fetchDetails = true
                        console.log(data, details)
                        // setRegion({
                        //     latitude: details.geometry.location.lat,
                        //     longitude: details.geometry.location.lng,
                        //     latitudeDelta: 0.0922,
                        //     longitudeDelta: 0.0421
                        // })
                    }}
                    query={{
                        key: "AIzaSyASfv0sgGQ5pQTeT-N0eYn4ius8-S-2Wuk",
                        language: "en",
                        // components: "country:pk",
                        // types: "establishment",
                        // radius: 30000,
                        // location: `${region.latitude}, ${region.longitude}`
                    }}
                    // styles={{
                    //     container: { flex: 0, position: "absolute", width: "100%", zIndex: 1 },
                    //     listView: { backgroundColor: "white" }
                    // }}
                />
                <MapView style={styles.map} initialRegion={region} provider="google">
                    <Marker coordinate={{ latitude: region.latitude, longitude: region.longitude }} />
                </MapView> */}
            </View>
    )
}

export default SCreatePost