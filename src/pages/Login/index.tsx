import React, { useEffect } from 'react';
// import {useModel, useNavigate} from '@umijs/max';
import service from '@/services';
import { Button, Form, Input, message } from 'antd';
import classNames from 'classnames';

import type { LoginParamsType } from '@/services/LoginController';

import './index.less';

const { login, getCaptcha } = service.LoginController;

type FieldType = {
  username: string;
  password: string;
  verifyCode: string;
};

const Login: React.FC = () => {
  const [messageApi, contextHolder] = message.useMessage();
  // const {initialState, setInitialState} = useModel('@@initialState');
  // const navigate = useNavigate();

  const isPassVerify = (params: LoginParamsType): boolean => {
    console.log({ params });

    return true;
  };

  // 登录表单提交
  const handleSubmit = async (values: FieldType) => {
    console.log('values', values);
    const _params: LoginParamsType = {
      username: values.username,
      // password: crypto.createHash('sha256').update(values.password, 'utf8').digest('hex'),
      password: values.password,
      verifyCode: values.verifyCode,
      captchaId: '', // todo
    };
    // 校验参数
    if (!isPassVerify(_params)) {
      return;
    }
    const res = await login(_params);
    const _currentUser = res.data.data;
    sessionStorage.setItem('token', res.data.token);
    if (_currentUser) {
      messageApi.success('登陆成功');
      // await setInitialState({...initialState, currentUser: _currentUser});
      // navigate('/home');
    } else {
      messageApi.error('登陆失败');
    }
  };

  const getPageVerifyCode = async () => {
    const res = await getCaptcha();
    console.log({ res });
  };

  useEffect(() => {
    getPageVerifyCode();
  }, []);

  return (
    <main
      className={classNames(
        'flex justify-center m-[-32px_-40px] bg-no-repeat bg-center bg-fixed bg-cover',
        'align-center relative text-[#2c3142] h-screen bg-white',
      )}
    >
      {contextHolder}
      <div
        className={classNames(
          'flex flex-col justify-center items-center w-[50%] absolute',
          'top-0 right-0 z-10 h-full',
        )}
      >
        <section
          className={classNames(
            'text-[#2c3142] text-[40px] font-bold mb-[20px]',
          )}
        >
          LEAF-ADMIN
        </section>
        <section
          className={classNames(
            'text-[#2c3142] text-[16px] font-bold mb-[50px]',
          )}
        >
          无聊开发一个后台权限管理系统
        </section>
        <Form
          name="login"
          layout="vertical"
          style={{ width: '32%' }}
          onFinish={handleSubmit}
          autoComplete="off"
          className="p-l-[12px]"
        >
          <Form.Item<FieldType> label="用户名" name="username">
            <Input placeholder="请输入用户名" />
          </Form.Item>
          <Form.Item<FieldType> label="密码" name="password">
            <Input.Password placeholder="请输入密码" />
          </Form.Item>
          <Form.Item<FieldType> label="验证码" name="verifyCode">
            <Input placeholder="图片验证码" addonAfter=".com" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-full h-[45px]"
            >
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    </main>
  );
};

export default Login;
