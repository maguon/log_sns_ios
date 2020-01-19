import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet} from 'react-native'


class Evaluation extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const {} = this.props
        return (
            <View>
                <Text>Evaluation</Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchProps)(Evaluation)

const styles = StyleSheet.create({})
