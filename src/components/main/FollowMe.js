import React from 'react'
import {View, Text, Dimensions, Image, StyleSheet, FlatList, ActivityIndicator,TouchableOpacity} from 'react-native'
import {Button, WingBlank, WhiteSpace, List, ListView} from '@ant-design/react-native'
import globalStyles from '../../utils/GlobalStyles'


const {width} =Dimensions.get('window')

class FollowMe extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            layout: 'list',
            focus:false
        }
    }


    renderEmpty = () =>{
        return (
            <View style={style.listEmptyContainer}>
                <Text style={[globalStyles.largeText, style.listEmptyText]}>暂无关注</Text>
            </View>
        )
    }
    ListFooterComponent = () => {
        return (
            <View style={style.footerContainer}>
                <ActivityIndicator color={globalStyles.styleColor} styleAttr='Small' />
                <Text style={[globalStyles.smallText, style.footerText]}>正在加载...</Text>
            </View>
        )
    }

    renderItem = props => {
        const { item } = props
        return (
            <View style={{flex:1}} >
                <TouchableOpacity style={style.content}  onPress={()=>{this.props.navigation.goBack()}} >
                    <Image source={require('../../images/head.png')}
                           style={style.image}/>
                    <View>
                        <Text style={globalStyles.largeText}>昵称{item}</Text>
                        <Text style={[globalStyles.smallText,{marginTop:2}]}>2019-6-25 11:30</Text>
                    </View>

                    <Text
                        style={[style.focus, {backgroundColor: this.state.focus ? "#ffd000" : "#fff"}]}
                        onPress={() => {
                            this.setState({focus: !this.state.focus})
                        }}>{this.state.focus ? "关注":"相互关注"}</Text>

                </TouchableOpacity>

                <Text style={{backgroundColor:'#d7d7d7',width:width*0.82,height:0.2,marginLeft:width*0.18}} />
            </View>
        );
    };

    render() {
        const List=[1,2,3]
        return (
            <FlatList
                contentContainerStyle={{padding: 7.5}}
                keyExtractor={(item, index) => `${index}`}
                data={List}
                renderItem={this.renderItem}
                ListEmptyComponent={this.renderEmpty}
                ListFooterComponent={this.ListFooterComponent}
            />

        )
    }

}
export default FollowMe

const style = StyleSheet.create({
    content:{
        padding: 10,
        flexDirection:'row',
        alignItems:'center',
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
        position:'absolute',
        right:10
    },
    image:{
        width: 40,
        height: 40,
        marginRight: 15,
        borderRadius: 30,
    },
    listEmptyContainer: {
        alignItems: 'center',
        marginTop: 60
    },
    listEmptyText: {
        color: '#aaa',
        marginTop: 30
    },
    footerContainer: {
        alignSelf: 'center',
        flexDirection: 'row',
        margin: 10,
        alignItems: 'center'
    },
    footerText: {
        paddingLeft: 10
    }
})






