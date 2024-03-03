/* eslint-disable */
// 该文件由 OneAPI 自动生成，请勿手动修改！
import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/v1/queryUserList */
export async function queryUserList(
  params: {
    // query
    name?: string;
    nickName?: string;
    gender?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_PageInfo_UserInfo__>('/api/v1/queryUserList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/user */
export async function addUser(
  body?: API.UserInfoVO,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>('/api/v1/user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 GET /api/v1/user/${param0} */
export async function getUserDetail(
  params: {
    // path
    /** userId */
    userId?: string;
  },
  options?: { [key: string]: any },
) {
  const { userId: param0 } = params;
  return request<API.Result_UserInfo_>(`/api/v1/user/${param0}`, {
    method: 'GET',
    params: { ...params },
    ...(options || {}),
  });
}

export async function modifyUser(
  params: API.UserRuleParamsProps,
  options?: { [key: string]: any },
) {
  return request<API.Result_UserInfo_>(`/api/v1/user/update`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: params,
    ...(options || {}),
  });
}

/** 此处后端没有提供注释 POST /api/v1/user/${param0} */
export async function deleteUser(
  params: {
    // path
    /** userId */
    ids?: string[];
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_string_>(`/api/v1/user/delete`, {
    method: 'POST',
    data: params,
    ...(options || {}),
  });
}

// 获取用户列表
export const getUserListApi = async () => {
  return request('/api/admin/base/open/allUser', {
    method: 'GET',
  });
};
