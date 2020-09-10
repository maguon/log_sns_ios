import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet, Dimensions,ScrollView} from 'react-native'
import { MapView} from "react-native-amap3d"
import * as action from "../../action/index"
import globalStyles from "../../utils/GlobalStyles"
import { Button,InputItem,Provider} from "@ant-design/react-native"
import AntDesign from "react-native-vector-icons/AntDesign"
import * as actionType from "../../actionType";

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
        const {navigation,getAddress, LocationPost,LocationReducer: {data: {addressInfo}}} = this.props
        return (
            <Provider>
            <View style={{flex: 1}}>
                <MapView
                    locationEnabled
                    locationInterval={10000}
                    zoomLevel={14}
                    rotateEnabled={true}
                    showsCompass={true}
                    onLongPress={( nativeEvent ) => {
                        console.log(nativeEvent)
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
                {/*<View>*/}
                {/*<InputItem*/}
                    {/*clear*/}
                    {/*value={this.state.value1}*/}
                    {/*onChange={value => {*/}
                        {/*this.setState({*/}
                            {/*value1: value,*/}
                        {/*});*/}
                    {/*}}*/}
                    {/*placeholder="请输入备注"*/}
                {/*/>*/}
                {/*</View>*/}
                <View style={{flexDirection: 'row'}}>
                    <View style={{padding: 5, flex: 5}}>
                        <Text style={[globalStyles.midText, {padding: 5, fontWeight: 'bold'}]}>
                            {addressInfo.formatted_address ? `${addressInfo.formatted_address}` : ''}
                        </Text>
                        <Text style={[globalStyles.midText, {padding: 5}]}>
                            {addressInfo.addressComponent ? `${addressInfo.addressComponent.city}${addressInfo.addressComponent.district}${addressInfo.addressComponent.streetNumber.street}${addressInfo.addressComponent.streetNumber.number}` : ''}</Text>
                    </View>
                    <View style={{height:35, marginTop:20,marginRight:5}}>
                        <Button style={{flex: 1}} transparent onPress={() => LocationPost({
                            addressName:addressInfo.formatted_address,
                            addressReal: addressInfo.addressComponent ? `${addressInfo.addressComponent.city}${addressInfo.addressComponent.district}${addressInfo.addressComponent.streetNumber.street}${addressInfo.addressComponent.streetNumber.number}` : '',
                            longitude: this.state.active ? this.state.onlongitude : this.state.longitude,
                            latitude: this.state.active ? this.state.onlatitude : this.state.latitude,
                            navigation:navigation
                        })}>
                            <Text style={[globalStyles.midText, globalStyles.styleColor]}>收藏定位</Text>
                        </Button>
                    </View>
                </View>
            </View>
            </Provider>
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
    },

    LocationPost: (param) => {
        dispatch(action.LocationAction.LocationPost(param))
    },
})

export default connect(mapStateToProps, mapDispatchProps)(Location)

const styles = StyleSheet.create({})

