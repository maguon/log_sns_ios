import React from 'react'
import {View, Text, StyleSheet, ScrollView, ActivityIndicator, FlatList} from 'react-native'
import {Provider, Tabs} from '@ant-design/react-native'
import {connect} from "react-redux"
import globalStyles from '../../utils/GlobalStyles'
import VoteItem from '../modules/VoteItem'
import Item from '../modules/Item'
import * as action from "../../action/index"


class Community extends React.Component {
    constructor(props) {
        super(props)
    }


    componentDidMount() {
        this.props.getArtInfo()
        this.props.getArtArticle()
        this.props.getArtVideo()
        this.props.getArtHelp()
        this.props.getVoteList()

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
                {/*{item.carrier==1&& <ArticleItem item={item} name='Art' navigation={this.props.navigation}/>}*/}
                {/*{item.carrier==2&& <ImageList item={item} name='Art'  navigation={this.props.navigation}/>}*/}
                {/*{item.carrier==3&& <Video item={item} name='Art'  navigation={this.props.navigation}/>}*/}
                {/*{item.carrier==4&& <Address item={item} name='Art'  navigation={this.props.navigation}/>}*/}
                <Item item={item} name='Community' navigation={this.props.navigation}/>
            </View>
        )
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
        const tabs = [{title: '最近发布'}, {title: '视频'}, {title: '求助'}, {title: '投票'}]
        const {articleReducer: {artInfo, artVideo, artHelp, voteList, isResultStatus}} = this.props
        console.log(voteList)
        return (
            <Provider>
                <Tabs tabs={tabs}
                      tabBarBackgroundColor='#fff'
                      tabBarActiveTextColor='#1598cc'
                      tabBarInactiveTextColor='#414445'
                      tabBarUnderlineStyle={{backgroundColor: '#1598cc'}}
                      tabBarTextStyle={{fontSize: 14}}
                >
                    <ScrollView>
                        <View style={style.content}>
                            <FlatList
                                keyExtractor={(item, index) => `${index}`}
                                data={artInfo}
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
                        </View>
                    </ScrollView>
                    <ScrollView>
                        <View>
                            <FlatList
                                keyExtractor={(item, index) => `${index}`}
                                data={artVideo}
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
                        </View>
                    </ScrollView>
                    <ScrollView>
                        <View>
                            <FlatList
                                keyExtractor={(item, index) => `${index}`}
                                data={artHelp}
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
                        </View>
                    </ScrollView>


                    <ScrollView>
                        <View style={style.content}>
                            <FlatList
                                keyExtractor={(item, index) => `${index}`}
                                data={voteList}
                                renderItem={this.renderItemTo}
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
                        </View>
                    </ScrollView>
                </Tabs>
            </Provider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        articleReducer: state.ArticleReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    getArtInfo: () => {
        dispatch(action.ArticleAction.getArtInfo())
    },
    getArtArticle: () => {
        dispatch(action.ArticleAction.getArtArticle())
    },
    getArtHelp: () => {
        dispatch(action.ArticleAction.getArtHelp())
    },
    getArtVideo: () => {
        dispatch(action.ArticleAction.getArtVideo())
    },
    getVoteList: () => {
        dispatch(action.ArticleAction.getVoteList())
    },


})

export default connect(mapStateToProps, mapDispatchProps)(Community)


const style = StyleSheet.create({
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },


})
