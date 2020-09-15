import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet} from 'react-native'
import * as action from "../../action/index"
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import {Provider} from "@ant-design/react-native";

class AboutUs extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.getAboutUsInfo()
    }

    render() {
        const {aboutUsReducer: {aboutUsList}} = this.props
        console.log(aboutUsList)
        return (
            <Provider>
                <SafeAreaView style={{flex: 1}}>
                <Text>{aboutUsList.corporate_name}</Text>
                <Text>{aboutUsList.info}</Text>
                <Text>{aboutUsList.phone}</Text>
                <Text>{aboutUsList.remarks}</Text>
                <Text>{aboutUsList._id}</Text>
            </SafeAreaView>
            </Provider>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        aboutUsReducer: state.AboutUsReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    getAboutUsInfo: () => {
        dispatch(action.AboutUsAction.getAboutUsInfo())
    },
})
export default connect(mapStateToProps, mapDispatchProps)(AboutUs)


const styles = StyleSheet.create({})
