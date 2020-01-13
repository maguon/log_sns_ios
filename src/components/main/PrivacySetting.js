import React from 'react'
import {View, Text} from 'react-native'
import {connect} from "react-redux"
import {List, WhiteSpace, Switch} from "@ant-design/react-native"
import globalStyles from "../../utils/GlobalStyles"
import * as actionType from "../../actionType/index";
import * as action from "../../action/index"


const Item = List.Item

class PrivacySetting extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getList()
    }

    render() {
        const {privacySettingReducer: {name, phone, city, car, recommendToFriends, msgAuthority}, privacySettingReducer, change} = this.props
        console.log('privacySettingReducer', privacySettingReducer)
        return (
            <View style={{flex: 1}}>
                <List>
                    <Item
                        extra={<Switch
                            style={{transform: [{scaleX: 0.6}, {scaleY: 0.6}]}}
                            color="#333333"
                            checked={name == 1}
                            onChange={(value) => {
                                change({
                                    ...privacySettingReducer,
                                    name: value ? 1 : 0
                                })
                            }}
                        />}>
                        <Text style={globalStyles.largeText}>显示姓氏</Text></Item>

                    <Item
                        extra={<Switch
                            style={{transform: [{scaleX: 0.6}, {scaleY: 0.6}]}}
                            color="#333333"
                            checked={phone == 1}
                            onChange={(value) => change({
                                ...privacySettingReducer,
                                phone: value ? 1 : 0
                            })}
                        />}

                    >
                        <Text style={globalStyles.largeText}>显示电话</Text></Item>
                    <Item
                        extra={<Switch
                            style={{transform: [{scaleX: 0.6}, {scaleY: 0.6}]}}
                            color="#333333"
                            checked={city == 1}
                            onChange={(value) => change({
                                ...privacySettingReducer,
                                city: value ? 1 : 0
                            })}
                        />}>
                        <Text style={globalStyles.largeText}>显示城市</Text></Item>

                    <Item
                        extra={<Switch
                            style={{transform: [{scaleX: 0.6}, {scaleY: 0.6}]}}
                            color="#333333"
                            checked={car == 1}
                            onChange={(value) => change({
                                ...privacySettingReducer,
                                car: value ? 1 : 0
                            })}
                        />}>
                        <Text style={globalStyles.largeText}>显示车辆资料</Text></Item>

                    <WhiteSpace size='md' style={globalStyles.containerBackgroundColor}/>
                    <Item
                        extra={<Switch
                            style={{transform: [{scaleX: 0.6}, {scaleY: 0.6}]}}
                            color="#333333"
                            checked={recommendToFriends == 1}
                            onChange={(value) => change({
                                ...privacySettingReducer,
                                recommendToFriends: value ? 1 : 0
                            })}
                        />}>
                        <Text style={globalStyles.largeText}>允许将我推荐给好友</Text></Item>
                    <Item arrow="horizontal"
                          extra={

                              <Text style={globalStyles.largeText}>所有人</Text>
                          }>
                        <Text style={globalStyles.largeText}>谁可以发消息给我</Text></Item>
                </List>
            </View>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        privacySettingReducer: state.PrivacySettingReducer
    }
}

const mapDispatchProps = (dispatch, ownProps) => ({
    getList: () => {
        dispatch(action.PrivacySettingAction.getList())
    },
    change: (value) => {
        dispatch(action.PrivacySettingAction.change(value))
    }
})

export default connect(mapStateToProps, mapDispatchProps)(PrivacySetting)



