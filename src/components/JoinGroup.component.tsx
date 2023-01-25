import { Button, Input } from '@rneui/base';
import { Dialog } from '@rneui/themed';
import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useAppSelector } from '../hooks/useApp';
import { CommonComponentProps, CommonModalProps } from '../hooks/useModal';
import { useAddGroupMemberMutation } from '../store/apis/group.api';

interface IJoinGroupProps extends CommonComponentProps {}

const JoinGroup: React.FC<CommonModalProps<IJoinGroupProps, string>> = ({ props, ...dialogProps }) => {
  const { info } = useAppSelector((store) => store.user);
  const [groupId, setText] = useState('');
  const [addGroupMember] = useAddGroupMemberMutation();

  const submit = () => {
    const userId = info?.id;
    if (userId) {
      console.log(groupId);
      console.log(userId);
      addGroupMember({ groupId, userId })
        .unwrap()
        .then(() => {
          onCancel();
          Alert.alert('Вы присоединились к группе');
        })
        .catch((error) => {
          console.log(error);
          Alert.alert('Ошибка при присоединении к группе');
        });
    }
  };

  const onCancel = () => {
    setText('');
    dialogProps.onBackdropPress?.();
  };

  return (
    <Dialog {...dialogProps} onBackdropPress={onCancel}>
      <Dialog.Title title="Введите код команды" />
      <Input value={groupId} onChangeText={setText} placeholder="Код команды" />
      <Button color="#FF4F5A" onPress={submit}>
        Вступить
      </Button>
    </Dialog>
  );
};

export default JoinGroup;
