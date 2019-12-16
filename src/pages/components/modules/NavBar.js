import React from 'react';
import { View, StyleSheet,Dimensions,Platform} from 'react-native'
import NavBarContainer from './NavBarContainer'
import Left from './LeftButton'
import Right from './RightButton'
import Body from './Body'


const NavBar = props => {
    return (
        <View style={styles.navBar}>
            <Left {...props} />
            <Body {...props} />
            <Right {...props} />
        </View>
    )
}

const styles = StyleSheet.create({

    navBar: {
        flexDirection: 'row',
        alignItems: 'center',
        height:80,
        borderBottomWidth: 0.5,
        borderBottomColor: '#777'
    }
})

export default NavBar
