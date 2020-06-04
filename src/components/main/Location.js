import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Dimensions} from 'react-native'
import { MapView} from "react-native-amap3d"
import * as action from "../../action/index"
import globalStyles from "../../utils/GlobalStyles"
import { Button} from "@ant-design/react-native"
import AntDesign from "react-native-vector-icons/AntDesign"

const {width} = Dimensions.get('window')
class Location extends Component {
    constructor(props) {
        super(props)
        this.state = {
            latitude: 0,
            longitude: 0,
            onlatitude: 0,
            onlongitude: 0,
            active: false
        }
    }



    render() {
        const {getAddress, LocationReducer: {data: {addressInfo}}} = this.props
        return (
            <View style={{flex: 1}}>
                <MapView
                    locationEnabled
                    locationInterval={10000}
                    zoomLevel={14}
                    rotateEnabled={true}
                    showsCompass={true}
                    onLongPress={( nativeEvent ) => {
                        this.setState({
                            onlatitude: nativeEvent.latitude,
                            onlongitude: nativeEvent.longitude,
                            active: true
                        })
                        if (this.state.active) {
                            getAddress({
                                location: `${nativeEvent.longitude},${nativeEvent.latitude}`,
                                key: '22d16ea40b6fdb3ebc3daa1b48db3287',
                                extensions: 'all',
                                batch: 'false',
                                radius: '1000'
                            })
                        }
                    }}
                    coordinate={{ latitude: this.state.latitude, longitude: this.state.longitude }}
                    onLocation={( nativeEvent ) => {
                        this.setState({
                            latitude: nativeEvent.latitude,
                            longitude: nativeEvent.longitude,
                        })
                        // console.log("nativeEvent",nativeEvent)
                        if (!this.state.active) {
                            getAddress({
                                location: `${nativeEvent.longitude},${nativeEvent.latitude}`,
                                key: '22d16ea40b6fdb3ebc3daa1b48db3287',
                                extensions: 'all',
                                batch: 'false',
                                radius: '1000'
                            })
                        }
                    }}
                    showsZoomControls={false}
                    style={{ flex: 1 }}>
                    <MapView.Marker
                        infoWindowDisabled={true}
                        coordinate={{ latitude: this.state.onlatitude, longitude: this.state.onlongitude }}
                    />
                </MapView>
                <View style={{flexDirection: 'row'}}>
                    <View style={{padding: 5, flex: 5}}>
                        <View style={{width:width*0.9,flexDirection:"row"}}>
                        <AntDesign name="enviroment" size={18} style={{color: '#2f90c2',padding: 5}}/>
                        <Text style={[globalStyles.midText, {padding: 5, fontWeight: 'bold'}]}>
                            {addressInfo.formatted_address ? `${addressInfo.formatted_address}` : ''}
                        </Text>
                        </View>

                    </View>
                </View>
            </View>
        )

    }
}

const mapStateToProps = (state) => {
    return {
        LocationReducer: state.LocationReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    getAddress: (param) => {
        dispatch(action.LocationAction.getAddress(param))
    }
})

export default connect(mapStateToProps, mapDispatchProps)(Location)

const styles = StyleSheet.create({})

