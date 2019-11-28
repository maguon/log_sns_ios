import React,{Component} from 'react'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware,compose } from 'redux'//必须用到的 redux
import ReduxThunk from 'redux-thunk'//支持异步的能力
import reducers from './src/reducers/index'
import Ios_app from './src/Ios_app'

//HOC=> 调节组件
//compose（组成）ReduxThunk（异步能力）  applyMiddleware（中间件） store由什么组件组成封装成一个新的组件
const store=compose(
    applyMiddleware(ReduxThunk)
)(createStore)(reducers)


class App extends Component{
    render(){
        return(
            <Provider store={store}>
                <Ios_app/>
            </Provider>
        )
    }
}

export default  App;
