import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image } from '@rneui/base';
import { SearchBar, Text } from '@rneui/themed';
import React, { useEffect, useState } from 'react';
import { View, FlatList } from 'react-native';
import Header from '../components/Header.component';
import { AppParamsList } from '../components/Layout.component';
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
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Header />
      {isFetching && <Text>Loading...</Text>}
      {!!error && (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text h4>Мы еще составляем меню!</Text>
          <Text h4>Вернитесь позже</Text>
          <Image style={{ width: 414, height: 414 }} source={require('../../assets/MenuNotFound.png')} />
        </View>
      )}
      {!!menu && (
        <View style={{ flex: 1, marginLeft: '2%', marginRight: '2%' }}>
          <SearchBar
            value={searchValue}
            onChangeText={setSearchValue}
            lightTheme
            round
            containerStyle={{
              backgroundColor: 'transparent',
              padding: '1%',
              borderBottomColor: 'transparent',
              borderTopColor: 'transparent',
              marginBottom: '2%',
            }}
            inputContainerStyle={{
              backgroundColor: 'white',
              borderBottomColor: '#F5F5F5',
              borderTopColor: '#F5F5F5',
              borderRightColor: '#F5F5F5',
              borderLeftColor: '#F5F5F5',
              borderWidth: 1,
              borderBottomWidth: 1,
              height: 22,
            }}
          />
          <FlatList
            data={menu.lunchSets.filter((item) => item.lunchSetList.find((item) => item.match(new RegExp(`${searchValue}`, 'gi'))))}
            renderItem={(props) => <MenuItem {...props} />}
            numColumns={2}
          />
        </View>
      )}
    </View>
  );
};

export default Home;
