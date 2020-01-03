import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import HomeReducer from './main/HomeReducer'
import InitReducer from './main/InitReducer'
import RegisterReducer  from './main/RegisterReducer'
import LoginReducer  from './main/LoginReducer'
import ForgotReducer  from './main/ForgotReducer'

import AboutUsReducer  from './main/AboutUsReducer'
import ArticleReducer  from './main/ArticleReducer'
import CameraReducer  from './main/CameraReducer'
import ChangePassWordReducer  from './main/ChangePassWordReducer'
import ChangePhoneReducer  from './main/ChangePhoneReducer'
import ClearCacheReducer  from './main/ClearCacheReducer'
import CollectionReducer  from './main/CollectionReducer'
import CommunityReducer  from './main/CommunityReducer'
import ContactReducer  from './main/ContactReducer'
import EvaluationMeReducer  from './main/EvaluationMeReducer'
import EvaluationReducer  from './main/EvaluationReducer'
import FansReducer  from './main/FansReducer'
import FollowMeReducer  from './main/FollowMeReducer'
import FollowReducer  from './main/FollowReducer'
import LocationCollectionReducer  from './main/LocationCollectionReducer'
import MessageReducer  from './main/MessageReducer'
import NoticeSettingReducer  from './main/NoticeSettingReducer'
import PersonCenterReducer  from './main/PersonCenterReducer'
import PersonInfoReducer  from './main/PersonInfoReducer'
import PraiseMeReducer  from './main/PraiseMeReducer'
import PrivacySettingReducer  from './main/PrivacySettingReducer'
import SettingsReducer  from './main/SettingsReducer'
import SystemMsgReducer  from './main/SystemMsgReducer'
import UserDataReducer  from './main/UserDataReducer'
import VoteReducer  from './main/VoteReducer'
import VoteRemindReducer  from './main/VoteRemindReducer'


export default combineReducers({
    formReducer,
    HomeReducer,
    InitReducer,
    RegisterReducer,
    LoginReducer,
    ForgotReducer,
    AboutUsReducer,
    ArticleReducer,
    CameraReducer,
    ChangePassWordReducer,
    ChangePhoneReducer,
    ClearCacheReducer,
    CollectionReducer,
    CommunityReducer,
    ContactReducer,
    EvaluationMeReducer,
    EvaluationReducer,
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
})
