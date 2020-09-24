import React, {Component} from 'react'
import {
    View,
    Image,
    Dimensions,
    TouchableOpacity,
    ActivityIndicator
} from 'react-native'
import {Icon, Provider} from "@ant-design/react-native"
import Swiper from 'react-native-swiper'
import {CacheHelper, AnimatedCacheImage} from 'react-native-rn-cacheimage';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const {width, height} = Dimensions.get('window')


class HeadImage extends Component {
    constructor(props) {
        super(props)


    }

    render() {
        const {navigation: {state: {params: {uri}}}, navigation} = this.props
        // console.log(navigation)
        return (
            <Provider>
                <SafeAreaView style={{flex: 1}}>
                <Swiper
                    ref='Swiper'
                    loop={false}
                    loadMinimal={true}
                    loadMinimalSize={1}
                    loadMinimalLoader={<ActivityIndicator />}
                    dot={
                        <View style={{
                                backgroundColor: '#989a9e',
                                width: 5,
                                height: 5,
                                borderRadius: 4,
                                marginLeft: 3,
                                marginRight: 3,
                                marginTop: 3,
                                marginBottom: 3
                            }}
                        />
                    }

                >

                       <TouchableOpacity activeOpacity={1}  style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#000'}} onPress={()=>navigation.pop()}>
                            <AnimatedCacheImage
                                source={{ uri: uri }}
                                resizeMode='contain'
                                style={{width: width, height: height}}
                            />

                        </TouchableOpacity>

                </Swiper>

                </SafeAreaView>

            </Provider>
        )
    }
}




export default HeadImage
