import React from 'react'
import {View, Text} from 'react-native'
import {connect} from "react-redux"
import globalStyles from "../../utils/GlobalStyles";
import {List, WhiteSpace,Checkbox,Switch} from "@ant-design/react-native";
import * as action from "../../action";


const Item = List.Item
class NoticeSetting extends React.Component{
    constructor(props){
        super(props)
    }

    componentDidMount() {
        this.props.getNoticeList()
    }

    render(){
        const {noticeSettingReducer: { info, praise, comments, beConcernedAbout, others, worksReleasedByFollowers, recommendedWorks}, noticeSettingReducer, change} = this.props
        return (
            <View style={{ flex: 1 }}>

                <List >
                    <Item
                        extra={<Switch
                            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                            color="#333333"
                            checked={info==1}
                            onChange={(value) => change({
                                ...noticeSettingReducer,
                                info: value ? 1 : 0
                            })}
                        />} >
                        <Text style={globalStyles.largeText}>消息</Text></Item>

                    <Item
                        extra={<Switch
                            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                            color="#333333"
                            checked={praise==1}
                            onChange={(value) => change({
                                ...noticeSettingReducer,
                                praise: value ? 1 : 0
                            })}
                        />}

                    >
                        <Text style={globalStyles.largeText}>赞</Text></Item>
                    <Item
                        extra={<Switch
                            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                            color="#333333"
                            checked={comments==1}
                            onChange={(value) => change({
                                ...noticeSettingReducer,
                                comments: value ? 1 : 0
                            })}
                        />} >
                        <Text style={globalStyles.largeText}>评论</Text></Item>

                    <Item
                        extra={<Switch
                            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                            color="#333333"
                            checked={beConcernedAbout==1}
                            onChange={(value) => change({
                                ...noticeSettingReducer,
                                beConcernedAbout: value ? 1 : 0
                            })}
                        />} >
                        <Text style={globalStyles.largeText}>被关注</Text></Item>

                    <Item
                        extra={<Switch
                            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                            color="#333333"
                            checked={others==1}
                            onChange={(value) => change({
                                ...noticeSettingReducer,
                                others: value ? 1 : 0
                            })}
                        />} >
                        <Text style={globalStyles.largeText}>@</Text></Item>
                    <Item
                        extra={<Switch
                            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                            color="#333333"
                            checked={worksReleasedByFollowers==1}
                            onChange={(value) => change({
                                ...noticeSettingReducer,
                                worksReleasedByFollowers: value ? 1 : 0
                            })}
                        />} >
                        <Text style={globalStyles.largeText}>关注人发布作品</Text></Item>
                    <Item
                        extra={<Switch
                            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                            color="#333333"
                            checked={recommendedWorks==1}
                            onChange={(value) => change({
                                ...noticeSettingReducer,
                                recommendedWorks: value ? 1 : 0
                            })}
                        />} >
                        <Text style={globalStyles.largeText}>推荐作品</Text></Item>

                </List>
            </View>
        )
    }

}
const mapStateToProps = (state) => {
    return {
        noticeSettingReducer: state.NoticeSettingReducer
    }
}

const mapDispatchProps = (dispatch, ownProps) => ({
    getNoticeList: () => {
        dispatch(action.NoticeSettingAction.getNoticeList())
    },
    change: (value) => {
        dispatch(action.NoticeSettingAction.change(value))
    }
})

export default connect(mapStateToProps, mapDispatchProps)(NoticeSetting)



