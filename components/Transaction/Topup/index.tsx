import {View, Text} from 'react-native';
import {ITransaction} from '../../../interfaces/transactions';
import {formatNumberWithK, formatRupiah} from '../../../utils/commons';
import ItemTransaction from '../../ItemTransaction';
import styles from './style';

const image = require('../../../assets/images/coins2.png');

const Topup: React.FC<ITransaction> = ({items, onPress, selected}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pilih Jumlah Koin</Text>
      {items.map(item => {
        // console.log('item: ', item);
        return (
          <ItemTransaction
            key={`item-${item.id}`}
            image={image}
            onPress={() => {
              onPress(item);
            }}
            selected={selected?.id === item.id}
            {...item}
            amount={item?.amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")}// {`${formatNumberWithK(Number(item.amount))} Koin`}
            price={item.price}// {`${formatRupiah(Number(item.price))}`}
          />
        );
      })}
    </View>
  );
};

export default Topup;
