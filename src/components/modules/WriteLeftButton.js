import React from 'react'
import {TouchableOpacity} from 'react-native'
import {Icon} from '@ant-design/react-native'
import * as actionType from "../../actionType/index";
import {connect} from 'react-redux'


class WriteLeftButton extends React.Component{
    render() {
        const {setFile} = this.props
        return (
            <TouchableOpacity style={{flex: 1, marginLeft: 15}} onPress={setFile}>
                <Icon name='left' color='#fff' />
            </TouchableOpacity>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        homeReducer: state.HomeReducer
    }
}
const mapDispatchProps = (dispatch,props) => ({

    setFile:() => {
        dispatch({type: actionType.HomeActionType.set_File, payload: {setFile:[]}})
        props.navigation.pop()
    },

})


export default connect(mapStateToProps, mapDispatchProps)(WriteLeftButton)
