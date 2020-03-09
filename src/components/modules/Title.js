import React from 'react';
import {Text, View, Dimensions} from 'react-native'
import {Popover, Tabs} from '@ant-design/react-native'
import EvilIcons from 'react-native-vector-icons/EvilIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import Home from '../main/Home'


const Item = Popover.Item
const {width} = Dimensions.get('window')
const tabs = [{title: '热门'}, {title: '关注'}, {title: '附近'},]

class Title extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: '',
        };

    }


    renderList(overlay, key) {
        return (
            <Popover
                key={key}
                overlay={overlay}
                placement="bottom"
                onSelect={v => {
                    if (v == "发布文章") {
                        this.props.navigation.navigate("WriteArticle",{title:v})
                    } else if (v == "发布求助") {
                        this.props.navigation.navigate("WriteArticle",{title:v})
                    } else if (v == "扫一扫") {
                        this.props.navigation.navigate("Scan")
                    } else {
                        this.props.navigation.navigate("Location")
                    }
                }


                    // this.setState({
                    //     [`selected${key}`]: v,
                    // })
                }
            >
                <AntDesign name='plus' size={30} style={{color: '#fff'}}/>
            </Popover>
        )
    }


    render() {
        const {navigation: {state: {routeName}}} = this.props
        let overlay = [].map((i, index) => (
            <Item key={index} value={`${i}`}>
                <Text>{i}</Text>
            </Item>
        ))
        overlay = overlay.concat([

            <Item key="0" value="发布文章">
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name='rename-box' size={20} style={{color: "#838485"}}></Icon>
                    <Text style={{marginLeft: 5, color: "#838485"}}>发布文章</Text>
                </View>
            </Item>,
            <Item key="1" value="发布求助">
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name='help' size={20} style={{color: "#838485"}}></Icon>
                    <Text style={{marginLeft: 5, color: "#838485"}}>发布求助</Text>
                </View>
            </Item>,
            <Item key="2" value="扫一扫">
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name='qrcode-scan' size={20} style={{color: "#838485"}}></Icon>
                    <Text style={{marginLeft: 5, color: "#838485"}}>扫一扫</Text>
                </View>
            </Item>,
            <Item key="3" value="收藏定位">
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Icon name='map-marker' size={20} style={{color: "#838485"}}></Icon>
                    <Text style={{marginLeft: 5, color: "#838485"}}>收藏定位</Text>
                </View>
            </Item>

        ])


        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
                <View style={{width: width * 0.2, alignItems: 'center'}}>
                    <EvilIcons name='camera' size={35} style={{color: '#fff'}} onPress={() => {
                        this.props.navigation.navigate("Camera")
                    }}/>
                </View>
                {routeName == 'Home' &&
                <View style={{width: width * 0.6, height: 45.5, alignItems: 'center', backgroundColor: '#1598cc'}}>
                    <Tabs tabs={tabs}
                          onChange={(tab, index) => {
                              this.props.navigation.setParams({tab: tab, index: index})
                          }}
                          tabBarBackgroundColor='#1598cc'
                          tabBarActiveTextColor='#fff'
                          tabBarInactiveTextColor='#E1E1E1'
                          tabBarUnderlineStyle={{backgroundColor: '#fff'}}
                          tabBarTextStyle={{fontSize: 16, fontWeight: 'bold'}}
                          activeTab={1}
                    >
                    </Tabs>
                </View>}
                {routeName != 'Home' &&
                <View style={{width: width * 0.6, alignItems: 'center', backgroundColor: '#1598cc'}}>
                    <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>社区</Text>
                </View>}

                <View style={{width: width * 0.2, alignItems: 'center'}}>
                    <React.Fragment>
                        {[1].map(item => this.renderList(overlay, item))}
                    </React.Fragment>
                </View>

            </View>

        )
    }
}


export default Title




