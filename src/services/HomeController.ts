import { request } from '@umijs/max';

/**
 * 获取首页数据
 * @returns
 */
export const getHomeInfoApi = async () => {
  return request('/api/home/info', {
    method: 'GET',
  });
};
