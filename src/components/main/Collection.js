import React from 'react'
import { View, Text,ScrollView } from 'react-native'
import Video from '../modules/Video'
import VideoList from '../modules/VideoList'
import ImageList from '../modules/ImageList'
import Address from '../modules/Address'
import Vote from '../modules/Vote'

class Collection extends React.Component{
    constructor(props){
        super(props)
    }

    render(){
        return (

            <ScrollView>
                <ImageList>Collection</ImageList>
                <Video>Collection</Video>
                <Address>Collection</Address>
                <Vote>Collection</Vote>
            </ScrollView>
        )
    }

}

export default Collection
