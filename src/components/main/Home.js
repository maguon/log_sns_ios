import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet,ScrollView} from 'react-native'
import Address from '../modules/Address'
import CollectionAddress from '../modules/CollectionAddress'
import Vote from '../modules/Vote'
import ImageList from '../modules/ImageList'
import Video from '../modules/Video'
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
            <View style={{flex: 1}}>
                {index == 0 &&
                <ScrollView>
                    <ImageList></ImageList>
                    <Vote></Vote>
                    <Video></Video>
                    <Address></Address>
                </ScrollView>

                }
                {index == 1 &&
                <ScrollView>
                    <Vote></Vote>
                </ScrollView>}
                {index == 2 &&
                <ScrollView>
                    <CollectionAddress></CollectionAddress>
                </ScrollView>}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        homeReducer:state.HomeReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    getData: () => {
        dispatch(action.HomeAction.getData())
    },
})

export default connect(mapStateToProps, mapDispatchProps)(Home)

const styles = StyleSheet.create({})
