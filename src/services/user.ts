import UserAPI from 'src/api/UserAPI';
import { RequestResult, UserResponse } from 'src/types';
import { handleError } from 'src/utils/handlers';

export const editUserProfile = async (data: object) => {
  const resp = await UserAPI.editUserProfile(data) as RequestResult;
  if (resp.status !== 200) handleError(resp);
  const responseObj = JSON.parse(resp.response);
  return responseObj;
};

export const editUserAvatar = async (data: object) => {
  const resp = await UserAPI.editUserAvatar(data) as RequestResult;
  if (resp.status !== 200) handleError(resp);
  const responseObj = JSON.parse(resp.response);
  return responseObj;
};

export const searchUser = async (login: string): Promise<UserResponse[]> => {
  const resp = await UserAPI.searchUser({ login }) as RequestResult;
  if (resp.status !== 200) handleError(resp);
  const responseObj = JSON.parse(resp.response);
  return responseObj;
};

export const editUserPassword = async (data: object) => {
  const resp = await UserAPI.editUserPassword(data) as RequestResult;
  if (resp.status !== 200) handleError(resp);
  const responseObj = JSON.parse(resp.response);
  return responseObj;
};
