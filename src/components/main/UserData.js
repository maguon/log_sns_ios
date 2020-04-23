import React from 'react'
import {View, Text, ScrollView, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {Button, Modal, InputItem, List, WhiteSpace, WingBlank, Provider} from "@ant-design/react-native"
import {connect} from "react-redux"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import globalStyles from "../../utils/GlobalStyles"
import * as action from "../../action/index"
import  ImagePicker from 'react-native-image-picker';
import EvilIcons from "react-native-vector-icons/EvilIcons";
const photoOptions = {
    //底部弹出框选项
    title:'',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'拍照',
    chooseFromLibraryButtonTitle:'选择相册',
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
}


const Item = List.Item

class UserData extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            visible: false
        }
    }

    componentDidMount() {
        this.props.getUserData()
    }

    onClose = () => {
        this.setState({
            visible: false,
        });
    };

    uploadImage(uri){
        let formData=new FormData()
        let file={uri:uri,type:'multipart/from-data',name:'image.png'}
        formData.append('file',file)
        console.log(formData)
        fetch ('url',{
            method:'POST',
            headers:{
                'Content-Type':'multipart/from-data'
            },
            body:formData,
        }).then((response)=>response.text()).then((responseData)=>{
            console.log('responseData',responseData)
            alert('上传成功')
        }).catch((error)=>{
            console.log('error',error)
            alert('上传失败')
        })
    }
    cameraAction = () =>{

        ImagePicker.showImagePicker(photoOptions, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                // let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };

                // this.setState({
                //     avatarSource: source
                // });

                this.uploadImage(response.uri)
            }
        });
    }

    render() {
        const {navigation, userDataReducer: {userData: {phone}, userDetailInfo: {nick_name, sex, avatar, intro, city_name}}} = this.props

        return (
            <Provider>
                <View style={{flex: 1}}>
                    <ScrollView style={globalStyles.container}>
                        <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff'}}
                                          onPress={()=>this.cameraAction()}>
                            <View style={{flexDirection: 'row', flex: 3, alignItems: 'center'}}>
                                <View style={{margin: 16}}>

                                    {avatar ? <Image source={{uri: avatar}}
                                                     style={{width: 60, height: 60, borderRadius: 30}}/> :
                                        <Image source={require('../../images/head.png')}
                                               style={{width: 60, height: 60, borderRadius: 30}}/>}

                                </View>
                                <View style={{flex: 1, justifyContent: 'center', marginRight: 16}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontSize: 14}}>昵称：{nick_name ? nick_name : "暂无昵称"}</Text>
                                        <FontAwesome name={sex ? "mars" : "venus"} size={12}
                                                     style={{marginLeft: 10}}></FontAwesome>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{
                                            color: '#777',
                                            fontSize: 14,
                                            marginTop: 5
                                        }}>手机：{phone ? phone : "未绑定手机"}</Text>
                                        <Text style={{fontSize: 14, color: "#1598cc"}}>设置头像</Text>
                                    </View>
                                </View>
                            </View>
                        </TouchableOpacity>
                        <WhiteSpace size='md' style={globalStyles.containerBackgroundColor}/>
                        <List>

                            <InputItem
                                clear
                                // extra={}
                                // onChange={}
                                placeholder={nick_name ? nick_name : "昵称"}
                                style={{}}
                            >
                                <Text style={globalStyles.largeText}>昵称</Text>
                            </InputItem>

                            <InputItem
                                clear
                                // extra={}
                                // onChange={}
                                placeholder={intro ? intro : "签名"}
                                style={{}}
                            >
                                <Text style={globalStyles.largeText}>签名</Text>
                            </InputItem>


                            <Item arrow="horizontal"
                                  extra={<Text>{city_name ? city_name : "选择城市"}</Text>}>
                                <Text style={globalStyles.largeText}>城市</Text></Item>

                            <Item arrow="horizontal"
                                  extra={<Text>C1</Text>}>
                                <Text style={globalStyles.largeText}>驾照类型</Text></Item>
                            <Item arrow="horizontal"
                                  extra={<Text>2006.12.05</Text>}>
                                <Text style={globalStyles.largeText}>发证日期</Text></Item>
                        </List>

                        <WhiteSpace size='xl' style={globalStyles.containerBackgroundColor}/>
                        <WingBlank size="lg">
                            <Button type="primary" onPress={() => {
                            }}>提交修改</Button>
                        </WingBlank>
                        <WhiteSpace size='xl' style={globalStyles.containerBackgroundColor}/>


                    </ScrollView>
                </View>
            </Provider>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        userDataReducer: state.UserDataReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    getUserData: () => {
        dispatch(action.UserDataAction.getUserData(props))
    },
})

export default connect(mapStateToProps, mapDispatchProps)(UserData)


