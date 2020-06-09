import React from 'react'
import {connect} from 'react-redux'
import {Text, View, TouchableOpacity, Dimensions,ScrollView} from 'react-native'
import {Button, List, Provider, Radio, Checkbox} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'
import * as action from "../../action";


const Item = List.Item;
const Brief = Item.Brief;
const RadioItem = Radio.RadioItem;
const CheckboxItem = Checkbox.CheckboxItem;
const {width} = Dimensions.get('window')

class Vote extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            voteItem: []
        }
        this.addChecked = this.addChecked.bind(this)
        this.removeChecked = this.removeChecked.bind(this)
    }



    addChecked(props) {
        this.setState({
            voteItem:[...this.state.voteItem,props]
        })
    }

    removeChecked(props) {
        const {index}=props
        this.setState({
            voteItem: this.state.voteItem.filter(item => item.index != index)
        })
    }
   //多选
    renderCheckbox = (props) => {
        const {option,max_num, participants_num} = props
        return option.map((item, index) => {
            const barWidth = width * 0.65 * item.num / participants_num ? width * 0.65 * item.num / participants_num : 10
            return (
                <CheckboxItem
                    key={index}
                    checked={this.state.voteItem.some(item => item.index== index)}
                    disabled={this.state.voteItem.length >= max_num&& !this.state.voteItem.some(item => item.index== index)}
                    style={{height: 60}}
                    onChange={(event) => {
                        if (event.target.checked) {
                            this.addChecked({
                                txt: item.txt,
                                index: index})

                        } else {
                            this.removeChecked({
                                txt: item.txt,
                                index: index})

                        }
                    }}>
                    <TouchableOpacity>
                        {this.state.voteItem.some(item => item.index == index)&&<View style={{
                            width: 35, height: 35, borderRadius: 30, borderWidth: 2, borderColor: "#2aad00",
                            justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0
                        }}>
                            <Text style={{color: '#2aad00'}}>支持</Text>
                        </View>}

                        <Brief>{item.txt}</Brief>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                            <View style={{width: barWidth, height: 15, backgroundColor: "#ff9700"}}></View>
                            <Text style={[globalStyles.midText, {marginLeft: 5}]}>{item.num}人支持</Text>
                        </View>
                    </TouchableOpacity>

                </CheckboxItem>
            );
        })
    }

    //单选
    renderRadio = (props) => {
        const {option, participants_num} = props
        return option.map((item, index) => {

            const barWidth = width * 0.65 * item.num / participants_num ? width * 0.65 * item.num / participants_num : 10
            return (
                <RadioItem
                    key={index}
                    style={{height: 60}}>
                    <TouchableOpacity onPress={() => {
                        this.setState({voteItem:{txt:item.txt,index: index}})
                    }}>
                        {this.state.voteItem.index === index && <View style={{
                            width: 35, height: 35, borderRadius: 30, borderWidth: 2, borderColor: "#2aad00",
                            justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0
                        }}>
                            <Text style={{color: '#2aad00'}}>支持</Text>
                        </View>}
                        <Brief>{item.txt}</Brief>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                            <View style={{width: barWidth, height: 15, backgroundColor: "#ff9700"}}></View>
                            <Text style={[globalStyles.midText, {marginLeft: 5}]}>{item.num}人支持</Text>
                        </View>
                    </TouchableOpacity>
                </RadioItem>
            )
        })
    }
   //已参与
    renderItem = (props) => {
        const {option,user_votes,participants_num} = props
        return option.map((item, index) => {
            const barWidth = width * 0.65 * item.num / participants_num ? width * 0.65 * item.num / participants_num : 10
            return (
                <Item  key={index} style={{height: 60}}>
                    <View >
                        {user_votes[0].option_item.some(item=>item.index==index) && <View style={{
                            width: 35, height: 35, borderRadius: 30, borderWidth: 2, borderColor: "#2aad00",
                            justifyContent: 'center', alignItems: 'center', position: 'absolute', right: 0
                        }}>
                            <Text style={{color: '#2aad00'}}>支持</Text>
                        </View>}
                        <Brief>{item.txt}</Brief>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                            <View style={{width: barWidth, height: 15, backgroundColor: "#ff9700"}}></View>
                            <Text style={[globalStyles.midText, {marginLeft: 5}]}>{item.num}人支持</Text>
                        </View>
                    </View>
                </Item>
            )
        })
    }
     //已结束
    renderEnd = (props) => {
        const {option,participants_num} = props
        return option.map((item, index) => {
            const barWidth = width * 0.65 * item.num / participants_num ? width * 0.65 * item.num / participants_num : 10
            return (
                <Item  key={index} style={{height: 60}}>
                    <View >
                        <Brief>{item.txt}</Brief>
                        <View style={{flexDirection: 'row', alignItems: 'center', marginTop: 5}}>
                            <View style={{width: barWidth, height: 15, backgroundColor: "#ff9700"}}></View>
                            <Text style={[globalStyles.midText, {marginLeft: 5}]}>{item.num}人支持</Text>
                        </View>
                    </View>
                </Item>
            )
        })
    }



    render() {
        const {navigation: {state: {params: {item}}}, setSupport} = this.props
        return (
            <Provider>
                <View style={{flex: 1}}>
                    <View style={{
                        flexDirection: 'row',
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={globalStyles.xlText}>{item.title ? item.title : ""}</Text>
                        <View style={{position: 'absolute', right: 10, bottom: 15}}>
                            <Text style={{
                                color: '#414445',
                                fontSize: 12
                            }}>{item.status == 0 ? "未开启" : (item.status == 1 ? "进行中" : "已结束")}</Text>
                        </View>
                    </View>

                    <Text style={[globalStyles.midText, {margin: 15}]}>{item.info}</Text>

                    <Text style={{backgroundColor: '#d7d7d7', width: width, height: 0.2}}/>


                    <List renderHeader={
                        <View style={{
                            flexDirection: 'row',
                            height: 30,
                            alignItems: 'center',
                            justifyContent: 'space-between'
                        }}>
                            <Text style={[globalStyles.midText, {
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginLeft: 15,
                                color: '#1598cc'
                            }]}>
                                <Text>最多可选择{item.max_num}票</Text>
                            </Text>
                            <Text style={[globalStyles.midText, {
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: 15,
                            }]}>
                                <Text>参与人数：</Text>
                                <Text>{item.participants_num}</Text>
                            </Text>
                        </View>
                    }>
                    </List>

                    <ScrollView>
                    {item.status != 1 ?this.renderEnd(item):(item.user_votes==""?
                        <View>{item.max_num > 1 ? this.renderCheckbox(item) : this.renderRadio(item)}
                    <View style={{alignItems: 'center'}}>
                        <Button type="primary" style={{marginTop: 50, marginBottom: 50,width: width * 0.8}} onPress={() => {
                            setSupport({ itemId: item._id,
                                voteItem: this.state.voteItem,
                                navigation:this.props.navigation})
                        }}>投票</Button>
                    </View>
                </View>:this.renderItem(item))}
                    </ScrollView>
                </View>
            </Provider>
        )
    }
}


const mapStateToProps = (state) => {
    return {}
}

const mapDispatchProps = (dispatch, props) => ({
    setSupport: (value) => {
        dispatch(action.VoteAction.setSupport(value))
    },

})

export default connect(mapStateToProps, mapDispatchProps)(Vote)


