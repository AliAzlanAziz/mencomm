import React from 'react'
import { StyleSheet,
    FlatList
    } from 'react-native'
import { Container,
    Card,
    UserInfo,
    UserImgWrapper,
    UserImg,
    UserInfoText,
    PostTime,
    MessageText,
    TextSection,
    UserName } from '../style/tutor/messageStyles'



const TMessages = ({navigation}) => {
    const [data,setData] = React.useState( [
        {id:'1',user:'John',image:'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg',time:'4 mins ago',messagetext:'Hello Developer'}
    ])

    return (
    <Container>
            <FlatList
                data={data}
                keyExtractor={item=>item.id}
                renderItem={({item}) => (
                    <Card onPress={() => navigation.navigate('TChat',{userName:item.user})}>
                        <UserInfo>
                            <UserImgWrapper>
                                <UserImg source={{uri:item.image}} />
                            </UserImgWrapper>
                            <TextSection>
                                <UserInfoText>
                                    <UserName style={styles.user}>{item.user}</UserName>
                                    <PostTime>{item.time}</PostTime>
                                </UserInfoText>
                                <MessageText>{item.messagetext}</MessageText>
                            </TextSection>
                        </UserInfo>
                    </Card>
                )}
            />
    </Container>
    )
}

export default TMessages

const styles = StyleSheet.create({
    user:{
        color:'#0E9D50'
    }
})
