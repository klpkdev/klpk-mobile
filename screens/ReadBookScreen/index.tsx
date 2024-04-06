import {useNavigation, useRoute} from '@react-navigation/native';
import {useCallback, useEffect, useRef, useState} from 'react';
import {Image, Switch, Text, useWindowDimensions, View} from 'react-native';
import {HeaderReadBook} from '../../components/Header';
import {
  usePublicBookChapterDetail,
  usePublicBookDetail,
} from '../../services/my-books/query';
import {useGetPricing} from '../../services/settings/query';
import styles from './styles';
import RenderHtml from 'react-native-render-html';
import Button from '../../components/Button';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {ScrollView} from 'react-native-gesture-handler';
import {IconChecked, IconClose, IconCoin2} from '../../components/Icons';
import {usePurchases} from '../../services/purchases/mutation';
import MyModal from '../../components/MyModal';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {BottomSheetModal} from '@gorhom/bottom-sheet';
import BottomSheetCustom from '../../components/MyBottomSheet/BottomSheetCustom';
import ScreenGuardModule from 'react-native-screenguard';

type RootStackParamList = {
  ReadBookScreen: {
    title: string;
    bookId: string;
    synopsis: string;
    chapterId: string | undefined;
    allChapter: {
      id: string;
      name: string;
      accessible: boolean;
      subscribeToAccess: boolean;
      purchasable: boolean;
    }[];
    accessible: boolean;
  };
  WalletScreen: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ReadBookScreen'>;
type ReadBookScreenPropRoute = Props['route'];
type ReadBookScreenPropNavigation = Props['navigation'];

const ReadBookScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const navigation = useNavigation<ReadBookScreenPropNavigation>();
  const {width} = useWindowDimensions();
  const route = useRoute<ReadBookScreenPropRoute>();
  const [textContent, setTextContent] = useState('');
  const [chapterId, setChapterId] = useState<string | undefined>(undefined);
  const [endChapter, setEndChapter] = useState(false);
  const [modalSuccess, setModalSuccess] = useState(false);
  const [modalFailed, setModalFailed] = useState(false);
  const [modalFailedChapter, setModalFailedChapter] = useState(false);
  const [accessible, setAccessible] = useState(route?.params?.accessible);
  const [isDark, setIsDark] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [currentAllChapter, setCurrentAllChapter] = useState(
    route?.params?.allChapter,
  );
  const scrollRef = useRef<any>();
  const {data: settings} = useGetPricing();
  const {data: dataBook} = usePublicBookDetail(route?.params?.bookId);
  const {data, refetch} = usePublicBookChapterDetail(
    route?.params?.bookId,
    chapterId,
    route?.params?.bookId !== undefined &&
      chapterId !== undefined &&
      accessible,
  );
  const purchases = usePurchases();

  useEffect(() => {
    if (route?.params?.synopsis !== undefined) {
      setTextContent(route?.params?.synopsis);
    }
    if (route?.params?.chapterId !== undefined) {
      setChapterId(route?.params?.chapterId);
    }
  }, [route?.params]);

  useEffect(() => {
    if (data?.data) {
      setTextContent(data?.data?.content);
    }
  }, [data?.data]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      ScreenGuardModule.register('#ffffff', _ => {});
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      ScreenGuardModule.unregister();
    });

    return unsubscribe;
  }, [navigation]);

  const handleNext = () => {
    const tempChapter = currentAllChapter;
    if (chapterId !== undefined) {
      const index = tempChapter.findIndex(
        (x: {id: string}) => x.id === chapterId,
      );
      if (index + 1 < tempChapter.length) {
        setChapterId(tempChapter[index + 1].id);
      } else {
        setEndChapter(true);
      }
    } else {
      setChapterId(tempChapter[0]?.id);
    }
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  };

  const findIndexChapter = (id: string) => {
    const tempChapter = currentAllChapter;
    const index = tempChapter.findIndex((x: {id: string}) => x.id === id);
    return index;
  };

  const handleGotoChapter = (id: string) => {
    const index = findIndexChapter(id);
    if (currentAllChapter[index].accessible) {
      setAccessible(true);
      setChapterId(currentAllChapter[index].id);
    } else {
      setAccessible(false);
      setChapterId(currentAllChapter[index].id);
    }
  };

  const handleBuyChapter = () => {
    const index = findIndexChapter(chapterId as string);
    if (currentAllChapter[index]?.purchasable) {
      purchases.mutate(
        {type: 'chapter', id: chapterId as string},
        {
          onError: () => {
            setModalFailed(true);
          },
          onSuccess: () => {
            setChapterId(chapterId);
            refetch();
            setAccessible(true);
            setModalSuccess(true);
            const index = findIndexChapter(chapterId as string);
            const temp = [...currentAllChapter];
            temp[index].accessible = true;
            setCurrentAllChapter(temp);
          },
        },
      );
    } else {
      setModalFailedChapter(true);
    }
  };

  const handleBuyBook = () => {
    purchases.mutate(
      {type: 'book', id: route?.params?.bookId},
      {
        onError: () => {
          setModalFailed(true);
        },
        onSuccess: () => {
          setModalSuccess(true);
        },
      },
    );
  };

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissModalPress = useCallback(() => {
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const toggleSwitch = () =>
    setIsEnabled(previousState => {
      setIsDark(prev => !prev);
      return !previousState;
    });

  const insets = useSafeAreaInsets();
  return (
    <>
      <HeaderReadBook
        title={route?.params?.title}
        onBack={() => {
          navigation.goBack();
        }}
        onSettings={() => {
          handlePresentModalPress();
        }}
        allChapter={currentAllChapter}
        onChapterPress={(id: string) => handleGotoChapter(id)}
      />
      {accessible ? (
        <ScrollView
          style={[
            styles.container,
            {backgroundColor: isDark ? '#fff' : '#0D0E10'},
          ]}
          ref={scrollRef}>
          <RenderHtml
            contentWidth={width}
            baseStyle={{color: isDark ? '#000' : '#fff'}}
            source={{html: textContent}}
          />
          {endChapter ? null : (
            <Button
              text="Lanjutkan Bab berikutnya"
              style={styles.buttonBottom}
              outline={true}
              onPress={handleNext}
            />
          )}
          <View style={styles.footer} />
        </ScrollView>
      ) : (
        <View style={styles.lockContainer}>
          <Text style={styles.titleLock}>Bagian ini di Kunci</Text>
          <Image
            source={require('../../assets/images/lock-content.png')}
            style={styles.imageLock}
          />
          <View style={styles.coinTextContainer}>
            <IconCoin2 />
            <Text style={styles.coinText}>
              {settings?.data?.coinForChapter} Koin
            </Text>
          </View>
          <View style={styles.buttonBuyContainer}>
            <Button text="Buka Kunci" onPress={handleBuyChapter} />
            {dataBook?.data?.completed ? (
              <Button text="Beli Buku" onPress={handleBuyBook} />
            ) : null}
          </View>
        </View>
      )}
      <MyModal
        isVisible={modalSuccess}
        buttonPress={() => setModalSuccess(false)}
        buttonText="Mengerti"
        title="Berhasil"
        message="Berhasil di bayar!"
        icon={<IconChecked width={68} height={68} />}
      />
      <MyModal
        isVisible={modalFailed}
        buttonPress={() => {
          navigation.navigate('WalletScreen');
        }}
        buttonText="Topup"
        title="Berhasil"
        message="Koin anda tidak mencukupi"
        icon={
          <Image
            source={require('../../assets/images/coins2.png')}
            style={{width: 50}}
          />
        }
      />
      <MyModal
        isVisible={modalFailedChapter}
        buttonPress={() => setModalFailedChapter(false)}
        buttonText="Mengerti"
        title="Maaf"
        message="Maaf anda tidak bisa membeli bab ini, silakan membeli bab secara urut"
        icon={<IconClose size={68} />}
      />
      <BottomSheetCustom
        right={<IconClose color="#FFF" />}
        rightPress={handleDismissModalPress}
        bottomSheetRef={bottomSheetModalRef}
        title={'Setting'}
        top="30%"
        footer={
          <View style={styles.footerBootomSheet}>
            <Button
              text="Simpan"
              bgColor="yellow"
              onPress={() => {
                handleDismissModalPress();
              }}
            />
          </View>
        }>
        <View style={styles.setting}>
          <Text style={styles.settingLabel}>Light Mode</Text>
          <Switch
            trackColor={{false: '#767577', true: '#fff'}}
            thumbColor={isEnabled ? '#D6B16D' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </BottomSheetCustom>
    </>
  );
};

export default ReadBookScreen;
