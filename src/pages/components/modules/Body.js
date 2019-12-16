import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import globalStyles from '../../../utils/GlobalStyles'

const Body = props => {
    const { style = styles.body, scene: { descriptor: { options } } } = props
    return (
        <View style={style}>
            <Text style={globalStyles.xlText}>{options.title}</Text>
        </View>
    )
}

export default Body

const styles = StyleSheet.create({
    body: {
        flex: 5,
        padding: 15,
        alignItems: 'center'
    }
})
