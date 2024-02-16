import AuthAPI from 'src/api/AuthAPI';
import { RequestResult } from 'src/types';
import { handleError } from 'src/utils/handlers';

export const login = async (data: object) => {
  const resp = await AuthAPI.login(data) as RequestResult;
  if (resp.status !== 200) handleError(resp);
  return true;
};

export const logout = async () => {
  const resp = await AuthAPI.logout() as RequestResult;
  if (resp.status !== 200) handleError(resp);
  return true;
};

export const createUser = async (data: object) => {
  const resp = await AuthAPI.createUser(data) as RequestResult;
  if (resp.status !== 200) handleError(resp);
  return true;
};

export const getUser = async () => {
  const resp = await AuthAPI.getUser() as RequestResult;
  if (resp.status !== 200) {
    if (resp.status === 401) return null;
    handleError(resp);
  }
  const responseObj = JSON.parse(resp.response);
  return responseObj;
};

export const setUser = async () => {
  const response = await getUser();
  if (response) {
    const avatarPath = `https://ya-praktikum.tech/api/v2/resources${response.avatar}`;
    window.store.set({
      avatarPath,
      userInfo: response,
    });
  }
  return response;
};
