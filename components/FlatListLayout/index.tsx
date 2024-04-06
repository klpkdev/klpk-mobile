import {
  FlatList,
  ImageBackground,
  ListRenderItem,
  RefreshControlProps,
  ScrollView,
  View,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  children?: React.ReactNode;
  style?: ViewStyle;
  columnWrapperStyle?: ViewStyle;
  refreshControl?:
    | React.ReactElement<
        RefreshControlProps,
        string | React.JSXElementConstructor<any>
      >
    | undefined;
  data: readonly any[] | null | undefined;
  background?: Boolean;
  renderItem: ListRenderItem<any> | null | undefined;
  listHeaderComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | null
    | undefined;
  onEndReached?: ((info: {distanceFromEnd: number}) => void) | null | undefined;
  ListFooterComponent?:
    | React.ComponentType<any>
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | null
    | undefined;
  numColumns?: number | undefined;
  refreshing?: boolean | null | undefined;
  ListEmptyComponent?:
    | React.ReactElement<any, string | React.JSXElementConstructor<any>>
    | React.ComponentType<any>
    | null
    | undefined;
}

const FlatListLayout: React.FC<IProps> = ({
  data,
  renderItem,
  ListFooterComponent,
  onEndReached,
  style,
  listHeaderComponent,
  refreshControl,
  children,
  refreshing = undefined,
  background = true,
  numColumns = 3,
  columnWrapperStyle,
  ListEmptyComponent,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <>
      {children}
      <FlatList
        ListFooterComponent={ListFooterComponent}
        onEndReached={onEndReached}
        numColumns={numColumns}
        data={data}
        ListHeaderComponent={listHeaderComponent}
        renderItem={renderItem}
        style={[styles.container, style]}
        onEndReachedThreshold={0.3}
        refreshing={refreshing}
        refreshControl={refreshControl}
        ListEmptyComponent={ListEmptyComponent}
        columnWrapperStyle={
          numColumns > 1
            ? [styles.columnWrapper, columnWrapperStyle]
            : undefined
        }
      />
      {background ? (
        <ImageBackground
          style={styles.bgimage}
          source={require('../../assets/images/background.jpg')}
          resizeMode="cover"
        />
      ) : null}
    </>
  );
};

export default FlatListLayout;
