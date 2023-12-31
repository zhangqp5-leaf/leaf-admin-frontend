import { CurrentUser } from '@/models/user';

export default (initialState: { currentUser: CurrentUser }) => {
  // 在这里按照初始化数据定义项目中的权限，统一管理
  // 参考文档 https://umijs.org/docs/max/access
  console.log('initialState', initialState);

  return {
    canSeeAdmin: initialState?.currentUser.role === 'admin',
  };
};
