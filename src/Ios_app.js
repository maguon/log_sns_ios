import React, {Component} from 'react'
import {StyleSheet} from 'react-native'
import {
    Scene,
    Router,
    Modal,
    Lightbox,
    Stack
}from 'react-native-router-flux'
import Orientation from 'react-native-orientation'

//导航相关页面
import Recommend from './components/Recommend'
import Community from './components/Community'
import Help from './components/Help'
import Message from './components/Message'
import User from './components/User'



//通用
import TabIcon from './utils/TabIcon'
import LeftButton from './utils/LeftButton'
import RightButton from './utils/RightButton'
import NavBar from './utils/NavBar'



export default class Ios_app extends Component{
    constructor(props){
        super(props)
    }


    componentDidMount() {
        Orientation.lockToPortrait()

    }

    render(){
        return(
            <Router>
                <Modal hideNavBar>
                    <Lightbox>
                        <Scene key="root"
                            //是否显示标题栏
                               hideNavBar>
                            <Stack key="appMain"
                                //tabBarPosition设置tab是在top还是bottom
                                   tabBarPosition="bottom"
                                //是否打开下部导航栏
                                   tabs={true}
                                //是否显示标签栏文字
                                   showLabel={true}
                                //下部导航栏样式
                                   tabBarStyle={styles.tabBarStyle}
                                //选项卡栏选择项目样式
                                   tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}
                            >

                                <Scene key='recommendBlock'
                                       title='推荐'
                                       initial={true}
                                       icon={TabIcon}
                                       online='ios-home'
                                       outline='ios-home'
                                       size={30}
                                >
                                    <Scene key="home"
                                           initial={true}
                                           hideNavBar={false}
                                           navBar={NavBar}
                                           component={Recommend}
                                           LeftButton={LeftButton}
                                           RightButton={RightButton}
                                    />

                                </Scene>
                                <Scene key='communityBlock'
                                       initial={true}
                                       title='社区'
                                       icon={TabIcon}
                                       online='ios-people'
                                       outline='ios-people'
                                       size={30}
                                >
                                    <Scene key="community"
                                           initial={true}
                                           hideNavBar={false}
                                           component={Community}
                                           navBar={NavBar}
                                           LeftButton={LeftButton}
                                           RightButton={RightButton}
                                    />
                                </Scene>
                                <Scene key='helpBlock'
                                       initial={true}
                                       title='ban'
                                       icon={TabIcon}
                                       online='ios-create'
                                       outline='ios-create'
                                       size={30}
                                >
                                    <Scene key="help"
                                           initial={true}
                                           hideNavBar={false}
                                           component={Help}
                                           navBar={NavBar}
                                           LeftButton={LeftButton}
                                           RightButton={RightButton}
                                    />
                                </Scene>
                                <Scene key='messageBlock'
                                       initial={true}
                                       title='消息'
                                       icon={TabIcon}
                                       online='ios-chatboxes'
                                       outline='ios-chatboxes'
                                       size={30}
                                >
                                    <Scene key="message"
                                           initial={true}
                                           hideNavBar={false}
                                           component={Message}
                                           navBar={NavBar}
                                    />
                                </Scene>
                                <Scene key='userBlock'
                                       initial={true}
                                       title='个人'
                                       icon={TabIcon}
                                       online='ios-person'
                                       outline='ios-person'
                                       size={30}
                                >
                                    <Scene key="user"
                                           initial={true}
                                           title='个人'
                                           hideNavBar={false}
                                           component={User}
                                           navBar={NavBar}
                                    />
                                </Scene>

                            </Stack>
                        </Scene>
                    </Lightbox>
                </Modal>
            </Router>
        )
  }

}
const styles = StyleSheet.create({
    tabBarStyle: {
        backgroundColor: '#E0E4E7',
    },
    tabBarSelectedItemStyle: {
        backgroundColor: '#E0E4E7',
    },
})











// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   ScrollView,
//   View,
//   Text,
//   StatusBar,
// } from 'react-native';
//
// import {
//   Header,
//   LearnMoreLinks,
//   Colors,
//   DebugInstructions,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';
//
// const Ios_app: () => React$Node = () => {
//   return (
//     <>
//       <StatusBar barStyle="dark-content" />
//       <SafeAreaView>
//         <ScrollView
//           contentInsetAdjustmentBehavior="automatic"
//           style={styles.scrollView}>
//           <Header />
//           {global.HermesInternal == null ? null : (
//             <View style={styles.engine}>
//               <Text style={styles.footer}>Engine: Hermes</Text>
//             </View>
//           )}
//           <View style={styles.body}>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Step One</Text>
//               <Text style={styles.sectionDescription}>
//                 Edit <Text style={styles.highlight}>App.js</Text> to change this
//                 screen and then come back to see your edits.
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>See Your Changes</Text>
//               <Text style={styles.sectionDescription}>
//                 <ReloadInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Debug</Text>
//               <Text style={styles.sectionDescription}>
//                 <DebugInstructions />
//               </Text>
//             </View>
//             <View style={styles.sectionContainer}>
//               <Text style={styles.sectionTitle}>Learn More</Text>
//               <Text style={styles.sectionDescription}>
//                 Read the docs to discover what to do next:
//               </Text>
//             </View>
//             <LearnMoreLinks />
//           </View>
//         </ScrollView>
//       </SafeAreaView>
//     </>
//   );
// };
//
// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });
//
// export default Ios_app;
