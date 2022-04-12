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
import axios from 'axios';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/tutor/updateInfo'
import { ttr } from '../global/url'
import { AuthContext } from '../context/authContext'

const TUpdateInfo = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)
    const { profile, token, setProfileUpdated } = React.useContext(AuthContext)

    const [success, setSuccess] = React.useState(false)
    const [successMsg, setSuccessMsg] = React.useState(false)
    const [gradeInfo, setGradeInfo] = React.useState(false)
    const [courseInfo, setCourseInfo] = React.useState(false)

    const [grade, setGrade] = React.useState(profile?.info?.grade)
    const [gradeName, setGradeName] = React.useState("")
    const [course, setCourse] = React.useState(profile?.info?.course)
    const [courseName, setCourseName] = React.useState("")
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

    const removeGrade = (item) => {
        const newGrade = grade.filter( gradeItem => gradeItem !== item )
        setGrade(newGrade)
        // console.log(course)
    }

    const addGrade = () => {
        if(gradeName !== ""){
            setGrade([...grade, gradeName])
            setGradeName("")
            // console.log(course)
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

    const isInfoUpdate = () => {
        if(course.length != profile?.info?.course.length) return true
        if(grade.length != profile?.info?.grade.length) return true

        for(let i=0 ; i<course.length ; i++){
            if(course[i] != profile?.info?.course[i]){
                return true
            }
        }
        for(let i=0 ; i<grade.length ; i++){
            if(grade[i] != profile?.info?.grade[i]){
                return true
            }
        }
    }

    const handleUpdate = async () => {
        if(!isInfoUpdate()) return;
        try {
            const res = await axios({
                url: `${ttr}/updateinfo`,
                method: 'post',
                headers: {
                    token: token
                },
                data: {
                    grade,
                    course,
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
            clearTimeout(infoUpdated)
        }
    })

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
                            <Text style={styles.infoMsg}>Add the grades/level you teach. Atmost 5.</Text>
                        </Animatable.View>
                    }
                    {
                        grade.map( (item, index) => (
                            <View style={styles.action} key={index}>
                                <AntDesign name="book" color={colors.text} size={20} />
                                <Text style={styles.text}>{index+1}. {item}</Text>
                                <TouchableOpacity onPress={ () => removeGrade(item) } activeOpacity={0.7}>
                                    <Entypo name="cross" color='#E05656' size={25} />
                                </TouchableOpacity>
                            </View>
                        ))
                    }
                    <View style={styles.action}>
                        <SimpleLineIcons name="graduation" color={colors.text} size={20} />
                        <TextInput 
                            placeholder="Grade/Level"
                            placeholderTextColor="#666666"
                            style={styles.textInput}
                            multiline={true}
                            autoCapitalize="none"
                            defaultValue={gradeName}
                            onChangeText={(val) => setGradeName(val)}
                        />
                    </View>
                    <View style={styles.button}>
                        <TouchableOpacity onPress={() => addGrade()} style={styles.courseButton} activeOpacity={0.7}>
                            <Text style={styles.textSave}>Add Grade <FontAwesome name="plus" color={colors.backgroundColor} size={14}/></Text>
                        </TouchableOpacity>
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
                            <Text style={styles.infoMsg}>Add the courses you teach. Atmost 5.</Text>
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
                            <Text style={styles.textSave}>Add Course <FontAwesome name="plus" color={colors.backgroundColor} size={14}/></Text>
                        </TouchableOpacity>
                    </View>
                    {success && 
                        <Animatable.View animation="fadeInLeft" duration={500}>
                            <Text style={styles.infoMsg}>{successMsg}</Text>
                        </Animatable.View>
                    }
                </View>
                
                <TouchableOpacity onPress={handleUpdate} style={styles.saveButton} activeOpacity={0.7}>
                    <Text style={styles.textSave}>Save <FontAwesome name="save" color={colors.backgroundColor} size={20}/></Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default TUpdateInfo