//replace dropdownpicker with some better option
import React from 'react'
import {
    Text,
    View,
    ScrollView,
    TextInput,
    TouchableOpacity,
    StatusBar,
} from 'react-native'
import * as Animatable from 'react-native-animatable';
import DropDownPicker from 'react-native-dropdown-picker';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import Ionicons from 'react-native-vector-icons/Ionicons'
import axios from 'axios';
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/updateInfo'
import { std } from '../global/url'
import { AuthContext } from '../context/authContext'

const SUpdateInfo = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)
    const { profile, token, setProfileUpdated } = React.useContext(AuthContext)

    const [success, setSuccess] = React.useState(false)
    const [successMsg, setSuccessMsg] = React.useState(false)
    const [gradeInfo, setGradeInfo] = React.useState(false)
    const [courseInfo, setCourseInfo] = React.useState(false)

    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(profile?.tuition_type);
    const [items, setItems] = React.useState([
        {label: 'Home Tuition', value: 'Home Tuition'},
        {label: "Tutor's Home", value: 'Tutor\'s Home'},
        {label: "Academy", value: 'Academy'}
    ]);

    const [grade, setGrade] = React.useState(profile?.info?.grade)
    const [courseName, setCourseName] = React.useState("")
    const [course, setCourse] = React.useState(profile?.info?.course)
    let gradeTimer, courseTimer, infoUpdated

    const handleGradeInfo = (item) => {
        if(!gradeInfo){
            setGradeInfo(true)
            gradeTimer = setTimeout(() => setGradeInfo(false), 5000)
        }
    }

    const handleCourseInfo = (item) => {
        if(!courseInfo){
            setCourseInfo(true)
            courseTimer = setTimeout(() => setCourseInfo(false), 5000)
        }
    }

    const removeCourse = (item) => {
        const newCourse = course.filter( courseItem => courseItem !== item )
        setCourse(newCourse)
        // console.log(course)
    }

    const addCourse = () => {
        if(courseName !== ""){
            setCourse([...course, courseName])
            setCourseName("")
            // console.log(course)
        }
    }

    const handleUpdate = async () => {
        try {
            const res = await axios({
                url: `${std}/updateinfo`,
                method: 'post',
                headers: {
                    token: token
                },
                data: {
                    grade,
                    course,
                    tuition_type: value
                }
            })

            if(res.status == 200){
                setProfileUpdated(true)
                setSuccess(true)
                setSuccessMsg(res.data.message)

                infoUpdated = setTimeout(() => {
                    setSuccess(false)
                    setSuccessMsg('')
                }, 3000);
            }
        } catch (error) {
            console.log(error)
        }
    }
    
    React.useEffect(() => {
        return () => {
            clearInterval(gradeTimer)
            clearInterval(courseTimer)
            clearInterval(infoUpdated)
        }
    })

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
                <View style={styles.tutionTypeInput}>
                    <View style={styles.iconLabelWrapper}>
                        <SimpleLineIcons name="home" color={colors.text} size={20} />
                        <Text style={styles.labelText}>Preferred Tuition Type</Text>
                    </View>
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
                <View style={styles.InputWrapper}>
                    <View style={{marginVertical: 3, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.textFooter}>Grade/Level</Text>
                        <TouchableOpacity onPress={ () => handleGradeInfo() } activeOpacity={0.7}>
                            <Ionicons name="card-outline" color='#000' size={16} style={{marginLeft: 5, marginTop: 3}}/>
                        </TouchableOpacity>
                    </View>
                    {
                    gradeInfo &&
                        <Animatable.View animation="fadeInRight" duration={1000}>
                            <Text style={styles.infoMsg}>Write the grade/level you are in.</Text>
                        </Animatable.View>
                    }
                    <View style={styles.action}>
                        <SimpleLineIcons name="graduation" color={colors.text} size={20} />
                        <TextInput 
                            placeholder="Grade/Level"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            multiline={true}
                            autoCapitalize="none"
                            onChangeText={(val) => setGrade(val)}
                            defaultValue={grade}
                        />
                    </View>
                </View>
                <View style={styles.InputWrapper}>
                    <View style={{marginVertical: 3, flexDirection: 'row', alignItems: 'center'}}>
                        <Text style={styles.textFooter}>Courses</Text>
                        <TouchableOpacity onPress={ () => handleCourseInfo() } activeOpacity={0.7}>
                            <Ionicons name="card-outline" color='#000' size={16} style={{marginLeft: 5, marginTop: 3}}/>
                        </TouchableOpacity>
                    </View>
                    {
                    courseInfo &&
                        <Animatable.View animation="fadeInRight" duration={1000}>
                            <Text style={styles.infoMsg}>Add the courses you study. Atmost 5.</Text>
                        </Animatable.View>
                    }
                    {
                        course.map( (item, index) => (
                            <View style={styles.action} key={index}>
                                <AntDesign name="book" color={colors.text} size={20} />
                                <Text style={styles.text}>{index+1}. {item}</Text>
                                <TouchableOpacity onPress={ () => removeCourse(item) } activeOpacity={0.7}>
                                    <Entypo name="cross" color='#E05656' size={25} />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                    <View style={styles.action}>
                        <AntDesign name="book" color={colors.text} size={20} />
                        <TextInput 
                            placeholder="Course Name"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            multiline={true}
                            autoCapitalize="none"
                            defaultValue={courseName}
                            onChangeText={(val) => setCourseName(val)}
                            />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => addCourse()} style={styles.courseButton} activeOpacity={0.7}>
                            <Text style={styles.textSave}>Add Course <FontAwesome name="plus" color={colors.backgroundColor} size={16}/></Text>
                        </TouchableOpacity>
                    </View>
                    {success && 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.infoMsg}>{successMsg}</Text>
                        </Animatable.View>
                    }
                </View>
                
                <View style={styles.button}>
                    <TouchableOpacity onPress={handleUpdate} style={styles.saveButton} activeOpacity={0.7}>
                        <Text style={styles.textSave}>Save <FontAwesome name="save" color={colors.backgroundColor} size={20}/></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default SUpdateInfo