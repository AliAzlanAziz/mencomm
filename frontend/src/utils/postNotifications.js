import axios from 'axios'
import { auth } from '../global/url'

const postNotification = async (token, userId, postId, contractId, description) => {
    try {
        const res = await axios({
            url: `${auth}/postnotifications`,
            method: 'post',
            headers: {
                token: token
            },
            data:{
                userId,
                postId,
                contractId,
                description
            }
        })
        if(res.status == 200){
            // console.log(res)
            return true
        }
    } catch (error) {
        console.log(error.Error)
    }
}

const postReadNotification = async (token, notifId) => {
    try {
        const res = await axios({
            url: `${auth}/postreadnotification`,
            method: 'post',
            headers: {
                token: token
            },
            data:{
                notifId,
            }
        })
        if(res.status == 200){
            // console.log(res)
            return true
        }
    } catch (error) {
        console.log(error.Error)
    }
}

const postAnnouncementNotification = async (token, postId) => {
    try {
        const res = await axios({
            url: `${auth}/postannouncementnotifications`,
            method: 'post',
            headers: {
                token: token
            },
            data:{
                postId
            }
        })
        if(res.status == 200){
            // console.log(res)
            return true
        }
    } catch (error) {
        console.log(error.Error)
    }
}

export { 
    postNotification, 
    postReadNotification,
    postAnnouncementNotification
}