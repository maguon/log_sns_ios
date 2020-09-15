import React from 'react'
import {TouchableOpacity, Text, View, Alert} from 'react-native'
import {connect} from 'react-redux'
import * as action from "../../action/index";

class DetailRig extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        const {navigation: {state: {params: {item}}}} = this.props
        this.props.followStatus(item._user_id)
    }

    render() {
        const {navigation: {state: {params: {item,itemList}}}, cancelFollow, follow,spaceReducer: { spaceHidden},} = this.props
        return (
            <View>
            {itemList?<View></View>:<View>
                {spaceHidden.length==0 ? <TouchableOpacity style={{
                    width: 50, height: 25, marginRight: 15, borderRadius: 5,
                    justifyContent: 'center', alignItems: 'center', backgroundColor: "#ff9803"
                }} onPress={() => {
                    follow(item._user_id)
                }
                }>
                    <Text style={{color: '#fff', fontSize: 14}}>关注</Text>
                </TouchableOpacity>:<TouchableOpacity style={{
                    width: 65, height: 25, marginRight: 15, borderWidth: 1, borderColor: '#c1c1c1', borderRadius: 5,
                    justifyContent: 'center', alignItems: 'center'
                }} onPress={() => {
                    Alert.alert("", "确定要取消关注吗", [{text: "取消"}, {
                        text: "确定", onPress: () => {

                            cancelFollow(item._user_id)
                        }
                    }])
                }}>
                    <Text style={{color: '#c1c1c1', fontSize: 14}}>取消关注</Text>
                </TouchableOpacity> }

            </View>}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        spaceReducer:state.SpaceReducer
    }
}
const mapDispatchToProps = (dispatch, props) => ({
    followStatus: (value) => {
        dispatch(action.SpaceAction.followStatus(value))
    },
    cancelFollow: (value) => {
        dispatch(action.SpaceAction.cancelFollow(value))
    },
    follow: (value) => {
        dispatch(action.SpaceAction.follow(value))
    },

})


export default connect(mapStateToProps, mapDispatchToProps)(DetailRig)
