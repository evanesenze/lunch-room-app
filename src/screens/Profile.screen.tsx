import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Avatar, Button, CheckBox, Icon, Switch, Text } from '@rneui/base';
import React from 'react';
import { Alert, View, Pressable, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
import EditInfo from '../components/EditInfo.component';
import Header from '../components/Header.component';
import JoinGroup from '../components/JoinGroup.component';
import { AppParamsList } from '../components/Layout.component';
import Loading from '../components/Loading.component';
import { useAppActions, useAppSelector } from '../hooks/useApp';
import useModal from '../hooks/useModal';

const Profile: React.FC<NativeStackScreenProps<AppParamsList, 'Profile'>> = ({ navigation }) => {
  const storageToken = useAsyncStorage('token');
  const storageActiveGroupId = useAsyncStorage('activeGroupId');
  const { logout, updateActiveGroup } = useAppActions();
  const { info } = useAppSelector((store) => store.user);
  const { groups, activeGroup } = useAppSelector((store) => store.group);
  const [openJoinGroup, joinGroup] = useModal(JoinGroup, { key: 'joinGroup' });
  const [openEditInfo, editInfo] = useModal(EditInfo, { key: 'editInfo' });

  const handleLogout = () => {
    Alert.alert('Подтвердите действие', 'Вы действительно хотите выйти?', [
      {
        text: 'Нет',
      },
      {
        text: 'Да',
        onPress: () => {
          storageActiveGroupId.removeItem();
          storageToken.removeItem();
          logout();
          navigation.navigate('Auth');
        },
      },
    ]);
  };

  if (!info) return <Loading />;

  return (
    <View style={styles.container}>
      <Header hideInfo lang containerStyle={styles.headerContainer} />
      <ScrollView>
        <View style={styles.infoWrapper}>
          <View>
            <Avatar size="large" containerStyle={styles.avatar} icon={{ name: 'person', type: 'material' }} rounded />
          </View>
          <View style={styles.info}>
            <Text h4 style={styles.infoItem}>
              {info.surname} {info.name} {info.patronymic}
            </Text>
            <Text style={styles.infoItem}>{info.email}</Text>
          </View>
        </View>
        <Text
          onPress={openEditInfo}
          style={{ textDecorationLine: 'underline', fontSize: 16, textAlign: 'right', marginTop: 5, color: 'darkblue', marginBottom: 20 }}
        >
          Редактировать данные
        </Text>
        <View style={styles.commandsWrapper}>
          <Text h4>Мои команды</Text>
          {groups.map((item, i) => (
            <CheckBox
              checkedColor="#FF4F5A"
              key={i}
              size={24}
              containerStyle={{ padding: 0 }}
              checked={item.id === activeGroup?.id}
              onPress={() => updateActiveGroup(item)}
              title={item.organizationName}
            />
          ))}
          <Pressable onPress={openJoinGroup}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon name="add" style={{ marginRight: 5 }} />
              <Text>Вступить в команду</Text>
            </View>
          </Pressable>
        </View>
        <View style={styles.alertsWrapper}>
          <Text h4>Оповещения</Text>
          <Switch color="#FF4F5A" />
        </View>
        <View style={styles.helpWrapper}>
          <Text h4 style={styles.helpItem}>
            Помощь
          </Text>
          <View style={styles.helpItems}>
            <Text style={styles.helpItem}>История покупок</Text>
            <Text style={styles.helpItem}>Тех. поддержка</Text>
            <Text style={styles.helpItem}>О нас</Text>
            <Text>Политика конфиденциальности</Text>
          </View>
        </View>
        <Button style={styles.helpItems} color="#FF4F5A" onPress={handleLogout}>
          Выйти
        </Button>
        {joinGroup}
        {editInfo}
      </ScrollView>
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
  infoWrapper: { flexDirection: 'row' },
  avatar: { backgroundColor: '#FF4F5A' },
  info: { paddingLeft: 10, flex: 1 },
  infoItem: { marginBottom: 5 },
  commandsWrapper: { marginBottom: 20 },
  alertsWrapper: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  helpWrapper: { marginBottom: 40 },
  helpItems: { marginBottom: 10 },
  helpItem: { marginBottom: 5 },
  headerContainer: { marginBottom: 10 },
});

export default Profile;
