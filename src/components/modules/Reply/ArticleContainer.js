import React from 'react'
import { View, Text ,StyleSheet} from 'react-native'

const ArticleContainer = props => {
    // console.log('props', props)
    const { children } = props
    return (
        <View style={{ backgroundColor: '#f1f1f1', margin: 10, borderWidth: 0.5, borderColor: '#ddd' }}>
            {children}
        </View>
    )
}

export default ArticleContainer
