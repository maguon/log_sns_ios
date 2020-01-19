/**
 * @format
 */

import {AppRegistry, TextInput, Text} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

// TextInput.defaultProps = Object.assign({}, TextInput.defaultProps, { defaultProps: false })
// Text.defaultProps = Object.assign({}, Text.defaultProps, { allowFontScaling: false })

AppRegistry.registerComponent(appName, () => App);
