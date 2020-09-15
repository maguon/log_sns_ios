import React from 'react'
import {TouchableOpacity, StyleSheet} from 'react-native'
import {Icon} from '@ant-design/react-native'


const DetailLeftButton = props => {
    const {style = styles.left} = props
    return (
        <TouchableOpacity style={style} onPress={() => {
            console.log(props)
            props.navigation.state.params.callBack()
            props.navigation.pop()
        }}>
            <Icon name='left' color='#fff'/>
        </TouchableOpacity>
    )
}

export default DetailLeftButton

const styles = StyleSheet.create({
    left: {
        flex: 1,
        marginLeft: 15
    }
})
