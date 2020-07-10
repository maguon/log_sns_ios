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
        const {navigation: {state: {params: {item}}}} = this.props
        const userInfo = item.user_detail_info[0]
        // console.log(item)

        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', marginLeft: width*0.05}}>

                    {userInfo.avatar ? <Image source={{uri: userInfo.avatar}}
                                                  style={{width: 35, height: 35, borderRadius: 30}}/> :
                <Image source={require('../../images/head.png')}
                       style={{width: 40, height: 40, borderRadius: 30}}/>}
                <View style={{width: width * 0.5, marginLeft: 5}}>
                    <Text style={[globalStyles.largeText, {
                        color: "white",
                        fontWeight: "bold"
                    }]}>{userInfo.nick_name ? userInfo.nick_name : '暂无昵称'}</Text>

                </View>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch, props) => ({})


export default connect(mapStateToProps, mapDispatchToProps)(DetailTitle)
