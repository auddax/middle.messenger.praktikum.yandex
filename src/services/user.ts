import UserAPI from '../api/UserAPI';
import { RequestResult, UserResponse } from '../types';
import { handleError } from '../utils/handlers';

export const editUserProfile = async (data: object) => {
  let responseObj;
  try {
    const resp = await UserAPI.editUserProfile(data) as RequestResult;
    if (resp.status !== 200) handleError(resp);
    responseObj = JSON.parse(resp.response);
  } catch (error) {
    console.warn(error);
  }
  return responseObj;
};

export const editUserAvatar = async (data: object) => {
  let responseObj;
  try {
    const resp = await UserAPI.editUserAvatar(data) as RequestResult;
    if (resp.status !== 200) handleError(resp);
    responseObj = JSON.parse(resp.response);
  } catch (error) {
    console.warn(error);
  }
  return responseObj;
};

export const searchUser = async (login: string): Promise<UserResponse[]> => {
  let responseObj;
  try {
    const resp = await UserAPI.searchUser({ login }) as RequestResult;
    if (resp.status !== 200) handleError(resp);
    responseObj = JSON.parse(resp.response);
  } catch (error) {
    console.warn(error);
  }
  return responseObj;
};

export const editUserPassword = async (data: object) => {
  let responseObj;
  try {
    const resp = await UserAPI.editUserPassword(data) as RequestResult;
    if (resp.status !== 200) handleError(resp);
    responseObj = JSON.parse(resp.response);
  } catch (error) {
    console.warn(error);
  }
  return responseObj;
};
