import React from 'react'
import {
    View,
    Text,
    Dimensions,
    Image,
    StyleSheet,
    FlatList,
    ActivityIndicator,
    TouchableOpacity,
    Alert
} from 'react-native'
import {connect} from "react-redux"
import {Button, WingBlank, WhiteSpace, List, ListView, Provider} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'
import * as action from "../../action/index"
import index from "../../reducer";
import * as actionType from "../../actionType";
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const {width} = Dimensions.get('window')

class Shielding extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            focus: false
        }
    }

    componentDidMount() {
        this.props.shieldList()
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
    removeShielding = (param) => {
        Alert.alert("", `确定要取消屏蔽吗？`, [ {text: "取消"},{
            text: "确定", onPress: () => {
                this.props.removeShielding(param)
            }
        }])

    }
    Shielding = (param) => {
        this.props.Shielding(param)
    }
    renderItem = (props) => {
        const {item, index} = props
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',}} >
                    <TouchableOpacity  style={style.content} onPress={() => this.props.navigation.navigate("Space", {userId: item._user_id})}>
                    {item.avatar ? <Image source={{uri: item.avatar}} style={style.image}/> :
                        <Image source={require('../../images/head.png')}
                               style={style.image}/>}
                    <View>
                        <Text
                            style={globalStyles.largeText}>{item.nick_name ? item.nick_name :""}</Text>
                        <Text
                            style={[globalStyles.smallText, {marginTop: 2}]}>{item.real_name ? `${item.real_name}` : "无签名"}</Text>
                    </View>
                    </TouchableOpacity>
                    <Text style={[style.focus, {backgroundColor: "#fff"}]}
                                                   onPress={() => {
                                                       this.removeShielding({ShieldingUserId: item._user_id, index: index})
                                                   }}>取消屏蔽</Text>

                </TouchableOpacity>

                <Text style={{backgroundColor: '#d7d7d7', width: width * 0.82, height: 0.2, marginLeft: width * 0.18}}/>
            </View>
        );
    };

    render() {
        const {ShieldingReducer: {shieldingList, isResultStatus,isComplete},shieldList} = this.props
        console.log(shieldingList)
        return (
            <Provider>
                <SafeAreaView style={{flex: 1}}>
                <FlatList
                    contentContainerStyle={{padding: 7.5}}
                    data={shieldingList}
                    renderItem={this.renderItem}
                    // ListEmptyComponent={this.renderEmpty}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (!isComplete) {
                            shieldList()
                        }
                    }}
                    ListFooterComponent={this.ListFooterComponent(isResultStatus)}

                />
                </SafeAreaView>
            </Provider>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        ShieldingReducer: state.ShieldingReducer
    }
}

const mapDispatchProps = (dispatch, ownProps) => ({
    loading: () => {
        dispatch({type: actionType.ShieldingActionType.loading_shieldingList})
    },
    shieldList: () => {
        dispatch(action.ShieldingAction.shieldList())
    },

    removeShielding: (param) => {
        dispatch(action.ShieldingAction.removeShielding(param))
    }
})

export default connect(mapStateToProps, mapDispatchProps)(Shielding)


const style = StyleSheet.create({
    content: {
        padding: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    focus: {
        // overflow: 'hidden',
        width: 60,
        height: 20,
        lineHeight: 20,
        textAlign: 'center',
        backgroundColor: '#ffd000',
        borderWidth: 0.5,
        borderColor: '#000',
        color: '#000',
        fontSize: 12,
        position: 'absolute',
        right: 10
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 15,
        borderRadius: 30,
    },
})







