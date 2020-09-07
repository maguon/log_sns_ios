import React from 'react';
import {Text, View, Dimensions, TouchableOpacity} from 'react-native'
import {Popover, Tabs} from '@ant-design/react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import ImageCropPicker from 'react-native-image-crop-picker'
import Home from '../main/Home'
import * as actionType from "../../actionType/index";
import ImageResizer from 'react-native-image-resizer'
import {connect} from 'react-redux'
import  ImagePicker from 'react-native-image-picker';
import { LogLevel, RNFFmpeg } from 'react-native-ffmpeg'
import* as RNFS from 'react-native-fs'
import * as action from "../../action";
import Geolocation from '@react-native-community/geolocation'

let photoOptions = {
    //底部弹出框选项
    title:'',
    cancelButtonTitle:'取消',
    takePhotoButtonTitle:'',
    chooseFromLibraryButtonTitle:'',
    customButtons: [
        {name: 'photo', title: '拍照'},
        {name: 'camera', title: '摄像'},
        {name: 'hangge', title: '选择相册'},
    ],
    quality:0.75,
    allowsEditing:true,
    noData:false,
    mediaType: 'video', // 'photo' or 'video'
    videoQuality: 'medium', // 'low', 'medium', or 'high'
    storageOptions: {
        skipBackup: true,
        path:'images'
    }
}



const Item = Popover.Item
const {width} = Dimensions.get('window')
const tabs = [{title: '热门'}, {title: '关注'}, {title: '附近'},]

class Title extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            uri:"",
      }
    }

    static defaultProps = {
        getImage: (param) => console.log('选择的图片信息', param), //回调图片信息
        _cameraStart: () => console.log('开始压缩选择的图片')//开始压缩选择的图片
    }


    uploadImage(param){
        this.props.navigation.navigate("WriteArticle",{title:"发布文章"})
        this.props.setFile(param)
    }
    launchPhoto() {//打开照相机进行拍照
        this.props.navigation.navigate("WriteArticle",{title:"发布文章"})
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
        }).then(image => {

            ImageResizer.createResizedImage( image.path, 960, 960, 'JPEG', 100)
                .then((resizedImageUri) => {
                    this.props.addFile([{
                        url: resizedImageUri.uri,
                        preview:"",

                    }])
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
    launchCamera() {

        ImagePicker.launchCamera(photoOptions, (response) => {
            if (response.didCancel) {
                console.log(response)
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error)
            }
            else {

                this.props.setWaiting(true)
                const path=response.uri.replace("MOV","mp4")
                const newpath=`${RNFS.CachesDirectoryPath}/preview.jpg`;
                RNFFmpeg.execute(` -i ${response.uri} -ss 00:00:01  -frames:v 1  -f image2 -y ${newpath}`).then(result => console.log("result",result.rc));

                RNFFmpeg.executeWithArguments(["-i", response.uri,"-b:v","2M","-vf","scale=-2:1080", path]).then(result =>{
                    console.log("result",result)

                    //压缩成功
                    if(result.rc==0) {

                        this.uploadImage([{
                            url: path,
                            preview:newpath
                        }])
                        this.props.setWaiting(false)
                    }else {

                    }
                } );
            }
        })
    }


    createResizedImage(param) {//图片压缩
        if (param.height <= 960 && param.width <= 960) {
            const pos = param.path.lastIndexOf('/')
            return Promise.resolve({
                    url: param.path,
                    preview:"",

            })
        }
        return new Promise((resolve, reject) =>
            ImageResizer.createResizedImage(param.path, 960, 960, 'JPEG', 100)
                .then((resizedImageUri) => {
                    const pos = param.path.lastIndexOf('/')
                    resolve({
                        url: resizedImageUri.uri,
                        preview:"",
                    })
                })
                .catch((err) => {
                    console.log('err', err)

                    reject({
                        success: false,
                        errMsg: err
                    })
                })
        )
    }
    openPicker() {

        this._timer=setInterval(()=>{
            ImageCropPicker.openPicker({
                multiple: true,
                maxFiles:9,
                smartAlbums:['UserLibrary' ],
                mediaType:'photo',
            }).then(images => {
                this.isPicker(images)
                this.props.setWaiting(true)

            }).catch(e => console.log(e));
            this._timer&&clearInterval(this._timer);

        },1000);


    }
    async isPicker(param){
        try{
            this.props._cameraStart()
            const newImages =await Promise.all(param.map(item => {
                return this.createResizedImage(item)
            }))
            this.uploadImage(newImages)
            this.props.setWaiting(false)
        }catch (err) {
            console.log('err', err)
        }

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
                }else if(response.customButton=='camera'){

                    this.launchCamera()
                }else{
                    this.openPicker()
                }

            }

        });
    }

    renderList(overlay, key) {
        return (
            <Popover
                key={key}
                overlay={overlay}
                placement="bottom"
                onSelect={v => {
                    if (v == "发布文章") {
                        this.props.navigation.navigate("WriteArticle",{title:v})
                    } else if (v == "发布求助") {
                        this.props.navigation.navigate("WriteArticle",{title:v})
                    } else if (v == "扫一扫") {
                        this.props.navigation.navigate("Scan")
                    } else {
                        this.props.navigation.navigate("Location")
                    }
                }
                }
            >
                <AntDesign name='plus' size={30} style={{color: '#fff'}}/>
            </Popover>
        )
    }


    render() {
        const {navigation: {state: {routeName}},getHotList,getHomeFollow,getNearList} = this.props
        let overlay = [].map((i, index) => (
            <Item key={index} value={`${i}`}>
                <Text>{i}</Text>
            </Item>
        ))
        overlay = overlay.concat([

            <Item key="0" value="发布文章">
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name='rename-box' size={20} style={{color: "#838485"}}></Icon>
                    <Text style={{marginLeft: 5, color: "#838485"}}>发布文章</Text>
                </View>
            </Item>,
            <Item key="1" value="发布求助">
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name='help' size={20} style={{color: "#838485"}}></Icon>
                    <Text style={{marginLeft: 5, color: "#838485"}}>发布求助</Text>
                </View>
            </Item>,
            <Item key="2" value="扫一扫">
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name='qrcode-scan' size={20} style={{color: "#838485"}}></Icon>
                    <Text style={{marginLeft: 5, color: "#838485"}}>扫一扫</Text>
                </View>
            </Item>,
            <Item key="3" value="收藏定位">
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name='map-marker' size={20} style={{color: "#838485"}}></Icon>
                    <Text style={{marginLeft: 5, color: "#838485"}}>收藏定位</Text>
                </View>
            </Item>

        ])

        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: width * 0.2, alignItems: 'center'}}>
                    <EvilIcons name='camera' size={35} style={{color: '#fff'}}

                               // onPress={() => {this.props.navigation.navigate("Camera")}}
                               // onPress={this.props.setVisible}
                               onPress={()=>this.cameraAction()}
                    />
                </View>
                {routeName == 'Home' &&
                <View style={{width: width * 0.6, height: 46, alignItems: 'center',borderColor:"#fff", backgroundColor: '#1598cc'}}>
                    <Tabs tabs={tabs}
                          onChange={(tab, index) => {
                              console.log(tab)
                              this.props.navigation.setParams({tab: tab, tabIndex: index})
                              this.props.getHotLoad()
                              if(index==0){
                                  getHotList()
                              }else if(index==1){
                                  getHomeFollow()
                              }else if(index==2){
                                  Geolocation.getCurrentPosition(info => getNearList(info))
                              }
                          }}
                          tabBarBackgroundColor='#1598cc'
                          tabBarActiveTextColor='#fff'
                          tabBarInactiveTextColor='#E1E1E1'
                          tabBarUnderlineStyle={{backgroundColor: '#fff'}}
                          tabBarTextStyle={{fontSize: 16, fontWeight: 'bold'}}
                          activeTab={1}
                    >
                    </Tabs>
                </View>}
                {routeName != 'Home' &&
                <View style={{width: width * 0.6, alignItems: 'center', backgroundColor: '#1598cc'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>社区</Text>
                </View>}

                <View style={{width: width * 0.2, alignItems: 'center'}}>
                    <React.Fragment>
                        {[1].map(item => this.renderList(overlay, item))}
                    </React.Fragment>
                </View>

            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        homeReducer: state.HomeReducer
    }
}

const mapDispatchProps = (dispatch) => ({
    getHotLoad: () => {
        dispatch({type: actionType.HomeActionType.set_HotLoading, payload: {hotLoading: false}})
    },
    setFile:(param) => {
        dispatch({type: actionType.HomeActionType.set_File, payload: {setFile: param}})
    },
    addFile:(param) => {
        dispatch({type: actionType.HomeActionType.add_File, payload: {addFile: param}})
    },
    setWaiting:(value) => {
        dispatch({type: actionType.HomeActionType.set_Waiting, payload: {waiting: value}})
    },
    getHotList: () => {
        dispatch(action.HomeAction.getHotList())
    },
    getHomeFollow: () => {
        dispatch(action.HomeAction.getHomeFollow())
    },
    getNearList: (value) => {
        dispatch(action.HomeAction.getNearList(value))
    },

})


export default connect(mapStateToProps, mapDispatchProps)(Title)




