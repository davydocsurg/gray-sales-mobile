import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList } from 'react-native';
import { Text } from 'react-native-svg';
import { BASE_URL } from '../../api/constants';
import { AppButton } from '../../commons';
import { Icon } from '../../components';
import { ListItem, ListItemSeparator } from '../../components/lists';
import { useAuthContext } from '../../contexts/AuthContext';
import routes from '../../navigation/routes';
import colors from '../../utils/colors';

const menuItems = [
  {
    title: 'My Stocks',
    icon: {
      name: 'format-list-bulleted',
      backgroundColor: colors.orange,
    },
    targetScreen: 'My Stocks',
  },
  {
    title: 'My Messages',
    icon: {
      name: 'email',
      backgroundColor: colors.secondary,
    },
    targetScreen: 'Messages',
  },
];

const Account = ({ navigation }: any) => {
  const isFocused = useIsFocused();
  const {
    authUser,
    authUserStocks,
    handleFetchAuthUserStocks,
    handleFetchAuthUserData,
    handleLogout,
  } = useAuthContext();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  useEffect(() => {
    handleFetchAuthUserData();
    setTimeout(() => {
      handleFetchAuthUserData();
    }, 1200);
    console.log(authUser);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFocused === true]);

  return (
    <View style={styles.screen}>
      <View style={styles.profileContainer}>
        <View style={styles.bgImage}>{/* <Text>hello</Text> */}</View>
        <Image
          style={styles.image}
          defaultSource={require('../../assets/images/avatar.jpg')}
          source={{
            uri: BASE_URL, //+ authUser.user?.photo?.replace('public', ''),
          }}
        />
        <View style={styles.profInfo}>
          <Text style={styles.name}>{authUser.user?.name}</Text>
          <Text style={styles.email}>{authUser.user?.email}</Text>

          <AppButton
            color={colors.orange}
            onPress={() => navigation.navigate(routes.UPDATE_PROFILE)}
            title={'Edit Profile'}
            icon={'chevron-right'}
          />
        </View>
      </View>

      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={menuItem => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          refreshing={refreshing}
          // onRefresh={refreshAuthUser}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              listAction={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>

      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor={colors.danger} />}
        listAction={handleLogout}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
    flex: 1,
  },
  profileContainer: {
    marginTop: 0,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
    // marginBottom: 0,
  },
  bgImage: {
    zIndex: 1,
    height: 135,
    width: '100%',
    backgroundColor: colors.orange,
  },
  profInfo: {
    marginTop: 12,
    alignItems: 'center',
  },
  name: {
    fontSize: 22,
    fontWeight: '700',
  },
  email: {
    fontSize: 18,
    fontWeight: '400',
  },
  image: {
    zIndex: 2,
    // position: "absolute",
    width: 120,
    height: 120,
    borderRadius: 65,
    marginTop: -70,
  },
});

export default Account;
