import service from '@/services';
import {
  CheckCircleTwoTone,
  LeftOutlined,
  PlusOutlined,
  RedoOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { useModel } from '@umijs/max';
import type { MenuProps } from 'antd';
import {
  App,
  Button,
  Dropdown,
  Form,
  Image,
  Input,
  Pagination,
  Upload,
} from 'antd';
import classNames from 'classnames';
import React, { useCallback, useEffect, useState } from 'react';
import AdminModal from '../AdminModal';
import type {
  AddFileParamsProps,
  ClassifyListItemProps,
  FileInfoProps,
  FileListParamsProps,
} from './type';

import './index.less';

const {
  getClassifyListApi,
  addClassifyApi,
  updateClassifyApi,
  deleteClassifyApi,
  getFileListApi,
  uploadFileApi,
  addFileApi,
  deleteFileApi,
} = service.FileSpaceController;

interface FileSpaceProps {
  handleModalOk: (values: FileInfoProps | undefined) => void;
}

const FileSpace: React.FC<FileSpaceProps> = (props: FileSpaceProps) => {
  const [form] = Form.useForm();
  const { message, modal } = App.useApp();
  const { visible, setVisible } = useModel('useFileSpace');
  const [classifyList, setClassifyList] = useState<ClassifyListItemProps[]>([]);
  const [activeName, setActiveName] = useState<string>('');
  const [addClassifyVisible, setAddClassifyVisible] = useState<boolean>(false);
  const [editClassifyId, setEditClassifyId] = useState<string>('');

  const [filsList, setFileList] = useState<FileInfoProps[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [params, setParams] = useState<FileListParamsProps>({
    classifyId: '',
    pageNo: 1,
    pageSize: 10,
  });
  const [selectedItem, setSelectItem] = useState<FileInfoProps>();
  const [isExpand, setIsExpand] = useState<boolean>(false);

  const { handleModalOk } = props;

  // 获取分类
  const getClassifyList = async () => {
    const res = await getClassifyListApi();
    if (res && res.code === 200) {
      setClassifyList(res.data);
      if (res.data && res.data.length) {
        setActiveName(res.data[0].name);
      }
    }
  };
  // 选择类别
  const handleClickClassify = async (item: ClassifyListItemProps) => {
    setActiveName(item.name);
    setSelectItem(undefined);
  };
  // 新增/编辑类别 提交
  const handleSubmit = async (values: { name: string }) => {
    const _params = {
      name: values.name,
      id: editClassifyId || undefined,
    };
    const submitApi = _params.id ? updateClassifyApi : addClassifyApi;
    const res = await submitApi(_params);
    if (res && res.code === 200) {
      message.success('操作成功');
      setAddClassifyVisible(false);
      getClassifyList();
    }
  };
  /**
   * 删除类别
   * @param id
   */
  const deleteClassify = async (id: string) => {
    const res = await deleteClassifyApi({ id: [id] });
    if (res && res.code === 200) {
      message.success('删除成功');
      getClassifyList();
    }
  };
  // 点击右键菜单
  const handleClickContextMenu: MenuProps['onClick'] = async ({ key }) => {
    const [id, name, type] = key.split('/');
    if (type === 'edit') {
      setAddClassifyVisible(true);
      form.setFieldsValue({ name });
      setEditClassifyId(id);
    } else if (type === 'delete') {
      modal.confirm({
        title: '提示',
        content: '此操作将会删除选择的数据，是否继续？',
        okText: '确认',
        cancelText: '取消',
        centered: true,
        onOk: () => deleteClassify(id),
        onCancel: () => {},
      });
    }
  };
  /**
   * 获取类别下文件列表
   * @param params
   */
  const getFileList = useCallback(async () => {
    if (!params.classifyId) {
      return;
    }
    const res = await getFileListApi(params);
    if (res && res.code === 200) {
      setFileList(res.data.list);
      setTotal(res.data.pagination.total);
    }
  }, [params]);
  /**
   * 点击上传按钮
   * @param options
   */
  const handleUpload = async (options: any) => {
    const { file } = options;
    const formData = new FormData();
    formData.append('file', file);
    const res = await uploadFileApi(formData);
    if (res && res.code === 200) {
      const _params: AddFileParamsProps = {
        classifyId: classifyList.find((i) => i.name === activeName)!.id,
        fileId: file.uid,
        name: file.name,
        size: file.size,
        type: file.type,
        url: res.data.url,
      };
      const re = await addFileApi(_params);
      if (re && re.code === 200) {
        message.success('上传成功');
        setParams((prev) => ({
          ...prev,
          classifyId: classifyList.find((i) => i.name === activeName)!.id,
        }));
      }
    }
  };
  /**
   * 删除
   * @param fileItem
   * @param type
   */
  const handleDeleteFile = (fileItem: FileInfoProps, type: string) => {
    modal.confirm({
      title: '提示',
      content: '此操作将会删除文件，是否继续？',
      okText: '确认',
      cancelText: '取消',
      centered: true,
      onOk: async () => {
        const _params: { id: number | string } = { id: '' };
        if (type === 'common') {
          _params.id = fileItem.id;
        } else if (type === 'select') {
          _params.id = selectedItem!.id;
        }
        const res = await deleteFileApi(_params);
        if (res && res.code === 200) {
          message.success('删除成功');
          setSelectItem(undefined);
          setParams((prev) => ({
            ...prev,
            classifyId: classifyList.find((i) => i.name === activeName)!.id,
          }));
        }
      },
      onCancel: () => {},
    });
  };

  useEffect(() => {
    // 获取分类列表
    if (visible) {
      getClassifyList();
    }
  }, [visible]);
  useEffect(() => {
    // 获取类别下文件列表
    if (!['', undefined, null].includes(activeName)) {
      setParams((prev) => ({
        ...prev,
        classifyId: classifyList.find((i) => i.name === activeName)!.id,
      }));
    }
  }, [activeName]);
  useEffect(() => {
    getFileList();
  }, [getFileList]);

  return (
    <AdminModal
      open={visible}
      width={1100}
      title={<div className="flex justify-center items-center">文件空间</div>}
      onCancel={() => setVisible(false)}
      onOk={async () => {
        await handleModalOk(selectedItem);
        setVisible(false);
      }}
      okButtonProps={{ disabled: !selectedItem?.fileId }}
      okText={`选择`}
      styles={{
        body: {
          display: 'flex',
        },
      }}
    >
      <section
        className={classNames(
          'h-full grow-0 shrink-0 basis-[300px] border-r border-r-solid border-r-[#eee]',
          'p-[8px]',
          'leftPanel',
        )}
        style={
          isExpand
            ? {
                flexBasis: 0,
                overflow: 'hidden',
                paddingLeft: 0,
                paddingRight: 0,
                border: 'none',
              }
            : {}
        }
      >
        <div className="flex justify-between items-center mb-[8px]">
          <div className="whitespace-nowrap">分类</div>
          <div className="flex gap-[12px]">
            <RedoOutlined
              className="cursor-pointer"
              onClick={() => getClassifyList()}
            />
            <PlusOutlined
              className="cursor-pointer"
              onClick={() => setAddClassifyVisible(true)}
            />
          </div>
        </div>
        <div className="overflow-auto h-[60vh]">
          {classifyList.length &&
            classifyList.map((item: ClassifyListItemProps) => (
              <Dropdown
                menu={{
                  items: ((): MenuProps['items'] => [
                    {
                      label: '编辑',
                      key: `${item.id}/${item.name}/edit`,
                    },
                    {
                      label: '删除',
                      key: `${item.id}/${item.name}/delete`,
                    },
                  ])(),
                  onClick: handleClickContextMenu,
                }}
                trigger={['contextMenu']}
                key={item.id}
              >
                <div
                  className={classNames(
                    'flex justify-between items-center mb-[12px] h-[42px] pl-[12px] pr-[12px]',
                    'bg-[#eee] rounded-[6px] cursor-pointer hover:opacity-60 whitespace-nowrap',
                  )}
                  style={
                    activeName === item.name
                      ? { background: '#722ED1', color: '#fff' }
                      : {}
                  }
                  onClick={() => handleClickClassify(item)}
                >
                  <div>{item.name}</div>
                  {activeName === item.name && <RightOutlined />}
                </div>
              </Dropdown>
            ))}
        </div>
      </section>

      <section className="h-full p-[8px] grow-1 shrink-1 basis-0">
        <div className="flex justify-between">
          <LeftOutlined
            onClick={() => setIsExpand(true)}
            className="cursor-pointer"
            style={{ display: isExpand ? 'none' : 'block' }}
          />
          <RightOutlined
            onClick={() => setIsExpand(false)}
            className="cursor-pointer"
            style={{ display: isExpand ? 'block' : 'none' }}
          />
          <div>{`文件列表（${activeName}）`}</div>
          <div></div>
        </div>
        <div className="flex gap-[12px] mt-[24px] mb-[12px]">
          <Button onClick={() => setParams((prev) => ({ ...prev, pageNo: 1 }))}>
            刷新
          </Button>
          <Upload
            name="files"
            customRequest={handleUpload}
            showUploadList={false}
          >
            <Button type="primary">点击上传</Button>
          </Upload>
          <Button
            type="primary"
            danger
            disabled={!selectedItem?.fileId}
            onClick={() => handleDeleteFile(selectedItem!, 'select')}
          >
            删除选中文件
          </Button>
        </div>
        <div
          className={classNames(
            'flex flex-wrap gap-[12px] mb-[16px] max-h-[45vh] overflow-auto',
          )}
        >
          {filsList.map((i) => (
            <div
              className={classNames(
                'relative w-[160px] h-[160px]',
                'imageContainer',
              )}
              key={i.fileId}
            >
              <Image src={i.url} alt="" />
              <section className={classNames('imageFooter', 'flex')}>
                <div
                  className="imageOperation"
                  onClick={() =>
                    setSelectItem((prev) => {
                      return prev && prev.fileId === i.fileId ? undefined : i;
                    })
                  }
                >
                  {selectedItem && selectedItem.fileId === i.fileId
                    ? '取消'
                    : '选择'}
                </div>
                <div
                  className="imageOperation"
                  onClick={() => handleDeleteFile(i, 'common')}
                >
                  删除
                </div>
              </section>
              {selectedItem && selectedItem.fileId === i.fileId ? (
                <section className="absolute top-2 right-2">
                  <CheckCircleTwoTone className="text-[24px]" />
                </section>
              ) : (
                ''
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-center">
          <Pagination
            current={params.pageNo}
            total={total}
            hideOnSinglePage={true}
            onChange={(pageNo) => setParams((prev) => ({ ...prev, pageNo }))}
          />
        </div>
      </section>

      <AdminModal
        open={addClassifyVisible}
        width={400}
        style={{ top: 200 }}
        title={<div className="flex justify-center items-center">添加分类</div>}
        onCancel={() => setAddClassifyVisible(false)}
        onOk={() => form.submit()}
        afterClose={() => {
          form.resetFields();
          setEditClassifyId('');
        }}
        okText={`保存`}
        styles={{
          body: {
            padding: '16px',
          },
        }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          autoComplete="off"
          className="p-l-[12px]"
        >
          <Form.Item<{ name: string }>
            label="名称"
            name="name"
            rules={[{ required: true, message: '请输入名称' }]}
          >
            <Input placeholder="请输入名称" />
          </Form.Item>
        </Form>
      </AdminModal>
    </AdminModal>
  );
};

export default FileSpace;
