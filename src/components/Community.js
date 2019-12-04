import React,{Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import globalStyles from "../utils/GlobalStyles";
import {Tab, Tabs} from "native-base";
import Focus from "./Focus";
import Hot from "./Hot";
import Near from "./Near";


class Community extends Component{
    constructor(props){
        super(props)
    }

    render(){
        return(
            <View style={[styles.header, globalStyles.styleBackgroundColor]}>

                <Tabs tabBarUnderlineStyle={{backgroundColor: 'white'}}>
                    <Tab
                        tabStyle={{backgroundColor: '#1598cc'}}
                        activeTabStyle={{backgroundColor: '#1598cc'}}
                        activeTextStyle={{fontSize: 14,color: '#fff' }}
                        textStyle={{fontSize: 14, color: '#fff' }}
                        heading="最新发布">
                        <Focus />
                    </Tab>
                    <Tab
                        tabStyle={{backgroundColor: '#1598cc'}}
                        activeTabStyle={{backgroundColor: '#1598cc'}}
                        activeTextStyle={{ fontSize: 14,color: '#fff' }}
                        textStyle={{fontSize: 14, color: '#fff' }}
                        heading="视频">
                        <Hot />
                    </Tab>
                    <Tab
                        tabStyle={{backgroundColor: '#1598cc'}}
                        activeTabStyle={{backgroundColor: '#1598cc'}}
                        activeTextStyle={{ fontSize: 14,color: '#fff' }}
                        textStyle={{ fontSize: 14,color: '#fff' }}
                        heading="救助">
                        <Near />
                    </Tab>
                    <Tab
                        tabStyle={{backgroundColor: '#1598cc'}}
                        activeTabStyle={{backgroundColor: '#1598cc'}}
                        activeTextStyle={{ fontSize: 14,color: '#fff' }}
                        textStyle={{fontSize: 14, color: '#fff' }}
                        heading="投票">
                        <Hot />
                    </Tab>

                </Tabs>

            </View>

        )
    }
}

const styles = StyleSheet.create({

    header: {
        justifyContent: 'center',
        alignItems: 'center',
        width:window.width,
        flex: 1,
    },
    body: {
        flex: 4,
    },

})

export default Community
