import {useNavigation} from '@react-navigation/native'
import {Image, Text, TouchableOpacity, View} from 'react-native'
import Button from '../../components/Button'
import {HeaderReadBook} from '../../components/Header'
import {ProfileStackScreenProps} from '../../types/RootStackParamList'
import {formatNumberWithK} from '../../utils/commons'
import styles from './style'
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context'

const ProfileWritterScreen = () => {
  const navigation = useNavigation<ProfileStackScreenProps>()
  const insets = useSafeAreaInsets()
  return (
    <SafeAreaView style={{paddingTop: insets.top}}>
      <HeaderReadBook
        title="Penulis"
        onBack={() => {
          navigation.goBack()
        }}
        onSettings={() => {}}
        right={false}
      />
      <View style={styles.container}>
        <View style={styles.header}>
          <Image source={{uri: 'https://i.pravatar.cc/100?img=52'}} style={styles.image} />
          <View style={styles.headerContent}>
            <Text style={styles.name}>Patrick Kellan</Text>
            <Text style={styles.title}>Patrick Kellan</Text>
            <Button text="Follow" full={false} bgColor="blue" style={styles.buttonFollow} />
          </View>
        </View>
        <Text style={styles.description}>
          
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.textCount}>10</Text>
            <Text style={styles.textButton}>Buku</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('FollowScreen', {userId: '1'})
            }}
          >
            <Text style={styles.textCount}>{formatNumberWithK(30000)}</Text>
            <Text style={styles.textButton}>Pengikut</Text>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate('FollowerScreen', {userId: '1'})
            }}
          >
            <Text style={styles.textCount}>{formatNumberWithK(50)}</Text>
            <Text style={styles.textButton}>Mengikuti</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default ProfileWritterScreen
