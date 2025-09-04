import { Product } from "./productReducer";

export enum UsersActionTypes {
  FETCH_USER = "FETCH_USER",
  FETCH_USER_SUCCESS = "FETCH_USER_SUCCESS",
  FETCH_USER_ERROR = "FETCH_USER_ERROR",
  EXPAND_ACTIVE_ALL = "EXPAND_ACTIVE_ALL",
  EXPAND_CLOSE_ALL = "EXPAND_CLOSE_ALL",
  EXPAND_ACTIVE_USER = "EXPAND_ACTIVE_USER",
  TOGGLE_ACTIVE_PRODUCT = "TOGGLE_ACTIVE_PRODUCT",
}

export interface User {
    id: number;
    name: string;
    link: string;
    avatar: string;
    isActive: boolean;
    products: Product[]
}

interface ActionUserFetch {
  type: UsersActionTypes.FETCH_USER;
}

interface ActionUserSuccess {
  type: UsersActionTypes.FETCH_USER_SUCCESS;
  payload: User[];
}

interface ActionUserError {
  type: UsersActionTypes.FETCH_USER_ERROR;
  payload: string | null;
}

interface ActionToggleProduct {
  type: UsersActionTypes.TOGGLE_ACTIVE_PRODUCT;
  payload: Product;
}

interface ActionExpandUser {
  type: UsersActionTypes.EXPAND_ACTIVE_USER;
  payload: User;
}

interface ActionExpandActiveAll {
  type: UsersActionTypes.EXPAND_ACTIVE_ALL;
}

interface ActionExpandCloseAll {
  type: UsersActionTypes.EXPAND_CLOSE_ALL;
}

export type UserActions =
  | ActionUserFetch
  | ActionUserSuccess
  | ActionUserError
  | ActionToggleProduct
  | ActionExpandUser
  | ActionExpandActiveAll
  | ActionExpandCloseAll


  interface ProductStateTypes {
    isError: string | null,
    isLoading: boolean,
    isActive: boolean,
    users: User[],
  }

const initialState: ProductStateTypes = {
  isError: null,
  isLoading: false,
  isActive: false,
  users: [],
};

export const userReducer = (
  state = initialState,
  action: UserActions
) => {
  switch (action.type) {
    case UsersActionTypes.FETCH_USER: {
      return {
        isError: null,
        isLoading: true,
        isActive: false,
        users: [],
      };
    }
    case UsersActionTypes.FETCH_USER_SUCCESS: {
      return {
        isError: null,
        isLoading: false,
        isActive: false,
        users: action.payload,
      };
    }
    case UsersActionTypes.FETCH_USER_ERROR: {
      return {
        isError: action.payload,
        isLoading: false,
        isActive: false,
        users: [],
      };
    }
    case UsersActionTypes.EXPAND_ACTIVE_USER: {
      const toggleUserActive = state.users.map(user =>
        user.id === action.payload.id
          ? { ...user, isActive: !user.isActive }
          : user
      );

      const activeUsers = toggleUserActive.filter(user => user.isActive);

      return {
        ...state,
        users: toggleUserActive,
        activeUsers,
      };
    }
    case UsersActionTypes.EXPAND_ACTIVE_ALL: {
      const toggleUserActive = state.users.map(user =>
        user.id
          ? { ...user, isActive: true }
          : user
      );

      const activeUsers = toggleUserActive.filter(user => user.isActive);

      return {
        ...state,
        isActive: true,
        users: toggleUserActive,
        activeUsers,
      };
    }
    case UsersActionTypes.EXPAND_CLOSE_ALL: {
      const toggleUserActive = state.users.map(user =>
        user.id
          ? { ...user, isActive: false }
          : user
      );

      const activeUsers = toggleUserActive.filter(user => user.isActive);

      return {
        ...state,
        isActive: false,
        users: toggleUserActive,
        activeUsers,
      };
    }
    default: {
      return state;
    }
  }
};
