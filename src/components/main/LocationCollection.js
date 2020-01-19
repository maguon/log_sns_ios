import React, {Component} from 'react'
import {ScrollView, ImageBackground, Text, View, StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import {Card, WingBlank} from '@ant-design/react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import globalStyles from '../../utils/GlobalStyles'


class LocationCollection extends Component {
    constructor(props) {
        super(props)
        this.state = {
            focus: false
        }

    }

    render() {
        const {} = this.props
        return (
            <View style={[globalStyles.container, {flex: 1, paddingTop: 30}]}>
                <ScrollView>
                    <WingBlank size="lg">
                        <Card>
                            <Card.Body>
                                <View style={{flexDirection: 'row'}}>
                                    <AntDesign name="enviromento" size={25} style={{color: '#949494', marginLeft: 5}}/>
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
                                                 style={{
                                                     height: 100,
                                                     marginTop: 10,
                                                     marginLeft: 15,
                                                     marginRight: 15,
                                                 }}></ImageBackground>
                            </Card.Body>
                        </Card>
                    </WingBlank>
                </ScrollView>
            </View>

        )
    }
}

const mapStateToProps = (state) => {
    return {}
}

const mapDispatchProps = (dispatch, props) => ({})

export default connect(mapStateToProps, mapDispatchProps)(LocationCollection)

const styles = StyleSheet.create({})


