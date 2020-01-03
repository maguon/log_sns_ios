import React from 'react'
import {View, Text,ScrollView} from 'react-native'
import { Popover, Tabs} from '@ant-design/react-native'
import ImageList from '../modules/ImageList'
import Video from '../modules/Video'
import VideoList from '../modules/VideoList'
import Address from '../modules/Address'
import CollectionAddress from '../modules/CollectionAddress'
import Vote from '../modules/Vote'


export default class Home extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
    }

    render() {
        console.log('props', this.props)
        const {navigation: {state: {params = {index: 0}}}} = this.props
        const {index} = params
        return (
            <View style={{flex:1}}>
                {index == 0 &&
                    <ScrollView >
                        <ImageList></ImageList>
                        <Vote></Vote>
                        <Video></Video>
                        <Address></Address>
                    </ScrollView>

                }
                {index == 1 &&
                <ScrollView >
                    <Vote></Vote>
                </ScrollView>}
                {index == 2 &&
                <ScrollView >
                    <CollectionAddress></CollectionAddress>
                </ScrollView>}


            </View>
        )
    }
}

