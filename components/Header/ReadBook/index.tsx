import {useState} from 'react';
import {
  FlatList,
  GestureResponderEvent,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconArrowLeft, IconSettings, IconTopChapter} from '../../Icons';
import styles from './styles';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  onBack?: ((event: GestureResponderEvent) => void) | undefined;
  onSettings?: ((event: GestureResponderEvent) => void) | undefined;
  title: string;
  right?: boolean;
  allChapter?: {
    id: string;
    name: string;
    accessible: boolean;
    subscribeToAccess: boolean;
  }[];
  onChapterPress?: any;
}

const ReadBook: React.FC<IProps> = ({
  onBack,
  title,
  onSettings,
  right = true,
  allChapter = [],
  onChapterPress,
}) => {
  const [active, setActive] = useState(false);
  const handleChapterPress = (id: string) => {
    setActive(false);
    onChapterPress(id);
  };
  const insets = useSafeAreaInsets();
  return (
    <>
      <View style={[styles.container, {paddingTop: insets.top + styles.container.paddingTop}]}>
        <View style={styles.left}>
          <TouchableOpacity onPress={onBack}>
            <IconArrowLeft />
          </TouchableOpacity>
        </View>
        {allChapter.length > 0 ? (
          <TouchableOpacity
            onPress={() => setActive(!active)}
            style={styles.center}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <IconTopChapter />
          </TouchableOpacity>
        ) : (
          <View style={styles.center}>
            <Text style={styles.title}>{title}</Text>
          </View>
        )}

        <View style={styles.right}>
          {right ? (
            <>
              <TouchableOpacity onPress={onSettings}>
                <IconSettings />
              </TouchableOpacity>
            </>
          ) : null}
        </View>
      </View>
      {active ? (
        <View style={styles.overlayTop}>
          <FlatList
            style={styles.contentChapter}
            data={allChapter}
            renderItem={item => (
              <TouchableOpacity
                onPress={() => handleChapterPress(item?.item?.id)}
                style={styles.itemChapter}>
                <Text style={{color: '#fff'}}>{item?.item?.name}</Text>
              </TouchableOpacity>
            )}
          />
        </View>
      ) : null}
    </>
  );
};

export default ReadBook;
