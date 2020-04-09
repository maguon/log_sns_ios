
import React from 'react'
import { View, Text, Image } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Button } from '@ant-design/react-native'

const ReplySimple = props => {
    const { data = {} } = props
    return (
        <View>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center' }}>
                <Text>{data.content}</Text>
            </View>
            <View style={{ marginTop: 10,marginLeft:10}}>
                <Text style={{ color: '#777' }}>{data.date}</Text>
            </View>
        </View>
    )
}

export default ReplySimple
