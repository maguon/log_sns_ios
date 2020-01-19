import React from 'react'
import {
    View,
    StyleSheet,
    ScrollView,
    FlatList,
    Text,
    ActivityIndicator
} from 'react-native'
import {connect} from "react-redux"
import {Provider, Tabs} from "@ant-design/react-native"
import Item from '../modules/Item'
import * as action from "../../action/index"
import globalStyles from "../../utils/GlobalStyles"


class Article extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.getArtInfo()
        this.props.getArtArticle()
        this.props.getArtImage()
        this.props.getArtVideo()
        this.props.getArtAddress()
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
                <Item item={item} name='Art' navigation={this.props.navigation}/>
            </View>
        )
    }


    render() {
        const tabs = [{title: '所有'}, {title: '文章'}, {title: '图片'}, {title: '视频'}, {title: '求助'}]
        const {articleReducer: {artInfo, artArticle, artImage, artVideo, artAddress, isResultStatus}} = this.props

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
                    </ScrollView>
                    <ScrollView>

                        <FlatList
                            keyExtractor={(item, index) => `${index}`}
                            data={artArticle}
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
                    <ScrollView>
                        <FlatList
                            keyExtractor={(item, index) => `${index}`}
                            data={artImage}
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
                                data={artAddress}
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
    getArtImage: () => {
        dispatch(action.ArticleAction.getArtImage())
    },
    getArtVideo: () => {
        dispatch(action.ArticleAction.getArtVideo())
    },
    getArtAddress: () => {
        dispatch(action.ArticleAction.getArtAddress())
    },

})

export default connect(mapStateToProps, mapDispatchProps)(Article)

const style = StyleSheet.create({
    content: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },

})



