import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    TextInput,
    FlatList,
    Modal,
    TouchableOpacity,
    ImageBackground,
    Dimensions,
    ActivityIndicator,
    StyleSheet,
    Alert
} from 'react-native'
import {List, TextareaItem, Icon, Switch, Provider} from '@ant-design/react-native'
import Geolocation from '@react-native-community/geolocation'
import { connect } from 'react-redux'
import * as action from '../../action/index'
import * as actionType from "../../actionType";
import globalStyles from "../../utils/GlobalStyles";
import AntDesign from "react-native-vector-icons/AntDesign";
import ImageCropPicker from "react-native-image-crop-picker";
import ImageResizer from "react-native-image-resizer";
import  ImagePicker from 'react-native-image-picker';
import { LogLevel, RNFFmpeg } from 'react-native-ffmpeg'
import Video from 'react-native-video';
import* as RNFS from 'react-native-fs'
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
    },

}

const Item = List.Item
const Brief = Item.Brief
const {width} = Dimensions.get('window')
let cellWH = (width-2*20) / 3

class WriteArticle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            muted: false,
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            skin: 'embed',
            isBuffering: false,
            waiting:false
        }

    }

    onLoad=data=>{
        console.log('On load fired!');
        this.setState({duration: data.duration});
    }

    onProgress=data=>{
        this.setState({currentTime: data.currentTime});
    }

    onBuffer=({ isBuffering }: { isBuffering: boolean })=> {
        this.setState({ isBuffering });
    }

    onSwitchChange = value => {
        this.props.onChange(value)
        if (value) {
            Geolocation.getCurrentPosition(({coords}) => {
                this.props.getCurrentAddr({
                    longitude: coords.longitude,
                    latitude: coords.latitude
                })
            })

        } else {
            this.props.removeCurrentAddr()
        }
    }

    launchPhoto() {//打开照相机进行拍照

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

    guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
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
                this.setState({waiting: true});
                const path=response.uri.replace("MOV","mp4")
                const newpath=`${RNFS.DocumentDirectoryPath}/images/${this.guid()}.jpg`;
                RNFFmpeg.execute(` -i ${response.uri} -ss 00:00:01  -frames:v 1  -f image2 -y ${newpath}`).then(result => console.log("result",result.rc));
                RNFFmpeg.executeWithArguments(["-i", response.uri,"-b:v","2M","-vf","scale=-2:1080", path]).then(result =>{
                    //压缩成功
                    if(result.rc==0) {

                        this.props.addFile([{
                            url: path,
                            preview:newpath
                        }])
                        this.setState({waiting: false});
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
        const { homeReducer:{setFile}} = this.props
        let maxFile=9-setFile.length

        this._timer=setInterval(()=>{
            ImageCropPicker.openPicker({
                multiple: true,
                maxFiles:maxFile,
                smartAlbums:['UserLibrary' ],
                mediaType:'photo',
            }).then(images => {
                this.isPicker(images)
                this.setState({waiting: true});
            }).catch(e => console.log(e));
            this._timer&&clearInterval(this._timer);

        },1000);


    }
    async isPicker(param){
        try{
            const newImages =await Promise.all(param.map(item => {
                return this.createResizedImage(item)
            }))
            this.props.addFile(newImages)
            this.setState({waiting: false});
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
    render() {
        const { navigation,homeReducer:{setFile},writeArticleReducer: { data: { currentAddrName },posSwitch,createArticle:{isResultStatus}},setContent} = this.props
        const typeBool=setFile.filter((item)=>{return item.preview!=""})
        return (
    <Provider>
            <ScrollView style={{ flex: 1 }}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <List>
                    <TextareaItem rows={5} placeholder="输入文章内容" onChange={setContent} />

                    <Item >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{flexDirection: 'row'}}>
                            <Icon name="environment" color='orange' style={{ marginRight: 5, marginTop:-3}} />
                            <Text style={{ fontSize: 17 }}>显示定位</Text>
                            </View>
                                    <Switch
                                        style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                                        color="#333333"
                                        checked={posSwitch}
                                        onChange={this.onSwitchChange}/>
                        </View>
                        {posSwitch&&<Brief>{currentAddrName ? `${currentAddrName}` : ''}</Brief>}
                    </Item>
                </List>

                <FlatList
                    data={setFile}
                    numColumns={3}
                    contentContainerStyle={globalStyles.list_container}
                    renderItem={(data) => {
                        const {item,index} = data
                        return (
                            <View style={{marginTop: 5, marginLeft:4,alignItems: 'center',justifyContent: 'center'}}>
                                <TouchableOpacity activeOpacity={0.5} >
                                    {(typeBool.length<1)?<ImageBackground source={{uri:item.url}} style={{width: cellWH, height: cellWH}}>
                                        <AntDesign style={{color:"#006cf5",position: 'absolute', right:2,top:2}} onPress={()=>{setFile.splice(index, 1)
                                            this.props.setFile(setFile)
                                        }} name="minuscircle" size={20}/>
                                    </ImageBackground>:
                                        <View>
                                        <Video source={{uri:item.url}}
                                               paused={this.state.paused}
                                               muted={this.state.muted}
                                               onLoad={this.onLoad}
                                               onBuffer={this.onBuffer}
                                               onProgress={this.onProgress}
                                               repeat={true}
                                               controls={true}
                                               resizeMode="cover"
                                               style={{width: cellWH, height: cellWH}}/>
                                        <AntDesign style={{color:"#006cf5",position: 'absolute', right:2,top:2}} onPress={()=>{setFile.splice(index, 1)
                                        this.props.setFile(setFile)
                                    }} name="minuscircle" size={20}/>
                                        </View>
                                        }
                                </TouchableOpacity>
                            </View>

                        )
                    }
                    }
                />
                {(typeBool.length<1)? <View>
                {setFile.length!=9?<View>
                    <View style={{width: cellWH, height: cellWH,justifyContent:'center',alignItems:'center',marginTop: 5, marginLeft:20}}>
                        <AntDesign style={{color:"#d2d2d2"}} name="pluscircleo" size={50}
                                   onPress={()=> {
                                       const imageBool=setFile.filter((item)=>{return item.preview==""})
                                       if(imageBool!=""){
                                           photoOptions.customButtons=[
                                               {name: 'photo', title: '拍照'},
                                               {name: 'hangge', title: '选择相册'},
                                           ]
                                       }else {
                                           photoOptions.customButtons=[
                                               {name: 'photo', title: '拍照'},
                                               {name: 'camera', title: '摄像'},
                                               {name: 'hangge', title: '选择相册'},
                                           ]
                                       }
                                       this.cameraAction()}
                                   }
                        />
                        <Text style={{color:"#d2d2d2",fontSize:14}}>添加照片</Text>
                    </View>
                </View>: <View style={{width:width,height:40,justifyContent:'center',marginBottom: 5,alignItems:'center'}}>
                    <Text style={{color:"#d2d2d2",fontSize:14}}>最多只能添加9张照片</Text>
                </View>
                }
                </View>:
                <View style={{width:width,height:40,justifyContent:'center',marginBottom: 5,alignItems:'center'}}>
                        <Text style={{color:"#d2d2d2",fontSize:14}}>最多只能添加1个视频文件</Text>
                    </View>}
                <Modal
                    animationType={"fade"}
                    transparent={true}
                    visible={this.state.waiting}
                    onRequestClose={() => { }}>
                    <View style={style.modalContainer} >
                        <View style={style.modalItem}>
                            <ActivityIndicator
                                animating={true}
                                style={style.modalActivityIndicator}
                                size="large"
                            />
                            <Text style={style.modalText}>正在加载...</Text>
                        </View>
                    </View>
                </Modal>
            </ScrollView>
    </Provider>
        )
    }
}

const style = StyleSheet.create({
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalItem: {
        flexDirection: 'row',
        padding: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalActivityIndicator: {
        height: 40
    },
    modalText: {
        color: '#fff',
        paddingLeft: 10
    }
});

const mapStateToProps = (state) => {
    return {
        writeArticleReducer: state.WriteArticleReducer,
        homeReducer: state.HomeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    onChange:(value)=>{
        dispatch(actionType.WriteArticleType.on_Switch_Change (value) )
    },

   setContent:(value)=>{
    dispatch(actionType.WriteArticleType.create_content (value) )
   },
    createArticle:(value)=>{
            dispatch(action.WriteArticleAction.createArticle(value ))
        },
    getCurrentAddr:(value)=> {
        dispatch(action.WriteArticleAction.getCurrentAddr(value))
    },
    removeCurrentAddr: () => {
        dispatch(action.WriteArticleAction.removeCurrentAddr())
    },
    setFile:(param) => {
        dispatch({type: actionType.HomeActionType.set_File, payload: {setFile: param}})
    },
    addFile:(param) => {
        dispatch({type: actionType.HomeActionType.add_File, payload: {addFile: param}})
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WriteArticle)

