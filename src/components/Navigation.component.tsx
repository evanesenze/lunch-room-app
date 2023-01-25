import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { NavigationHelpers, TabNavigationState } from '@react-navigation/native';
import React from 'react';
import { Alert, StyleSheet, View } from 'react-native';
import { useAppSelector } from '../hooks/useApp';
import CartIcon from '../icons/Cart.icon';
import HomeIcon from '../icons/Home.icon';
import OrdersIcon from '../icons/Orders.icon';
import ProfileIcon from '../icons/Profile.icon';
import { AppParamsList } from './Layout.component';
import NavigationBtn, { INavigationBtnProps } from './NavigationBtn.component';

const buttons: Omit<INavigationBtnProps, 'onClick'>[] = [
  { Icon: HomeIcon, type: 'Home' },
  { Icon: OrdersIcon, type: 'Orders' },
  { Icon: CartIcon, type: 'Cart' },
  { Icon: ProfileIcon, type: 'Profile' },
];

interface INavigationProps extends BottomTabBarProps {
  state: TabNavigationState<AppParamsList>;
  navigation: NavigationHelpers<AppParamsList>;
}

const Navigation: React.FC<INavigationProps> = ({ state, navigation }) => {
  if (state.index === 0) return <></>;

  const { activeGroupAvailable } = useAppSelector((store) => store.group);

  const onClick = (props: Omit<INavigationBtnProps, 'onClick'>) => {
    if (props.isCurrent) return;
    if (props.type === 'Home' && !activeGroupAvailable) {
      Alert.alert('Упс..', 'Сначала выберите команду в Профиле');
      return navigation.navigate('Profile');
    }
    navigation.navigate(props.type);
  };

  return (
    <View style={styles.navigation}>
      {buttons.map((props, i) => (
        <NavigationBtn
          key={props.type}
          {...props}
          isCurrent={i === state.index - 1}
          onClick={() => onClick({ ...props, isCurrent: i === state.index - 1 })}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  navigation: {
    backgroundColor: '#FF4F5A',
    height: '8%',
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
    flexDirection: 'row',
  },
});

export default Navigation;
