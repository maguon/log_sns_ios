import Orientation from 'react-native-orientation'
import {View, Text, Button} from 'react-native'
import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/Ionicons'
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'

//views
import Login from './pages/components/views/loginPage/login/Login'
import Registered from './pages/components/views/loginPage/registered/Registered'
import ForgotPassWord from './pages/components/views/loginPage/forgotPassWord/ForgotPassWord'
import Home from './pages/components/views/home/Home'
import Community from './pages/components/views/community/Community'
import MessageList from './pages/components/views/message/messageList/MessageList'
import Settings from './pages/components/views/person/settings/Settings'
import FollowList from './pages/components/views/person/followList/FollowList'
import PersonCenter from './pages/components/views/person/personCenter/PersonCenter'


//modules
import NavBar from './pages/components/modules/NavBar'
import LeftButton from './pages/components/modules/LeftButton'
import RightButton from './pages/components/modules/RightButton'
import Title from './pages/components/modules/Title'


//登录页面
const LoginPage = createStackNavigator({
        Login: {
            screen: Login,
            navigationOptions: {
                header: null
            }
        },
        Registered: {
            screen: Registered,
            navigationOptions: ({navigation}) => ({
                title: '注册',
                headerLeft: <LeftButton navigation={navigation}/>
            })
        },
        ForgotPassWord: {
            screen: ForgotPassWord,
            navigationOptions: ({navigation}) => ({
                title: '忘记密码',
                headerLeft: <LeftButton navigation={navigation}/>

            })
        },
    },
    {
        transitionConfig: () => ({ // 跳转时，从右向左，滑入
            screenInterpolator: StackViewStyleInterpolator.forHorizontal
        })
    })







//推荐
const home = createStackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({navigation}) => ({
            headerTitle: <Title navigation={navigation}></Title>
        })
    },
},{
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {backgroundColor:'#1598cc'}

    }),
})


//注册
const community = createStackNavigator({
    Community: {
        screen: Community,
        navigationOptions: ({navigation}) => ({
            headerTitle: <Title navigation={navigation}></Title>,
        })
    }
},{
    defaultNavigationOptions: ({ navigation }) => ({
        headerStyle: {backgroundColor:'#1598cc'}

    }),
})


//消息
const messageList = createStackNavigator({
    MessageList: {
        screen: MessageList,
        navigationOptions: ({navigation}) => ({
            headerTitle: '消息',
        })
    }
},{
    defaultNavigationOptions: ({ navigation }) => ({
        headerTitleStyle:{color: '#fff'},
        headerStyle: {backgroundColor:'#1598cc'}

    }),
})



//个人
const personCenter = createStackNavigator({
    PersonCenter: {
        screen: PersonCenter,
        navigationOptions: ({navigation}) => ({
            headerTitle: '个人',
        })
    }
},{
    defaultNavigationOptions: ({ navigation }) => ({
        headerTitleStyle:{color: '#fff'},
        headerStyle: {backgroundColor:'#1598cc', }

    }),

})







//导航页面
const TabBar = createBottomTabNavigator({
    home: {
        screen: home,
        navigationOptions: {
            title: '推荐',
        }
    },
    community: {
        screen: community,
        navigationOptions: {
            title: '社区'
        }
    },
    messageList: {
        screen:messageList,
        navigationOptions: {
            title: '消息'
        }
    },
    personCenter: {
        screen: personCenter,
        navigationOptions: {
            title: '个人'
        }
    },
},{
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let iconName;
            if (routeName === 'home') {
                iconName = 'ios-home'
            } else if (routeName === 'community') {
                iconName = 'ios-people'
            } else if (routeName === 'messageList') {
                iconName = 'ios-chatboxes'
            } else if (routeName === 'personCenter') {
                iconName = 'ios-person'
            }

            return <Icon name={iconName} size={25} color={tintColor} />;
        },
    }),
    tabBarOptions: {
        activeTintColor: '#1598cc',
        inactiveTintColor: '#999',
    },
})







const AppNavigator = createSwitchNavigator({
    // LoginPage:{
    //     screen:LoginPage
    // },
    TabBar: {
        screen: TabBar
    }

})


export default createAppContainer(AppNavigator);










