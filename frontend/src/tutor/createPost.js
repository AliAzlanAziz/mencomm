import React from 'react'
import {
    Text,
    View,
    TextInput,
    ScrollView,
    StatusBar,
    TouchableOpacity
} from 'react-native'
import * as Animatable from 'react-native-animatable';
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
import axios from 'axios'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/createPost'
import { ttr } from '../global/url'
import { AuthContext } from '../context/authContext'

const TCreatePost = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const { token } = React.useContext(AuthContext)

    const [ region, setRegion ] = React.useState({
		latitude: 24.8569,
		longitude: 67.2647,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421
	})
    
    const [incompleteSchedule, setIncompleteSchedule] = React.useState(false)
    const [removeSchedule, setRemoveSchedule] = React.useState(false)
    const [showDatePicker, setShowDatePicker] = React.useState(false)
    const [showStartTimePicker, setShowStartTimePicker] = React.useState(false)
    const [showEndTimePicker, setShowEndTimePicker] = React.useState(false)

    const [openTutionTypeList, setOpenTuitionTypeList] = React.useState(false)
    const [tutionTypeValue, setTutionTypeValue] = React.useState('')
    const [tuitionTypeChoices, setTuitionTypeChoices] = React.useState([
        {label: 'Home Tuition', value: 'Home Tuition'},
        {label: "Tutor's Home", value: 'Tutor\'s Home'},
        {label: "Academy", value: 'Academy'}
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
        course: false,
        grade: false,
        tuition_type: false,
        fee: false,
        start_date: false,
        schedule: false,
        location: false,
        day: false,
        start_time: false,
        end_time: false,
    })

    const [startTime, setStartTime] = React.useState(new Date())
    const [endTime, setEndTime] = React.useState(new Date())
    const [data, setData] = React.useState({
        course: 'Maths',
        grade: 'Matric',
        tuition_type: 'Home Tuition',
        fee: 500,
        start_date: new Date(),
        schedule: [],
        location: {
            address: 'R-442 Sector 8, North Karachi',
            longitude: '',
            latitude: ''
        },
        description: 'I m good at math!'
    })

    const handleTuitionPickerClose = () => {
        if(tutionTypeValue!==null){
            setData({...data, tuition_type: tutionTypeValue})
            setCheck({...check, tuition_type: true})
        }
    }

    const addToSchedule = () => {
        if(dayValue !== '' && check.start_time && check.end_time){
            let exist = -1
            for(let i=0 ; i < data.schedule.length ; i++){
                if(data.schedule[i].day === dayValue){
                    exist = i
                    break
                }
            }

            if(data.schedule.length === 0){
                data.schedule.push({ day: dayValue, start_time: startTime, end_time: endTime })
            }else if(exist === -1){
                data.schedule.push({ day: dayValue, start_time: startTime, end_time: endTime })
            }else{
                data.schedule[exist].start_time = startTime
                data.schedule[exist].end_time = endTime
            }
            setDayValue(null)
            setCheck({...check, day: false, start_time: false, end_time: false})
            if(!removeSchedule){
                setRemoveSchedule(true)
                setTimeout(() => setRemoveSchedule(false), 3000)
            }
        }else{
            if(!incompleteSchedule){
                setIncompleteSchedule(true)
                setTimeout(() => setIncompleteSchedule(false), 3000)
            }
        }
    }

    const removeFromSchedule = (val) => {
        let newSchedule = []
        data.schedule.filter((item, index) => {
            if(val != index){
                newSchedule.push(item)
            }
        })
        setData({...data ,  schedule: newSchedule })
    }

    const onStartDateSelect = (val) => {
        const currentDate = val.nativeEvent.timestamp || data.start_date
        setShowDatePicker(Platform.OS === 'ios')
        setData({...data, start_date: new Date(currentDate)})
        setCheck({...check, start_date: true})
    }

    const OnStartTimeSelect = (val) => {
        const time = val.nativeEvent.timestamp || startTime
        setShowStartTimePicker(Platform.OS === 'ios')
        setStartTime(time)
        setCheck({...check, start_time: true})
    }

    const OnEndTimeSelect = (val) => {
        const time = val.nativeEvent.timestamp || endTime
        setShowEndTimePicker(Platform.OS === 'ios')
        setEndTime(time)
        setCheck({...check, end_time: true})
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

    const handleCreatePost = async () => {
        try {
            if(data.fee != 0 && data.course.length > 0 && data.grade.length >0) {
                const res = await axios({
                    url: `${ttr}/createpost`,
                    method: 'post',
                    headers: {
                        token: token,
                    },
                    data: data
                })
                if(res.status == 200){
                    setCheck({
                        course: false,
                        grade: false,
                        tuition_type: false,
                        fee: false,
                        start_date: false,
                        schedule: false,
                        location: false,
                        day: false,
                        start_time: false,
                        end_time: false
                    })
                    setData({
                        course: '',
                        grade: '',
                        tuition_type: '',
                        fee: 0,
                        start_date: new Date(),
                        schedule: [],
                        location: {
                            address: '',
                            longitude: '',
                            latitude: ''
                        },
                        description: ''
                    })
                    navigation.navigate('TStack', { screen: 'TPostDetails', params: { id: res.data.id }})
                }
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <Text style={styles.textFooter}>Course Name*</Text>
                <View style={styles.action}>
                    <AntDesign name="book" color={colors.text} size={20} />
                    <TextInput 
                        placeholder="Course Name"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setData({...data, course: val})}
                        onEndEditing={() => setCheck({...check, course: true})}
                        value={data.course}
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
                        value={data.grade}
                    />
                </View>

                <View style={{flexDirection: 'row'}}>
                    <Text style={styles.textFooter}>Tuition Type</Text>
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
                        value={data.fee.toString()}
                    />
                </View>
                {check.fee && data.fee == 0 &&
                    <Animatable.View animation="fadeInRight" duration={500}>
                        <Text style={styles.errorMsg}>Fee should atleast be 1$</Text>
                    </Animatable.View>
                }

                <Text style={styles.textFooter}>Location</Text>
                <View style={styles.action}>
                    <Ionicons name="location-outline" color={colors.text} size={20}/>
                    <TextInput 
                        placeholder="Tap on left icon for map"
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
                        value={data.location.address.toString()}
                    />
                    <TouchableOpacity activeOpacity={0.5} onPress={() => navigation.navigate('SStack', { screen: 'Map'})}>
                        <Ionicons name="location-outline" color={colors.text} size={20}/>
                    </TouchableOpacity>
                </View>

                <Text style={styles.textFooterBirthday}>Start Date</Text>
                <TouchableOpacity activeOpacity={0.7} onPress={() => setShowDatePicker(!showDatePicker)} style={styles.actionBirthday}>
                    <Fontisto name="date" color={colors.text} size={20}/>
                    <Text style={styles.textInputBirthday}>Start Date</Text>
                    <Text style={styles.textOutputBirthday}>{data.start_date.toISOString().split('T')[0]}</Text>
                </TouchableOpacity>
                <View style={styles.separatorBirthday}></View>
                {showDatePicker && (
                    <DatePicker 
                        value={data.start_date} 
                        mode={"date"} 
                        display="calendar" 
                        onChange={val => onStartDateSelect(val)}
                        minimumDate={new Date()}
                    />
                )}
            
            <Text style={styles.textFooter}>Schedule</Text>
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
                    <TouchableOpacity activeOpacity={0.7} onPress={() => addToSchedule()} style={styles.buttonSchedule}>
                        <Text style={{...styles.textFooterTime, color:"#fff", padding: 10}}>
                        Add to schedule
                        </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'space-around'}}>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setShowStartTimePicker(!showStartTimePicker)} style={styles.actionBirthday}>
                        <Text style={styles.textFooterTime}>
                            {
                                check.start_time === true ? startTime.toTimeString().split(':')[0]+':'+startTime.toTimeString().split(':')[1] : 'Tap here to select start time'
                            }
                        </Text>
                    </TouchableOpacity>
                    <Text style={{fontSize: 18, marginTop: 10}}>-</Text>
                    <TouchableOpacity activeOpacity={0.7} onPress={() => setShowEndTimePicker(!showEndTimePicker)} style={styles.actionBirthday}>
                        <Text style={styles.textFooterTime}>
                            {
                                check.end_time === true ? endTime.toTimeString().split(':')[0]+':'+endTime.toTimeString().split(':')[1] : 'Tap here to select end time'
                            }
                        </Text>
                    </TouchableOpacity>
                </View>
                {
                incompleteSchedule &&
                    <Animatable.View animation="fadeInRight" duration={1000}>
                        <Text style={styles.infoMsg}>Select day and start and end time.</Text>
                    </Animatable.View>
                }
                {
                removeSchedule &&
                    <Animatable.View animation="fadeInRight" duration={1000}>
                        <Text style={styles.infoMsg}>Long press on schedule to remove it.</Text>
                    </Animatable.View>
                }
                {
                    data.schedule.length > 0 ? 
                        (<View style={styles.scheduleList}>
                            {data.schedule.map((item, index) => 
                                <TouchableOpacity style={styles.scheduleListItem} key={index} onLongPress={() => removeFromSchedule(index)}>
                                    <Text style={styles.scheduleListItemText}>{item.day}</Text>
                                    <Text style={styles.scheduleListItemText}>{item.start_time.toTimeString().split(':')[0]}:{item.start_time.toTimeString().split(':')[1]} - {item.end_time.toTimeString().split(':')[0]}:{item.end_time.toTimeString().split(':')[1]}</Text>
                                </TouchableOpacity>
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

                <Text style={styles.textFooter}>Description</Text>
                <View style={styles.action}>
                    <Ionicons name="ios-people-outline" color={colors.text} size={20} />
                    <TextInput 
                        placeholder="Description"
                        placeholderTextColor="#666666"
                        style={styles.textInput}
                        autoCapitalize="none"
                        onChangeText={(val) => setData({...data, description: val})}
                        onEndEditing={() => setCheck({...check, description: true})}
                        value={data.description}
                    />
                </View>
            
                <View style={styles.buttonContainer}>
                    <TouchableOpacity activeOpacity={0.7} onPress={handleCreatePost}>
                        <LinearGradient colors={['#1E8950', '#1CAB5F']} style={styles.signupButton}>
                            <Text style={styles.textSignin}>Create Post</Text>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default TCreatePost