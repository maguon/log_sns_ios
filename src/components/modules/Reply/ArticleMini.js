
import React from 'react'
import { View, Text, Image } from 'react-native'

const ArticleMini = props => {
    const { data = {} } = props
    return (
        <View style={{ flexDirection: 'row', borderTopWidth: 0.5, borderColor: '#ddd' }}>
            <View style={{ height: 40, width: 40 }} >
                <Image source={{ uri: data.avatar }} style={{ width: 40, height: 40 }} />
            </View>
            <View style={{ marginLeft: 10, flex: 1, justifyContent: 'center' }}>
                <Text>{data.nick}</Text>
                <Text ellipsizeMode="tail" numberOfLines={1} >{data.content}</Text>
            </View>
        </View>
    )
}

export default ArticleMini
