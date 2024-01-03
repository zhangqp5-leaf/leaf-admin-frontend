export const routes = [
  {
    path: '/login',
    component: './Login',
    headerRender: false,
    menuRender: false,
  },
  {
    path: '/',
    component: './PageHeader',
    menu: {
      flatMenu: true,
    },
    routes: [
      {
        name: '首页',
        path: '/home',
        component: '../pages/Home',
      },
      {
        path: '/my/info',
        component: './My/Info',
        metaTagName: '用户中心',
      },
      {
        name: '权限演示',
        path: '/access',
        component: './Access',
      },
      {
        name: ' CRUD 示例',
        path: '/table',
        component: './Table',
      },
    ],
  },
];
