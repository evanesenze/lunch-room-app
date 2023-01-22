import { Button, Input, Text } from '@rneui/base';
import { Dialog } from '@rneui/themed';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useAppActions, useAppSelector } from '../hooks/useApp';
import { CommonComponentProps, CommonModalProps } from '../hooks/useModal';
import { useUpdateUserMutation } from '../store/apis/user.api';

interface IEditInfoProps extends CommonComponentProps {}

const EditInfo: React.FC<CommonModalProps<IEditInfoProps, string>> = ({ props, ...dialogProps }) => {
  const { info } = useAppSelector((store) => store.user);
  const { updateUser } = useAppActions();
  const [surname, setSurname] = useState(info?.surname ?? '');
  const [name, setName] = useState(info?.name ?? '');
  const [patronymic, setPatronymic] = useState(info?.patronymic ?? '');
  const [updateUserMutation] = useUpdateUserMutation();

  const submit = () => {
    const userId = info?.id;
    if (userId) {
      updateUserMutation({ userId, body: { name, patronymic, surname } })
        .unwrap()
        .then((info) => {
          updateUser({ info, state: 'auth' });
          Alert.alert('Вы обновили профиль');
        })
        .catch((error) => {
          console.log(error);
          Alert.alert('Ошибка при обновлении профиля');
        });
    }
    onCancel();
  };

  const onCancel = () => {
    dialogProps.onBackdropPress?.();
  };

  return (
    <Dialog {...dialogProps} onBackdropPress={onCancel}>
      <Dialog.Title title="Введите код команды" />
      <Text>Фамилия</Text>
      <Input value={surname} onChangeText={setSurname} placeholder="Фамилия" />
      <Text>Имя</Text>
      <Input value={name} onChangeText={setName} placeholder="Имя" />
      <Text>Отчество</Text>
      <Input value={patronymic} onChangeText={setPatronymic} placeholder="Отчество" />
      <Button color="#FF4F5A" onPress={submit}>
        Изменить
      </Button>
    </Dialog>
  );
};

export default EditInfo;
