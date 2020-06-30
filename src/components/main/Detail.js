import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    FlatList,
    ScrollView,
    Image,
    ImageBackground,
    Dimensions
} from 'react-native'
import globalStyles from "../../utils/GlobalStyles";
import {fileHost, videoHost} from "../../config/HostConfig";
import Video from "react-native-video";
import {Card, Provider} from "@ant-design/react-native/lib/card";
import AntDesign from "react-native-vector-icons/AntDesign";


const {width, height} = Dimensions.get('window')
let cellWH = (width - 2 * 20 - 15) / 3.3

class Detail extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const {navigation: {state: {params: {item}}}} = this.props
        console.log(item)
        const media = item.media
        return (

            <ScrollView>
                <View style={{flex: 1}}>

                    <Text style={[globalStyles.midText, {
                        marginLeft: 15,
                        marginRight: 15
                    }]}>{item.info ? item.info : ""}</Text>

                    {item.carrier == 2 && <FlatList
                        data={media}
                        numColumns={3}
                        renderItem={(params) => {
                            const {item, index} = params
                            return (
                                <TouchableOpacity activeOpacity={0.5} onPress={() => {
                                    this.props.navigation.navigate("ImageView", {
                                        media: media,
                                        index: index
                                    })
                                }}>

                                    <View style={globalStyles.item}>
                                        <Image source={{
                                            uri: `${fileHost}/image/${item.url}`,
                                            cache: 'force-cache'
                                        }}
                                               style={{width: cellWH, height: cellWH, borderRadius: 5}}/>
                                    </View>
                                </TouchableOpacity>
                            )
                        }
                        }
                        contentContainerStyle={globalStyles.list_container}
                    />}

                    {item.carrier == 3 &&

                    <Video source={{uri: `${videoHost}${media[0].url}`}}
                           paused={true}
                           repeat={true}
                           controls={true}
                           resizeMode="cover"
                           style={globalStyles.image}/>
                    }
                    {item.carrier == 4 && <ImageBackground source={require('../../images/u422.png')}
                                                           style={globalStyles.image}></ImageBackground>}


                    {/*<View style={{*/}
                    {/*flexDirection: 'row',*/}
                    {/*justifyContent: 'space-between',*/}
                    {/*alignItems: 'center'*/}
                    {/*}}>*/}
                    {/*<TouchableOpacity*/}
                    {/*style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}*/}
                    {/*// onPress={() => {*/}
                    {/*//     this.setState({*/}
                    {/*//         shareVisible: true,*/}
                    {/*//         itemInfo: item*/}
                    {/*//     })*/}
                    {/*// }}*/}
                    {/*>*/}
                    {/*<AntDesign name="export" size={18}*/}
                    {/*style={{color: '#838485'}}/>*/}
                    {/*<Text*/}
                    {/*style={[globalStyles.midText, {marginLeft: 5}]}>{item.collect_num ? item.collect_num : 0}</Text>*/}
                    {/*</TouchableOpacity>*/}


                    {/*<TouchableOpacity*/}
                    {/*style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}*/}
                    {/*// onPress={() => {*/}
                    {/*//     this.props.navigation.navigate('Comment', {item: item})*/}
                    {/*// }}*/}
                    {/*>*/}
                    {/*<AntDesign name="message1" style={{color: '#838485'}} size={18}/>*/}
                    {/*<Text*/}
                    {/*style={[globalStyles.midText, {marginLeft: 5}]}>{item.comment_num ? item.comment_num : 0}</Text>*/}
                    {/*</TouchableOpacity>*/}

                    {/*<TouchableOpacity*/}
                    {/*style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}*/}
                    {/*// onPress={() => {*/}
                    {/*//     const params = {*/}
                    {/*//         item: item, tabIndex: tabIndex, index: index*/}
                    {/*//     }*/}
                    {/*//     setPraise(params)*/}
                    {/*// }}*/}
                    {/*>*/}
                    {/*{item.user_praises == "" ?*/}
                    {/*<AntDesign name="like2" size={18} style={{color: '#838485'}}/> :*/}
                    {/*<AntDesign name="like1" size={18} style={{color: '#ffa600'}}/>}*/}
                    {/*<Text*/}
                    {/*style={[globalStyles.midText, {marginLeft: 5}]}>{item.agree_num ? item.agree_num : 0}</Text>*/}
                    {/*</TouchableOpacity>*/}
                    {/*</View>*/}
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchProps)(Detail)

const styles = StyleSheet.create({})

