import React, {Component} from 'react'
import {
    StyleSheet,
    Text,
    Alert,
    TouchableOpacity,
    View,
    CameraRoll,
    Image,
    ImageBackground,
    StatusBar,
    Dimensions,
    Modal,
    ActivityIndicator
} from 'react-native'
import {RNCamera} from 'react-native-camera'
import AntDesign from 'react-native-vector-icons/AntDesign'
import {connect} from 'react-redux'
import DataTime from '../modules/DataTime'
import Slider from 'react-native-slider'
// import {RNFFmpeg } from 'react-native-ffmpeg'
import * as action from "../../action/index"

const window = Dimensions.get('window')

class Camera extends Component {
    constructor(props) {
        super(props)
        this.state = {
            isFlashOn: false,
            isRecording: false,
            isStop: true,
            timeType: false,
            zoom: 0,
            value: 0,
            sideType: RNCamera.Constants.Type.back,
            waiting: false,
            switch: true,
        }
    }

    // toggleFlash() {
    //     this.setState({isFlashOn: !this.state.isFlashOn})
    // }

    // _onChange = (value) => {
    //     this.setState({
    //         value: value
    //     })
    // };

    isFlashOn() {
        if (this.state.isFlashOn === false) {
            return (
                <TouchableOpacity onPress={() => {
                    this.setState({isFlashOn: !this.state.isFlashOn})
                }}>
                    <Image style={{width: 22, height: 20, marginLeft: 10}}
                           source={require('../../images/flash_close.png')}/>
                </TouchableOpacity>

            )
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    this.setState({isFlashOn: !this.state.isFlashOn})
                }}>
                    <Image style={{width: 22, height: 20, marginLeft: 10}}
                           source={require('../../images/flash_auto.png')}/>
                </TouchableOpacity>

            )
        }

    }


    clickSwitchSide = () => {

        if (this.state.timeType) {
            return (
                <Image style={{width: 23, height: 25, opacity: 0.2, marginRight: 10}}
                       source={require('../../images/switch_camera.png')}/>
            )
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    this.setState({
                        sideType: this.state.sideType === RNCamera.Constants.Type.back ? RNCamera.Constants.Type.front : RNCamera.Constants.Type.back,
                    });
                }}>
                    <Image style={{width: 23, height: 25, marginRight: 10}}
                           source={require('../../images/switch_camera.png')}/>
                </TouchableOpacity>

            )
        }


    };

    clickSwitch = () => {

        if (this.state.switch) {
            return (
                <TouchableOpacity onPress={() => {
                    this.setState({switch: !this.state.switch})
                }}>
                    <Image style={{width: 35, height: 35}} source={require('../../images/photo.png')}/>
                </TouchableOpacity>

            )
        } else {
            return (
                <TouchableOpacity onPress={() => {
                    this.setState({switch: !this.state.switch})
                }}>
                    <Image style={{width: 35, height: 35}} source={require('../../images/camera.png')}/>
                </TouchableOpacity>

            )
        }

    }

    //拍摄照片
    takePicture = async () => {

        let options = {
            quality: 0.85,
            fixOrientation: true,
            forceUpOrientation: true,
            writeExif: true
        };
        let data = null;

        try {
            data = await this.camera.takePictureAsync(options);
            this.props.setData(data)
        }
        catch (err) {
            Alert.alert("Error", "Failed to take picture: " + (err.message || err));
            return;
        }

    }


    onCancel() {
        this.setState({isStop: true});
    }

    // upload(props){
    //     this.setState({waiting: true});
    //     const path=this.state.data.replace("mov","mp4")
    //     RNFFmpeg.executeWithArguments(["-i", this.state.data,"-b:v","2M","-vf","scale=-2:1080", path]).then(result =>{
    //
    //         //压缩成功
    //         if(result.rc==0) {
    //             const param={
    //                 path:path,
    //                 props:props
    //             }
    //             this.props.setMyCamera(param);
    //             this.setState({waiting: false});
    //
    //         }else {
    //
    //         }
    //     } );
    //
    // }


    render() {
        const {CameraReducer: {imageList,cameraList}, navigation} = this.props
        return (
            <View style={{flex: 1}}>

                <StatusBar backgroundColor="#ff0000"
                           translucent={true}
                           hidden={true}
                />
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={{flex: 1}}
                    type={this.state.sideType}
                    zoom={this.state.value}
                    autoFocus={RNCamera.Constants.AutoFocus.on}
                    flashMode={this.state.isFlashOn === true ? RNCamera.Constants.FlashMode.torch : RNCamera.Constants.FlashMode.off}
                    faceDetectionLandmarks={
                        RNCamera.Constants.FaceDetection.Landmarks
                            ? RNCamera.Constants.FaceDetection.Landmarks.all
                            : undefined
                    }
                    faceDetectionClassifications={
                        RNCamera.Constants.FaceDetection.Classifications
                            ? RNCamera.Constants.FaceDetection.Classifications.all
                            : undefined
                    }
                >
                    {({camera, status}) => {
                        return (
                            <View style={styles.preview}>

                                <View style={styles.time}>
                                    <View style={{flexDirection: "row", alignItems: "center", marginLeft: 10}}>
                                        <AntDesign name="left" size={25} style={{color: "white"}} onPress={() => {
                                            navigation.pop()
                                        }}> </AntDesign>
                                        <View>{this.isFlashOn()}</View>
                                    </View>


                                    <View>{this.clickSwitchSide()}</View>
                                </View>

                                <View>
                                    {this.state.switch ? <View></View> : <View style={{
                                        width: window.width,
                                        height: 40,
                                        justifyContent: "center",
                                        alignItems: "center"
                                    }}>
                                        {this.state.timeType ?
                                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                                <Image style={{width: 10, height: 10}}
                                                       source={require('../../images/dian.png')}/>
                                                <DataTime/>
                                            </View> : <Text style={styles.timeText}>00:00:00</Text>
                                        }
                                    </View>}
                                    <View style={styles.container}>

                                        {this.state.isStop === true ?
                                            <View>
                                                {this.state.switch ?
                                                    <TouchableOpacity onPress={() => {
                                                        navigation.navigate("PhotoList")
                                                    }}>
                                                        {imageList != "" ?
                                                            <Image style={{width: 45, height: 45, borderRadius: 5}}
                                                                   source={{uri: imageList[imageList.length - 1].uri}}/> :
                                                            <Image style={{
                                                                width: 45,
                                                                height: 45,
                                                                borderRadius: 5,
                                                                backgroundColor: "#b6b6b6"
                                                            }}/>
                                                        }
                                                    </TouchableOpacity>: <TouchableOpacity onPress={() => {
                                                        navigation.navigate("CameraList")
                                                    }}>
                                                        {cameraList != "" ?
                                                            <ImageBackground style={{width: 45, height: 45, borderRadius: 5}}
                                                                   source={{uri: cameraList[cameraList.length-1].uri}}/> :
                                                            <Image style={{
                                                                width: 45,
                                                                height: 45,
                                                                borderRadius: 5,
                                                                backgroundColor: "#b6b6b6"
                                                            }}/>
                                                        }
                                                    </TouchableOpacity>
                                                }
                                            </View>
                                            : <TouchableOpacity onPress={() => {
                                                this.onCancel()
                                            }}>
                                                <Image style={{width: 25, height: 25}}
                                                       source={require('../../images/cancel.png')}/>
                                            </TouchableOpacity>}


                                        {this.state.switch ? this.cameraBtn() : this.recordBtn(camera)}

                                        {this.state.isStop === true ? this.clickSwitch() :
                                            <TouchableOpacity onPress={() => {
                                                this.onCancel()
                                            }}>

                                                <Image style={{width: 25, height: 25}}
                                                       source={require('../../images/pull.png')}/>

                                            </TouchableOpacity>
                                        }

                                    </View>
                                </View>
                                <Modal
                                    animationType={"fade"}
                                    transparent={true}
                                    visible={this.state.waiting}
                                    onRequestClose={() => {
                                    }}>
                                    <View style={styles.modalContainer}>
                                        <View style={styles.modalItem}>
                                            <ActivityIndicator
                                                animating={this.state.waiting}
                                                style={styles.modalActivityIndicator}
                                                size="large"
                                            />
                                            <Text style={styles.modalText}>正在上传视频...</Text>
                                        </View>
                                    </View>
                                </Modal>
                            </View>
                        );
                    }}
                </RNCamera>
            </View>
        );
    }

    cameraBtn() {
        return (
            <TouchableOpacity onPress={() => this.takePicture()}>
                <Image style={{width: 60, height: 60}} source={require('../../images/shutter.png')}/>
            </TouchableOpacity>
        )
    }

    recordBtn(camera) {
        if (this.state.isRecording === false) {
            if (this.state.isStop === true) {
                return (
                    <TouchableOpacity onPress={() => this.takeRecord(camera)}>
                        <View style={{
                            width: 60,
                            height: 60,
                            borderRadius: 50,
                            backgroundColor: 'white',
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}>
                            <View style={{width: 50, height: 50, borderRadius: 50, backgroundColor: 'red'}}></View>
                        </View>
                    </TouchableOpacity>
                )
            } else {
                return (
                    <View style={{
                        width: 60,
                        height: 60,
                        borderRadius: 50,
                        backgroundColor: 'white',
                        justifyContent: 'center',
                        alignItems: 'center',
                        opacity: 0.2
                    }}>
                        <View style={{width: 50, height: 50, borderRadius: 50, backgroundColor: 'red'}}></View>
                    </View>
                )
            }
        } else {
            return (
                <TouchableOpacity onPress={() => this.stopRecord(camera)}>
                    <Image style={{width: 60, height: 60}} source={require('../../images/suspend.png')}/>
                </TouchableOpacity>
            )
        }
    }

    //开始录像
    takeRecord = async function (camera) {
        this.setState({isRecording: true})
        this.setState({timeType: true})
        const options = {quality: RNCamera.Constants.VideoQuality["1080p"], maxFileSize: (100 * 1024 * 1024)}
        const data = await camera.recordAsync(options)
        this.props.setCameraList(data)

        console.log(data)

    };

    //停止录像
    stopRecord(camera) {
        this.setState({isRecording: false});
        this.setState({isStop: false});
        this.setState({timeType: false});
        camera.stopRecording()
    }
}


const styles = StyleSheet.create({
    container: {
        width: window.width,
        height: 80,
        backgroundColor: "#000",
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    time: {
        width: window.width,
        height: 40,
        backgroundColor: "#000",
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    timeText: {
        color: "white",
        fontSize: 18,
    },
    preview: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    text: {
        width: 33,
        color: "white",
        fontSize: 16,
    },

    subView: {
        alignItems: 'center',
        width: 320
    },
    slider: {
        width: 280
    },
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
        CameraReducer: state.CameraReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    setMyCamera: (param) => {
        dispatch(action.CameraAction.setMyCamera(param))
    },
    setData: (param) => {
        dispatch(action.CameraAction.setData(param))
    },
    setCameraList: (param) => {
        dispatch(action.CameraAction.setCameraList(param))
    },
})
export default connect(mapStateToProps, mapDispatchToProps)(Camera)

