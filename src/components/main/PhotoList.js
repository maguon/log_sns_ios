import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, TouchableOpacity, Image,ImageBackground, FlatList, Dimensions} from 'react-native'
import globalStyles from "../../utils/GlobalStyles"
import ImageView from "../modules/ImageView"
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as action from "../../action/index";

const {width} = Dimensions.get('window')
let cellWH = (width-2*20) / 3
class PhotoList extends Component {
    constructor(props) {
        super(props)

    }
    delImage(index) {
        const { CameraReducer: { imageList } } = this.props
        imageList.splice(index, 1)
        this.props.delImageList(imageList)
    }

    render() {
        const {CameraReducer:{imageList}, navigation} = this.props
        return (
            <View style={{flex:1,backgroundColor:"white"}}>
                <View style={{height:40,backgroundColor:"#1598cc",flexDirection:"row", justifyContent: 'space-between', alignItems: 'center',}}>
                <TouchableOpacity onPress={() => {navigation.pop()}}>
                    <Text style={{fontSize:14, color:"white", marginLeft:15}}>返回</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {navigation.pop()}}>
                    <Text style={{fontSize:14, color:"white",marginRight:15}}>上传</Text>
                </TouchableOpacity>
                </View>

                <FlatList
                    data={imageList}
                    numColumns={3}
                    renderItem={(data) => {
                        const {item,index} = data

                        return (
                                <View style={{marginTop: 5, marginLeft:4,alignItems: 'center',justifyContent: 'center'}}>
                                    <TouchableOpacity activeOpacity={0.5} onPress={()=>{navigation.navigate("ImageView",{index})}}>
                                    <ImageBackground source={{uri:item.uri}} style={{width: cellWH, height: cellWH}}>
                                     <AntDesign style={{color:"#ff1a37",position: 'absolute', right:2,top:2}} name="closecircleo" size={20}
                                                onPress={()=>{this.delImage(index)}}
                                     ></AntDesign>
                                    </ImageBackground>
                                    </TouchableOpacity>
                                </View>

                        )
                    }
                    }
                    contentContainerStyle={globalStyles.list_container}
                />
            </View>
        )
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

export default connect(mapStateToProps, mapDispatchProps)(PhotoList)


