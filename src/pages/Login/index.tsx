import bgImage from '@/assets/image/bg.jpg';
import service from '@/services';
import { useModel, useNavigate } from '@umijs/max';
import { App, Button, Form, Input } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import type { LoginParamsType } from '@/services/LoginController';

import './index.less';

const { login, getCaptcha } = service.LoginController;

type FieldType = {
  username: string;
  password: string;
  verifyCode: string;
};

const Login: React.FC = () => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { initialState, setInitialState } = useModel('@@initialState');
  const navigate = useNavigate();

  const [captchaImg, setCaptchaImg] = useState<{
    captchaId: string;
    verifyCode: string;
  }>({ captchaId: '', verifyCode: '' });

  // 获取验证码
  const getPageVerifyCode = async () => {
    const res = await getCaptcha();
    if (res.code === 200) {
      setCaptchaImg({
        captchaId: res.data.captchaId,
        verifyCode: res.data.verifyCode,
      });
    }
  };

  const isPassVerify = (params: LoginParamsType): boolean => {
    if (!params.username) {
      message.info('请填写用户名！');
      return false;
    }
    if (!params.password) {
      message.info('请填写密码！');
      return false;
    }
    if (!params.verifyCode) {
      message.info('请填写验证码！');
      return false;
    }
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
      captchaId: captchaImg!.captchaId,
    };
    // 校验参数
    if (!isPassVerify(_params)) {
      return;
    }
    try {
      const res = await login(_params);
      const _currentUser = res.data.data;
      sessionStorage.setItem('token', res.data.token);
      if (_currentUser) {
        message.success('登陆成功');
        await setInitialState({ ...initialState, currentUser: _currentUser });
        navigate('/home');
      } else {
        message.error('登陆失败');
        getPageVerifyCode();
      }
    } catch (error) {
      form.setFieldsValue({ verifyCode: '' });
      getPageVerifyCode();
    }
  };

  useEffect(() => {
    getPageVerifyCode();
  }, []);

  return (
    <main
      className={classNames(
        'flex justify-center bg-no-repeat bg-center bg-fixed bg-cover',
        'align-center relative text-[#2c3142] h-screen bg-white',
        'login-container',
      )}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div
        className={classNames(
          'flex flex-col items-center w-fit h-fit absolute',
          'top-[50%] right-[240px] z-10 bg-[#fff] p-[40px] rounded-[12px]',
        )}
        style={{ transform: 'translateY(-50%)' }}
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
          form={form}
          name="login"
          layout="vertical"
          style={{ width: '82%' }}
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
            <Input
              placeholder="图片验证码"
              addonAfter={
                <img
                  className="h-[35px]"
                  src={`data:image/svg+xml;utf8,${encodeURIComponent(
                    captchaImg!.verifyCode,
                  )}`}
                  onClick={() => getPageVerifyCode()}
                />
              }
            />
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
