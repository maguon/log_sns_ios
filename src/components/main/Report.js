import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Dimensions, TouchableOpacity, ScrollView} from 'react-native'
import globalStyles from "../../utils/GlobalStyles";
import {TextareaItem, Button, List} from "@ant-design/react-native";
import * as actionType from "../../actionType/index";
import * as action from "../../action";

const {width, height} = Dimensions.get('window')

class Report extends Component {
    constructor(props) {
        super(props)
        this.state = {
            remark: "",
            disabled: true
        }

    }

    componentDidMount(){
        const {navigation: {state: {params: {item}}}} = this.props
        this.props.getContent({item:item})
    }
    Remark = (value) => {
        if (value != "") {
            this.setState({
                remark: value
            })
        }
    }

    render() {
        const {ReportReducer:{buttonText},navigation,navigation: {state: {params: {item}}},postContent} = this.props

        return (
            <ScrollView style={{flex: 1}}>
                <Text style={[globalStyles.largeText, {marginLeft: 10, marginTop: 15, marginBottom: 15}]}>举报

                    <Text style={globalStyles.previewText} onPress={() => {
                        this.props.navigation.navigate('Space', {userId: item._user_id})
                    }}>@{item.user_detail_info[0].nick_name}</Text>
                    发布的内容:
                </Text>
                <List>
                    <TextareaItem rows={5} placeholder="输入举报内容" onChange={this.Remark} count={100}/>
                </List>

                <View style={{alignItems: "center"}}>
                    <Button type="primary" disabled={buttonText=="提交"?false:true}
                            style={{marginTop: 100, width: width * 0.9}}
                    onPress={()=>{postContent({item:item,remark:this.state.remark,navigation:navigation})}}
                    >{buttonText}</Button>
                </View>
            </ScrollView>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ReportReducer:state.ReportReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    getContent: (value) => {
        dispatch(action.ReportAction.getContent(value))
    },
    postContent: (value) => {
        dispatch(action.ReportAction.postContent(value))
    },
})

export default connect(mapStateToProps, mapDispatchProps)(Report)

const styles = StyleSheet.create({})

