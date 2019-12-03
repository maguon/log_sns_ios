import React, { Component } from 'react'
import {Button} from 'native-base'
import Icon from 'react-native-vector-icons/EvilIcons'
import {Actions} from "react-native-router-flux";

const RightButton = props => {
        return (
            <Button transparent onPress={Actions.pop}>
                <Icon name='camera' style={{color:'white'}} size={30}/>
            </Button>
        )

}

export default RightButton


