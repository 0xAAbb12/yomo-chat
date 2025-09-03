import { type StateCreator } from "zustand";
import type { RootState } from ".";
import { LoginType } from "~/lib/modal/user";

export interface UserDetail {
  uid: number;
  email: string;
  gmail: string;
  telegramId: string;
  authenticatorStatus: number;
  address: string;
  inviteCode: string;
  nickName: string;
  avatarUrl: string;
  firstName: string;
  lastName: string;
  birthday: string;
  phone: string;
  lastLoginAt: string;
  status: number;
  twitter: string;
  twitterBindTime: string;
  telegramBindTime: string;
  vipLevel: number;
  vipExpireTime: string;
  password: string;
}

export interface UserSlice {
  token: string | undefined;
  loginModalOpen: boolean;
  loginType: LoginType,
  userDetail: UserDetail | null,
  updateLoginType: (loginType: LoginType) => void;
  setLoginModalOpen: (open: boolean) => void;
  updateToken: (token: string) => void;
  setUserDetail: (userDetail: UserDetail) => void;
  clearUserDetail: () => void;
}

export const createUserSlice: StateCreator<
  RootState,
  [["zustand/subscribeWithSelector", never], ["zustand/devtools", never]],
  [],
  UserSlice
> = (set) => {
  return {
    token: "",
    loginModalOpen: false,
    loginType: LoginType.Email,
    userDetail: null,
    updateLoginType: (loginType: LoginType) => {
      set({ loginType });
    },
    setLoginModalOpen: (open: boolean) => {
      set({ loginModalOpen: open });
    },
    updateToken: (token: string) => {
      set({ token });
    },
    setUserDetail: (userDetail: UserDetail) => {
      set({ userDetail });
    },
    clearUserDetail: () => {
      set({ userDetail: null });
    },
  };
};
