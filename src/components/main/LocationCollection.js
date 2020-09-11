import React, {Component} from 'react'
import {
    ScrollView,
    ImageBackground,
    Text,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    Alert,
    TouchableOpacity, Image, Dimensions
} from 'react-native'
import {connect} from 'react-redux'
import {Card, Provider, WingBlank} from '@ant-design/react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globalStyles from '../../utils/GlobalStyles'
import * as action from "../../action/index";
import {MapView} from "react-native-amap3d"
import * as actionType from "../../actionType";

const {width, height} = Dimensions.get('window')

class LocationCollection extends Component {
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

    componentDidMount() {
        this.props.getLocationList()
    }
    componentWillUnmount() {
        this.props.loading()
    }

    renderEmpty = () => {
        return (
            <View style={globalStyles.listEmptyContainer}>
                <Text style={[globalStyles.largeText, globalStyles.listEmptyText]}>暂无内容</Text>
            </View>
        )
    }

    ListFooterComponent = (param) => {
        if(param==0){
            return (
                <View style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                    <ActivityIndicator/>
                </View>
            )
        }else if (param == 1) {
            return(
                <View style={globalStyles.footerContainer}>
                    <Text style={[globalStyles.smallText, globalStyles.footerText]}>没有更多数据了</Text>
                </View>
            )

        } else if (param == 2) {
            return (
                <View style={globalStyles.footerContainer}>
                    <ActivityIndicator/>
                    <Text style={[globalStyles.smallText, globalStyles.footerText]}>正在加载更多数据...</Text>
                </View>
            )
        }
    }

    renderItem = (props) => {
        const {item, index} = props
        console.log(item)
        return (
            <View style={[globalStyles.container, {flex: 1, paddingTop: 30}]}>

                <WingBlank size="lg">
                    <Card>
                        <Card.Body>

                            <TouchableOpacity style={{flexDirection: 'row'}} onPress={()=>{  this.props.navigation.navigate('LocationMap', {item: item})}}>
                                <AntDesign name="enviromento" size={20} style={{color: '#949494', marginLeft: 5}}/>
                                <View style={{width: width * 0.65, marginLeft: 5}}>
                                    <Text style={globalStyles.fourText}>{item.address_real}</Text>
                                    <View style={{flexDirection: 'row' }}>
                                        <Text
                                            style={[globalStyles.smallText, {marginTop: 5}]}>{item.address_name}</Text>
                                    </View>

                                </View>

                            </TouchableOpacity>
                            <TouchableOpacity style={{position:"absolute",right:10,top:5}} onPress={()=>{
                                Alert.alert("", "确定要删除收藏的位置吗", [{text: "取消"}, {
                                    text: "确定", onPress: () => {
                                        this.props.clearLocationList({id:item._id})
                                    }
                                }])


                            }}>
                            <AntDesign name="closecircleo" size={20} style={{color: '#949494'}}/>
                            </TouchableOpacity>

                            <MapView
                                locationEnabled
                                locationInterval={10000}
                                zoomLevel={14}
                                coordinate={{latitude: item.address[1], longitude: item.address[0]}}
                                style={{height: 120, marginTop: 10, marginLeft: 15, marginRight: 15}}>

                            </MapView>

                        </Card.Body>
                    </Card>
                </WingBlank>

            </View>
        );
    };

    render() {
        const {LocationCollectionReducer: {LocationList, isResultStatus, isComplete}, getLocationList} = this.props

        return (
            <Provider>
                <FlatList
                    contentContainerStyle={{padding: 7.5}}
                    data={LocationList}
                    renderItem={this.renderItem}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (!isComplete) {
                            getLocationList()
                        }
                    }}
                    ListFooterComponent={this.ListFooterComponent(isResultStatus)}
                    // ListEmptyComponent={this.renderEmpty}
                />
            </Provider>

        )
    }
}

const mapStateToProps = (state) => {
    return {
        LocationCollectionReducer: state.LocationCollectionReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    loading: () => {
        dispatch({type: actionType.LocationCollectionType.loading_LocationList})
    },
    getLocationList: () => {
        dispatch(action.LocationCollectionAction.getLocationList())
    },
    clearLocationList: (prama) => {
        dispatch(action.LocationCollectionAction.clearLocationList(prama))
    },
})

export default connect(mapStateToProps, mapDispatchProps)(LocationCollection)

const styles = StyleSheet.create({})


