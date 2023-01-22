import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import AsyncStorage from '@react-native-async-storage/async-storage';
export interface Referral {
  referToken: string;
}

export interface Settings {
  targetEmail: string;
  kitchenName: string;
  hourExpired: number;
  minuteExpired: number;
  periodicRefresh: number;
  menuFormat: number;
}

export interface PaymentInfo {
  groupId: string;
  link: string;
  description: string;
  qr: string;
}

export interface IGroup {
  id: string;
  adminId: string;
  organizationName: string;
  address: string;
  members: string[];
  referral: Referral;
  settings?: Settings;
  paymentInfo?: PaymentInfo;
}

interface GroupSliceState {
  groups: IGroup[];
  activeGroupAvailable?: boolean;
  activeGroup?: IGroup;
};

const initialState: GroupSliceState = {
  groups: []
};

const groupSlice = createSlice({
  name: 'group',
  initialState,
  reducers: {
    updateGroups(state, action: PayloadAction<IGroup[]>) {
      state.groups = action.payload;
    },
    updateActiveGroup(state, action: PayloadAction<IGroup>) {
      state.activeGroup = action.payload;
      state.activeGroupAvailable = state.groups.findIndex(item => item.id === action.payload.id) !== -1;
      AsyncStorage.setItem('activeGroupId', action.payload.id);
    }
  }
});

export default groupSlice;