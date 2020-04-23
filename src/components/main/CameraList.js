// import React, {Component} from 'react'
// import {connect} from 'react-redux'
// import {View, Text, StyleSheet, TouchableOpacity, Image,ImageBackground, FlatList, Dimensions} from 'react-native'
// import globalStyles from "../../utils/GlobalStyles"
// import ImageView from "../modules/ImageView"
// import AntDesign from 'react-native-vector-icons/AntDesign'
// import Video from 'react-native-video'
// import * as action from "../../action/index"
//
// const {width} = Dimensions.get('window')
// let cellWH = (width-2*20) / 3
// class CameraList extends Component {
//     constructor(props) {
//         super(props)
//
//     }
//     delImage(index) {
//         const { CameraReducer: { CameraList } } = this.props
//         CameraList.splice(index, 1)
//         this.props.delImageList(CameraList)
//     }
//
//     render() {
//         const {CameraReducer:{imageList,CameraList}, navigation} = this.props
//         return (
//             <View style={{flex:1,backgroundColor:"white"}}>
//                 <View style={{height:40,backgroundColor:"#1598cc",flexDirection:"row", justifyContent: 'space-between', alignItems: 'center',}}>
//                     <TouchableOpacity onPress={() => {navigation.pop()}}>
//                         <Text style={{fontSize:14, color:"white", marginLeft:15}}>返回</Text>
//                     </TouchableOpacity>
//
//                     <TouchableOpacity onPress={() => {navigation.pop()}}>
//                         <Text style={{fontSize:14, color:"white",marginRight:15}}>上传</Text>
//                     </TouchableOpacity>
//                 </View>
//
//                 <FlatList
//                     data={CameraList}
//                     numColumns={3}
//                     renderItem={(data) => {
//                         const {item,index} = data
//
//                         return (
//                             <View style={{marginTop: 5, marginLeft:4,alignItems: 'center',justifyContent: 'center'}}>
//                                 <TouchableOpacity activeOpacity={0.5} onPress={()=>{navigation.navigate("ImageView",{index})}}>
//                                     <Video source={{uri:item.uri}} style={{width: cellWH, height: cellWH}}>
//                                         <AntDesign style={{color:"#ff1a37",position: 'absolute', right:2,top:2}} name="closecircleo" size={20}
//                                                    onPress={()=>{this.delImage(index)}}
//                                         ></AntDesign>
//                                     </Video>
//                                 </TouchableOpacity>
//                             </View>
//
//                         )
//                     }
//                     }
//                     contentContainerStyle={globalStyles.list_container}
//                 />
//             </View>
//         )
//     }
// }
//
//
// const mapStateToProps = (state) => {
//     return {
//         CameraReducer:state.CameraReducer
//     }
// }
//
//
// const mapDispatchProps = (dispatch, props) => ({
//     delImageList:(param)=>{
//         dispatch(action.CameraAction.delImageList(param))
//     }
// })
//
// export default connect(mapStateToProps, mapDispatchProps)(CameraList)

import React, {Component} from 'react'
import { StyleSheet, View,Alert} from 'react-native'
import Video from 'react-native-video'

let url = 'https://vd1.bdstatic.com/mda-hexnfica0fzu4yfs/hd/mda-hexnfica0fzu4yfs.mp4?playlist=%5B%22hd%22%5D&auth_key=1558260801-0-0-732b4a74bc5054aaf63c2d56e757685f&bcevod_channel=searchbox_feed&pd=bjh&abtest=all'

export default class CameraList extends Component {
    constructor(props) {
        super (props);
        this.state = {
            muted: false,
            duration: 0.0,
            currentTime: 0.0,
            paused: true,
            skin: 'embed',
            isBuffering: false,
        }
        this.onLoad = this.onLoad.bind(this);
        this.onProgress = this.onProgress.bind(this);
        this.onBuffer = this.onBuffer.bind(this);
    }

    onLoad(data) {
        console.log('On load fired!');
        this.setState({duration: data.duration});
    }

    onProgress(data) {
        this.setState({currentTime: data.currentTime});
    }

    onBuffer({ isBuffering }: { isBuffering: boolean }) {
        this.setState({ isBuffering });
    }


    renderNativeSkin() {
        return (
            <View style={styles.container}>
                <View style={styles.fullScreen}>
                    <Video
                        source={{uri: url}}
                        style={styles.fullScreen}
                        paused={this.state.paused}
                        muted={this.state.muted}
                        onLoad={this.onLoad}
                        onBuffer={this.onBuffer}
                        onProgress={this.onProgress}
                        onEnd={() => { Alert.alert('Done!') }}
                        repeat={true}
                        controls={true}
                    />
                </View>

            </View>
        );
    }

    render() {
        return  this.renderNativeSkin()
    }
}





const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
    },
    fullScreen: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    }
});
