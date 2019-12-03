import React from 'react'
import { Button } from 'native-base'
import Icon from 'react-native-vector-icons/EvilIcons'
import { Actions } from 'react-native-router-flux'

const LeftButton = () => {
    return (
        <Button transparent onPress={Actions.pop}>
            <Icon name='location' style={{color:'white'}} size={30}/>
        </Button>
    )
}

export default LeftButton
