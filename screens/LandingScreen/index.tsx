import {useNavigation} from '@react-navigation/native';
import {Dimensions, Image, ScrollView, Text, View} from 'react-native';
import AuthLayout from '../../components/AuthLayout';
import Button from '../../components/Button';
import LinkNewMember from '../../components/LinkNewMember';
import {GuestStackScreenProps} from '../../types/RootStackParamList';
import styles from './styles';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useEffect, useState} from 'react';
import {useAuth} from '../../store';

const LandingScreen = () => {
  const navigation = useNavigation<GuestStackScreenProps>();
  const [activeDot, setActiveDot] = useState(0);
  const logout = useAuth(state => state.logout);
  const renderItem = ({item, index}: {item: any; index: number}) => {
    return (
      <View
        key={`image-${index}`}
        style={{alignItems: 'center', justifyContent: 'center'}}>
        <Image source={item.image} resizeMode="contain" />
      </View>
    );
  };

  useEffect(() => {
    logout();
  }, []);

  return (
    <AuthLayout>
      <ScrollView style={styles.container1}>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../../assets/images/logo.png')}
          />
          <View style={styles.carousel}>
            <Carousel
              data={[
                {
                  title: 'testing',
                  image: require('../../assets/images/loveCode.png'),
                },
                {
                  title: 'testing 22',
                  image: require('../../assets/images/loveCode.png'),
                },
                {
                  title: 'testing 33',
                  image: require('../../assets/images/loveCode.png'),
                },
              ]}
              autoplay={true}
              loop={true}
              renderItem={renderItem}
              autoplayInterval={3000}
              sliderWidth={Dimensions.get('screen').width}
              itemWidth={Dimensions.get('screen').width}
              onSnapToItem={index => setActiveDot(index)}
            />
            <Pagination
              dotsLength={3}
              activeDotIndex={activeDot}
              dotStyle={styles.dotStyle}
            />
          </View>
          <Text style={styles.textYellow}>Beragam Cerita Untukmu</Text>
          <Text style={styles.textBottom}>Baca dan Tulis ceritamu</Text>
          <Button
            text="Masuk"
            onPress={() => navigation.navigate('LoginScreen')}
          />
          <LinkNewMember />
        </View>
      </ScrollView>
    </AuthLayout>
  );
};

export default LandingScreen;
