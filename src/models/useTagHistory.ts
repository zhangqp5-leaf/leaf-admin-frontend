import { history } from '@umijs/max';
import { useCallback, useEffect, useState } from 'react';
import { routes } from '../route';

console.log({ routes });

export type RouteItemProps = {
  routes?: RouteItemProps[];
  name?: string;
  path: string;
  component?: string;
  metaTagName?: string;
};

const flatMenu = (menu: RouteItemProps[]): RouteItemProps[] => {
  return menu.reduce((pre: any[], item: any) => {
    if (item.routes) {
      return pre.concat(flatMenu(item.routes));
    } else {
      return pre.concat(item);
    }
  }, []);
};

const flatRoutes = flatMenu(routes);

const useTagHistory = () => {
  const [tagHistory, setTagHistory] = useState<RouteItemProps[]>([]);
  const [tagPathList, setTagPathList] = useState<string[]>([]);

  useEffect(() => {
    // 监听history
    const tagListen = history.listen(({ location, action }: any) => {
      console.log({ action });
      // console.log(action, location.pathname, tagPathList);
      // if (action === 'POP' && !tagPathList.includes(location.pathname)) {
      //   console.log(action, location.pathname, tagPathList);

      //   history.back();
      //   return;
      // }
      if (tagPathList.includes(location.pathname)) return;
      if (location.pathname === '/login') {
        setTagHistory([]);
        setTagPathList([]);
        return;
      }
      setTagHistory((prev) => [
        ...prev,
        {
          name: flatRoutes.find((i) => i.path === location.pathname)?.name,
          path: location.pathname,
          metaTagName: flatRoutes.find((i) => i.path === location.pathname)
            ?.metaTagName,
        },
      ]);
      setTagPathList((prev) => [...prev, location.pathname]);
    });
    return () => {
      tagListen();
    };
  }, [history, tagHistory, tagPathList]);

  // 关闭标签
  const closeHistoryTag = useCallback((path: string, isActive: boolean) => {
    setTagPathList((prev) => prev.filter((i) => i !== path));
    setTagHistory((prev) => prev.filter((i) => i.path !== path));
    if (isActive) {
      history.back();
    }
  }, []);

  return {
    tagHistory,
    closeHistoryTag,
  };
};

export default useTagHistory;
