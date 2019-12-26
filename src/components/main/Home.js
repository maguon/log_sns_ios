import React from 'react'
import {View, Text} from 'react-native'
import { Popover, Tabs} from '@ant-design/react-native'
import ImageList from '../modules/ImageList'
import Video from '../modules/Video'
import VideoList from '../modules/VideoList'
import Address from '../modules/Address'
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
            <View >
                {index == 0 && <ImageList></ImageList>}
                {index == 1 && <Vote></Vote>}
                {index == 2 && <Address></Address>}


            </View>
        )
    }
}

