import {ReactNode} from 'react'
import {ImageBackground, RefreshControlProps, ScrollView, ViewStyle} from 'react-native'
import styles from './styles'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context'

interface IProps {
  children: ReactNode
  style?: ViewStyle
  refreshControl?: React.ReactElement<RefreshControlProps, string | React.JSXElementConstructor<any>> | undefined
}

const AuthLayout: React.FC<IProps> = ({children, style, refreshControl}) => {
  const insets = useSafeAreaInsets()
  return (
    <SafeAreaView style={{paddingTop: insets.top}}>
      <ScrollView style={[styles.container, style]} refreshControl={refreshControl}>
        {children}
      </ScrollView>
      <ImageBackground
        style={styles.bgimage}
        source={require('../../assets/images/background.jpg')}
        resizeMode="cover"
      />
    </SafeAreaView>
  )
}

export default AuthLayout
