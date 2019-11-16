// eslint-disable-next-line import/prefer-default-export
export const AUTH_SET_IS_MANAGER = '@@AUTH/SET_IS_MANAGER';

interface setPermissions {
  type: typeof AUTH_SET_IS_MANAGER,
  payload: boolean
}

export type AuthActionsType = (
  setPermissions
);

export interface AuthState {
  isManager: boolean,
}
