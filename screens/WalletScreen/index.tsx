import {BottomSheetModal} from '@gorhom/bottom-sheet';
import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  RefreshControl,
  Platform,
  Dimensions,
  FlatList,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import WebView from 'react-native-webview';
import Button from '../../components/Button';
import {
  IconChecked,
  IconClose,
  IconTopup,
  IconWithdraw,
} from '../../components/Icons';
import ItemHistory from '../../components/ItemHistory';
import MyBottomSheet from '../../components/MyBottomSheet';
import MyModal from '../../components/MyModal';
import {
  TransactionTopup,
  TransactionWithdraw,
} from '../../components/Transaction';
import WithdrawConfirmation from '../../components/Transaction/WithdrawConfirmation';
import {
  IItemTopup,
  ITransactionModel,
  ITransactionParams,
} from '../../interfaces/transactions';
import {useCoinPackages} from '../../services/coin-packages/query';
import {useMe} from '../../services/current-user/query';
import {useGetCoinRate} from '../../services/settings/query';
import {usePurchaseIap, useTopups} from '../../services/topup/mutation';
import {
  useGetInfiniteTransactions,
  useGetTransactions,
} from '../../services/transactions/query';
import {useCreateWithdraws} from '../../services/withdraws/mutation';
import {formatRupiah, onError} from '../../utils/commons';
import styles from './styles';
import {SafeAreaView, useSafeAreaInsets} from 'react-native-safe-area-context';
import {requestPurchase, useIAP} from 'react-native-iap';

const {height} = Dimensions.get('window');
const DEFAULT_URI = 'https://app.midtrans.com/snap/v2/vtweb/';

const WalletScreen = () => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const [selectedTopup, setSelectedTopup] = useState<IItemTopup>();
  const [selectedWithdraw, setSelectedWithdraw] = useState<IItemTopup>();
  const [buttonNextDisabled, setButtonNextDisabled] = useState<boolean>(true);
  const [paymentToken, setPaymentToken] = useState('');
  const [modalConfirm, setModalConfirm] = useState(false);
  const [tempCoinPackage, setTempCoinPackage] = useState([]);
  const [modalWD, setModalWD] = useState(false);
  const [modalPhone, setModalPhone] = useState(false);
  const [transactionsParams, setTransansactionParams] =
    useState<ITransactionParams>({
      limit: 10,
      page: 1,
    });
  const [paymentLoading, setPaymenLoading] = useState(true);
  const [messageModal, setMessageModal] = useState(
    'Top Up Sebesar 200 ribu koin berhasil',
  );
  const [activeForm, setActiveForm] = useState<
    'topup' | 'payment' | 'withdraw' | 'withdraw-confirmation'
  >('topup');
  const {data} = useCoinPackages();
  const {data: me, refetch: refetchMe} = useMe();
  const {data: coinRate} = useGetCoinRate();
  const {
    data: transactions,
    isLoading,
    refetch,
    fetchNextPage,
  } = useGetInfiniteTransactions(transactionsParams as any);
  const createTopup = useTopups();
  const createWithdraws = useCreateWithdraws();
  const createPurchaseIap = usePurchaseIap();

  const {
    products,
    currentPurchase,
    currentPurchaseError,
    requestPurchase,
    getProducts,
    finishTransaction,
  } = useIAP();

  useEffect(() => {
    // console.log('error', currentPurchaseError);
    // console.log('test', currentPurchaseError?.productId);
    // console.log('data', data?.data);
    // const temp = data?.data?.filter(
    //   item => item.id?.replace(/-/g, '') === currentPurchaseError?.productId,
    // );
    // setSelectedTopup(undefined);
    // handleDismissModalPress();
    // console.log('temp', temp);
    // ... listen to currentPurchaseError, to check if any error happened
  }, [currentPurchaseError]);

  useEffect(() => {
    const checkCurrentPurchase = async () => {
      try {
        if (currentPurchase?.productId) {
          await finishTransaction({
            purchase: currentPurchase,
            isConsumable: true,
          }).then(() => {
            const temp = data?.data?.filter(
              (item: {id: string}) =>
                item.id?.replace(/-/g, '') === currentPurchase?.productId,
            );
            if (temp?.length > 0) {
              createPurchaseIap.mutate(
                {
                  amount: temp[0]?.amount,
                  price: temp[0]?.price,
                  receipt: currentPurchase?.transactionReceipt,
                },
                {
                  onError: err => {
                    console.log('err', err);
                    onError(err);
                  },
                  onSuccess: res => {
                    console.log('res', res);
                    setSelectedTopup(undefined);
                    handleDismissModalPress();
                    refetchMe();
                  },
                },
              );
            }
          });
        }
      } catch (error) {
        console.log('err', error);
        //Handle error
      }
    };

    checkCurrentPurchase();

    // if (Platform.OS === 'ios') {
    //   if (currentPurchase?.transactionReceipt) {
    //     const temp = data?.data?.filter(
    //       (item: {id: string}) =>
    //         item.id?.replace(/-/g, '') === currentPurchase?.productId,
    //     );
    //     if (temp?.length > 0) {
    //       createPurchaseIap.mutate(
    //         {
    //           amount: temp[0]?.amount,
    //           price: temp[0]?.price,
    //           receipt: currentPurchase?.transactionReceipt,
    //         },
    //         {
    //           onError: err => {
    //             console.log('err', err);
    //             onError(err);
    //           },
    //           onSuccess: res => {
    //             console.log('res', res);
    //             setSelectedTopup(undefined);
    //             handleDismissModalPress();
    //             refetchMe();
    //           },
    //         },
    //       );
    //     }
    //   }
    // }
  }, [currentPurchase, finishTransaction]);

  const ItemsWithdraws = useMemo(() => {
    if (me?.data?.coinBalance > 0 && coinRate?.data) {
      const total = me?.data?.coinBalance * coinRate?.data?.withdrawRate;
      let result: IItemTopup[] = [
        {
          id: String(total),
          amount: formatRupiah(total),
          price: `${me?.data?.coinBalance} koins`,
          detail: {
            total: total,
            coin: me?.data?.coinBalance,
          },
        },
      ];
      for (
        let i = coinRate?.data?.minimumWithdrawAmount;
        i < me?.data?.coinBalance;
        i = i + 1000
      ) {
        result.push({
          id: String(i),
          amount: formatRupiah(i * coinRate?.data?.withdrawRate),
          price: `${i} koins`,
          detail: {
            total: i * coinRate?.data?.withdrawRate,
            coin: i,
          },
        });
      }
      return result;
    }

    return [];
  }, [me?.data, coinRate?.data]);

  //handles
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleDismissModalPress = useCallback(() => {
    setButtonNextDisabled(true);
    refetch();
    bottomSheetModalRef.current?.dismiss();
  }, []);

  const handlePressTopup = async () => {
    let tmp: any = [];
    const tempIDs = data?.data?.map((i: {id: string}) => {
      tmp.push({id: i?.id?.replace(/-/g, ''), idCoinPackage: i?.id});
      return i?.id?.replace(/-/g, '');
    });
    if (Platform.OS === 'ios') {
      setTempCoinPackage(tmp);
      await getProducts({
        skus: tempIDs,
      });
      setActiveForm('topup');
      setSelectedTopup(undefined);
      handlePresentModalPress();
    } else {
      if (me?.data?.phone) {
        setActiveForm('topup');
        setSelectedTopup(undefined);
        handlePresentModalPress();
      } else {
        setModalPhone(true);
      }
    }
  };
  const handlePressWithdraw = () => {
    if (me?.data?.verified) {
      setActiveForm('withdraw');
      setSelectedWithdraw(undefined);
      handlePresentModalPress();
    } else {
      setModalWD(true);
    }
  };

  const handleWithdraw = () => {
    createWithdraws.mutate(
      {amount: selectedWithdraw?.detail?.coin},
      {
        onSuccess: () => {
          setModalWD(false);
          setMessageModal(
            `Withdraw sebesar ${selectedWithdraw?.detail?.coin} koin berhasil`,
          );
          handleDismissModalPress();
          refetchMe();
          setModalConfirm(true);
        },
        onError: err => {
          onError(err);
        },
      },
    );
  };

  const onNavigationStateChange = (webViewState: any) => {
    if (webViewState?.url?.includes('https://komunitaspatrickkellan.com/')) {
      setMessageModal(`Top Up Sebesar ${selectedTopup?.amount} koin berhasil`);
      handleDismissModalPress();
      refetchMe();
      setModalConfirm(true);
    }
  };

  const renderForm = () => {
    if (activeForm === 'topup') {
      if (Platform.OS === 'ios') {
        return (
          <TransactionTopup
            items={products.map(item => ({
              id: item?.productId,
              amount: item?.title,
              price: item?.localizedPrice,
            }))}
            selected={selectedTopup}
            onPress={item => {
              setButtonNextDisabled(false);
              setSelectedTopup(item);
            }}
          />
        );
      } else {
        return (
          <TransactionTopup
            items={data?.data as IItemTopup[]}
            selected={selectedTopup}
            onPress={item => {
              setButtonNextDisabled(false);
              setSelectedTopup(item);
            }}
          />
        );
      }
    } else if (activeForm === 'payment') {
      return (
        <WebView
          source={{uri: `${paymentToken}`}}
          onLoad={() => setPaymenLoading(false)}
          javaScriptEnabled={true}
          javaScriptCanOpenWindowsAutomatically={true}
          domStorageEnabled={true}
          style={{height: height, width: '100%'}}
          cacheEnabled={true}
          allowFileAccessFromFileURLs={true}
          allowFileAccess={true}
          cacheMode="LOAD_NO_CACHE"
          injectedJavaScript={`const meta = document.createElement('meta'); meta.setAttribute('content', 'width=width, initial-scale=0.7, maximum-scale=0.8, user-scalable=2.0'); meta.setAttribute('name', 'viewport'); document.getElementsByTagName('head')[0].appendChild(meta); `}
          onNavigationStateChange={onNavigationStateChange}
        />
      );
    } else if (activeForm === 'withdraw-confirmation') {
      return (
        <WithdrawConfirmation
          coin={Number(selectedWithdraw?.detail?.coin)}
          total={Number(selectedWithdraw?.detail?.total)}
          bankName={me?.data?.verification?.bankName}
          bankNumber={me?.data?.verification?.bankAccountNumber}
          name={me?.data?.verification?.identityFullName}
        />
      );
    } else {
      return (
        <TransactionWithdraw
          items={ItemsWithdraws}
          selected={selectedWithdraw}
          onPress={item => {
            setButtonNextDisabled(false);
            setSelectedWithdraw(item);
          }}
        />
      );
    }
  };

  const renderTitleBottom = () => {
    switch (activeForm) {
      case 'topup':
        return 'Top Up';

      case 'payment':
        return 'Pembayaran';

      default:
        return 'Withdraw';
    }
  };

  const handleTopup = async () => {
    if (Platform.OS === 'ios') {
      await requestPurchase({sku: selectedTopup?.id as string, quantity: 1});
    } else {
      createTopup.mutate(
        {coinPackageId: selectedTopup?.id},
        {
          onError: err => {
            onError(err);
          },
          onSuccess: (res: any) => {
            setPaymentToken(res?.data?.paymentToken);
          },
        },
      );
      setActiveForm('payment');
    }
  };

  const handleProcess = () => {
    switch (activeForm) {
      case 'topup':
        handleTopup();
        break;
      case 'withdraw-confirmation':
        handleWithdraw();
        break;

      default:
        setActiveForm('withdraw-confirmation');
        break;
    }
  };

  const titleHistory = (type: string) => {
    switch (type) {
      case 'withdraw':
        return 'Penarikan';
      case 'bookPurchase':
        return 'Pembelian Buku';

      case 'withdrawRejection':
        return 'Penarikan ditolak';
      default:
        return 'Pembelian';
    }
  };

  const badgeStatus = (transaction: ITransactionModel) => {
    const tmp = JSON.parse(transaction?.metadata).product?.topupRequestStatus;
    return tmp ? `- ${tmp}` : '';
  };

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => {
              refetch();
            }}
          />
        }
        ListHeaderComponent={() => (
          <>
            <View style={styles.header}>
              <Image
                source={require('../../assets/images/headerWallet.png')}
                style={styles.headerImage}
              />
              <View style={styles.headerContent}>
                <Text style={styles.title}>Total Coins</Text>
                <View style={styles.headerBody}>
                  <Image source={require('../../assets/images/coins.png')} />
                  <Text style={styles.textCoins}>
                    {me?.data?.coinBalance} Coins
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.button}
                onPress={handlePressTopup}>
                <IconTopup />
                <Text style={styles.textButton}>Top Up</Text>
              </TouchableOpacity>
              <View style={styles.divider} />
              <TouchableOpacity
                style={styles.button}
                onPress={handlePressWithdraw}>
                <IconWithdraw />
                <Text style={styles.textButton}>Withdraw</Text>
              </TouchableOpacity>
            </View>
            <View style={styles.historyContainer}>
              <Text style={styles.titleHistory}>Riwayat Transaksi</Text>
            </View>
          </>
        )}
        data={transactions?.pages.flatMap(page => page.data)}
        renderItem={({item}) => (
          <ItemHistory
            key={`history-${item?.id}`}
            title={`${titleHistory(item.type)} ${
              item.amount
            } koin ${badgeStatus(item)}`}
            date={item.transactionDate}
            type={item.type}
            transaction={item?.metadata}
          />
        )}
        onEndReached={ () => {
          fetchNextPage();
        }}
      />
      <MyBottomSheet
        right={<IconClose color="#FFF" />}
        rightPress={handleDismissModalPress}
        bottomSheetRef={bottomSheetModalRef}
        title={renderTitleBottom()}
        top={Platform?.OS === 'ios' ? '80%' : '100%'}
        footer={
          activeForm !== 'payment' ? (
            <View style={styles.footer}>
              <Button
                text="Lanjutkan"
                bgColor="yellow"
                disabled={buttonNextDisabled}
                outline={true}
                onPress={handleProcess}
              />
            </View>
          ) : null
        }>
        {renderForm()}
      </MyBottomSheet>
      <MyModal
        isVisible={modalConfirm}
        buttonPress={() => setModalConfirm(false)}
        buttonText="Mengerti"
        title="Berhasil"
        message={messageModal}
        icon={<IconChecked width={68} height={68} />}
      />
      <MyModal
        isVisible={modalWD}
        buttonPress={() => setModalWD(false)}
        buttonText="Mengerti"
        title="Maaf"
        message="Maaf akun anda belum di verifikasi, harap verifikasi dulu"
        icon={<IconClose size={68} />}
      />
      <MyModal
        isVisible={modalPhone}
        buttonPress={() => setModalPhone(false)}
        buttonText="Mengerti"
        title="Maaf"
        message="Maaf anda belum mengisi nomor telepon"
        icon={<IconClose size={68} />}
      />
    </View>
  );
};

export default WalletScreen;
