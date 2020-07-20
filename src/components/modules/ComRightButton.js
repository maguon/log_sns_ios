import React from 'react'
import {TouchableOpacity,Text, View} from 'react-native'
import { connect } from 'react-redux'
import * as action from "../../action/index";


let release=true
class ComRightButton extends React.Component  {
    constructor(props) {
        super(props)

    }
    render() {
        const { CommentReducer: {comment},createComment} = this.props

        if(comment==""){
            release=false
        }else {
            release=true
        }
        return (
            <View>
                {!release?<TouchableOpacity style={{width:50,height:25,marginRight:15,borderWidth:1,borderColor:'#c1c1c1',borderRadius:5,
                    justifyContent:'center',alignItems:'center'}}>
                    <Text style={{color:'#c1c1c1',fontSize:14}}>发送</Text>
                </TouchableOpacity>:<TouchableOpacity style={{width:50,height:25,marginRight:15,borderWidth:1,borderColor:'#fff',borderRadius:5,
                    justifyContent:'center',alignItems:'center'}} onPress={createComment}>
                    <Text style={{color:'#fff',fontSize:14}}>发送</Text>
                </TouchableOpacity>}
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        CommentReducer: state.CommentReducer
    }
}
const mapDispatchToProps = (dispatch,props) => ({
    createComment:()=>{
        dispatch(action.CommentAction.createComment(props))
    }
})


export default  connect(mapStateToProps,mapDispatchToProps)(ComRightButton)

