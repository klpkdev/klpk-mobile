import {TouchableOpacity, View, StyleProp, ViewStyle} from 'react-native';
import {IconStar} from '../Icons';
import styles from './styles';
import React, {FunctionComponent} from 'react';

interface IProps {
  count: number;
  type: 'button' | 'view';
  onPress?: ((total: number) => void) | undefined;
  style?: ViewStyle;
}

interface IStyle {
  style?: ViewStyle;
}

const total = [0, 1, 2, 3, 4];

const Rating: React.FC<IProps> = ({
  count,
  type,
  onPress = () => {},
  style = {},
}) => {
  const renderButton = () => {
    return total.map((item, index) => (
      <TouchableOpacity
        key={`rating-item${index}`}
        onPress={() => onPress(index + 1)}>
        <IconStar color={item >= count ? '#5A5B62' : undefined} />
      </TouchableOpacity>
    ));
  };

  const renderView = () => {
    return total.map((item, index) => (
      <IconStar
      width={12.8}
      height={12}
      
        key={`bintang-${index}`}
        color={item >= count ? '#5A5B62' : undefined}
      />
    ));
  };

  return (
    <View style={styles.ratingGroup}>
      {type === 'button' ? renderButton() : renderView()}
    </View>
  );
};

export default Rating;
