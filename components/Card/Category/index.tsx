import {GestureResponderEvent, Image, Text, TouchableOpacity, View} from 'react-native'
import {IconCoin, IconStar} from '../../Icons'
import styles from './style'

interface IProps {
  cover: string | null
  title: string
  author: string
  onPress: ((event: GestureResponderEvent) => void) | undefined
  rating?: string
  price?: number | undefined
  description?: string | undefined
}

const Category: React.FC<IProps> = ({cover, title, author, onPress, rating, price, description}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={cover != null ? {uri: cover} : require("../../../assets/images/placeholder.jpg") } style={styles.image} />
      <View style={styles.content}>
       
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
        {rating ? (
          <View style={styles.rating}>
            <IconStar width={11} height={11} color="#F6D706" />
            <IconStar width={11} height={11} color="#F6D706" />
            <IconStar width={11} height={11} color="#F6D706" />
            <IconStar width={11} height={11} color="#F6D706" />
            <IconStar width={11} height={11} color="#F6D706" />
            <Text style={styles.textRating}>{rating}</Text>
          </View>
        ) : null}
        {
            description ? (
                <Text style={styles.description} numberOfLines={3}>{description.replace(/(<([^>]+)>)/ig, '')}</Text>
            ) : null
        }
        {price ? (
          <View style={styles.coin}>
            <IconCoin />
            <Text style={styles.textCoin}>{price} koin</Text>
          </View>
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

export default Category
