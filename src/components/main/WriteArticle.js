import React, { Component } from 'react'
import { View, Text, ScrollView, TextInput } from 'react-native'
import { List, TextareaItem, Icon, Switch } from '@ant-design/react-native'
import Geolocation from '@react-native-community/geolocation'
import { connect } from 'react-redux'
import * as action from '../../action/index'
import * as actionType from "../../actionType";

const Item = List.Item
const Brief = Item.Brief

class WriteArticle extends Component {
    constructor(props) {
        super(props)

    }
    onSwitchChange = value => {
        this.props.onChange(value)
        if (value) {
            Geolocation.getCurrentPosition(({coords}) => {
                this.props.getCurrentAddr({
                    longitude: coords.longitude,
                    latitude: coords.latitude
                })
            })

        } else {
            this.props.removeCurrentAddr()
        }
    }
    render() {
        const { writeArticleReducer: { data: { currentAddrName },posSwitch},setContent} = this.props
        return (
            <ScrollView style={{ flex: 1 }}
                automaticallyAdjustContentInsets={false}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
            >
                <List>
                    <TextareaItem rows={8} placeholder="输入文章内容" onChange={setContent} />

                    <Item >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                            <View style={{flexDirection: 'row'}}>
                            <Icon name="environment" color='orange' style={{ marginRight: 5, marginTop:-3}} />
                            <Text style={{ fontSize: 17 }}>显示定位</Text>
                            </View>
                                    <Switch
                                        style={{transform: [{scaleX: 0.7}, {scaleY: 0.7}]}}
                                        color="#333333"
                                        checked={posSwitch}
                                        onChange={this.onSwitchChange}/>
                        </View>
                        {posSwitch&&<Brief>{currentAddrName ? `${currentAddrName}` : ''}</Brief>}
                    </Item>
                </List>
            </ScrollView>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        writeArticleReducer: state.WriteArticleReducer,
    }
}

const mapDispatchToProps = (dispatch) => ({
    onChange:(value)=>{
        dispatch(actionType.WriteArticleType.on_Switch_Change (value) )
    },
   setContent:(value)=>{
    dispatch(actionType.WriteArticleType.create_content (value) )
   },
    createArticle:(value)=>{
            dispatch(action.WriteArticleAction.createArticle(value ))
        },
    getCurrentAddr:(value)=> {
        dispatch(action.WriteArticleAction.getCurrentAddr(value))
    },
    removeCurrentAddr: () => {
        dispatch(action.WriteArticleAction.removeCurrentAddr())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(WriteArticle)

