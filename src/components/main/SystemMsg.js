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
import {Provider} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'
import * as action from "../../action/index"
import moment from "moment";
import * as actionType from "../../actionType";



const {width} = Dimensions.get('window')

class SystemMsg extends React.Component {
    constructor(props) {
        super(props)

    }

    componentDidMount() {
        this.props.getSystemMsg()
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
        return (
            <View style={{flex: 1}}>
                <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center',}} >

                        <View style={{padding:10}}>
                            <Text
                                style={globalStyles.largeText}>{item.info ? (item.info.length > 40 ? item.info.substr(0, 40) + "..." : item.info) : ""}
                                {item.info.length > 40 ? <Text style={globalStyles.previewText}>全文</Text> : ""}</Text>
                            <Text
                                style={[globalStyles.smallText, {marginTop: 2}]}>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD')}` : ''}</Text>
                        </View>



                </TouchableOpacity>

                <Text style={{backgroundColor: '#d7d7d7', width: width , height: 0.2}}/>
            </View>
        );
    };

    render() {
        const {SystemMsgReducer: {systemMsg, isResultStatus,isComplete},getSystemMsg} = this.props
        console.log(systemMsg)
        return (
            <Provider>
                <FlatList
                    contentContainerStyle={{padding: 7.5}}
                    data={systemMsg}
                    renderItem={this.renderItem}
                    // ListEmptyComponent={this.renderEmpty}
                    onEndReachedThreshold={0.2}
                    onEndReached={() => {
                        if (!isComplete) {
                            getSystemMsg()
                        }
                    }}
                    ListFooterComponent={this.ListFooterComponent(isResultStatus)}

                />
            </Provider>
        )
    }

}

const mapStateToProps = (state) => {
    return {
        SystemMsgReducer: state.SystemMsgReducer
    }
}

const mapDispatchProps = (dispatch, ownProps) => ({
    loading: () => {
        dispatch({type: actionType.SystemMsgType.loading_systemMsg})
    },
    getSystemMsg: () => {
        dispatch(action.SystemMsgAction.getSystemMsg())
    },

})

export default connect(mapStateToProps, mapDispatchProps)(SystemMsg)


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









