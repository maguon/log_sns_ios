import React from 'react'
import { View, Text } from 'react-native'


const Card = props => {
    // console.log('props', props)
    const { children } = props
    return (
        <View style={{ borderColor: '#ddd', borderWidth: 0.5, borderRadius: 10, margin: 7.5 }}>
            {children}
        </View>
    )
}

export default Card