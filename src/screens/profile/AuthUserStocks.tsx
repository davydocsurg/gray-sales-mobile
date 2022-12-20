import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { BASE_URL } from '../../api/constants';
import { LoadingIndicator } from '../../components';
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

  const handleDelete = (stock: string) => {};

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
};

export default AuthUserStocks;
