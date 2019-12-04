import React,{Component} from 'react'
import {View, Text, StatusBar, Dimensions, StyleSheet} from 'react-native'
import {Body, Button, Header, Left, Right, Tab, Tabs, Title} from "native-base";
import Focus from "./Focus";
import Hot from "./Hot";
import Near from "./Near";
import globalStyles from "../utils/GlobalStyles";
import {Actions} from "react-native-router-flux";
import Icon from "react-native-vector-icons/EvilIcons";

const window = Dimensions.get('window');

class Recommend extends Component{
    constructor(props){
        super(props)
        this.state={
            tabType:0
        }
    }



    render(){
        return (
                <View style={[styles.header, globalStyles.styleBackgroundColor]}>

                    <Tabs tabBarUnderlineStyle={{backgroundColor: 'white'}}>
                        <Tab
                            tabStyle={{backgroundColor: '#1598cc'}}
                            activeTabStyle={{backgroundColor: '#1598cc'}}
                            activeTextStyle={{fontSize: 16,color: '#fff' }}
                            textStyle={{fontSize: 16, color: '#fff' }}
                            heading="热门">
                            <Focus />
                        </Tab>
                        <Tab
                            tabStyle={{backgroundColor: '#1598cc'}}
                            activeTabStyle={{backgroundColor: '#1598cc'}}
                            activeTextStyle={{ fontSize: 16,color: '#fff' }}
                            textStyle={{fontSize: 16, color: '#fff' }}
                            heading="关注">
                            <Hot />
                        </Tab>
                        <Tab
                            tabStyle={{backgroundColor: '#1598cc'}}
                            activeTabStyle={{backgroundColor: '#1598cc'}}
                            activeTextStyle={{ fontSize: 16,color: '#fff' }}
                            textStyle={{ fontSize: 16,color: '#fff' }}
                            heading="附近">
                            <Near />
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

export default Recommend
