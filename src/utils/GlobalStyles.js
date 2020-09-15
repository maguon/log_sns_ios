import {
    StyleSheet
} from 'react-native'


const globalStyles = StyleSheet.create({
    container: {
        backgroundColor: '#fafafa'
    },
    styleColor: {
        color: '#1598cc'
    },
    styleBackgroundColor: {
        backgroundColor: '#1598cc'
    },
    containerBackgroundColor:{
        backgroundColor: '#f0f0f0',
    },
    lightText:{
        fontSize: 12,
        color: '#b7b8b9'
    },
    textColor:{
        color: '#838485'
    },
    midText: {
        fontSize: 14,
        color: '#838485'
    },
    smallText: {
        fontSize: 12,
        color: '#838485'
    },
    ssText: {
        fontSize: 10,
        color: '#838485'
    },
    largeText:{
        fontSize: 16,
        color: '#414445'
    },
    fourText:{
        fontSize: 14,
        color: '#414445'
    },
    xlText:{
        fontSize: 18,
        color: '#414445'
    },
    xxlText:{
        fontSize: 20,
        color: '#414445'
    },
    xxxlText:{
        fontSize: 24,
        color: '#414445'
    },
    formIcon:{
        marginLeft: 10,
        fontSize:20,
        color: '#777'
    },
    listBackgroundColor:{
        backgroundColor: '#edf1f4'
    },
    errorText:{
        fontSize: 12,
        color: 'red'
    },
    separator:{
        height:15
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
    },
    previewText:{
        fontSize: 16,
        color: '#1598cc'
    },
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
        justifyContent: 'center',
        backgroundColor:'#aaa'
    },
    image: {
        flex: 1,
        height: 200,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    focus: {
        overflow: 'hidden',
        width: 60,
        height: 20,
        lineHeight: 20,
        textAlign: 'center',
        borderRadius: 10,
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 12,
        marginRight: 0
    },
})

export const styleColor='#1598cc'

export default globalStyles
