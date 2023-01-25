import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from '@rneui/base';
import { SearchBar, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Header from '../components/Header.component';
import { AppParamsList } from '../components/Layout.component';
import Loading from '../components/Loading.component';
import MenuItem from '../components/MenuItem.component';
import { useAppSelector } from '../hooks/useApp';
import { useLazyGetTodayMenuQuery } from '../store/apis/menu.api';

// const Stack = createNativeStackNavigator<AppParamsList>();

const Home: React.FC<NativeStackScreenProps<AppParamsList, 'Home'>> = () => {
  const [searchValue, setSearchValue] = useState('');
  const { info } = useAppSelector((state) => state.user);
  const [getTodayMenu, { data: menu, error, isFetching }] = useLazyGetTodayMenuQuery();

  useEffect(() => {
    if (!info?.groups.length) return;
    getTodayMenu({ groupId: info.groups[0] });
  }, [info]);

  return (
    <View style={styles.container}>
      <Header />
      {isFetching && <Loading />}
      {!!error && (
        <View style={styles.emptyMenu}>
          <Text>Мы еще составляем меню!</Text>
          <Text>Вернитесь позже</Text>
          <Image style={styles.emptyMenuImage} source={require('../../assets/MenuNotFound.png')} />
        </View>
      )}
      {!!menu && (
        <View style={styles.menuContainer}>
          <SearchBar
            value={searchValue}
            onChangeText={setSearchValue}
            lightTheme
            round
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.searchBarInput}
          />
          <FlatList
            data={menu.lunchSets.filter((item) => item.lunchSetList.find((item) => item.match(new RegExp(`${searchValue}`, 'gi'))))}
            keyExtractor={(item) => item.id}
            renderItem={(props) => <MenuItem {...props} />}
            numColumns={2}
          />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: '4%',
    paddingRight: '4%',
    position: 'relative',
    backgroundColor: 'white',
  },
  emptyMenu: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyMenuImage: { width: 414, height: 414 },
  menuContainer: { flex: 1 },
  searchBarContainer: {
    backgroundColor: 'transparent',
    padding: '1%',
    borderBottomColor: 'transparent',
    borderTopColor: 'transparent',
    marginBottom: '2%',
  },
  searchBarInput: {
    backgroundColor: 'white',
    borderBottomColor: '#F5F5F5',
    borderTopColor: '#F5F5F5',
    borderRightColor: '#F5F5F5',
    borderLeftColor: '#F5F5F5',
    borderWidth: 1,
    borderBottomWidth: 1,
    height: 22,
  },
});

export default Home;
