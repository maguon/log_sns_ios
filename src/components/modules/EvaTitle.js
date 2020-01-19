import React from 'react'
import {connect} from "react-redux"
import {Text, View, StyleSheet} from 'react-native'
import {Popover} from '@ant-design/react-native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import * as actionType from "../../actionType/index"


const Item = Popover.Item

class EvaTitle extends React.Component {
    constructor(props) {
        super(props)
    }


    render() {
        let overlay = [].map((i, index) => (
            <Item key={index} value={`${i}`}>
                <Text>{i}</Text>
            </Item>
        ))
        overlay = overlay.concat([

            <Item key="0" value="所有评论">
                <View style={style.view}>
                    <Text style={style.text}>所有评论</Text>
                </View>
            </Item>,

            <Item key="1" value="我的文章">
                <View style={style.view}>
                    <Text style={style.text}>我的文章</Text>
                </View>
            </Item>,
            <Item key="2" value="我的求助">
                <View style={style.view}>
                    <Text style={style.text}>我的求助</Text>
                </View>
            </Item>,
            <Item key="3" value="我的评论">
                <View style={style.view}>
                    <Text style={style.text}>我的评论</Text>
                </View>
            </Item>,
            <Item key="4" value="我的解答">
                <View style={style.view}>
                    <Text style={style.text}>我的解答</Text>
                </View>
            </Item>

        ])

        const {evaluationMeReducer: {selected}, setSelected} = this.props
        return (
            <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <React.Fragment>
                    <Popover
                        overlay={overlay}
                        placement="bottom"
                        onSelect={(v) => setSelected(v)}>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={{fontSize: 16, fontWeight: 'bold', color: '#fff'}}>{selected}</Text>
                            <AntDesign name='down' size={20} style={{color: '#fff', marginLeft: 10}}/>
                        </View>
                    </Popover>
                </React.Fragment>
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        evaluationMeReducer: state.EvaluationMeReducer
    }
}

const mapDispatchProps = (dispatch, props) => ({
    setSelected: (value) => {
        dispatch(actionType.EvaluationMeType.set_Selected(value))
    }
})

export default connect(mapStateToProps, mapDispatchProps)(EvaTitle)

const style = StyleSheet.create({
    view: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    text: {
        marginLeft: 15,
        marginRight: 15
    }
})






