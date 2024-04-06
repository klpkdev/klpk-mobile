import {GestureResponderEvent, Image, Text, TouchableOpacity, View} from 'react-native'
import Button from '../../Button'
import {IconCoin, IconStar} from '../../Icons'
import styles from './style'

interface IProps {
  photo: string | null
  name: string
  onPress: ((event: GestureResponderEvent) => void) | undefined
  following: boolean
}

const Follow: React.FC<IProps> = ({photo, name, onPress, following}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftContent}>
        {photo != null ? (
          <Image source={{uri: photo}} style={styles.image} />
        ) : (
          <View style={styles.placeholderImage} />
        )}
        <Text style={styles.textName}>{name}</Text>
      </View>
      <View style={styles.rightContent}>
        <Button
          text={following ? 'Following' : 'Follow'}
          bgColor={following ? 'grey' : 'blue'}
          style={styles.button}
          onPress={onPress}
        />
      </View>
    </View>
  )
}

export default Follow
