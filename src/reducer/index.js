import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import HomeReducer from './main/HomeReducer'
import InitReducer from './main/InitReducer'
import RegisterReducer  from './main/RegisterReducer'
import LoginReducer  from './main/LoginReducer'
import ForgotReducer  from './main/ForgotReducer'



export default combineReducers({
    formReducer,
    HomeReducer,
    InitReducer,
    RegisterReducer,
    LoginReducer,
    ForgotReducer,
})
