// import React, {Component,useState, useEffect} from 'react'
// import {connect} from 'react-redux'
// import { Alert,View, Text, StyleSheet,ImageBackground,Dimensions,StatusBar,DeviceEventEmitter} from 'react-native'
// import {ActivityIndicator,Button} from "@ant-design/react-native";
// import DeviceInfo from 'react-native-device-info';
// import PushNotificationIOS from "@react-native-community/push-notification-ios";
// import * as action from "../../action"
// const window = Dimensions.get('window');
//
//
//
//
// class Welcome extends Component {
//     constructor(props) {
//         super(props)
//
//     }
//
//     componentDidMount(){
//         let deviceId = DeviceInfo.getDeviceId();
//         let uniqueId = DeviceInfo.getUniqueId();
//         console.log(deviceId)
//         console.log(uniqueId)
//         DeviceInfo.getDeviceToken().then(deviceToken => {
//             console.log(deviceToken)
//         });
//
//     }
//
//
//
//   App = () => {
//       console.log("0000")
//         const [permissions, setPermissions] = useState({});
//
//         useEffect(() => {
//             PushNotificationIOS.addEventListener('register', onRegistered);
//             PushNotificationIOS.addEventListener('registrationError', onRegistrationError);
//             PushNotificationIOS.addEventListener('notification', onRemoteNotification);
//             PushNotificationIOS.addEventListener('localNotification', onLocalNotification);
//
//             PushNotificationIOS.requestPermissions().then(
//                 data => {
//                     console.log('PushNotificationIOS.requestPermissions', data);
//                 },
//                 data => {
//                     console.log('PushNotificationIOS.requestPermissions failed', data);
//                 },
//             );
//
//             return () => {
//                 PushNotificationIOS.removeEventListener('register', onRegistered);
//                 PushNotificationIOS.removeEventListener('registrationError', onRegistrationError);
//                 PushNotificationIOS.removeEventListener('notification', onRemoteNotification);
//                 PushNotificationIOS.removeEventListener('localNotification', onLocalNotification);
//             };
//         }, []);
//
//         const sendNotification = () => {
//             DeviceEventEmitter.emit('remoteNotificationReceived', {
//                 remote: true,
//                 aps: {
//                     alert: 'Sample notification',
//                     badge: '+1',
//                     sound: 'default',
//                     category: 'REACT_NATIVE',
//                     'content-available': 1,
//                 },
//             });
//         };
//
//         const sendLocalNotification = () => {
//             PushNotificationIOS.presentLocalNotification({
//                 alertBody: 'Sample local notification',
//                 fireDate: new Date().toISOString(),
//                 applicationIconBadgeNumber: 1,
//             });
//         };
//
//         const scheduleLocalNotification = () => {
//             PushNotificationIOS.scheduleLocalNotification({
//                 alertBody: 'Test Local Notification',
//                 fireDate: new Date().toISOString(),
//             });
//         };
//
//         const onRegistered = deviceToken => {
//             Alert.alert('Registered For Remote Push', `Device Token: ${deviceToken}`, [
//                 {
//                     text: 'Dismiss',
//                     onPress: null,
//                 },
//             ]);
//         };
//
//         const onRegistrationError = error => {
//             Alert.alert(
//                 'Failed To Register For Remote Push',
//                 `Error (${error.code}): ${error.message}`,
//                 [
//                     {
//                         text: 'Dismiss',
//                         onPress: null,
//                     },
//                 ],
//             );
//         };
//
//         const onRemoteNotification = notification => {
//             const result = `Message: ${notification.getMessage()};\n
//       badge: ${notification.getBadgeCount()};\n
//       sound: ${notification.getSound()};\n
//       category: ${notification.getCategory()};\n
//       content-available: ${notification.getContentAvailable()}.`;
//
//             Alert.alert('Push Notification Received', result, [
//                 {
//                     text: 'Dismiss',
//                     onPress: null,
//                 },
//             ]);
//         };
//
//         const onLocalNotification = notification => {
//             Alert.alert(
//                 'Local Notification Received',
//                 'Alert message: ' + notification.getMessage(),
//                 [
//                     {
//                         text: 'Dismiss',
//                         onPress: null,
//                     },
//                 ],
//             );
//         };
//
//         // const showPermissions = () => {
//         //     PushNotificationIOS.checkPermissions(permissions => {
//         //         setPermissions({permissions});
//         //     });
//         // };
//
//         return (
//             <View style={styles.buttonContainer}>
//                 <Button type="primary" style={{width: 50}} onPress={sendNotification} label="Send fake notification">0</Button>
//
//                 <Button
//                         type="primary" style={{width: 50}}
//                     onPress={sendLocalNotification}
//                     label="Send fake local notification"
//                 >1</Button>
//                 <Button
//                     type="primary" style={{width: 50}}
//                     onPress={scheduleLocalNotification}
//                     label="Schedule fake local notification"
//                 >2</Button>
//
//                 <Button
//                     type="primary" style={{width: 50}}
//                     onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(42)}
//                     label="Set app's icon badge to 42"
//                 >3</Button>
//                 <Button
//                     type="primary" style={{width: 50}}
//                     onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(0)}
//                     label="Clear app's icon badge"
//                 >4</Button>
//                 {/*<View>*/}
//                     {/*<Button type="primary" style={{width: 50}} onPress={showPermissions} label="Show enabled permissions">5</Button>*/}
//                     {/*<Text>{JSON.stringify(permissions)}</Text>*/}
//                 {/*</View>*/}
//             </View>
//         );
//     };
//
//
//     render() {
//         const {} = this.props
//         return (
//             <View style={styles.container}>
//                 <StatusBar hidden={true} />
//                 <ImageBackground source={require('../../images/init.png')} style={styles.image}>
//                     <View style={styles.Activity}>
//                         <ActivityIndicator
//                             animating={true}
//                             color='red'
//                             size="large"
//                         />
//                         <Button type="primary" style={{marginTop: 20, width: 50}} onPress={()=>this.App()}>0</Button>
//                         <View style={styles.buttonContainer}>
//                             <Button type="primary" style={{width: 50}}  label="Send fake notification">0</Button>
//
//                             <Button
//                                 type="primary" style={{width: 50}}
//
//                                 label="Send fake local notification"
//                             >1</Button>
//                             <Button
//                                 type="primary" style={{width: 50}}
//
//                                 label="Schedule fake local notification"
//                             >2</Button>
//
//                             <Button
//                                 type="primary" style={{width: 50}}
//                                 onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(42)}
//                                 label="Set app's icon badge to 42"
//                             >3</Button>
//                             <Button
//                                 type="primary" style={{width: 50}}
//                                 onPress={() => PushNotificationIOS.setApplicationIconBadgeNumber(0)}
//                                 label="Clear app's icon badge"
//                             >4</Button>
//                             {/*<View>*/}
//                             {/*<Button type="primary" style={{width: 50}} onPress={this.showPermissions} label="Show enabled permissions">5</Button>*/}
//                             {/*<Text>{JSON.stringify(permissions)}</Text>*/}
//                             {/*</View>*/}
//                         </View>
//                     </View>
//
//                 </ImageBackground>
//             </View>
//         )
//     }
// }
//
//
// const mapStateToProps = (state) => {
//     return {}
// }
//
// const mapDispatchProps = (dispatch, props) => ({
//     start: () => {
//         dispatch(action.WelcomeAction.start())
//
//     }
// })
//
// export default connect(mapStateToProps, mapDispatchProps)(Welcome)
//
// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         flexDirection: "row",
//         justifyContent: "center",
//         alignItems: "center"
//     },
//     image: {
//         width: window.width,
//         height: window.height,
//     },
//     Activity:{
//         flex: 1,
//         flexDirection: 'row',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     buttonContainer:{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//         backgroundColor: '#F5FCFF',
//     },
//
// })



import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text,StyleSheet,ImageBackground,Dimensions,StatusBar,Linking} from 'react-native'
import {ActivityIndicator,Button} from "@ant-design/react-native"
import PushNotificationIOS from "@react-native-community/push-notification-ios"
import * as action from "../../action"
import * as actionType from '../../actionType/index'
import DeviceInfo from 'react-native-device-info';
import {Push } from './Push'
const window = Dimensions.get('window');




class Welcome extends Component {
    constructor(props) {
        super(props)
        this.linkDownload = this.linkDownload.bind(this)
    }

    componentDidMount(){
        this.props.start()
    }
    linkDownload(url) {
        if(url){
            Linking.canOpenURL(url).then(supported => {
                // console.log('supported',supported)
                if (!supported) {
                    // console.log('Can\'t handle url: ' + url)
                } else {
                    return Linking.openURL(url)
                }
            }).catch(err => console.log('An error occurred', err))
        }
    }

    render() {
        const { WelcomeReducer: { data, initAPP } } = this.props
        return (
            <View style={styles.container}>
                <Push/>
                <StatusBar hidden={true} />
                <ImageBackground source={require('../../images/init.png')} style={styles.image}>
                    <View style={styles.Activity}>
                        {initAPP.isResultStatus == 1 && <ActivityIndicator
                            animating={initAPP.isResultStatus == 1}
                            color='red'
                            size="large"
                        />}

                    </View>
                    {((initAPP.isResultStatus == 4 || initAPP.isResultStatus == 3) && initAPP.currentStep == 2) &&
                    <Button block onPress={()=>this.props.validateVersion(data)} style={styles.button}>
                        <Text style={styles.buttonTiltle}>重新获取版本号</Text>
                    </Button>}
                    {((initAPP.isResultStatus == 2) && data.version.force_update == 1) &&
                    <Button block onPress={() => this.linkDownload(data.version.url)} style={styles.button}>
                        <Text style={styles.buttonTiltle}>立即更新</Text>
                    </Button>}

                </ImageBackground>
            </View>
        )
    }
}


const mapStateToProps = (state) => {
    return {
        WelcomeReducer:state.WelcomeReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    validateVersion: param => {
        dispatch({type:actionType.WelcomeActionType.Welcome_app_waiting})
        // dispatch(action.WelcomeAction.validateVersion(param))
    },
    start: () => {
        dispatch(action.WelcomeAction.start(props))

    }
})

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
    buttonContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    buttonTiltle: {
        fontSize: 18,
        color: 'rgba(0,0,0,0.4)'
    },
    button: {
        marginBottom: 30,
        width: window.width / 4 * 3,
        backgroundColor: 'rgba(255,255,255,0.8)',
        borderRadius: 25,
        alignSelf: 'center'
    }

})


