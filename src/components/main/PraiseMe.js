import React from 'react'
import { ScrollView, View } from 'react-native'
import { WhiteSpace} from '@ant-design/react-native'
import { connect } from 'react-redux'
// import { Card, ReplyContent, ReplyHeader } from '../../../components/card'
import globalStyles from '../../utils/GlobalStyles'
import * as action from '../../action/index'

const PraiseMe = props => {
    return (
        <View style={globalStyles.container}>
            <ScrollView style={{ flex: 1 }}>
                {/*<Card style={{ backgroundColor: '#fff' }}>*/}
                    {/*<ReplyHeader />*/}
                    {/*<ReplyContent />*/}
                {/*</Card>*/}
                <WhiteSpace size='md' />

                {/*<Card style={{ backgroundColor: '#fff' }}>*/}
                    {/*<ReplyHeader />*/}
                    {/*<ReplyContent />*/}
                {/*</Card>*/}
                <WhiteSpace size='md' />

                {/*<Card style={{ backgroundColor: '#fff' }}>*/}
                    {/*<ReplyHeader />*/}
                    {/*<ReplyContent />*/}
                {/*</Card>*/}
                <WhiteSpace size='md' />

                {/*<Card style={{ backgroundColor: '#fff' }}>*/}
                    {/*<ReplyHeader />*/}
                    {/*<ReplyContent />*/}
                {/*</Card>*/}
                <WhiteSpace size='md' />

                {/*<Card style={{ backgroundColor: '#fff' }}>*/}
                    {/*<ReplyHeader />*/}
                    {/*<ReplyContent />*/}
                {/*</Card>*/}
                <WhiteSpace size='md' />

            </ScrollView>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        praiseMeReducer: state.PraiseMeReducer
    }
}

const mapDispatchToProps = (dispatch) => ({
    getLikeMeList: () => {
        dispatch(action.PraiseMeAction.getLikeMeList())
    },
    getLikeMeListMore: () => {
        dispatch(action.PraiseMeAction.getLikeMeListMore())
    },
    getLikeMeListWaiting: () => {
        dispatch(action.PraiseMeAction.getLikeMeListWaiting())
    }
})

export default connect(mapStateToProps,mapDispatchToProps)(PraiseMe)
