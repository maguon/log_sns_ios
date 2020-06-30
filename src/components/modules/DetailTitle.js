import React from 'react'
import {TouchableOpacity,Text, View} from 'react-native'
import { connect } from 'react-redux'
import * as action from "../../action/index";


let release=true
class DetailTitle extends React.Component  {
    constructor(props) {
        super(props)

    }
    render() {
        const {navigation: {state: {params: {item}}}} = this.props
        console.log(item)

        return (
            <View>
          <Text>{item}</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {

    }
}
const mapDispatchToProps = (dispatch,props) => ({

})


export default  connect(mapStateToProps,mapDispatchToProps)(DetailTitle)
