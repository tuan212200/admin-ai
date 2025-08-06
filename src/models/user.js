import { queryCurrent, query as queryUsers } from '@/services/user';
import { logout } from '@/services/login';
import { setAuthority } from '@/utils/authority';

const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *fetch(_, { call, put }) {
      const response = yield call(queryUsers);
      yield put({
        type: 'save',
        payload: response,
      });
    },

    *fetchCurrent(_, { call, put }) {
      const response = yield call(queryCurrent);
      const data = response?.data;
      yield put({
        type: 'saveCurrentUser',
        payload: {
          ...data,
          id: data?.userid,
          isPasswordDefault: data?.isPasswordDefault,
          name: data?.name,
          role: data?.role,
        },
      });
    },

    *logout(_, { call, put }) {
      const response = yield call(logout);
      yield put({
        type: 'saveCurrentUser',
        payload: {},
      });
      setAuthority([]);
      return response;
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },

    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};

export default UserModel;