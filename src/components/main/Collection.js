import React from 'react'
import { View, Text,ScrollView } from 'react-native'
import Video from '../modules/Video'
import VideoList from '../modules/VideoList'
import ImageList from '../modules/ImageList'
import Address from '../modules/Address'
import VoteItem from '../modules/VoteItem'

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
                <VoteItem>Collection</VoteItem>
            </ScrollView>
        )
    }

}

export default Collection
