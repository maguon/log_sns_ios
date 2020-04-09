import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet} from 'react-native'
import ChildItem from '../modules/ChildItem'


class Comment extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const {navigation:{state:{params:{item}}}} = this.props
        console.log(item)
        return (
            <ChildItem item={item}></ChildItem>
            // <View>
            //     <Text>2019-12-08 11:30</Text>
            //     <Text>652人阅读</Text>
            // </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchProps)(Comment)

const styles = StyleSheet.create({})

