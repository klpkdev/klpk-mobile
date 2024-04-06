import {Text, View} from 'react-native';
import {IconPurchase, IconTopup, IconWithdraw} from '../Icons';
import styles from './styles';
import {format} from 'date-fns';

interface IProps {
  type:
    | 'topup'
    | 'withdraw'
    | 'bookPurchase'
    | 'chapterPurchase'
    | 'bookSales'
    | 'chapterSales'
    | 'withdrawRejection';
  title: string;
  date: string;
  transaction: string;
}

const ItemHistory: React.FC<IProps> = ({
  type = 'topup',
  title,
  date,
  transaction,
}) => {
  const trx = JSON.parse(transaction);
  // console.log('trx', trx);
  const renderIcon = (type: string) => {
    switch (type) {
      case 'withdraw':
        return <IconWithdraw />;
      case 'withdrawRejection':
        return <IconWithdraw />;

      case 'bookPurchase':
      case 'chapterPurchase':
        return <IconPurchase />;

      default:
        return <IconTopup />;
    }
  };
  const renderBookInfo = () => {
    return (
      <>
        <Text style={styles.dateItemHistory}>
          {'Book : ' + trx?.product?.bookTitle}
        </Text>
        <Text style={styles.dateItemHistory}>
          {'Chapter : ' + trx?.product?.chapterName}
        </Text>
      </>
    );
  };

  return (
    <View style={styles.itemHistory}>
      {renderIcon(type)}
      <View style={styles.itemHistoryContent}>
        <Text
          style={[
            styles.titleItemHistory,
            {
              color:
                trx?.product?.topupRequestStatus === 'succeeded' ||
                type === 'bookSales' ||
                type === 'chapterSales'
                  ? 'green'
                  : trx?.product?.topupRequestStatus === 'pending'
                  ? 'orange'
                  : 'red',
            },
          ]}>
          {title}
        </Text>
        {type === 'chapterPurchase' || type === 'bookPurchase'
          ? renderBookInfo()
          : null}
        <Text style={styles.dateItemHistory}>
          {format(new Date(date), 'dd MMM yyyy')}
        </Text>
      </View>
    </View>
  );
};

export default ItemHistory;
