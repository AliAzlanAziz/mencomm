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
import createStyles from '../style/tutor/updateInfo'

const TUpdateInfo = ({ navigation }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)
    const [focus, setFocus] = React.useState("");
    const [open, setOpen] = React.useState(false);
    const [value, setValue] = React.useState(null);
    const [items, setItems] = React.useState([
        {label: 'Home Tuition', value: 'hometuition'},
        {label: "Tutor's Home", value: 'tutorshome'},
        {label: "Academy", value: 'academy'}
    ]);
    const [GCdict, setGCDict] = React.useState({ "Matric": [ "Maths", "Urdu"], "HSC-I": [ "Maths", "Urdu"] })
    const [courseName, setCourseName] = React.useState("")
    const [gradeName, setGradeName] = React.useState("")
    const [sectionGrade, setSectionGrade] = React.useState("")

    const removeSection = (item) => {
        const newGCdict = {}
        for(const key in GCdict){
            if(key !== item){
                newGCdict[key] = GCdict[key]
            }
        }
        setGCDict(newGCdict)
    }

    const removeCourse = (item, element) => {
        const newGCdict = {}
        let newCourse
        for(const key in GCdict){
            if(key !== item){
                newGCdict[key] = GCdict[key]
            }else{
                newCourse = GCdict[key].filter(f_item => f_item!==element)
                newGCdict[key] = newCourse
            }
        }
        setGCDict(newGCdict)
    }

    const addCourse = (item) => {
        const newGCdict = {}
        let newCourse
        if(courseName !== ""){
            for(const key in GCdict){
                if(key !== item){
                    newGCdict[key] = GCdict[key]
                }else{
                    newCourse = [...GCdict[key], courseName]
                    newGCdict[key] = newCourse
                }
            }
            setCourseName("")
            setGCDict(newGCdict)
        }
    }

    const addGrade = (item) => {
        const newGCdict = {}
        let newCourse
        if(gradeName !== ""){
            for(const key in GCdict){
                if(key !== item){
                    newGCdict[key] = GCdict[key]
                }else{
                    newCourse = [...GCdict[key], gradeName]
                    newGCdict[gradeName] = newCourse
                }
            }
            setGradeName("")
            console.log(newGCdict)
            setGCDict(newGCdict)
        }
    }

    const addSection = () => {
        const newGCdict = {}
        if(sectionGrade !== ""){
            for(const key in GCdict){
                newGCdict[key] = GCdict[key]
            }
            newGCdict[sectionGrade] = []
            setSectionGrade("")
            setGCDict(newGCdict)
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent={true} backgroundColor={'transparent'} barStyle="light-content"/>
            <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
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
                </View>
                {
                    Object.entries(GCdict).map( (item, i_index) => (
                        <View style={styles.InputWrapper} key={i_index}>
                            <View style={{flexDirection: "row", justifyContent:"space-between"}}>
                                <Text style={styles.textFooter}>Level Of Education</Text>
                                <TouchableOpacity onPress={ () => removeSection(item[0]) } activeOpacity={0.7}>
                                    <Entypo name="cross" color='#E05656' size={25} />
                                </TouchableOpacity>
                            </View>
                            <View style={styles.action}>
                                <SimpleLineIcons name="graduation" color={colors.text} size={20} />
                                <TextInput 
                                    placeholder="Level of Education"
                                    placeholderTextColor="#666666"
                                    style={styles.textInput}
                                    multiline={true}
                                    autoCapitalize="none"
                                    onChangeText={(val) => setGradeName(val)}
                                    onEndEditing={() => addGrade(item[0])}
                                    defaultValue={item[0]}
                                />
                            </View>
                            <View style={styles.InputWrapper}>
                                <Text style={styles.textFooter}>Courses</Text>
                                {
                                    item[1].map( (element, e_index) => (
                                        <View style={styles.action} key={e_index}>
                                            <AntDesign name="book" color={colors.text} size={20} />
                                            <Text style={styles.text}>{e_index+1}. {element}</Text>
                                            <TouchableOpacity onPress={ () =>  removeCourse(item[0], element) } activeOpacity={0.7}>
                                                <Entypo name="cross" color='#E05656' size={20} />
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
                                        onPressIn={ () => setFocus(item[0]) }
                                    />
                                </View>
                            </View>
                            {   
                                focus === item[0]? (
                                    <TouchableOpacity onPress={() => addCourse(item[0])} style={styles.courseButton} activeOpacity={0.7}>
                                        <Text style={styles.textSave}>Add Course <FontAwesome name="plus" color={colors.backgroundColor} size={16}/></Text>
                                    </TouchableOpacity>
                                ) : null
                            }
                        </View>
                    ))
                }
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
                            onChangeText={(val) => setSectionGrade(val)}
                            defaultValue={sectionGrade}
                        />
                    </View>
                    <TouchableOpacity onPress={() => addSection()} style={styles.sectionButton} activeOpacity={0.7}>
                        <Text style={styles.textSave}>Add New Section <FontAwesome name="plus" color={colors.backgroundColor} size={16}/></Text>
                    </TouchableOpacity>
                </View>
            
                <TouchableOpacity onPress={() => navigation.navigate('#')} style={styles.saveButton} activeOpacity={0.7}>
                    <Text style={styles.textSave}>Save <FontAwesome name="save" color={colors.backgroundColor} size={20}/></Text>
                </TouchableOpacity>
            </ScrollView>
        </View>
    )
}

export default TUpdateInfo