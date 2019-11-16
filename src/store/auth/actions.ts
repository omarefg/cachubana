import { AUTH_SET_IS_MANAGER } from './types';

const setIsManager = (payload: boolean) => ({
  type: AUTH_SET_IS_MANAGER,
  payload,
});

export default {
  setIsManager,
};
