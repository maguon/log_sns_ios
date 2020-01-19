import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, ScrollView, ActivityIndicator, FlatList} from 'react-native'
// import Address from '../modules/Address'
// import CollectionAddress from '../modules/CollectionAddress'
// import VoteItem from '../modules/VoteItem'
// import ImageList from '../modules/ImageList'
// import Video from '../modules/Video'
// import ArticleItem from '../modules/ArticleItem'
import Item from '../modules/Item'
import * as action from "../../action"
import {Provider} from "@ant-design/react-native"
import globalStyles from "../../utils/GlobalStyles"

class Home extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getHotList()
        this.props.getHomeFollow()
        this.props.getNearList()
    }

    renderEmpty = () => {
        return (
            <View style={globalStyles.listEmptyContainer}>
                <Text style={[globalStyles.largeText, globalStyles.listEmptyText]}>暂无内容</Text>
            </View>
        )
    }

    ListFooterComponent = () => {
        return (
            <View style={globalStyles.footerContainer}>
                <ActivityIndicator color={globalStyles.styleColor} styleAttr='Small'/>
                <Text style={[globalStyles.smallText, globalStyles.footerText]}>正在加载...</Text>
            </View>
        )
    }

    renderItem = (props) => {
        const {item} = props

        return (
            <View style={{flex: 1}}>
                <Item item={item} name='Home' navigation={this.props.navigation}/>
            </View>
        )
    }


    render() {
        const {navigation: {state: {params = {index: 0}}}, homeReducer: {hotList, homeFollow, nearList, isResultStatus}} = this.props
        const {index} = params

        return (
            <Provider>
                <View style={{flex: 1}}>
                    {index == 0 &&
                    <ScrollView>
                        <FlatList
                            keyExtractor={(item, index) => `${index}`}
                            data={hotList}
                            renderItem={this.renderItem}
                            ListEmptyComponent={this.renderEmpty}
                            onEndReachedThreshold={0.2}
                            onEndReached={() => {
                                // if (isResultStatus == 0) {
                                //     props.getFansListMore()
                                // }
                            }}
                            ListFooterComponent={isResultStatus == 0 ? this.ListFooterComponent :
                                <View style={{height: 10}}/>}
                        />
                    </ScrollView>

                    }
                    {index == 1 &&
                    <ScrollView>
                        <FlatList
                            keyExtractor={(item, index) => `${index}`}
                            data={homeFollow}
                            renderItem={this.renderItem}
                            ListEmptyComponent={this.renderEmpty}
                            onEndReachedThreshold={0.2}
                            onEndReached={() => {
                                // if (isResultStatus == 0) {
                                //     props.getFansListMore()
                                // }
                            }}
                            ListFooterComponent={isResultStatus == 0 ? this.ListFooterComponent :
                                <View style={{height: 10}}/>}
                        />
                    </ScrollView>}
                    {index == 2 &&
                    <ScrollView>
                        <FlatList
                            keyExtractor={(item, index) => `${index}`}
                            data={nearList}
                            renderItem={this.renderItem}
                            ListEmptyComponent={this.renderEmpty}
                            onEndReachedThreshold={0.2}
                            onEndReached={() => {
                                // if (isResultStatus == 0) {
                                //     props.getFansListMore()
                                // }
                            }}
                            ListFooterComponent={isResultStatus == 0 ? this.ListFooterComponent :
                                <View style={{height: 10}}/>}
                        />
                    </ScrollView>}
                </View>
            </Provider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        homeReducer: state.HomeReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    getHotList: () => {
        dispatch(action.HomeAction.getHotList())
    },
    getHomeFollow: () => {
        dispatch(action.HomeAction.getHomeFollow())
    },
    getNearList: () => {
        dispatch(action.HomeAction.getNearList())
    },
})

export default connect(mapStateToProps, mapDispatchProps)(Home)

const style = StyleSheet.create({
})
