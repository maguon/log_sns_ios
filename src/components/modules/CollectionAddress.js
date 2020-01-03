import React from 'react';
import {ScrollView, ImageBackground, Text, View, StyleSheet} from 'react-native';
import {Card, WhiteSpace, WingBlank} from '@ant-design/react-native';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import httpRequest from '../../utils/HttpRequest'
import globalStyles from '../../utils/GlobalStyles'


export default class CollectionAddress extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            focus: false
        }
    }


    render() {
        return (
            <ScrollView>
                <View style={{paddingTop: 30}}>
                    <WingBlank size="lg">
                        <Card>
                            <Card.Body>
                                <View style={{flexDirection: 'row'}}>
                                    <AntDesign name="enviroment" size={30} style={{color: '#949494',marginLeft:5}}/>
                                    <View style={{width: 280, marginLeft: 5}}>
                                        <Text style={globalStyles.largeText}>地址名称地址名称</Text>
                                        <View style={{flexDirection: 'row'}}>
                                            <Text style={[globalStyles.midText, {
                                                marginTop: 5
                                            }]}>大连开发区凯伦国际</Text>
                                        </View>

                                    </View>
                                    <FontAwesome name="location-arrow" size={20} style={{color: '#949494'}}/>
                                </View>

                                <ImageBackground source={require('../../images/u422.png')}
                                                 style={{height: 100, marginTop: 10, marginLeft: 15, marginRight: 15,}}></ImageBackground>

                            </Card.Body>


                        </Card>
                    </WingBlank>
                    <WhiteSpace size="lg"/>
                </View>
            </ScrollView>
        );
    }
}


