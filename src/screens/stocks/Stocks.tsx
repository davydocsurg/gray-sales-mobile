import React, { useEffect } from 'react';
import { View, StyleSheet, Text, SafeAreaView, FlatList } from 'react-native';
import { Screen } from 'react-native-screens';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// locals
import { BASE_URL } from '../../api/constants';
import { AppButton } from '../../commons';
import AppText from '../../commons/AppText';
import Card from '../../commons/Card';
import { LoadingIndicator } from '../../components';
import { useStockContext } from '../../contexts/StockContext';
import routes from '../../navigation/routes';
import colors from '../../utils/colors';

const Stocks = ({ navigation }: any) => {
  const { stocks, errors, handleFetchStocks, stocksCount, fetching } =
    useStockContext();

  useEffect(() => {
    handleFetchStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (errors.length > 0) {
    return (
      <Screen style={styles.error}>
        <AppText>Couldn't fetch stocks.</AppText>
        <AppButton
          title="Retry"
          color={colors.orange}
          onPress={handleFetchStocks}
        />
      </Screen>
    );
  } else if (fetching) {
    return (
      <Screen style={styles.animation}>
        <LoadingIndicator visible={fetching} />
      </Screen>
    );
  } else if (stocks?.length < 1 || stocks === undefined) {
    return (
      <Screen style={styles.emptyStockContainer}>
        <Icon
          name="flask-empty-minus-outline"
          size={60}
          color={colors.orange}
          style={styles.emptyIcon}
        />
        <Text style={styles.emptyStock}>No Stocks found!</Text>
      </Screen>
    );
  } else {
    return (
      <SafeAreaView>
        <Screen style={styles.screen}>
          <FlatList
            data={stocks}
            keyExtractor={stock => stock?._id.toString()}
            // columnWrapperStyle={{ flexWrap: 'wrap', flexDirection: 'row' }}
            numColumns={2}
            renderItem={({ item }: any) => (
              <Card
                title={item?.title}
                description={'$' + item?.price}
                imageUrl={{
                  uri: BASE_URL + item?.images[0].path,
                }}
                onPress={() => navigation.navigate(routes.STOCK_DETAILS, item)}
              />
            )}
            // refreshing={getListingsApi.loading}
            // onRefresh={() => getListingsApi.request()}
          />
        </Screen>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({
  safeArea: {
    // paddingTop: 30,
    // backgroundColor: colors.gray,
  },
  screen: {
    paddingHorizontal: 10,
    paddingTop: 7,
    backgroundColor: colors.gray,
  },

  error: {
    padding: 35,
    paddingTop: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  animation: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 480,
  },

  emptyStockContainer: {
    justifyContent: 'center',
    flex: 1,
  },

  emptyStock: {
    color: colors.brown,
    alignSelf: 'center',
    fontSize: 30,
    fontWeight: 'bold',
  },

  emptyIcon: {
    alignSelf: 'center',
  },
});

export default Stocks;
