import React, {Component} from 'react'
import {connect} from 'react-redux'
import {View, Text, StyleSheet} from 'react-native'
import {MapView} from "react-native-amap3d"
import globalStyles from "../../utils/GlobalStyles";
import {Button, Provider} from "@ant-design/react-native";

class LocationMap extends Component {
    constructor(props) {
        super(props)

    }

    render() {
        const {navigation:{state:{params:{item}}}} = this.props
        console.log(item)
        return (

            <View style={{flex: 1}}>

                <MapView
                    locationEnabled
                    locationInterval={10000}
                    zoomLevel={14}
                    rotateEnabled={true}
                    showsCompass={true}
                    coordinate={{latitude: item.address[1], longitude: item.address[0]}}
                    showsZoomControls={false}
                    style={{flex: 1}}>
                </MapView>

                <View style={{flexDirection: 'row'}}>
                    <View style={{padding: 5, flex: 5}}>
                        <Text style={[globalStyles.midText, {padding: 5, fontWeight: 'bold'}]}>
                            {item.address_name}
                        </Text>
                        <Text style={[globalStyles.midText, {padding: 5}]}>
                            {item.address_real}</Text>
                    </View>

                </View>
            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchProps)(LocationMap)

const styles = StyleSheet.create({})

