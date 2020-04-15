import React from 'react'
import { View } from 'react-native'
import { Button } from '@ant-design/react-native'
import { submit } from 'redux-form'
import { connect } from 'react-redux'
import NavBarContainer from './NavBarContainer'
import BackLeft from './BackLeft'
import Body from './Body'

const NavComment = props => {
    return (
        <NavBarContainer {...props}>
            <BackLeft {...props} />
            <Body {...props} />
            <RightComment {...props} />
        </NavBarContainer>
    )
}

export default NavComment

const mapDispatchToProps = (dispatch) => ({
    submit: () => {
        dispatch(submit('Comment'))
    }
})

const RightComment = connect(null, mapDispatchToProps)(props => {
    return (
        <View style={{ marginRight: 16 }}>
            <Button type="ghost" size='small' onPress={props.submit} onLongPress={props.submit}>
                发送
            </Button>
        </View>
    )
})
