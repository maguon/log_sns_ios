import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text,StyleSheet,ImageBackground,Dimensions,StatusBar,Linking} from 'react-native'
import {ActivityIndicator,Button} from "@ant-design/react-native"
import PushNotificationIOS from "@react-native-community/push-notification-ios"
import * as action from "../../action"
import * as actionType from '../../actionType/index'
import DeviceInfo from 'react-native-device-info';
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
        dispatch(action.WelcomeAction.validateVersion(param))
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


