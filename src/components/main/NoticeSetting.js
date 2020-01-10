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
        const {noticeSettingReducer: {sysmsg, praise, comment, attention, others, followAddmsg}, noticeSettingReducer, change} = this.props
        return (
            <View style={{ flex: 1 }}>

                <List >
                    <Item
                        extra={<Switch
                            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                            color="#333333"
                            checked={sysmsg==1}
                            onChange={(value) => change({
                                ...noticeSettingReducer,
                                sysmsg: value ? 1 : 0
                            })}
                        />} >
                        <Text style={globalStyles.largeText}>系统消息</Text></Item>

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
                            checked={comment==1}
                            onChange={(value) => change({
                                ...noticeSettingReducer,
                                comment: value ? 1 : 0
                            })}
                        />} >
                        <Text style={globalStyles.largeText}>评论</Text></Item>

                    <Item
                        extra={<Switch
                            style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}
                            color="#333333"
                            checked={attention==1}
                            onChange={(value) => change({
                                ...noticeSettingReducer,
                                attention: value ? 1 : 0
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
                            checked={followAddmsg==1}
                            onChange={(value) => change({
                                ...noticeSettingReducer,
                                followAddmsg: value ? 1 : 0
                            })}
                        />} >
                        <Text style={globalStyles.largeText}>关注人发布作品</Text></Item>
                    {/*<Item*/}
                        {/*extra={<Switch*/}
                            {/*style={{ transform: [{ scaleX: 0.6 }, { scaleY: 0.6}]}}*/}
                            {/*color="#333333"*/}
                            {/*checked={recommendedWorks==1}*/}
                            {/*onChange={(value) => change({*/}
                                {/*...noticeSettingReducer,*/}
                                {/*recommendedWorks: value ? 1 : 0*/}
                            {/*})}*/}
                        {/*/>} >*/}
                        {/*<Text style={globalStyles.largeText}>推荐作品</Text></Item>*/}

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



