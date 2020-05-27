import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet,ImageBackground,Dimensions,StatusBar} from 'react-native'
import {ActivityIndicator} from "@ant-design/react-native";
import DeviceInfo from 'react-native-device-info';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";

const window = Dimensions.get('window');
class Welcome extends Component {
    constructor(props) {
        super(props)

    }

    componentDidMount(){
        let deviceId = DeviceInfo.getDeviceId();
        let uniqueId = DeviceInfo.getUniqueId();
        console.log(deviceId)
        console.log(uniqueId)

        // PushNotificationIOS.presentLocalNotification(details);
        // DeviceInfo.getDeviceToken().then(deviceToken => {
        //     console.log(deviceToken)
        // });
    }


    render() {
        const {} = this.props
        return (
            <View style={styles.container}>
                <StatusBar hidden={true} />
                <ImageBackground source={require('../../images/init_back.png')} style={styles.image}>
                    <View style={styles.Activity}>
                        <ActivityIndicator
                            animating={true}
                            color='red'
                            size="large"
                        />
                    </View>

                </ImageBackground>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchProps)(Welcome)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center"
    },
    image: {
        width: window.width,
        height: window.height,
    },
    Activity:{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
})

