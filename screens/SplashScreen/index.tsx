import {useNavigation} from '@react-navigation/native'
import {useEffect} from 'react'
import {Image, View} from 'react-native'
import {LandingScreenProp} from '../../types/RootStackParamList'
import styles from './styles'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context'

const SplashScreen = () => {
  const navigation = useNavigation<LandingScreenProp>()

  useEffect(() => {
    let timer1 = setTimeout(() => navigation.navigate('LandingScreen'), 3000)

    return () => {
      clearTimeout(timer1)
    }
  }, [])

  const insets = useSafeAreaInsets()
  return (
    <SafeAreaView style={{paddingTop: insets.top}}>
      <View style={styles.container}>
        <Image style={styles.backgroundImage} source={require('../../assets/images/SplashScreen.png')} />
      </View>
    </SafeAreaView>
  )
}

export default SplashScreen
