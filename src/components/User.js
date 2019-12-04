import React,{Component} from 'react'
import {View,Text,StyleSheet} from 'react-native'
import {Body, Button, Container, Content, Icon,Left, List, ListItem, Right, Separator, Thumbnail} from "native-base";
import globalStyles from '../utils/GlobalStyles'
import AntDesign from 'react-native-vector-icons/AntDesign'

import { Actions } from 'react-native-router-flux'

class User extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <Container>
                <Content style={globalStyles.container}>
                    <List style={styles.list}>
                        <Separator style={globalStyles.separator} />
                        <ListItem last>
                            <View style={styles.avatarContainer}>
                                {/*{(avatar_image!=""&&avatar_image!=null)&&<Thumbnail source={avatar_image ? { uri: `${file_host}/image/${avatar_image}` } : { uri: `personalicon` }} />}*/}
                                {/*{(avatar_image==""||avatar_image==null)&&<Thumbnail source={require("../../images/head.png")} />}*/}
                                <Thumbnail source={require("../images/head.png")} />
                                <View style={styles.userContainer}>
                                    <View>
                                        <Text style={globalStyles.largeText}>二丫</Text>
                                    </View>
                                    <View style={{flexDirection: 'row', paddingTop:5,alignItems:'center'}}>
                                        <AntDesign name="mobile1" size={18} color={'#838485'}/>
                                        <Text style={[globalStyles.midText,{marginLeft:10}]}>15840668526</Text>
                                    </View>
                                </View>
                            </View>
                            <Right style={{position:"absolute", right:15}}>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <Separator style={globalStyles.separator} />
                        <ListItem icon last>
                            <Left>
                                <AntDesign name="filetext1" size={20} color={'#838485'} />
                            </Left>
                            <Body>
                            <Text style={globalStyles.midText}>我的文章</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>

                        <Separator style={globalStyles.separator} />
                        <ListItem icon >
                            <Left>
                                <AntDesign name="hearto" size={20} color={'#838485'} />
                            </Left>
                            <Body>
                            <Text style={globalStyles.midText}>我的关注</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>

                        <ListItem icon last>
                            <Left>
                                <AntDesign name="team" size={20} color={'#838485'} />
                            </Left>
                            <Body>
                            <Text style={globalStyles.midText}>我的粉丝</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <Separator style={globalStyles.separator} />
                        <ListItem icon >
                            <Left>
                                <AntDesign name="staro" size={20} color={'#838485'} />
                            </Left>
                            <Body>
                            <Text style={globalStyles.midText}>我的收藏</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon >
                            <Left>
                                <AntDesign name="edit" size={20} color={'#838485'} />
                            </Left>
                            <Body>
                            <Text style={globalStyles.midText}>我的评论</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <ListItem icon last>
                            <Left>
                                <AntDesign name="like2" size={20} color={'#838485'}/>
                            </Left>
                            <Body>
                            <Text style={globalStyles.midText}>我参与的投票</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <Separator style={globalStyles.separator} />
                        <ListItem icon last>
                            <Left>
                                <AntDesign name="enviromento" size={20} color={'#838485'} />
                            </Left>
                            <Body>
                            <Text style={globalStyles.midText}>我收藏的位置</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        <Separator style={globalStyles.separator} />
                        <ListItem icon last>
                            <Left>
                                <AntDesign name="setting" size={20} color={'#838485'} />
                            </Left>
                            <Body>
                            <Text style={globalStyles.midText}>设置</Text>
                            </Body>
                            <Right>
                                <Icon name="ios-arrow-forward" />
                            </Right>
                        </ListItem>
                        {/*<ListItem icon last>*/}
                            {/*<Left>*/}
                                {/*<Icon name="ios-cube" style={globalStyles.styleColor} />*/}
                            {/*</Left>*/}
                            {/*<Body>*/}
                            {/*<Text style={globalStyles.midText}>版本信息：v{version.currentVersion}{`(${ios_app.stageList.find(item => item.id == ios_app.stage).value})`}</Text>*/}
                            {/*</Body>*/}
                            {/*<Right >*/}
                                {/*{version.force_update != 0 && <TouchableOpacity onPress={() => {*/}
                                    {/*// console.log('url', version.url)*/}
                                    {/*if (version.url) {*/}
                                        {/*Linking.canOpenURL(version.url)*/}
                                            {/*.then(supported => {*/}
                                                {/*if (!supported) {*/}
                                                    {/*console.log('Can\'t handle url: ' + version.url)*/}
                                                {/*} else {*/}
                                                    {/*return Linking.openURL(version.url)*/}
                                                {/*}*/}
                                            {/*})*/}
                                            {/*.catch(err => console.error('An error occurred', err))*/}
                                    {/*}*/}
                                {/*}}>*/}
                                    {/*<FoundationIcon name="burst-new" size={30} color={'#ff0000'} />*/}
                                {/*</TouchableOpacity>}*/}
                            {/*</Right>*/}
                        {/*</ListItem>*/}
                    </List>
                    <Button full style={[styles.button, globalStyles.styleBackgroundColor]}
                            // onPress={this.exitApp}
                    >
                        <Text style={[globalStyles.midText, styles.buttonTitle]}>退出</Text>
                    </Button>
                </Content>
                {/*<ConfirmModal*/}
                    {/*title='确认退出应用？'*/}
                    {/*// isVisible={this.state.confirmModalVisible}*/}
                    {/*// onPressOk={this.onPressOk}*/}
                    {/*// onPressCancel={this.onPressCancel}*/}
                {/*/>*/}
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
    button: {
        margin: 15,
        marginTop: 40
    },
    buttonTitle: {
        color: '#fff'
    }
})
export default User
