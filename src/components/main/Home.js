import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, ScrollView} from 'react-native'
import {Provider} from "@ant-design/react-native"
import Address from '../modules/Address'
import CollectionAddress from '../modules/CollectionAddress'
import VoteItem from '../modules/VoteItem'
import ImageList from '../modules/ImageList'
import Video from '../modules/Video'
import ArticleItem from '../modules/ArticleItem'
import * as action from "../../action"


class Home extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        console.log('props', this.props)
        const {navigation: {state: {params = {index: 0}}}} = this.props
        const {index} = params
        return (
            <Provider>
                <View style={{flex: 1}}>
                    {index == 0 &&
                    <ScrollView>
                        <ImageList navigation={this.props.navigation}/>
                        <VoteItem navigation={this.props.navigation}/>
                        <Video navigation={this.props.navigation}/>
                        <Address navigation={this.props.navigation}/>
                    </ScrollView>

                    }
                    {index == 1 &&
                    <ScrollView>
                        <VoteItem navigation={this.props.navigation}/>
                        <ArticleItem navigation={this.props.navigation}/>
                    </ScrollView>}
                    {index == 2 &&
                    <ScrollView>
                        <CollectionAddress navigation={this.props.navigation}/>
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
    getData: () => {
        dispatch(action.HomeAction.getData())
    },
})

export default connect(mapStateToProps, mapDispatchProps)(Home)

const styles = StyleSheet.create({})
