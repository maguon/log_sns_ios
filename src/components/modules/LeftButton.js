import React from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'
import {Icon} from '@ant-design/react-native'


const LeftButton = props => {
    const {style = styles.left} = props
    return (
        <TouchableOpacity style={style} onPress={() => {
            props.navigation.pop()
        }}>
            <Icon name='left' color='#fff'/>
        </TouchableOpacity>
    )
}

export default LeftButton

const styles = StyleSheet.create({
    left: {
        flex: 1,
        marginLeft: 15
    }
})
