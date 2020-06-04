import React, {Component} from 'react'
import {connect} from 'react-redux'
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Animated,
    Easing
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import Entypo from "react-native-vector-icons/Entypo"


class Scan extends Component {
    constructor(props) {
        super(props)
        this.state = {
            moveAnim: new Animated.Value(0),

        };
        this.isBarcodeRead = false;

    }


    componentDidMount() {
        this.startAnimation();
    }
    startAnimation = () => {
        this.state.moveAnim.setValue(-200);
        Animated.timing(this.state.moveAnim, {
            toValue: 0,
            duration: 1500,
            easing: Easing.linear
        }).start(() => this.startAnimation());
    };

    // 扫描事件
    onBarCodeRead = result => {
        if (!this.isBarcodeRead) {
            this.isBarcodeRead = true;
            // 卸载扫一扫组件，否则还会持续扫描
            this.props.navigation.navigate('ScannerResult', {
                imageUri: null,
                scannerResult: JSON.stringify(result)
            });
        }
    };


    render() {
        const {} = this.props
        return (
            <View style={styles.container}>
                    <RNCamera
                        ref={ref => {
                            this.camera = ref;
                        }}
                        style={styles.preview}
                        onBarCodeRead={this.onBarCodeRead}
                    >
                        <View style={styles.rectangleContainer}>
                            <View style={styles.rectangle} />
                            <Animated.View
                                style={[
                                    styles.border,
                                    { transform: [{ translateY: this.state.moveAnim }] }
                                ]}
                            />
                            <Text style={styles.rectangleText}>
                                将二维码放入框内，即可自动扫描
                            </Text>
                        </View>
                    </RNCamera>

            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchProps)(Scan)

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: 'column'
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    rectangleContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'transparent'
    },
    rectangle: {
        height: 200,
        width: 200,
        borderWidth: 1,
        borderColor: '#00FF00',
        backgroundColor: 'transparent'
    },
    rectangleText: {
        flex: 0,
        color: '#fff',
        marginTop: 10
    },
    border: {
        flex: 0,
        width: 195,
        height: 2,
        backgroundColor: '#00FF00'
    }
})

