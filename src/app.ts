import RightContent from '@/components/RightContent';
import { CurrentUser } from '@/models/user';
import service from '@/services';
import type { RequestConfig } from '@umijs/max';
import { history } from '@umijs/max';
import { message, notification } from 'antd';
// 运行时配置

const { getCurrentUser } = service.LoginController;

// 全局初始化数据配置，用于 Layout 用户信息和权限初始化
// 更多信息见文档：https://umijs.org/docs/api/runtime-config#getinitialstate
// export async function getInitialState(): Promise<{ name: string }> {
//   return { name: '@umijs/max' };
// }
export async function getInitialState(): Promise<{
  currentUser?: CurrentUser;
}> {
  const currentUser = await getCurrentUser();

  return {
    currentUser: currentUser.data ?? undefined,
  };
}

export const layout = () => {
  // return {
  //   logo: 'https://img.alicdn.com/tfs/TB1YHEpwUT1gK0jSZFhXXaAtVXa-28-27.svg',
  //   menu: {
  //     locale: false,
  //   },
  // };
  return {
    navTheme: 'light',
    menu: {
      locale: false,
    },
    colorPrimary: '#1890ff',
    layout: 'mix',
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixSiderbar: true,
    // pwa: true,
    logo: 'https://gw.alipayobjects.com/zos/rmsportal/KDpgvguMpGfqaHPjicRK.svg',
    // token: {},
    // siderMenuType: 'sub',
    splitMenus: false,
    rightContentRender: RightContent,
  };
};

// 错误处理方案： 错误类型
enum ErrorShowType {
  SILENT = 0,
  WARN_MESSAGE = 1,
  ERROR_MESSAGE = 2,
  NOTIFICATION = 3,
  REDIRECT = 9,
}
// 与后端约定的响应数据格式
interface ResponseStructure {
  code: number;
  data: any;
  msg: string;
  errorCode?: number;
  errorMessage?: string;
  showType?: ErrorShowType;
}

// 运行时配置
export const request: RequestConfig = {
  // 统一的请求设定
  timeout: 10000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    authorization: `Bearer ${sessionStorage.getItem('token')}`,
  },

  // 错误处理： umi@3 的错误处理方案。
  errorConfig: {
    // 错误抛出，状态码为200，后端抛出业务报错时，由前端识别抛出error
    errorThrower: (res: ResponseStructure) => {
      const { code, data, msg, errorCode, errorMessage, showType } = res;
      if (code !== 200) {
        const error: any = new Error(msg);
        error.name = 'BizError';
        error.info = { errorCode, errorMessage, showType, data, msg };
        throw error; // 抛出自制的错误
      }
    },
    // 错误接收及处理
    errorHandler: (error: any, opts: any) => {
      if (opts?.skipErrorHandler) throw error;
      // 我们的 errorThrower 抛出的错误。
      if (error.name === 'BizError') {
        const errorInfo: ResponseStructure | undefined = error.info;
        if (errorInfo) {
          const { msg, errorCode } = errorInfo;
          switch (errorInfo.showType) {
            case ErrorShowType.SILENT:
              // do nothing
              break;
            case ErrorShowType.WARN_MESSAGE:
              message.warning(msg);
              break;
            case ErrorShowType.ERROR_MESSAGE:
              message.error(msg);
              break;
            case ErrorShowType.NOTIFICATION:
              notification.open({
                description: msg,
                message: errorCode,
              });
              break;
            case ErrorShowType.REDIRECT:
              // TODO: redirect
              break;
            default:
              message.error(msg);
          }
        }
      } else if (error.response) {
        // Axios 的错误
        // 请求成功发出且服务器也响应了状态码，但状态代码超出了 2xx 的范围
        console.log('error', error.response);

        if (error.response.status === 401) {
          message.error(`登录超时，请重新登录`);
          history.push('/login');
          return;
        }

        message.error(`${error.response.data.message}`);
      } else if (error.request) {
        // 请求已经成功发起，但没有收到响应
        // \`error.request\` 在浏览器中是 XMLHttpRequest 的实例，
        // 而在node.js中是 http.ClientRequest 的实例
        message.error('None response! Please retry.');
      } else {
        // 发送请求时出了点问题
        message.error('Request error, please retry.');
      }
    },
  },

  // 请求拦截器
  // requestInterceptors: [
  //   (config) => {
  //   // 拦截请求配置，进行个性化处理。
  //     const url = config.url.concat('?token = 123');
  //     return { ...config, url};
  //   }
  // ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 拦截响应数据，进行个性化处理
      //  const { data } = response;
      //  if(!data.success){
      //    message.error('请求失败！');
      //  }
      return response;
    },
  ],
};
