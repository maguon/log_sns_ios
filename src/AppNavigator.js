// import Orientation from 'react-native-orientation'
import React from 'react'
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {createStackNavigator} from 'react-navigation-stack'
import Icon from 'react-native-vector-icons/Ionicons'
import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator'
import ArtRightButton from "./components/modules/ArtRightButton"
//login
import Welcome from './components/main/Welcome'
import Login from './components/main/Login'
import Registered from './components/main/Registered'
import ForgotPassWord from './components/main/ForgotPassWord'
//home
import Home ,{renderFlat}from './components/main/Home'
import WriteArticle from './components/main/WriteArticle'
import Scan from './components/main/Scan'
import Location from './components/main/Location'
import Detail from './components/main/Detail'
import CollectionDetail from './components/main/CollectionDetail'
import ToVote from './components/main/ToVote'
import ToVoteItem from './components/main/ToVoteItem'
import ScannerResult from './components/main/ScannerResult'
import Comment from './components/main/Comment'
import Report from './components/main/Report'



//社区
import Community ,{renderComFlat}from './components/main/Community'
//消息
import Message from './components/main/Message'
import FollowMe from './components/main/FollowMe'
import EvaluationMe from './components/main/EvaluationMe'
import PraiseMe from './components/main/PraiseMe'
import Contact from './components/main/Contact'
import SystemMsg from './components/main/SystemMsg'
import CommentReply from './components/main/CommentReply'
import Shielding from './components/main/Shielding'


//个人
import PersonCenter from './components/main/PersonCenter'
import Article from './components/main/Article'
import Follow from './components/main/Follow'
import Fans from './components/main/Fans'
import Collection from './components/main/Collection'
import Evaluation from './components/main/Evaluation'
import Vote from './components/main/Vote'
import LocationCollection from './components/main/LocationCollection'
import LocationMap from './components/main/LocationMap'
import Settings from './components/main/Settings'
import ChangePassWord from './components/main/ChangePassWord'
import ChangePhone from './components/main/ChangePhone'
import PrivacySetting from './components/main/PrivacySetting'
import NoticeSetting from './components/main/NoticeSetting'
import AboutUs from './components/main/AboutUs'
import UserData from './components/main/UserData'
import Space from './components/main/Space'

//modules
import LeftButton from './components/modules/LeftButton'
import WriteLeftButton from './components/modules/WriteLeftButton'
import LoginLeftButton from './components/modules/LoginLeftButton'
import Title from './components/modules/Title'
import EvaTitle from './components/modules/EvaTitle'
import ImageView from './components/modules/ImageView'
import DetailTitle from './components/modules/DetailTitle'
import DetailRig from './components/modules/DetailRig'
import ComRightButton from "./components/modules/ComRightButton"
import Agreement from "./components/modules/Agreement"
import DetailLeftButton from "./components/modules/DetailLeftButton"
import SpaceHeader from "./components/modules/SpaceHeader";
import HeadImage from "./components/modules/HeadImage"

let lastclick=""
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
                headerStyle: {backgroundColor: '#1598cc'},
                title: '注册',
                headerTitleStyle: {color: '#fff'},
                headerLeft: <LoginLeftButton navigation={navigation}/>
            })
        },
        Agreement: {
            screen: Agreement,
            navigationOptions: ({navigation}) => ({
                headerStyle: {backgroundColor: '#1598cc'},
                title: '司聊服务使用协议',
                headerTitleStyle: {color: '#fff'},
                headerLeft: <LoginLeftButton navigation={navigation}/>
            })
        },
        ForgotPassWord: {
            screen: ForgotPassWord,
            navigationOptions: ({navigation}) => ({
                headerStyle: {backgroundColor: '#1598cc'},
                title: '忘记密码',
                headerTitleStyle: {color: '#fff'},
                headerLeft: <LoginLeftButton navigation={navigation}/>

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
            headerStyle: {backgroundColor: '#1598cc'},
            headerTitle: <Title navigation={navigation}></Title>
        })
    },
})
//社区
const community = createStackNavigator({
    Community: {
        screen: Community,
        navigationOptions: ({navigation}) => ({
            headerTitle: <Title navigation={navigation}></Title>,
            headerStyle: {backgroundColor: '#1598cc'}
        })
    }
})
//消息
const messageList = createStackNavigator({
    MessageList: {
        screen: Message,
        navigationOptions: ({navigation}) => ({
            headerTitle: '消息',
            headerTitleStyle: {color: '#fff'},
            headerStyle: {backgroundColor: '#1598cc'}
        })
    }
})
//个人
const personCenter = createStackNavigator({
    PersonCenter: {
        screen: PersonCenter,
        navigationOptions: ({navigation}) => ({
            headerTitle: '个人',
            headerTitleStyle: {color: '#fff'},
            headerStyle: {backgroundColor: '#1598cc',}
        })
    }
})


//导航页面
const TabBar = createBottomTabNavigator({
    home: {
        screen: home,
        navigationOptions: ({navigation}) => ({
            title: '推荐',

        })
    },
    community: {
        screen: community,
        navigationOptions: ({navigation}) => ({
            title: '社区',
        })
    },
    messageList: {
        screen: messageList,
        navigationOptions: {
            title: '消息',
        }
    },
    personCenter: {
        screen: personCenter,
        navigationOptions: {
            title: '个人',
        }
    },
}, {
    defaultNavigationOptions: ({navigation}) => ({
        headerStyle: {backgroundColor: '#1598cc'},
        tabBarIcon: ({focused, tintColor}) => {
            const {routeName} = navigation.state;
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

            return <Icon name={iconName} size={25} color={tintColor}/>;
        },
        tabBarOnPress:({navigation, defaultHandler})=>{
            const {routeName} = navigation.state;
            let clickTime = new Date().getTime();
            let timer=""

            if(clickTime-lastclick<300){
                clearTimeout(timer)
                if(routeName === 'home'){
                    renderFlat()
                } else if(routeName === 'community'){
                    renderComFlat()
                }

            }else {
                timer=setTimeout(()=>{
                    console.log("click")
                },300)
            }
            lastclick=clickTime


            defaultHandler();
        },
    }),
    tabBarOptions: {
        activeTintColor: '#1598cc',
        inactiveTintColor: '#999',
    },
})


//页面screen
const Main = createStackNavigator({
    TabBar: {
        screen: TabBar,
        navigationOptions: {
            header: null
        }
    },

    ImageView: {
    screen: ImageView,
        navigationOptions: ({navigation}) => ({
        tabBarVisible: true,
            header: null,
    })
    },

    HeadImage: {
    screen: HeadImage,
        navigationOptions: ({navigation}) => ({
        tabBarVisible: true,
        header: null,
    })
    },

    WriteArticle: {
        screen: WriteArticle,
        navigationOptions: ({navigation}) => ({
            title: '写文章',
            headerRight: <ArtRightButton navigation={navigation}></ArtRightButton>,
            headerLeft:<WriteLeftButton navigation={navigation}/>,
            tabBarVisible: false,
        })
    },

    Scan: {
        screen: Scan,
        navigationOptions: ({navigation}) => ({
            title: '扫一扫',
            tabBarVisible: false
        })
    },

    ScannerResult: {
    screen:ScannerResult,
        navigationOptions: ({navigation}) => ({
        title: '扫面信息页',
        tabBarVisible: false
    })
    },
    Location: {
        screen: Location,
        navigationOptions: ({navigation}) => ({
            title: '定位',
            tabBarVisible: false,
        })
    },
    Report: {
        screen: Report,
        navigationOptions: ({navigation}) => ({
            title: '举报',
            tabBarVisible: false
        })
    },
    Detail: {
        screen: Detail,
        navigationOptions: ({navigation}) => ({
            headerTitle: <DetailTitle navigation={navigation}/>,
            headerRight: <DetailRig navigation={navigation}/>,
            headerLeft:<DetailLeftButton  navigation={navigation}/>,
            tabBarVisible: false
        })
    },
    CollectionDetail: {
        screen:CollectionDetail,
        navigationOptions: ({navigation}) => ({
            headerTitle: <DetailTitle navigation={navigation}/>,
            // headerRight: <DetailRig navigation={navigation}/>,
            headerLeft:<DetailLeftButton  navigation={navigation}/>,
            tabBarVisible: false
        })
    },


    CommentReply: {
        screen: CommentReply,
        navigationOptions: ({navigation}) => ({
            title: '',
            tabBarVisible: false
        })
    },


    //消息
    FollowMe: {
        screen: FollowMe,
        navigationOptions: ({navigation}) => ({
            title: '关注我',
            tabBarVisible: false
        })
    },
    EvaluationMe: {
        screen: EvaluationMe,
        navigationOptions: ({navigation}) => ({
            headerTitle: <EvaTitle navigation={navigation}/>,
        })
    },
    PraiseMe: {
        screen: PraiseMe,
        navigationOptions: ({navigation}) => ({
            title: '赞我',
            tabBarVisible: false
        })
    },
    Contact: {
        screen: Contact,
        navigationOptions: ({navigation}) => ({
            title: '申请联系方式',
            tabBarVisible: false
        })
    },

    SystemMsg: {
        screen: SystemMsg,
        navigationOptions: ({navigation}) => ({
            title: '系统消息',
            tabBarVisible: false
        })
    },
    Shielding: {
        screen: Shielding,
        navigationOptions: ({navigation}) => ({
            title: '屏蔽用户',
            tabBarVisible: false
        })
    },
    Comment: {
        screen: Comment,
        navigationOptions: ({navigation}) => ({
            title: '评论详情页',
            headerRight: <ComRightButton navigation={navigation}/>,
            tabBarVisible: false
        })
    },




    //个人
    Article: {
        screen: Article,
        navigationOptions: ({navigation}) => ({
            title: '我的文章',
            tabBarVisible: false
        })
    },
    Follow: {
        screen: Follow,
        navigationOptions: ({navigation}) => ({
            title: navigation.state.params.otherParam,
            tabBarVisible: false
        })
    },
    Fans: {
        screen: Fans,
        navigationOptions: ({navigation}) => ({
            title: navigation.state.params.otherParam,
            tabBarVisible: false
        })
    },
    Collection: {
        screen: Collection,
        navigationOptions: ({navigation}) => ({
            title: '我的收藏',
            tabBarVisible: false
        })
    },
    Evaluation: {
        screen: Evaluation,
        navigationOptions: ({navigation}) => ({
            title: '我的评论',
            tabBarVisible: false
        })
    },
    Vote: {
        screen: Vote,
        navigationOptions: ({navigation}) => ({
            title: '投票',
            tabBarVisible: false
        })
    },
    ToVoteItem: {
        screen: ToVoteItem,
        navigationOptions: ({navigation}) => ({
            title: '投票',
            tabBarVisible: false
        })
    },

    ToVote: {
        screen: ToVote,
        navigationOptions: ({navigation}) => ({
            title: '我参与的投票',
            tabBarVisible: false
        })
    },
    LocationCollection: {
        screen: LocationCollection,
        navigationOptions: ({navigation}) => ({
            title: '我收藏的位置',
            tabBarVisible: false
        })
    },
    LocationMap: {
        screen: LocationMap,
        navigationOptions: ({navigation}) => ({
            title: '收藏位置',
            tabBarVisible: false
        })
    },
    Settings: {
        screen: Settings,
        navigationOptions: ({navigation}) => ({
            title: '设置',
            tabBarVisible: false
        })
    },
    ChangePassWord: {
        screen: ChangePassWord,
        navigationOptions: ({navigation}) => ({
            title: '修改密码',
            tabBarVisible: false
        })
    },
    ChangePhone: {
        screen: ChangePhone,
        navigationOptions: ({navigation}) => ({
            title: '换绑手机',
            tabBarVisible: false
        })
    },
    PrivacySetting: {
        screen: PrivacySetting,
        navigationOptions: ({navigation}) => ({
            title: '隐私设置',
            tabBarVisible: false
        })
    },
    NoticeSetting: {
        screen: NoticeSetting,
        navigationOptions: ({navigation}) => ({
            title: '通知设置',
            tabBarVisible: false
        })
    },
    AboutUs: {
        screen: AboutUs,
        navigationOptions: ({navigation}) => ({
            title: '关于我们',
            tabBarVisible: false
        })
    },

    UserData: {
        screen: UserData,
        navigationOptions: ({navigation}) => ({
            title: '个人资料',
            tabBarVisible: false
        })
    },
    Space: {
        screen: Space,
        navigationOptions: ({navigation}) => ({
             header: null,
            tabBarVisible: false
        })
    },

}, {
    defaultNavigationOptions: ({navigation}) => ({
        headerTitleStyle: {color: '#fff'},
        headerStyle: {backgroundColor: '#1598cc'},
        headerLeft: <LeftButton navigation={navigation}/>
    }),
})


//入口
const AppNavigator = createSwitchNavigator({
    Welcome:{
        screen:Welcome
    },
    LoginPage:{
        screen:LoginPage
    },
    Main: {
        screen: Main
    }

})


export default createAppContainer(AppNavigator);










