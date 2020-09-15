import React from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'
import {Icon} from '@ant-design/react-native'


const LeftButton = props => {
    return (
        <TouchableOpacity style={{flex: 1, marginLeft: 15}} onPress={() => {
            props.navigation.pop()
        }}>
            <Icon name='left' color='#fff'/>
        </TouchableOpacity>
    )
}

export default LeftButton


