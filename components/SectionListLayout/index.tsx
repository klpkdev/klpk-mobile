import {
  DefaultSectionT,
  ImageBackground,
  RefreshControlProps,
  SectionList,
  SectionListData,
  SectionListRenderItem,
  ViewStyle,
} from 'react-native';
import styles from './styles';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';

interface IProps {
  style?: ViewStyle;
  refreshControl?:
    | React.ReactElement<
        RefreshControlProps,
        string | React.JSXElementConstructor<any>
      >
    | undefined;
  sections: readonly SectionListData<any, DefaultSectionT>[];
  renderItem?: SectionListRenderItem<any, DefaultSectionT> | undefined;
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
  renderSectionHeader?:
    | ((info: {
        section: SectionListData<any, DefaultSectionT>;
      }) => React.ReactElement<
        any,
        string | React.JSXElementConstructor<any>
      > | null)
    | undefined;
  keyExtractor?: ((item: any, index: number) => string) | undefined;
  stickySectionHeadersEnabled?: boolean | undefined;
}

const SectionListLayout: React.FC<IProps> = ({
  sections,
  renderItem,
  renderSectionHeader,
  ListFooterComponent,
  onEndReached,
  style,
  listHeaderComponent,
  refreshControl,
  keyExtractor,
  stickySectionHeadersEnabled,
}) => {
  const insets = useSafeAreaInsets();
  return (
    // <SafeAreaView>
    <>
      <SectionList
        ListFooterComponent={ListFooterComponent}
        onEndReached={onEndReached}
        renderSectionHeader={renderSectionHeader}
        sections={sections}
        ListHeaderComponent={listHeaderComponent}
        renderItem={renderItem}
        style={[styles.container, style]}
        refreshControl={refreshControl}
        initialNumToRender={4}
        keyExtractor={keyExtractor}
        stickySectionHeadersEnabled={stickySectionHeadersEnabled}
      />
      <ImageBackground
        style={styles.bgimage}
        source={require('../../assets/images/background.jpg')}
        resizeMode="cover"
      />
    </>
    // </SafeAreaView>
  );
};

export default SectionListLayout;
