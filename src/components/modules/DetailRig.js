import React from 'react'
import {TouchableOpacity,Text, View} from 'react-native'
import { connect } from 'react-redux'
import * as action from "../../action/index";


let release=true
class DetailRig extends React.Component  {
    constructor(props) {
        super(props)

    }
    render() {
        const { writeArticleReducer: {content},homeReducer:{setFile},createArticle} = this.props

        if(content==""&&setFile==""){
            release=false
        }else {
            release=true
        }
        return (
            <View>
                {!release?<TouchableOpacity style={{width:50,height:25,marginRight:15,borderWidth:1,borderColor:'#c1c1c1',borderRadius:5,
                    justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#c1c1c1',fontSize:14}}>发布</Text>
                </TouchableOpacity>:<TouchableOpacity style={{width:50,height:25,marginRight:15,borderWidth:1,borderColor:'#fff',borderRadius:5,
                    justifyContent:'center',alignItems:'center'}} onPress={createArticle}>
                    <Text style={{color:'#fff',fontSize:14}}>发布</Text>
                </TouchableOpacity>}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        writeArticleReducer: state.WriteArticleReducer,
        homeReducer: state.HomeReducer
    }
}
const mapDispatchToProps = (dispatch,props) => ({
    createArticle:()=>{
        dispatch(action.WriteArticleAction.createArticle(props))
    }
})


export default  connect(mapStateToProps,mapDispatchToProps)(DetailRig)
