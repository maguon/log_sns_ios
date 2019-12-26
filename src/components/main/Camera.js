import React from 'react'
import {View, Text} from 'react-native'



export default class Camera extends React.Component {
    constructor(props) {
        super(props)

    }

    render() {
        return (
            <View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
                 <Text onPress={()=>{this.props.navigation.goBack()}}>Camera</Text>
            </View>
        )
    }
}
