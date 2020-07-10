import React from 'react'
import {TouchableOpacity, Text, View, Alert} from 'react-native'
import {connect} from 'react-redux'
import * as action from "../../action/index";

class DetailRig extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hidden: false
        }
    }

    componentDidMount() {
        const {navigation: {state: {params: {item}}}} = this.props
        if (item.user_relations == "") {
            this.setState({hidden: false})
        } else {
            this.setState({hidden:true })
        }
    }

    render() {
        const {navigation: {state: {params: {item}}}, cancelFollow, follow} = this.props
        return (
            <View>
                {this.state.hidden ? <TouchableOpacity style={{
                    width: 50, height: 25, marginRight: 15, borderRadius: 5,
                    justifyContent: 'center', alignItems: 'center', backgroundColor: "#ff9803"
                }} onPress={() => {
                    this.setState({hidden: false})
                    const params = {item: item}
                    follow(params)
                }
                }>
                    <Text style={{color: '#fff', fontSize: 14}}>关注</Text>
                </TouchableOpacity> : <TouchableOpacity style={{
                    width: 65, height: 25, marginRight: 15, borderWidth: 1, borderColor: '#c1c1c1', borderRadius: 5,
                    justifyContent: 'center', alignItems: 'center'
                }} onPress={() => {
                    Alert.alert("", "确定要取消关注吗", [{text: "取消"}, {
                        text: "确定", onPress: () => {
                            this.setState({hidden: true})
                            const params = {item: item}
                            cancelFollow(params)
                        }
                    }])
                }}>
                    <Text style={{color: '#c1c1c1', fontSize: 14}}>取消关注</Text>
                </TouchableOpacity>}

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch, props) => ({
    cancelFollow: (value) => {
        dispatch(action.DetailAction.cancelFollow(value))
    },
    follow: (value) => {
        dispatch(action.DetailAction.follow(value))
    },
})


export default connect(mapStateToProps, mapDispatchToProps)(DetailRig)
