import ChatModal from '@/components/ChatModal';
import service from '@/services';
import {
  LogoutOutlined,
  UserOutlined,
  WechatOutlined,
} from '@ant-design/icons';
import { useModel, useNavigate } from '@umijs/max';
import type { MenuProps } from 'antd';
import { App, Dropdown } from 'antd';
import React from 'react';

const { logout } = service.LoginController;

const RightContent: React.FC = () => {
  const { message } = App.useApp();
  const { initialState } = useModel('@@initialState');
  const { openChat, setOpenChat } = useModel('useChatModal');
  const navigate = useNavigate();

  // 退出登录
  const handleLogout = async () => {
    const res = await logout();
    if (res.code === 200) {
      message.success('退出登录成功');
      sessionStorage.removeItem('token');
      navigate('/login');
    }
  };

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <section className="flex gap-2" onClick={() => navigate('/my/info')}>
          <UserOutlined />
          用户中心
        </section>
      ),
    },
    {
      key: '2',
      label: (
        <section className="flex gap-2" onClick={() => handleLogout()}>
          <LogoutOutlined />
          退出
        </section>
      ),
    },
  ];

  return (
    <div className="flex items-center gap-8 mr-4">
      <WechatOutlined onClick={() => setOpenChat(true)} />
      <Dropdown
        menu={{ items: menuItems }}
        placement="bottom"
        arrow
        trigger={['click']}
      >
        <section className="cursor-pointer flex items-center">
          <span>{initialState?.currentUser?.nickname}</span>
          <img
            src={initialState?.currentUser?.headImg}
            alt=""
            className="w-8 h-8 rounded-full ml-4"
          />
        </section>
      </Dropdown>
      {openChat && <ChatModal />}
    </div>
  );
};

export default RightContent;
