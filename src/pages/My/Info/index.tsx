import { Button, Form, Input } from 'antd';
import React from 'react';

type FieldType = {
  headImg: string;
  nickname: string;
  oldPassword: string;
  newPassword: string;
};

const MyInfo: React.FC = () => {
  const [form] = Form.useForm();

  // 表单提交
  const handleSubmit = async (values: FieldType) => {
    console.log('Received values of form: ', values);
  };

  return (
    <div>
      <h3 className="mb-8">基本信息</h3>
      <Form
        form={form}
        name="login"
        style={{ width: '32%' }}
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        onFinish={handleSubmit}
        autoComplete="off"
        className="p-l-[12px]"
      >
        <Form.Item<FieldType> label="头像" name="headImg">
          <Input placeholder="请输入用户名" />
        </Form.Item>
        <Form.Item<FieldType> label="昵称" name="nickname">
          <Input placeholder="请输入昵称" />
        </Form.Item>
        <Form.Item<FieldType> label="原密码" name="oldPassword">
          <Input.Password placeholder="请输入原密码" />
        </Form.Item>
        <Form.Item<FieldType> label="新密码" name="newPassword">
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type="primary" htmlType="submit">
            保存修改
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default MyInfo;
