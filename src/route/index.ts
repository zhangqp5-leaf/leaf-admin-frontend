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
        name: '工作台',
        path: '/demo',
        routes: [
          {
            name: 'crud 示例',
            path: '/demo/crud',
            component: '../pages/CRUD',
          },
        ],
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
      // {
      //   name: 'demo',
      //   path: '/playground',
      //   component: './Demo',
      // },
    ],
  },
];
