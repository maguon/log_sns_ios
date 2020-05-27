import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import {Button, Modal, Provider} from "@ant-design/react-native"
import Swiper from 'react-native-swiper'
import { connect } from 'react-redux'
import globalStyles from "../../utils/GlobalStyles"
import ConfirmModal from '../modules/ConfirmModal'
import AntDesign from "react-native-vector-icons/AntDesign";
import * as action from "../../action";
import {fileHost} from "../../config/HostConfig";


const { width, height } = Dimensions.get('window')


class ImageView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            confirmModalVisible: false,
        }
    }




    renderPhoteView(media) {
        console.log(media)
        return media.map((item, i) => {
            return <View key={i} style={{flex:1}}>
                <Image source={{uri:  `${fileHost}/image/${item.url}`,cache: 'force-cache'}} style={{flex:1}}/>
            </View>
        })
    }

    onPressOk(index) {
        const { CameraReducer: { imageList } } = this.props
        this.setState({ confirmModalVisible: false })
        imageList.splice(index, 1)
        this.props.delImageList(imageList)

    }

    onPressCancel() {
        this.setState({ confirmModalVisible: false })
    }

    delImage() {

        this.setState({ confirmModalVisible: true })

    }

    render() {
        const { CameraReducer:{imageList}, navigation:{state:{params:{media,index}}}, navigation} = this.props
        console.log(navigation)
        return (
            <Provider style={{ flex: 1 }}>
                <Swiper
                    ref='Swiper'
                    index={index}
                    style={styles.wrapper}
                    loop={false}
                    automaticallyAdjustContentInsets={true}
                >
                    {this.renderPhoteView(media)}
                </Swiper>


                {/*<View style={{height:40, width:width,position: 'absolute', top: 0, flexDirection: "row", justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#1598cc'}}>*/}
                    {/*<TouchableOpacity   style={{ position: 'absolute', left: 0, }}*/}
                                        {/*onPress={()=>navigation.pop()}>*/}
                        {/*<Text style={[globalStyles.largeText, {color:"white", marginLeft:15  }]}>返回</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*<TouchableOpacity  style={{ position: 'absolute', right: 0, }}*/}
                                       {/*onPress={()=>this.delImage()}*/}
                    {/*>*/}
                        {/*<Text style={[globalStyles.largeText, {  color:"white", marginRight:15 }]}>删除</Text>*/}
                    {/*</TouchableOpacity>*/}
                {/*</View>*/}
                <ConfirmModal
                    title='确认删除图片？'
                    isVisible={this.state.confirmModalVisible}
                    onPressOk={()=>this.onPressOk(index)}
                    onPressCancel={()=>this.onPressCancel()} />

            </Provider>
        )
    }
}

const styles = {
    wrapper: {
        backgroundColor: 'white',
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },

    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
}

const mapStateToProps = (state) => {
    return {
        CameraReducer:state.CameraReducer
    }
}
const mapDispatchProps = (dispatch, props) => ({
    delImageList:(param)=>{
        dispatch(action.CameraAction.delImageList(param))
    }

})
export default connect(mapStateToProps, mapDispatchProps)(ImageView)
