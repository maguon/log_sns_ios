import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet} from 'react-native'
import * as action from "../../action/index";


class Space extends Component {
    constructor(props) {
        super(props)

    }
    componentDidMount() {
        // this.props.getAboutUsInfo()
    }
    render() {

        return (
            <View>
                <Text>Space</Text>

            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        // aboutUsReducer:state.AboutUsReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    // getAboutUsInfo: () => {
    //     dispatch(action.AboutUsAction.getAboutUsInfo())
    // },
})
export default connect(mapStateToProps, mapDispatchProps)(Space)


const styles = StyleSheet.create({})
