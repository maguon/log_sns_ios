import React from 'react'
import {TouchableOpacity, Text, View, Image, Dimensions} from 'react-native'
import {connect} from 'react-redux'
import * as action from "../../action/index";
import globalStyles from "../../utils/GlobalStyles";
import moment from "moment";
import AntDesign from "react-native-vector-icons/AntDesign";


const {width} = Dimensions.get('window')

class DetailTitle extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        const {navigation,navigation: {state: {params: {item, itemList}}}} = this.props
        let userInfo = ""
        let userId = ""
        if (itemList != "") {
            userInfo = itemList.msg_user_detail_info[0]
            userId= item._msg_user_id
        } else {
            userInfo = item.user_detail_info[0]
            userId= item._user_id
        }


        return (
            <TouchableOpacity style={{flex: 1, width:width,flexDirection: 'row', alignItems: 'center',justifyContent:"center"}}
                              onPress={()=>{ navigation.navigate('Space', {userId: userId})}}>
                {userInfo.avatar ? <Image source={{uri: userInfo.avatar}}
                                          style={{width: 35, height: 35, borderRadius: 30}}/> :
                    <Image source={require('../../images/head.png')}
                           style={{width: 40, height: 40, borderRadius: 30}}/>}
                <View style={{ marginLeft: 5}}>
                    <Text style={[globalStyles.largeText, {
                        color: "white",
                        fontWeight: "bold"
                    }]}>{userInfo.nick_name ? userInfo.nick_name : '暂无昵称'}</Text>
                </View>

            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch, props) => ({})


export default connect(mapStateToProps, mapDispatchToProps)(DetailTitle)
