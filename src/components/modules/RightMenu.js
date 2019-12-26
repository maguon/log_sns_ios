// import React from 'react'
// import { Text, View } from 'react-native'
// import { Popover, Icon } from '@ant-design/react-native'
//
//
// const Item = Popover.Item;
// const RightMenu = props => {
//     const overlayList = [1, 2, 3].map(item => {
//         return (
//             <Item value={item}>
//                 <Text allowFontScaling >自定义组件 {item}</Text>
//             </Item>
//         )
//     })
//     return (
//         <View style={{ flex: 1, marginRight: 15, alignItems: 'flex-end' }}>
//             <React.Fragment>
//                 <Popover
//                     overlay={overlayList}
//                     placement='bottom'
//                     renderOverlayComponent={nodes => (
//                         <View style={{ padding: 10 }}>
//                             {nodes}
//                         </View>)}>
//                     <Icon name='menu' color='#000' />
//                 </Popover>
//             </React.Fragment>
//         </View>
//     )
// }
//
// export default RightMenu
