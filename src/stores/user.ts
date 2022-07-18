import { defineStore } from 'pinia';

// type userState<T = any> = {
//   [key: string]: T;
// };
type userState<T = any> = {
  account: T;
  code: number;
  profile: T;
};
export const useUserInfoStore = defineStore({
  id: 'user-info',
  state: () => ({
    userInfo: {} as userState,
  }),
  getters: {
    getUserInfo() {
      return this.userInfo;
    },
  },
  actions: {
    addUserInfo(info) {
      this.userInfo = info;
    },
    removeUserInfo() {
      // 判断当前 userInfo 是否存在数据
      for (const key in this.userInfo) {
        delete this.userInfo[key];
      }
    },
  },
});
