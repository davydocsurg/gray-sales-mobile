import { useIsFocused } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { BASE_URL } from '../../api/constants';
import AppText from '../../commons/AppText';
import { ListItem } from '../../components/lists';
import { useStockContext } from '../../contexts/StockContext';
import colors from '../../utils/colors';

const StockDetails = ({ route }: any) => {
  const stock = route.params;
  const {
    stockOwner,
    stocksCount,
    handleFetchStockOwner,
    handleFetchUserStocks,
  } = useStockContext();
  const isFocused = useIsFocused();

  useEffect(() => {
    handleFetchStockOwner(stock?.user);
    handleFetchUserStocks(stock?.user);
    console.log('stockcount', stocksCount);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused === true]);

  return (
    <View>
      <Image
        style={styles.image}
        source={{ uri: BASE_URL + stock?.images[0].path }}
      />
      <View style={styles.detailsContainer}>
        <AppText style={styles.title}>{stock.title}</AppText>
        <AppText style={styles.description}>{stock.description}</AppText>
        <AppText style={styles.price}>${stock.price}</AppText>

        <ListItem
          image={{
            uri: BASE_URL + stockOwner?.photo.replace('public', ''),
          }}
          title={stockOwner?.name!}
          subTitle={`${stocksCount!} ${+stocksCount! > 1 ? 'stocks' : 'stock'}`}
          // borderRadius={2}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  detailsContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '500',
  },
  description: {
    fontSize: 14,
    fontWeight: '300',
  },
  price: {
    color: colors.secondary,
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 10,
  },
});

export default StockDetails;
