import React from 'react'
import {connect} from 'react-redux'
import {Text, View, Dimensions,ScrollView} from 'react-native'
import {List, Provider,} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'



const Item = List.Item;
const Brief = Item.Brief;

const {width} = Dimensions.get('window')

class ToVoteItem extends React.Component {
    constructor(props) {
        super(props)
    }

    //已参与
    renderItem = (props) => {
        const voteInfo=props.vote_info[0]
        const {option_item} = props
        console.log(option_item)
        return voteInfo.option.map((item, index) => {
            const barWidth = width * 0.65 * item.num / voteInfo.participants_num ? width * 0.65 * item.num / voteInfo.participants_num : 10
            return (
                <Item  key={index} style={{height: 60}}>
                    <View >
                        {option_item.some(item=>item.index==index) && <View style={{
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
        const {navigation: {state: {params: {item}}}} = this.props
        // console.log(item)
        const voteInfo=item.vote_info[0]
        return (
            <Provider>
                <View style={{flex: 1}}>
                    <View style={{
                        flexDirection: 'row',
                        height: 40,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={globalStyles.xlText}>{voteInfo.title ? voteInfo.title : ""}</Text>
                        <View style={{position: 'absolute', right: 10, bottom: 15}}>
                            <Text style={{
                                color: '#414445',
                                fontSize: 12
                            }}>{voteInfo.status == 0 ? "未开启" : (voteInfo.status == 1 ? "进行中" : "已结束")}</Text>
                        </View>
                    </View>

                    <Text style={[globalStyles.midText, {margin: 15}]}>{voteInfo.info}</Text>

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
                                <Text>最多可选择{voteInfo.max_num}票</Text>
                            </Text>
                            <Text style={[globalStyles.midText, {
                                flexDirection: 'row',
                                alignItems: 'center',
                                marginRight: 15,
                            }]}>
                                <Text>参与人数：</Text>
                                <Text>{voteInfo.participants_num}</Text>
                            </Text>
                        </View>
                    }>
                    </List>

                    <ScrollView>
                        {item.status == 3 ?this.renderEnd(voteInfo):this.renderItem(item)}
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

})

export default connect(mapStateToProps, mapDispatchProps)(ToVoteItem)


