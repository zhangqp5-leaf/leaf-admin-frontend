import service from '@/services';
import {
  LogoutOutlined,
  StarFilled,
  ThunderboltFilled,
  UserOutlined,
} from '@ant-design/icons';
import { useModel, useNavigate } from '@umijs/max';
import type { MenuProps } from 'antd';
import { Button, Dropdown, Switch, message } from 'antd';
import React from 'react';

const { logout } = service.LoginController;

const RightContent: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { initialState, setInitialState } = useModel('@@initialState');
  console.log(setInitialState);
  const navigate = useNavigate();

  // 退出登录
  const handleLogout = async () => {
    const res = await logout();
    if (res.code === 200) {
      messageApi.success('退出登录成功');
      sessionStorage.removeItem('token');
      navigate('/login');
    }
  };

  const menuItems: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <section
          className="flex gap-2"
          onClick={() => navigate('/user/center')}
        >
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
      {contextHolder}
      <Button>AI&nbsp;极速编码</Button>
      <ThunderboltFilled />
      <StarFilled />
      <Switch checkedChildren="1" unCheckedChildren="0" />
      <Dropdown
        menu={{ items: menuItems }}
        placement="bottom"
        arrow
        trigger={['click']}
      >
        <section className="cursor-pointer">
          <span>{initialState?.currentUser?.username}</span>
        </section>
      </Dropdown>
    </div>
  );
};

export default RightContent;
