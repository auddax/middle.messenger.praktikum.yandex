import AuthAPI from '../api/AuthAPI';
import { RequestResult } from '../types';
import { handleError } from '../utils/handlers';

export const login = async (data: object) => {
  try {
    const resp = await AuthAPI.login(data) as RequestResult;
    if (resp.status !== 200) handleError(resp);
  } catch (error) {
    console.warn(error);
  }
  return true;
};

export const logout = async () => {
  try {
    const resp = await AuthAPI.logout() as RequestResult;
    if (resp.status !== 200) handleError(resp);
  } catch (error) {
    console.warn(error);
  }
  return true;
};

export const createUser = async (data: object) => {
  try {
    const resp = await AuthAPI.createUser(data) as RequestResult;
    if (resp.status !== 200) handleError(resp);
  } catch (error) {
    console.warn(error);
  }
  return true;
};

export const getUser = async () => {
  let responseObj;
  try {
    const resp = await AuthAPI.getUser() as RequestResult;
    if (resp.status === 401) return null;
    if (resp.status !== 200) handleError(resp);
    responseObj = JSON.parse(resp.response);
  } catch (error) {
    console.warn(error);
  }
  return responseObj;
};

export const setUser = async () => {
  let user;
  const response = await getUser();
  if (response) {
    const avatarPath = `https://ya-praktikum.tech/api/v2/resources${response.avatar}`;
    user = {
      avatarPath,
      userInfo: response,
    };
    window.store.set({ ...user });
  }
  return user;
};
