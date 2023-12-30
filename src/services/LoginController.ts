import { request } from '@umijs/max';

export interface LoginParamsType {
  username: string;
  password: string;
  verifyCode: string;
  captchaId: string;
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
 * 退出接口
 * @returns
 */
export const logout = async () => {
  return request('/api/admin/base/comm/logout', {
    method: 'POST',
  });
};
