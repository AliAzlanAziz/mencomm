import React,{useState,useEffect,useCallback} from 'react'
import { StyleSheet, Text, View,Button,ScrollView } from 'react-native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons'
import  FontAwesome  from 'react-native-vector-icons/FontAwesome'
const TChat = () => {
    const [messages,setMessages] = useState([]);
    useEffect(() => {
        setMessages([
            {
                _id:1,
                text:'Hello Developer',
                createdAt: new Date(),
                user:{
                    _id:2,
                    name:'React Native',
                    avatar:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg'
                },
            },
            
            {
                _id:2,
                text:'Hello World',
                createdAt: new Date(),
                user:{
                    _id:1,
                    name:'React Native',
                    avatar:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg'
                },
            },

        ])
    },[]);

    const onSend = useCallback((messages=[]) =>{
        setMessages(previousMessages => GiftedChat.append(previousMessages,messages))
    },[]);



    const renderSend = (props) => {
        return(
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons
                     name='send-circle'
                     style={{marginBottom:5, marginRight:5}}
                     size={32}
                    color='#0E9D50'/>
                </View>

            </Send>
        )
    }



    const renderBubble = (props) => {
        return(
        <Bubble
        {...props}
        wrapperStyle={{
            left:{
                backgroundColor:'#2e64e5'
            },
            right:{
                backgroundColor:'#0E9D50'
            }
        }}
        textStyle={{
            left:{
                color:'#fff'
            },
            right:{
                color:'#000'
            }
        }}

        timeTextStyle={{
            left:{
                color:'#fff'
            },
            right:{
                color:'#000'
            }
        }}

        />
        )
    }

    const scrollToBottomComponent = () => {
        return(
            <FontAwesome name='angle-double-down' size={22} color='#333'/>
        )
    }

    return (
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
            _id:1,
        }}
        renderBubble={renderBubble}
        renderSend = {renderSend}
        scrollToBottom
        scrollToBottomComponent = {scrollToBottomComponent}
        />
    )
}

export default TChat

const styles = StyleSheet.create({})
