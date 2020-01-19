import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet} from 'react-native'


class ClearCache extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const {} = this.props
        return (
            <View>
                <Text>ClearCache</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchProps = (dispatch, props) => ({})
const styles = StyleSheet.create({})

export default connect(mapStateToProps, mapDispatchProps)(ClearCache)



