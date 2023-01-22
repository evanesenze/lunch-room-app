import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Button, Icon, Input, Text } from '@rneui/base';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, SafeAreaView, View, StyleSheet } from 'react-native';
import { AppParamsList } from '../components/Layout.component';
import { useAppActions, useAppSelector } from '../hooks/useApp';
import { useAuthMutation, useRegisterMutation } from '../store/apis/auth.api';
import { useLazyGetUserQuery } from '../store/apis/user.api';
import jwt from 'jwt-decode';
import { useLazyGetGroupQuery } from '../store/apis/group.api';
import Loading from '../components/Loading.component';

const Auth: React.FC<NativeStackScreenProps<AppParamsList, 'Auth'>> = ({ navigation }) => {
  const { state } = useAppSelector((store) => store.user);
  const { activeGroupAvailable } = useAppSelector((store) => store.group);
  const { updateUser, updateGroups, updateActiveGroup } = useAppActions();
  const [auth, { isLoading }] = useAuthMutation();
  const [reg] = useRegisterMutation();
  const [getUser, { isLoading: isUserLoading }] = useLazyGetUserQuery();
  const [getGroup] = useLazyGetGroupQuery();
  const storageToken = useAsyncStorage('token');
  const storageActiveGroupId = useAsyncStorage('activeGroupId');
  const [isSecure, setIsSecure] = useState(true);
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');

  const login = async () => {
    const token = await storageToken.getItem();
    if (!token || token.split('.').length < 3) return updateUser({ state: 'unauth' });
    const userId = jwt<{ UserID: string }>(token).UserID;
    const userInfo = await getUser({ userId, token }).unwrap().catch(console.error);
    updateUser({ info: userInfo ?? undefined, token, state: 'auth' });
    await loadGroups(userInfo?.groups ?? []);
  };

  useEffect(() => {
    login();
  }, []);

  const handleSubmit = async () => {
    if (!isLogin && password !== password2) return Alert.alert('Ошибка', 'Пароли не совпадают');
    if (isLogin) {
      const token = await auth({ email, password })
        .unwrap()
        .catch((error) => {
          console.log(error);
          Alert.alert('Упс...', 'При авторизации произошла ошибка');
        });
      if (!token) return;
      const userId = jwt<{ UserID: string }>(token).UserID;
      const userInfo = await getUser({ userId, token }).unwrap().catch(console.error);
      updateUser({ info: userInfo ?? undefined, token, state: 'auth' });
      storageToken.setItem(token);
      await loadGroups(userInfo?.groups ?? []);
    } else {
      await reg({ email, password })
        .unwrap()
        .then(() => {
          setIsLogin(true);
          Alert.alert('Успех', 'Вы успешно зарегистрировались. Теперь подтвердите свою почту');
        });
    }
  };

  const loadGroups = async (groups: string[]) => {
    const res = await Promise.all(groups.map((groupId) => getGroup({ groupId }).unwrap()));
    updateGroups(res);
    const activeGroupId = await storageActiveGroupId.getItem();
    const activeGroup = res.find((item) => item.id === activeGroupId);
    if (!activeGroup) return;
    updateActiveGroup(activeGroup);
  };

  useEffect(() => {
    if (state !== 'auth') return;
    activeGroupAvailable ? navigation.navigate('Home') : navigation.navigate('Profile');
  }, [state]);

  if (state === 'wait') return <Loading />;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.wrapper}>
        <Text h2 style={styles.wrapperTitle}>
          {isLogin ? 'Войти' : 'Регистрация'}
        </Text>
        <Input label="Email" placeholder="Введите ваш Email" value={email} onChangeText={setEmail} />
        <Input
          label="Пароль"
          secureTextEntry={isSecure}
          placeholder="Введите пароль"
          value={password}
          onChangeText={setPassword}
          rightIcon={<Icon name={`visibility${isSecure ? '-off' : ''}`} onPress={() => setIsSecure((x) => !x)} />}
        />
        {!isLogin && (
          <Input
            label="Повторите пароль"
            secureTextEntry={isSecure}
            placeholder="Введите пароль"
            value={password2}
            onChangeText={setPassword2}
            rightIcon={<Icon name={`visibility${isSecure ? '-off' : ''}`} onPress={() => setIsSecure((x) => !x)} />}
          />
        )}
        <Button
          containerStyle={styles.mainBtn}
          color="#FF4F5A"
          onPress={handleSubmit}
          loading={isLoading || isUserLoading}
          disabled={isLoading || isUserLoading || !email || !password || (!isLogin && !password2)}
        >
          {isLogin ? 'Войти' : 'Зарегистрироваться'}
        </Button>
        <Pressable
          onPress={() =>
            setIsLogin((x) => {
              if (x) setPassword2('');
              return !x;
            })
          }
        >
          <Text style={styles.secondaryBtn}>{isLogin ? 'Зарегистрироваться' : 'Войти'}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { justifyContent: 'center', alignItems: 'center', height: '100%' },
  wrapper: { width: '90%' },
  wrapperTitle: { marginBottom: '5%', letterSpacing: 1 },
  mainBtn: { borderRadius: 10, marginBottom: '5%' },
  secondaryBtn: { textAlign: 'center' },
});

export default Auth;
