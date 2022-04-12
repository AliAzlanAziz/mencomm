import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Bubble, GiftedChat, Send } from 'react-native-gifted-chat'
import  MaterialCommunityIcons  from 'react-native-vector-icons/MaterialCommunityIcons'
import  FontAwesome  from 'react-native-vector-icons/FontAwesome'

const SChat = ({ navigation }) => {
    const [messages,setMessages] = React.useState([]);
    React.useEffect(() => {
        setMessages([
            {_id:1, text:'Hello Developer', createdAt: new Date(), user:{_id:2, name:'React Native', avatar:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg'}, },            
            {_id:2, text:'Hello World', createdAt: new Date(), user:{_id:1, name:'React Native', avatar:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg' }, },
        ])
    },[]);

    const onSend = React.useCallback((messages=[]) =>{
        setMessages(previousMessages => GiftedChat.append(previousMessages,messages))
    },[]);



    const renderSend = (props) => {
        return(
            <Send {...props}>
                <View>
                    <MaterialCommunityIcons name='send-circle' style={{marginBottom:5, marginRight:5}} size={32} color='#2e64e5'/>
                </View>

            </Send>
        )
    }



    const renderBubble = (props) => {
        return(
        <Bubble
        {...props}
        wrapperStyle={{
            right:{
                backgroundColor:'#2e64e5'
            },
            left:{
                backgroundColor:'#3DDF61'
            }
        }}
        textStyle={{
            right:{
                color:'#fff'
            },
            left:{
                color:'#000'
            }
        }}

        timeTextStyle={{
            right:{
                color:'#fff'
            },
            left:{
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

export default SChat

const styles = StyleSheet.create({})
