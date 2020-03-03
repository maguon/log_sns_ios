import React from 'react'
import {
    View,
    Text,
    StyleSheet,
    ScrollView,
    ActivityIndicator,
    FlatList,
    Image,
    TouchableOpacity,
    ImageBackground,
    Dimensions
} from 'react-native'
import {Provider, Tabs, WhiteSpace, WingBlank, Card, Modal, Button} from '@ant-design/react-native'
import AntDesign from "react-native-vector-icons/AntDesign"
import moment from "moment"
import {connect} from "react-redux"
import globalStyles from '../../utils/GlobalStyles'
import VoteItem from '../modules/VoteItem'
import Item from '../modules/Item'
import * as action from "../../action/index"

class ToVote extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getComVoteList()

    }

    renderEmpty = () => {
        return (
            <View style={globalStyles.listEmptyContainer}>
                <Text style={[globalStyles.largeText, globalStyles.listEmptyText]}>暂无内容</Text>
            </View>
        )
    }


    ListFooterComponent = (param) => {
        if(param==1) {
            return (
                <View style={globalStyles.footerContainer}>
                    <Text style={[globalStyles.smallText, globalStyles.footerText]}>没有更多数据了</Text>
                </View>
            )
        }else if(param==2) {
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
        return (
            <View style={{flex: 1}}>
                <VoteItem item={item} navigation={this.props.navigation}/>
            </View>
        )
    }

    render() {
        const {communityReducer: {comVoteList, voteComplete, voteResultStatus}, getComVoteList} = this.props
        return (
                <View style={style.content}>
                        <FlatList
                            data={comVoteList}
                            renderItem={this.renderItemTo}
                            ListEmptyComponent={this.renderEmpty}
                            onEndReachedThreshold={0.2}
                            onEndReached={() => {
                                if (!voteComplete) {
                                    getComVoteList()
                                }
                            }}
                            ListFooterComponent={this.ListFooterComponent(voteResultStatus)}
                        />
                    </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        communityReducer: state.CommunityReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    getComVoteList: () => {
        dispatch(action.CommunityAction.getComVoteList())
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
