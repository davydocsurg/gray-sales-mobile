import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import { BASE_URL } from '../../api/constants';
import { LoadingIndicator, NoStocks } from '../../components';
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from '../../components/lists';
import Screen from '../../components/Screen';
import { useAuthContext } from '../../contexts/AuthContext';
import routes from '../../navigation/routes';

const AuthUserStocks = ({ navigation }: any) => {
  const [refreshing, setRefreshing] = useState(false);
  const { authUserStocks, authUser, handleFetchAuthUserStocks } =
    useAuthContext();
  const isFocued = useIsFocused();

  useEffect(() => {
    handleFetchAuthUserStocks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocued === true]);

  const handleDelete = (stock: string) => {};

  if (authUserStocks.length === 0) {
    return <NoStocks />;
  } else {
    return (
      <Screen>
        <LoadingIndicator visible={authUser.loading} />
        <FlatList
          data={authUserStocks}
          keyExtractor={stock => stock?._id.toString()}
          renderItem={({ item }) => (
            <ListItem
              borderRadius={15}
              title={item?.title}
              subTitle={item?.description}
              image={{ uri: BASE_URL + item?.images[0].path }}
              icon="chevron-down"
              listAction={() => {
                navigation.navigate(routes.AUTH_USER_STOCKS, item);
              }}
              renderActions={() => (
                <ListItemDeleteAction
                  deleteAction={() => handleDelete(item?._id)}
                />
              )}
            />
          )}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          onRefresh={() => {
            handleFetchAuthUserStocks();
          }}
        />
      </Screen>
    );
  }
};

export default AuthUserStocks;
