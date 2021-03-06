import React from 'react'
import {View, Text, ScrollView, TouchableOpacity, Image, StyleSheet} from 'react-native'
import {
    Button,
    Modal,
    InputItem,
    List,
    WhiteSpace,
    WingBlank,
    Provider,
    Picker
} from "@ant-design/react-native"
import {connect} from "react-redux"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import globalStyles from "../../utils/GlobalStyles"
import * as action from "../../action/index"
import  ImagePicker from 'react-native-image-picker';
import EvilIcons from "react-native-vector-icons/EvilIcons";
import ImageCropPicker from "react-native-image-crop-picker";
import ImageResizer from "react-native-image-resizer";
import * as actionType from "../../actionType";
let photoOptions = {
    //底部弹出框选项
    title:'',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'',
    chooseFromLibraryButtonTitle:'',
    customButtons: [
        {name: 'photo', title: '拍照'},
        {name: 'hangge', title: '选择相册'},
    ],
    quality:0.75,
    allowsEditing:true,
    noData:false,
    storageOptions: {
        skipBackup: true,
        path:'images'
    },

}
const data=[
    {
        value:0,
        label:"女"
    },
    {
        value:1,
        label:"男",
    }

]


const Item = List.Item

class UserData extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getUserData()
    }

   //打开照相机进行拍照
    launchPhoto() {

        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping:true,
            cropperChooseText:"确定",
            cropperCancelText:"取消",
        }).then(image => {
            ImageResizer.createResizedImage( image.path, 960, 960, 'JPEG', 100)
                .then((resizedImageUri) => {
                    this.props.setHead({url:resizedImageUri.uri})
                })
                .catch((err) => {
                    console.log('err', err)
                    reject({
                        success: false,
                        errMsg: err
                    })
                })


        })
    }

    openPicker() {
        this._timer=setInterval(()=>{
            ImageCropPicker.openPicker({
                width: 300,
                height: 400,
                cropping:true,
                cropperChooseText:"确定",
                cropperCancelText:"取消",
                mediaType:'photo',

            }).then(image => {
                ImageResizer.createResizedImage( image.path, 960, 960, 'JPEG', 100)
                    .then((resizedImageUri) => {
                        this.props.setHead({url:resizedImageUri.uri})
                    })
                    .catch((err) => {
                        console.log('err', err)
                        reject({
                            success: false,
                            errMsg: err
                        })
                    })
            }).catch(e => console.log(e));
            this._timer&&clearInterval(this._timer);

        },1000);


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
                if(response.customButton=='photo'){
                    this.launchPhoto()
                }else{
                    this.openPicker()
                }

            }

        });
    }


    render() {
        const {navigation, userDataReducer: {userData: {phone}, userDetailInfo: {_id,nick_name, sex, avatar, intro, city_name},Sex,nickName,cityName,Intro}, submit} = this.props
console.log(this.props)
        return (
            <Provider>
                <View style={{flex: 1}}>
                    <ScrollView style={globalStyles.container}>
                        <View style={{flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff'}}>
                            <View style={{flexDirection: 'row', flex: 3, alignItems: 'center'}}>
                                <TouchableOpacity style={{margin: 16}} onPress={() => {
                                    navigation.navigate("HeadImage", {
                                        uri: avatar
                                    })}}>

                                    {avatar ? <Image source={{uri: avatar}}
                                                     style={{width: 60, height: 60, borderRadius: 30}}/> :
                                        <Image source={require('../../images/head.png')}
                                               style={{width: 60, height: 60, borderRadius: 30}}/>}

                                </TouchableOpacity>
                                <View style={{flex: 1, justifyContent: 'center', marginRight: 16}}>
                                    <View style={{flexDirection: 'row'}}>
                                        <Text style={{fontSize: 14}}>昵称：{nick_name ? nick_name : "暂无昵称"}</Text>
                                        <FontAwesome name={sex ? "mars":"venus"} size={12}
                                                     style={{marginLeft: 10}}></FontAwesome>
                                    </View>
                                    <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
                                        <Text style={{
                                            color: '#777',
                                            fontSize: 14,
                                            marginTop: 5
                                        }}>手机：{phone ? phone : "未绑定手机"}</Text>
                                        <TouchableOpacity onPress={()=>this.cameraAction()}>
                                        <Text style={{fontSize: 14, color: "#1598cc"}}>设置头像</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <WhiteSpace size='md' style={globalStyles.containerBackgroundColor}/>
                        <List>

                            <InputItem
                                clear
                                onChange={this.props.setNickName}
                                placeholder={nick_name ? nick_name : "昵称"}

                            >
                                <Text style={globalStyles.largeText}>昵称</Text>
                            </InputItem>

                            <InputItem
                                clear
                                onChange={this.props.setIntro}
                                placeholder={intro ? intro : "暂无签名"}
                            >
                                <Text style={globalStyles.largeText}>签名</Text>
                            </InputItem>
                            <InputItem
                                clear
                                onChange={this.props.setCityName}
                                placeholder={city_name?city_name:"请输入"}
                            >
                                <Text style={globalStyles.largeText}>城市</Text>
                            </InputItem>

                            <Picker
                                data={data}
                                cols={1}
                                value={Sex}
                                onChange={this.props.setSex}
                                extra={
                                    <View>
                                   <View>
                                        {Sex==0?<Text style={{  fontSize: 16, color: '#c2c3c4'}}>女</Text>:
                                            <Text style={{  fontSize: 16, color: '#c2c3c4'}}>男</Text>}
                                    </View>

                                    </View>
                                }
                            >
                                <Item arrow="horizontal"   >
                                    <Text style={globalStyles.largeText}>性别</Text>
                                </Item>
                            </Picker>
                            {/*<Picker*/}
                                {/*data={data}*/}
                                {/*cols={1}*/}
                                {/*value={this.state.cityValue}*/}
                                {/*onChange={this.cityOnChange}*/}
                                {/*extra={*/}
                                    {/*<Text style={{  fontSize: 16, color: '#c2c3c4'}}>{this.state.placeholder}</Text>*/}
                                {/*}*/}
                            {/*>*/}
                                {/*<Item arrow="horizontal" onPress={this.onPress}>*/}
                                    {/*<Text style={globalStyles.largeText}>城市</Text>*/}
                                {/*</Item>*/}
                            {/*</Picker>*/}



                        </List>


                        <WingBlank size="lg">
                            <Button type="primary" style={{marginTop:50}} onPress={()=>{
                                submit({
                                    id:_id,
                                    sex: Sex,
                                    nickName: nickName,
                                    cityName: cityName,
                                    intro: Intro,
                                    navigation:navigation
                                })
                            }}>提交修改</Button>
                        </WingBlank>
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
    setSex:(value)=>{
        console.log(value)
        dispatch({type:actionType.UserDataType.set_Sex,payload: {Sex:value[0] }})
    },
    setNickName: (value) => {
      console.log(value)
        dispatch({type:actionType.UserDataType.set_NickName,payload: {nickName:value }})
    },
    setCityName: (value) => {
        console.log(value)
        dispatch({type:actionType.UserDataType.set_CityName,payload: {cityName:value }})
    },
    setIntro: (value) => {
        console.log(value)
        dispatch({type:actionType.UserDataType.set_Intro,payload: {Intro:value }})
    },
    submit: (value) => {
        dispatch(action.UserDataAction.submit(value))
    },
    getUserData: () => {
        dispatch(action.UserDataAction.getUserData(props))
    },
    setHead: (value) => {
        dispatch(action.UserDataAction.setHead(value))
    },
})

export default connect(mapStateToProps, mapDispatchProps)(UserData)


