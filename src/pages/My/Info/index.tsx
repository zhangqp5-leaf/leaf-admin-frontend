import FileSpace from '@/components/FileSpace';
import service from '@/services';
import type { UpdatePersonParamsProps } from '@/services/LoginController';
import { EyeOutlined } from '@ant-design/icons';
import { useModel } from '@umijs/max';
import { App, Button, Form, Image, Input } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';

import './index.less';

type FieldType = {
  headImg: string;
  nickname: string;
  oldPassword: string;
  password: string;
};

const { updatePersonApi } = service.LoginController;

const MyInfo: React.FC = () => {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const { initialState, setInitialState } = useModel('@@initialState');
  const { setVisible } = useModel('useFileSpace');
  const [headImg, setHeadImg] = useState<string>('');
  const [previewVisible, setPreviewVisible] = useState<boolean>(false);

  const isPassVerify = (params: UpdatePersonParamsProps): boolean => {
    if (
      (params.oldPassword && !params.password) ||
      (!params.oldPassword && params.password)
    ) {
      message.error('新旧密码同时输入才能修改密码！');
      return false;
    }
    return true;
  };
  // 表单提交
  const handleSubmit = async (values: FieldType) => {
    const _params = {
      ...values,
      headImg: headImg,
    };
    // 校验参数
    if (!isPassVerify(_params)) {
      return;
    }
    const res = await updatePersonApi(_params);
    if (res.code === 200) {
      message.success('修改成功');
      const { data } = res;
      setInitialState(() => {
        let currentUser: any = {};
        if (data.headImg) {
          currentUser.headImg = headImg;
        }
        if (data.nickname) {
          currentUser.nickname = data.nickname;
        }
        if (data.password) {
          currentUser.password = data.password;
        }
        return { ...initialState, currentUser: currentUser };
      });
      form.setFieldsValue({
        nickname: data.nickname || initialState!.currentUser!.nickname,
        oldPassword: '',
        password: '',
      });
    }
  };
  const handleModalOk = (selected: any) => {
    setHeadImg(selected.url);
  };

  useEffect(() => {
    if (initialState?.currentUser?.headImg) {
      setHeadImg(initialState?.currentUser?.headImg);
    }
    form.setFieldsValue({ nickname: initialState?.currentUser?.nickname });
  }, []);

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
          <div
            className={classNames(
              'relative w-[160px] h-[160px]',
              'headImgField',
            )}
          >
            <Image
              width="100%"
              src={headImg}
              alt=""
              className="rounded-[8px] cursor-pointer"
              preview={{
                visible: previewVisible,
                src: headImg,
                onVisibleChange: (value) => {
                  if (!value) {
                    setPreviewVisible(value);
                  }
                },
                mask: <div></div>,
              }}
              onClick={(e) => {
                e.preventDefault();
                setVisible(true);
              }}
            />
            <section
              style={{
                position: 'absolute',
                transform: 'translate(-50%, -50%)',
                top: '50%',
                left: '50%',
                color: '#fff',
                cursor: 'pointer',
              }}
              onClick={(e) => {
                e.stopPropagation();
                setPreviewVisible(true);
              }}
            >
              <EyeOutlined />
              预览
            </section>
          </div>
        </Form.Item>
        <Form.Item<FieldType> label="昵称" name="nickname">
          <Input placeholder="请输入昵称" />
        </Form.Item>
        <Form.Item<FieldType> label="原密码" name="oldPassword">
          <Input.Password placeholder="请输入原密码" />
        </Form.Item>
        <Form.Item<FieldType> label="新密码" name="password">
          <Input.Password placeholder="请输入新密码" />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 4, span: 20 }}>
          <Button type="primary" htmlType="submit">
            保存修改
          </Button>
        </Form.Item>
      </Form>
      <FileSpace handleModalOk={handleModalOk} />
    </div>
  );
};

export default MyInfo;
