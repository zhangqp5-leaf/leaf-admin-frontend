import {
  CloseOutlined,
  HomeOutlined,
  LeftOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { Outlet, history, useLocation, useModel } from '@umijs/max';
import { Divider } from 'antd';
import React from 'react';

import classNames from 'classnames';
import './index.less';

const PageHeader: React.FC = () => {
  const { tagHistory, closeHistoryTag } = useModel('useTagHistory');
  const location = useLocation();

  return (
    <div className="p-4">
      <div className="mb-4 flex items-center gap-3">
        <section className="bg-white flex items-center p-2 gap-1">
          <LeftOutlined
            className="cursor-pointer"
            onClick={() => history.back()}
          />
          <Divider type="vertical" />
          <RightOutlined
            className="cursor-pointer"
            onClick={() => history.forward()}
          />
          <Divider type="vertical" />
          <HomeOutlined
            className="cursor-pointer"
            onClick={() => history.push('/home')}
          />
        </section>
        {tagHistory.map((tagItem) => (
          <section
            className={classNames(
              'flex items-center px-[8px] py-[4px] rounded-[6px] cursor-pointer',
              location.pathname === tagItem.path
                ? 'bg-[#722ED1] text-white'
                : 'bg-white hover:bg-[#eee]',
              'tagItemStyle',
            )}
            key={tagItem.path}
            onClick={() => history.push(tagItem.path)}
          >
            {tagItem.name || tagItem.metaTagName}
            <CloseOutlined
              className="closeIcon"
              style={
                location.pathname === tagItem.path
                  ? { opacity: 1, marginLeft: '12px' }
                  : {}
              }
              onClick={(e) => {
                e.stopPropagation();
                closeHistoryTag(
                  tagItem.path,
                  location.pathname === tagItem.path,
                );
              }}
            />
          </section>
        ))}
      </div>
      <Outlet />
    </div>
  );
};

export default PageHeader;
