import React from 'react'
import { View, Text, Image } from 'react-native'
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons'
import { Button } from '@ant-design/react-native'

const Reply = props => {
    const { data = {}, replyButtonIsVisible, onPressReply = () => console.log('onPressReply') } = props
    // console.log(data)
    return (
        <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', flex: 3 }}>
                    <View style={{ width: 48, height: 48, margin: 10 }}>
                        <Image source={{ uri: data.avatar }} style={{ width: 48, height: 48, borderRadius: 24 }} />
                    </View>
                    <View style={{ marginTop: 10 }}>
                        <Text style={{ fontSize: 16 }}>{data.nick}</Text>
                        <Text style={{ color: '#777' }}>{data.date}</Text>
                    </View>
                </View>
                {replyButtonIsVisible && <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: 10 }}>
                    <Button type="ghost" size='small' onPress={onPressReply}>回复</Button>
                </View>}
            </View>
            <View style={{ flexDirection: 'row', marginHorizontal: 10, alignItems: 'center' }}>
                <Text>{data.content}</Text>
            </View>
        </View>
    )
}

export default Reply
