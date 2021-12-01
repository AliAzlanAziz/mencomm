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
import DropDownPicker from 'react-native-dropdown-picker';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Entypo from 'react-native-vector-icons/Entypo'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/updateInfo'

const UpdateInfo = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState([
        {label: 'Home Tuition', value: 'hometuition'},
        {label: "Tutor's Home", value: 'tutorshome'},
        {label: "Academy", value: 'academy'}
    ]);
    const [grade, setGrade] = React.useState("")
    const [courseName, setCourseName] = React.useState("")
    const [course, setCourse] = React.useState(["Maths", "Urdu"])

    const removeCourse = (item) => {
        const newCourse = course.filter( courseItem => courseItem !== item )
        setCourse(newCourse)
        console.log(course)
    }

    const addCourse = () => {
        if(courseName !== ""){
            setCourse([...course, courseName])
            setCourseName("")
            console.log(course)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <View style={styles.tutionTypeContainer}>
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
                            open={open}
                            value={value}
                            items={items}
                            setOpen={setOpen}
                            setValue={setValue}
                            setItems={setItems}
                            />
                    </View>
                </View>
            </View>
            <ScrollView style={styles.scrollView}>
                <View style={styles.InputWrapper}>
                    <Text style={styles.textFooter}>Level Of Education</Text>
                    <View style={styles.action}>
                        <SimpleLineIcons name="graduation" color={colors.text} size={20} />
                        <TextInput 
                            placeholder="Level of Education"
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
                    <Text style={styles.textFooter}>Courses</Text>
                    {
                        course.map( (item, index) => (
                            <View style={styles.action} key={index}>
                                <AntDesign name="book" color={colors.text} size={20} />
                                <Text style={styles.text}>{index+1}. {item}</Text>
                                <TouchableOpacity onPress={ () => removeCourse(item) }>
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
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => addCourse()} style={styles.courseButton}>
                        <Text style={styles.textSave}>Add Course <FontAwesome name="plus" color={colors.backgroundColor} size={16}/></Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity onPress={() => navigation.navigate('#')} style={styles.saveButton}>
                        <Text style={styles.textSave}>Save <FontAwesome name="save" color={colors.backgroundColor} size={20}/></Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

export default UpdateInfo