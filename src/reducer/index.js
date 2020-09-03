import {combineReducers} from 'redux'
import {reducer as formReducer} from 'redux-form'
import HomeReducer from './main/HomeReducer'
import InitReducer from './main/InitReducer'
import RegisterReducer from './main/RegisterReducer'
import LoginReducer from './main/LoginReducer'
import WelcomeReducer from './main/WelcomeReducer'

import AboutUsReducer from './main/AboutUsReducer'
import ArticleReducer from './main/ArticleReducer'
import ChangePassWordReducer from './main/ChangePassWordReducer'
import ChangePhoneReducer from './main/ChangePhoneReducer'
import CollectionReducer from './main/CollectionReducer'
import CommunityReducer from './main/CommunityReducer'
import ContactReducer from './main/ContactReducer'
import EvaluationMeReducer from './main/EvaluationMeReducer'
import EvaluationReducer from './main/EvaluationReducer'
import EvaluationListReducer from './main/EvaluationListReducer'
import FansReducer from './main/FansReducer'
import FollowMeReducer from './main/FollowMeReducer'
import FollowReducer from './main/FollowReducer'
import LocationCollectionReducer from './main/LocationCollectionReducer'
import MessageReducer from './main/MessageReducer'
import NoticeSettingReducer from './main/NoticeSettingReducer'
import PersonCenterReducer from './main/PersonCenterReducer'
import PersonInfoReducer from './main/PersonInfoReducer'
import PraiseMeReducer from './main/PraiseMeReducer'
import PrivacySettingReducer from './main/PrivacySettingReducer'
import SettingsReducer from './main/SettingsReducer'
import SystemMsgReducer from './main/SystemMsgReducer'
import UserDataReducer from './main/UserDataReducer'
import VoteReducer from './main/VoteReducer'
import VoteRemindReducer from './main/VoteRemindReducer'
import WriteArticleReducer from './main/WriteArticleReducer'
import ScanReducer from './main/ScanReducer'
import SpaceReducer from './main/SpaceReducer'
import LocationReducer from './main/LocationReducer'
import DetailReducer from './main/DetailReducer'
import ToVoteReducer from './main/ToVoteReducer'
import CommentReducer from './main/CommentReducer'
import ReportReducer from './main/ReportReducer'
import CommentReplyReducer from './main/CommentReplyReducer'
import CollectionDetailReducer from './main/CollectionDetailReducer'
import ShieldingReducer from './main/ShieldingReducer'



export default combineReducers({
    formReducer,
    HomeReducer,
    InitReducer,
    RegisterReducer,
    LoginReducer,
    WelcomeReducer,
    AboutUsReducer,
    ArticleReducer,
    ChangePassWordReducer,
    ChangePhoneReducer,
    CollectionReducer,
    CommunityReducer,
    ContactReducer,
    EvaluationMeReducer,
    EvaluationReducer,
    EvaluationListReducer,
    FansReducer,
    FollowMeReducer,
    FollowReducer,
    LocationCollectionReducer,
    MessageReducer,
    NoticeSettingReducer,
    PersonCenterReducer,
    PersonInfoReducer,
    PraiseMeReducer,
    PrivacySettingReducer,
    SettingsReducer,
    SystemMsgReducer,
    UserDataReducer,
    VoteReducer,
    VoteRemindReducer,
    WriteArticleReducer,
    ScanReducer,
    SpaceReducer,
    LocationReducer,
    DetailReducer,
    ToVoteReducer,
    CommentReducer,
    ReportReducer,
    CommentReplyReducer,
    CollectionDetailReducer,
    ShieldingReducer
})
