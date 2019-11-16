import { AUTH_SET_IS_MANAGER, AuthState, AuthActionsType } from './types';

const initialState: AuthState = {
  isManager: true,
};

const auth = (state = initialState, action: AuthActionsType) => {
  switch (action.type) {
    case AUTH_SET_IS_MANAGER: {
      return {
        ...state,
        isManager: action.payload,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default auth;
