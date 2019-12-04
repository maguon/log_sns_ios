import React,{Component} from 'react'
import {View, Text, StyleSheet,Image} from 'react-native'
import {Body, Button, Container, Content, Icon, Left, List, ListItem, Right, Separator} from "native-base";
import globalStyles from "../utils/GlobalStyles";
import AntDesign from "react-native-vector-icons/AntDesign";


class Message extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Container>
                <Content style={globalStyles.container}>
                    <List style={styles.list}>
                        <ListItem icon>
                            <Left>
                                <Image source={require('../images/focus.png')} style={styles.image}/>
                            </Left>
                            <Body>
                            <Text style={globalStyles.midText}>关注我</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon >
                            <Left>
                                <Image source={require('../images/comments.png')} style={styles.image}/>
                            </Left>
                            <Body>
                            <Text style={globalStyles.midText}>评论我</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon last>
                            <Left>
                                <Image source={require('../images/praise.png')} style={styles.image}/>
                            </Left>
                            <Body>
                            <Text style={globalStyles.midText}>赞我</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <Separator style={globalStyles.separator} />
                        <ListItem icon last>
                            <Left>
                                <Image source={require('../images/call.png')} style={styles.image}/>
                            </Left>
                            <Body>
                            <Text style={globalStyles.midText}>申请联系方式</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <Separator style={globalStyles.separator} />
                        <ListItem icon last>
                            <Left>
                                <Image source={require('../images/msg.png')} style={styles.image}/>
                            </Left>
                            <Body>
                            <Text style={globalStyles.midText}>系统消息</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        )
    }
}

const styles = StyleSheet.create({
    list: {
        backgroundColor: '#fff',
    },
    avatarContainer: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    userContainer: {
        marginLeft: 10
    },
    image:{
        width:30,
        height:30
    }
})

export default Message
