import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    FlatList, Dimensions,
} from 'react-native'

import {connect} from "react-redux"
import globalStyles from '../../utils/GlobalStyles'
import VoteItem from '../modules/VoteItem'
import * as action from "../../action/index"
import {Card, WhiteSpace, WingBlank} from "@ant-design/react-native";
import * as actionType from "../../actionType";


const {width} = Dimensions.get('window')
class ToVote extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getToVoteList()

    }
    componentWillUnmount() {
        this.props.loading()
    }

    renderEmpty = () => {
        return (
            <View style={globalStyles.listEmptyContainer}>
                <Text style={[globalStyles.largeText, globalStyles.listEmptyText]}>暂无内容</Text>
            </View>
        )
    }


    ListFooterComponent = (param) => {
        if(param==0){
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator/>
                </View>
            )
        }else if (param == 1) {
            return(
                <View style={globalStyles.footerContainer}>
                    <Text style={[globalStyles.smallText, globalStyles.footerText]}>没有更多数据了</Text>
                </View>
            )

        } else if(param==2) {
            return (
                <View style={globalStyles.footerContainer}>
                    <ActivityIndicator/>
                    <Text style={[globalStyles.smallText, globalStyles.footerText]}>正在加载更多数据...</Text>
                </View>
            )
        }
    }

    renderItemTo = (props) => {
        const {item} = props
        // console.log(item)
        const voteInfo=item.vote_info[0]
        return (

                <View style={{paddingTop: 30}}>
                    <WingBlank size="lg">
                        <Card>
                            <TouchableOpacity onPress={() => {
                                this.props.navigation.navigate('ToVoteItem',{item:item})
                            }}>
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

                            <Text style={[globalStyles.midText, {margin: 15}]}>
                                {voteInfo.info ? (voteInfo.info.length > 40 ? voteInfo.info.substr(0, 40) + "..." : voteInfo.info) : ""}
                                {voteInfo.info.length > 40&&<Text style={globalStyles.previewText}>全文</Text>}
                            </Text>

                            <Text style={{backgroundColor: '#d7d7d7', width: width * 0.9, height: 0.2}}/>

                            <View style={{
                                flexDirection: 'row',
                                height: 40,
                                alignItems: 'center',
                                justifyContent: 'space-between'
                            }}>
                                <Text style={[globalStyles.midText, {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginLeft: 15
                                }]}>
                                    <Text>参与人数：</Text>
                                    <Text>{voteInfo.participants_num}</Text>
                                </Text>

                                <Text style={[globalStyles.midText, {
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    marginRight: 15,
                                    color: '#1598cc'
                                }]}
                                      >
                                   <Text style={globalStyles.midText}>已参与</Text>
                                </Text>

                            </View>
                            </TouchableOpacity>
                        </Card>
                    </WingBlank>
                    <WhiteSpace size="lg"/>
                </View>

        )
    }

    render() {
        const {ToVoteReducer: {ToVoteList, isComplete, isResultStatus}, getToVoteList} = this.props
        return (
                <View style={style.content}>
                        <FlatList
                            data={ToVoteList}
                            renderItem={this.renderItemTo}
                            // ListEmptyComponent={this.renderEmpty}
                            onEndReachedThreshold={0.2}
                            onEndReached={() => {
                                if (!isComplete) {
                                    getToVoteList()
                                }
                            }}
                            ListFooterComponent={this.ListFooterComponent(isResultStatus)}
                        />
                    </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        ToVoteReducer: state.ToVoteReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    loading: () => {
        dispatch({type: actionType.ToVoteType.loading_ToVoteList})
    },

    getToVoteList: () => {
        dispatch(action.ToVoteAction.getToVoteList())
    },


})

export default connect(mapStateToProps, mapDispatchProps)(ToVote)


const style = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },


})
