import { View, Text ,StatusBar} from 'react-native'
import React from 'react'
import { useIsFocused } from '@react-navigation/native'


const FocusedStatusBar = (props) => {
  const IsFocused = useIsFocused()
    return IsFocused ? <StatusBar animated={true} barStyle='dark-content' {...props}/> : null
}

export default FocusedStatusBar