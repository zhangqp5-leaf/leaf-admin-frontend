import { request } from '@umijs/max';

export interface LoginParamsType {
  username: string;
  password: string;
  verifyCode: string;
}
export interface UpdatePersonParamsProps {
  headImg: string;
  nickname: string;
  oldPassword: string;
  password: string;
}

/**
 * 获取验证码
 * @returns
 */
export const getCaptcha = async () => {
  return request('/api/admin/base/open/captcha', {
    method: 'GET',
  });
};

/**
 * 登录接口
 * @param loginParams {LoginParamsType} 登录参数
 * @returns
 */
export const login = async (loginParams: LoginParamsType) => {
  return request('/api/admin/base/open/login', {
    method: 'POST',
    data: loginParams,
  });
};

/**
 * 退出登录接口
 * @returns
 */
export const logout = async () => {
  return request('/api/admin/base/comm/logout', {
    method: 'POST',
  });
};

/**
 * 获取当前登录用户
 * @returns
 */
export const getCurrentUser = async () => {
  return request('/api/admin/base/open/currentUser', {
    method: 'GET',
  });
};
export const updatePersonApi = async (params: UpdatePersonParamsProps) => {
  return request('/api/admin/base/comm/personUpdate', {
    method: 'POST',
    data: params,
  });
};
