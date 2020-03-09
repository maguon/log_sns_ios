import * as actionType from '../../actionType/index'
import httpRequest from '../../utils/HttpRequest'

export const getLikeMeList = () => async (dispatch) => {
    try {
        const url = ``
        const res = await httpRequest.get(url)
        if (res.success) {
            dispatch({ type: actionType.PraiseMeType.get_likeMeList_success, payload: {} })
        } else {
            dispatch({ type: actionType.PraiseMeType.get_likeMeList_failed, payload: {} })
        }
    } catch (err) {
        dispatch({ type: actionType.PraiseMeType.get_likeMeList_failed, payload: {} })
    }
}

export const getLikeMeListWaiting = () => (dispatch) => {
    dispatch({ type: actionType.PraiseMeType.get_likeMeList_waiting })
}

export const getLikeMeListMore = () => (dispatch) => {

}
