import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, Image, TouchableOpacity, View } from 'react-native';
import { RNCamera } from 'react-native-camera';

export default class Camera extends Component {
    render() {
        return (
            <View style={styles.container}>
                <RNCamera
                    ref={ref => {
                        this.camera = ref;
                    }}
                    style={styles.preview}
                    type={RNCamera.Constants.Type.back}
                    flashMode={RNCamera.Constants.FlashMode.on}
                    androidCameraPermissionOptions={{
                        title: 'Permission to use camera',
                        message: 'We need your permission to use your camera',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    captureAudio={true}
                    androidRecordAudioPermissionOptions={{
                        title: 'Permission to use audio recording',
                        message: 'We need your permission to use your audio',
                        buttonPositive: 'Ok',
                        buttonNegative: 'Cancel',
                    }}
                    playSoundOnCapture={true}
                    onGoogleVisionBarcodesDetected={({ barcodes }) => {
                        console.log(barcodes);
                    }}
                />

                <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' ,backgroundColor:'#fff'}}>
                    <Image
                        style={{backgroundColor:'#fff'}}
                        source={{ uri: 'file:///data/user/0/com.log_sns_android/cache/Camera' }} width={100} height={100} />
                    <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
                        <Text style={{ fontSize: 14 }}> SNAP </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }


    takePicture = async () => {
        console.log('takePicture')
        if (this.camera) {
            const options = { quality: 0.5 };
            const data = await this.camera.takePictureAsync(options);
            console.log(data.uri);
            console.log(data);
        }
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#fff',
    },
    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    capture: {
        flex: 0,
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: 'center',
        margin: 20,
    },
});
