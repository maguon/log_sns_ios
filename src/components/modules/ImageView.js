import React, {Component} from 'react'
import {
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import {Icon, Provider} from "@ant-design/react-native"
import Swiper from 'react-native-swiper'
import {connect} from 'react-redux'
import {fileHost} from "../../config/HostConfig"
import {CachedImage} from "react-native-img-cache"

const {width, height} = Dimensions.get('window')


class ImageView extends Component {
    constructor(props) {
        super(props)
        this.state={
            loading:false
        }

    }

    render() {
        const {navigation: {state: {params: {media, index}}}, navigation} = this.props
        // console.log(navigation)
        return (
            <Provider>
                <Swiper
                    ref='Swiper'
                    index={index}
                    loop={false}
                    loadMinimal={true}
                    loadMinimalSize={1}
                    dot={
                        <View
                            style={{
                                backgroundColor: '#989a9e',
                                width: 5,
                                height: 5,
                                borderRadius: 4,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3
                            }}
                        />
                    }

                >
                    {media.map((item, i) => {
                        return <View key={i} style={styles.wrapper}>
                            <CachedImage
                                source={{ uri: `${fileHost}/image/${item.url}` }}
                                resizeMode='contain'
                                // minimumZoomScale={1}
                                // maximumZoomScale={3}
                                // loader={
                                //     <View style={styles.container}>
                                //         <ActivityIndicator size="large" color="red"/>
                                //     </View>
                                // }
                                style={{width: width, height: height}}
                            />

                        </View>
                    })}
                </Swiper>

                <View style={{
                    height: 70,
                    width: width,
                    position: 'absolute',
                    top: 0,
                    flexDirection: "row",
                    justifyContent: 'space-around',
                    alignItems: 'center'
                }}>
                    <TouchableOpacity style={{position: 'absolute', left: 0,}}
                                      onPress={()=>navigation.pop()}>
                        <Icon name='left' style={{color: "white", marginLeft: 15}}/>
                    </TouchableOpacity>
                </View>


            </Provider>
        )
    }
}

const styles = {
    wrapper: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000'
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems:"center"
    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    }
}

const mapStateToProps = (state) => {
    return {
        CameraReducer: state.CameraReducer
    }
}
const mapDispatchProps = (dispatch, props) => ({})
export default connect(mapStateToProps, mapDispatchProps)(ImageView)
