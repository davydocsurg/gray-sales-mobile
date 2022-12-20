import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, FlatList, Text } from 'react-native';
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

const AccountSetting = ({ navigation }: any) => {
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
            uri: BASE_URL + authUser.user?.photo?.replace('public', ''),
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
    color: colors.dark,
  },
  email: {
    fontSize: 18,
    fontWeight: '400',
    color: colors.dark,
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

export default AccountSetting;

// The future of renewable energy
// The impact of artificial intelligence on employment
// The rise of plant-based protein
// The impact of social media on mental health
// The role of technology in education
// The benefits and drawbacks of genetic engineering
// The future of transportation: electric and autonomous vehicles
// The role of virtual reality in entertainment and gaming
// The impact of climate change on global agriculture
// The role of blockchain in supply chain management

// Developers Meetup
// generate 10 random topics on Web3
// The potential of web3 to revolutionize the internet
// The challenges facing the adoption of web3 technology
// The role of decentralized applications (dApps) in the web3 ecosystem
// The potential of the blockchain to increase transparency and security in online interactions
// The use of cryptocurrency and tokens in web3 projects
// The impact of web3 on traditional business models
// The potential of web3 to disrupt industries and create new opportunities
// The role of open source platforms like Ethereum in enabling web3
// The potential of web3 to give users more control over their data and online interactions
// The future of web3 and its potential to drive the next generation of the internet.
