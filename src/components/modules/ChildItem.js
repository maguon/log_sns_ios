import React from 'react'
import {
    FlatList,
    TouchableOpacity,
    Text,
    View,
    StyleSheet,
    Image,
    Dimensions,
    ImageBackground, Alert
} from 'react-native'
import {connect} from "react-redux"
import {Card, Toast, WhiteSpace, WingBlank} from '@ant-design/react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import globalStyles from '../../utils/GlobalStyles'
import moment from "moment"


const {width} = Dimensions.get('window')
let cellWH = (width - 2 * 20 - 15) / 3.3

class ChildItem extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            praise: false,
            star: false,
        }
    }

    renderItem({item}) {
        return (
            <TouchableOpacity activeOpacity={0.5}>
                <View style={styles.item}>
                    <Image source={{uri: item.url}}
                           style={{width: cellWH, height: cellWH, borderRadius: 5}}/>
                </View>
            </TouchableOpacity>
        )
    }

    render() {
        const {item} = this.props
        console.log(item)
        // let userInfo = []
        // let item=[]
        // if(name=='Collection'){
        //     userInfo = itemList.msg_user_detail_info[0]
        //     item=itemList.msg_info[0]
        // }else {
        //     userInfo = itemList.user_detail_info[0]
        //     item=itemList
        // }
        // if (item.carrier == 2) {
        //     if (item.media.length < 2) {
        //         cellWH = (width - 2 * 20 - 15) / 1.1
        //     } else if (item.media.length < 3) {
        //         cellWH = (width - 2 * 20 - 15) / 2.1
        //     } else if (item.media.length >= 3) {
        //         cellWH = (width - 2 * 20 - 15) / 3.3
        //     }
        // }

        return (
            <View style={{paddingTop: 30}}>
                {/*<WingBlank size="lg">*/}
                    {/*<Card>*/}
                        {/*<Card.Header*/}
                            {/*title={*/}
                                {/*<View style={{flexDirection: 'row', flex: 3, alignItems: 'center',width:width*0.8}}>*/}
                                    {/*{userInfo.avatar ? <Image source={{uri: userInfo.avatar}}*/}
                                                              {/*style={{width: 40, height: 40, borderRadius: 30}}/> :*/}
                                        {/*<Image source={require('../../images/head.png')}*/}
                                               {/*style={{width: 40, height: 40, borderRadius: 30}}/>}*/}
                                    {/*<TouchableOpacity style={{width: 280, marginLeft: 5}} onPress={() => {*/}
                                        {/*this.props.navigation.navigate('Space',{userId:item._user_id})*/}
                                    {/*}}>*/}
                                        {/*<Text*/}
                                            {/*style={globalStyles.largeText}>{userInfo.nick_name ? userInfo.nick_name : '暂无昵称'}</Text>*/}

                                        {/*<View style={{flexDirection: 'row'}}>*/}
                                            {/*<AntDesign name="enviroment" size={12} style={{color: '#ff9803'}}/>*/}
                                            {/*<Text style={[globalStyles.smallText, {*/}
                                                {/*marginTop: 2,*/}
                                                {/*marginLeft: 2,marginRight:15*/}
                                            {/*}]}>{item.address_name ? item.address_name : ''}</Text>*/}
                                        {/*</View>*/}

                                    {/*</TouchableOpacity>*/}
                                {/*</View>*/}
                            {/*}*/}

                            {/*extra={*/}
                                {/*<View style={{position:'absolute',right:0,marginTop:-15}}>*/}
                                    {/*<Text style={[globalStyles.smallText]}>{item.created_at ? `${moment(item.created_at).format('YYYY-MM-DD')}` : ''}</Text>*/}
                                    {/*{name=='Art'&&<Text style={[globalStyles.smallText]}>阅读数:{item.read_num}</Text>}*/}

                                {/*</View>*/}
                            {/*}*/}
                        {/*/>*/}
                        {/*<Card.Body>*/}
                            {/*<Text style={[globalStyles.midText, {marginLeft: 15, marginRight: 15}]} onPress={() => {*/}
                                {/*this.props.navigation.navigate('Detail')*/}
                            {/*}}>*/}
                                {/*{item.info ? (item.info.length > 40 ? item.info.substr(0, 40) + "..." : item.info) : ""}*/}
                                {/*<Text style={globalStyles.previewText}>全文</Text>*/}
                            {/*</Text>*/}
                            {/*{item.carrier == 2 && <FlatList*/}
                                {/*data={item.media}*/}
                                {/*numColumns={3}*/}
                                {/*renderItem={this.renderItem}*/}
                                {/*keyExtractor={(item, index) => `${index}`}*/}
                                {/*contentContainerStyle={styles.list_container}*/}
                            {/*/>}*/}

                            {/*{item.carrier == 3 && <ImageBackground source={require('../../images/tall.png')}*/}
                                                                   {/*style={[styles.image, {backgroundColor: '#292929'}]}>*/}
                                {/*<AntDesign name="play" size={50} style={{color: '#cecece'}}></AntDesign>*/}
                            {/*</ImageBackground>}*/}

                            {/*{item.carrier == 4 && <ImageBackground source={require('../../images/u422.png')}*/}
                                                                   {/*style={styles.image}></ImageBackground>}*/}
                        {/*</Card.Body>*/}


                        {/*<Card.Footer*/}
                            {/*content={*/}
                                {/*<View style={{*/}
                                    {/*flexDirection: 'row',*/}
                                    {/*justifyContent: 'space-between',*/}
                                    {/*alignItems: 'center'*/}
                                {/*}}>*/}
                                    {/*{name != 'Art' && <Text*/}
                                        {/*style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}*/}
                                        {/*onPress={() => {*/}
                                            {/*setCollection(item)*/}
                                        {/*}}>*/}
                                        {/*<AntDesign name={this.state.star ? "star" : "staro"} size={18}*/}
                                                   {/*style={{color: this.state.star ? '#ffa600' : '#838485'}}/>*/}
                                        {/*<Text>{userInfo.comment_num ?userInfo.comment_num:""}</Text>*/}
                                    {/*</Text>}*/}


                                    {/*<Text*/}
                                        {/*style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}*/}
                                        {/*onPress={() => {*/}
                                            {/*this.props.navigation.navigate('Comment')*/}
                                        {/*}}>*/}
                                        {/*<AntDesign name="message1" size={18}/>*/}
                                        {/*<Text>{userInfo.comment_num?userInfo.comment_num:""}</Text>*/}
                                    {/*</Text>*/}

                                    {/*<Text*/}
                                        {/*style={[globalStyles.midText, {flexDirection: 'row', alignItems: 'center'}]}*/}
                                        {/*onPress={() => {*/}
                                            {/*this.setState({*/}
                                                {/*praise: !this.state.praise*/}
                                            {/*})*/}
                                        {/*}}>*/}
                                        {/*<AntDesign name={this.state.praise ? "like1" : "like2"} size={18}*/}
                                                   {/*style={{color: this.state.praise ? '#ffa600' : '#838485'}}/>*/}
                                        {/*<Text>{userInfo.comment_num?userInfo.comment_num:""}</Text>*/}
                                    {/*</Text>*/}


                                    {/*{name == 'Art' && <Text style={[globalStyles.midText, {fontSize: 14}]}*/}
                                                            {/*onPress={() => {*/}
                                                                {/*Alert.alert("", "确认删除", [{*/}
                                                                    {/*text: "确定",*/}
                                                                    {/*onPress:itemDelete*/}
                                                                {/*}, {text: "取消",*/}
                                                                    {/*onPress: () => console.log("canncel")*/}
                                                                {/*}])*/}
                                                            {/*}}>删除</Text>}*/}
                                {/*</View>*/}
                            {/*}*/}
                        {/*/>*/}
                    {/*</Card>*/}
                {/*</WingBlank>*/}
                {/*<WhiteSpace size="lg"/>*/}
            </View>

        );
    }
}

const mapStateToProps = (state) => {
    return {
        // itemReducer: state.ItemReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    // itemDelete: () => {
    //     dispatch(action.ArticleAction.itemDelete(props))
    // },
    // setCollection: (value) => {
    //     dispatch(action.ItemAction.setCollection(value))
    // },
    // delCollection: (value) => {
    //     dispatch(action.ItemAction.delCollection(value))
    // },
    // delColl: (value) => {
    //     dispatch(action.ItemAction.delColl(value))
    // },

})

export default connect(mapStateToProps, mapDispatchProps)(ChildItem)

const styles = StyleSheet.create({

    list_container: {
        marginTop: 10,
        marginLeft: -5,
        // 主轴方向
        flexDirection: 'column',
        justifyContent: 'space-between',
        // 一行显示不下,换一行
        // flexWrap: 'wrap',
        // 侧轴方向
        // alignContent: 'space-between', // 必须设置,否则换行不起作用
        paddingHorizontal: 20,
    },
    item: {
        marginTop: 5,
        marginLeft: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        flex: 1,
        height: 150,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
})
