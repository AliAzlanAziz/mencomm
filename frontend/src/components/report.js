import React from 'react'
import {
    Text,
    View,
    TouchableOpacity
} from 'react-native'
import Modal from 'react-native-modal'
import axios from 'axios'
import { useTheme } from 'react-native-paper'
import createStyles from '../style/student/announcement'
import { auth } from '../global/url'
import { AuthContext } from '../context/authContext'

const reportUser = [
    {id:1, description: "Pretending to be someone else"},
    {id:2, description: "Not using a real name"},
    {id:3, description: "Spam or Harmful"},
    {id:4, description: "Posting Inappropriate things"},
    {id:5, description: "Harrassment or Bullying"},
]

const reportPost = [
    {id:1, description: "Violence"},
    {id:2, description: "Harrassment or Bullying"},
    {id:3, description: "Suicide or Self-injury"},
    {id:4, description: "False Information"},
    {id:5, description: "Spam"},
    {id:6, description: "Hate Speech"},
    {id:7, description: "Terrorism"},
    {id:8, description: "Gross Content"},
]

const Report = ({ isPost, userId, postId, reportModalVisible, setRMVisibility }) => {
    const { colors } = useTheme();
    const styles = createStyles(colors)

    const { token } = React.useContext(AuthContext)

    const [isRMModalVisible, setRMModalVisible] = React.useState(false);

    const handleReportPost = () => {
        setRMVisibility(false);
        setRMModalVisible(true);
    }

    const postReport = async (description) => {
        setRMModalVisible(false);
        if(isPost){
            postReportPost(description)
        }else{
            postReportUser(description)
        }
    }

    const postReportUser = async (description) => {
        try {
            const res = await axios({
                url: `${auth}/postreport`,
                method: 'post',
                headers: {
                    token: token
                },
                data: {
                    userId,
                    description
                }
            })
            if(res.status == 200){
                // console.log(JSON.stringify(res.data))
                // setData(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const postReportPost = async (description) => {
        try {
            const res = await axios({
                url: `${auth}/postreport`,
                method: 'post',
                headers: {
                    token: token
                },
                data: {
                    postId,
                    description
                }
            })
            if(res.status == 200){
                // console.log(JSON.stringify(res.data))
                // setData(res.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    // React.useEffect(() => {

    // }, [reportModalVisible]);

    return (
        <View style={styles.container}>
            <Modal animationInTiming={500} style={{ margin: 0, justifyContent:"flex-end" }} isVisible={reportModalVisible} onBackdropPress={() => setRMVisibility(false)} onBackButtonPress={() => setRMVisibility(false)}>
            {isPost ? 
                    <TouchableOpacity onPress={() => handleReportPost()} style={styles.modalList} activeOpacity={0.7}>
                        <Text style={styles.modalListText}>Report Post</Text>
                    </TouchableOpacity>
                    :
                    <TouchableOpacity onPress={() => handleReportPost()} style={styles.modalList} activeOpacity={0.7}> 
                        <Text style={styles.modalListText}>Report User</Text>
                    </TouchableOpacity>
                }
            </Modal>
            <Modal animationInTiming={500} style={{ margin: 0, justifyContent:"flex-end" }} isVisible={isRMModalVisible} onBackdropPress={() => setRMModalVisible(false)} onBackButtonPress={() => setRMModalVisible(false)}>
                {isPost ? 
                    reportPost.map(item => 
                        <TouchableOpacity onPress={() => postReport(item.description)} style={styles.modalList} activeOpacity={0.7} key={item.id}>
                            <Text style={styles.modalListText}>{item.description}</Text>
                        </TouchableOpacity>)
                    :
                    reportUser.map(item => 
                        <TouchableOpacity onPress={() => postReport(item.description)} style={styles.modalList} activeOpacity={0.7} key={item.id}> 
                            <Text style={styles.modalListText}>{item.description}</Text>
                        </TouchableOpacity>)
                }
            </Modal>
        </View>
    )
}

export default Report