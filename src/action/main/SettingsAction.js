
import {CacheHelper} from 'react-native-rn-cacheimage';
import * as actionType from "../../actionType/index";

export const getSize =()=> async (dispatch, getState) => {
    try {
       const size = await CacheHelper.getCacheSizeFormat();
        dispatch({ type: actionType.SettingsType.get_size_success, payload: { size: size} })

    } catch (error) {
        // Error retrieving data
    }
};
