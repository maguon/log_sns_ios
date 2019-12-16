import React from 'react'
import { View, Text } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globalStyles from '../../../../../utils/GlobalStyles'

const PersonCenter = props => {
    return (
        <View style={[globalStyles.container, { flex: 1 }]}>
            <View>
            </View>
            <View style={{ height: 20, backgroundColor: '#f1f1f1' }} />
            <View icon last style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginLeft: 20 }}>
                    <FontAwesome name="file-text-o" style={{ fontSize: 24, color: '#999' }} />
                </View>
                <View style={{ paddingVertical: 15, marginLeft: 20, paddingRight: 20, flex: 1 }}>
                    <Text>我的文章(128)</Text>
                </View>
                <View style={{ paddingRight: 15, alignSelf: 'stretch', justifyContent: 'center' }}>
                    <FontAwesome name="angle-right" style={{ fontSize: 20, color: '#ccc' }} />
                </View>
            </View>
            <View style={{ height: 20, backgroundColor: '#f1f1f1' }} />
            <View icon last style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginLeft: 20 }}>
                    <FontAwesome name="heart-o" style={{ fontSize: 24, color: '#999' }} />
                </View>
                <View style={{ paddingVertical: 15, marginLeft: 20, paddingRight: 20, flex: 1, borderBottomColor: "#ccc", borderBottomWidth: 0.5 }}>
                    <Text>我的关注(128)</Text>
                </View>
                <View style={{ paddingRight: 15, borderBottomColor: "#ccc", borderBottomWidth: 0.5, alignSelf: 'stretch', justifyContent: 'center' }}>
                    <FontAwesome name="angle-right" style={{ fontSize: 20, color: '#ccc' }} />
                </View>
            </View>
            <View icon last style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginLeft: 20 }}>
                    <FontAwesome name="smile-o" style={{ fontSize: 24, color: '#999' }} />
                </View>
                <View style={{ paddingVertical: 15, marginLeft: 20, paddingRight: 20, flex: 1 }}>
                    <Text>我的粉丝(128)</Text>
                </View>
                <View style={{ paddingRight: 15, alignSelf: 'stretch', justifyContent: 'center' }}>
                    <FontAwesome name="angle-right" style={{ fontSize: 20, color: '#ccc' }} />
                </View>
            </View>

            <View style={{ height: 20, backgroundColor: '#f1f1f1' }} />
            <View icon last style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginLeft: 20 }}>
                    <FontAwesome name="star-o" style={{ fontSize: 24, color: '#999' }} />
                </View>
                <View style={{ paddingVertical: 15, marginLeft: 20, paddingRight: 20, flex: 1, borderBottomColor: "#ccc", borderBottomWidth: 0.5 }}>
                    <Text>我的收藏(128)</Text>
                </View>
                <View style={{ paddingRight: 15, borderBottomColor: "#ccc", borderBottomWidth: 0.5, alignSelf: 'stretch', justifyContent: 'center' }}>
                    <FontAwesome name="angle-right" style={{ fontSize: 20, color: '#ccc' }} />
                </View>
            </View>


            <View icon last style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginLeft: 20 }}>
                    <FontAwesome name="pencil" style={{ fontSize: 24, color: '#999' }} />
                </View>
                <View style={{ paddingVertical: 15, marginLeft: 20, paddingRight: 20, flex: 1, borderBottomColor: "#ccc", borderBottomWidth: 0.5 }}>
                    <Text>我的评价</Text>
                </View>
                <View style={{ paddingRight: 15, borderBottomColor: "#ccc", borderBottomWidth: 0.5, alignSelf: 'stretch', justifyContent: 'center' }}>
                    <FontAwesome name="angle-right" style={{ fontSize: 20, color: '#ccc' }} />
                </View>
            </View>

            <View icon last style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginLeft: 20 }}>
                    <FontAwesome name="smile-o" style={{ fontSize: 24, color: '#999' }} />
                </View>
                <View style={{ paddingVertical: 15, marginLeft: 20, paddingRight: 20, flex: 1 }}>
                    <Text>我参与的投票</Text>
                </View>
                <View style={{ paddingRight: 15, alignSelf: 'stretch', justifyContent: 'center' }}>
                    <FontAwesome name="angle-right" style={{ fontSize: 20, color: '#ccc' }} />
                </View>
            </View>

            <View style={{ height: 20, backgroundColor: '#f1f1f1' }} />

            <View icon last style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginLeft: 20 }}>
                    <FontAwesome name="map-marker" style={{ fontSize: 24, color: '#999' }} />
                </View>
                <View style={{ paddingVertical: 15, marginLeft: 20, paddingRight: 20, flex: 1 }}>
                    <Text>我收藏的位置</Text>
                </View>
                <View style={{ paddingRight: 15, alignSelf: 'stretch', justifyContent: 'center' }}>
                    <FontAwesome name="angle-right" style={{ fontSize: 20, color: '#ccc' }} />
                </View>
            </View>
            <View style={{ height: 20, backgroundColor: '#f1f1f1' }} />
            <View icon last style={{ backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center' }}>
                <View style={{ marginLeft: 20 }}>
                    <FontAwesome name="cog" style={{ fontSize: 24, color: '#999' }} />
                </View>
                <View style={{ paddingVertical: 15, marginLeft: 20, paddingRight: 20, flex: 1 }}>
                    <Text>设置</Text>
                </View>
                <View style={{ paddingRight: 15, alignSelf: 'stretch', justifyContent: 'center' }}>
                    <FontAwesome name="angle-right" style={{ fontSize: 20, color: '#ccc' }} />
                </View>
            </View>


            <View style={{ height: 20, backgroundColor: '#f1f1f1' }} />

            {/* <ListItem icon last style={{ backgroundColor: '#fff' }}>

                <Text>退出当前账号</Text>

            </ListItem> */}

            {/* </Content> */}
        </View>
    )
}

export default PersonCenter
