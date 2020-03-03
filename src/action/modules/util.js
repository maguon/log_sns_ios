import { PixelRatio, Dimensions } from 'react-native'

export const fontSizeCoeff = Dimensions.get('window').width / 360 / PixelRatio.getFontScale()

export const sleep = (time) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve()
        }, time)
    })
}
