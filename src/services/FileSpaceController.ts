import { request } from '@umijs/max';

import type {
  AddFileParamsProps,
  FileListParamsProps,
} from '@/components/FileSpace/type';

/**
 * 获取类别
 * @returns
 */
export const getClassifyListApi = async () => {
  return request('/api/admin/space/type/page', {
    method: 'GET',
  });
};
/**
 * 增加类别
 * @param params
 * @returns
 */
export const addClassifyApi = async (params: { name: string }) => {
  return request('/api/admin/space/type/add', {
    method: 'POST',
    data: params,
  });
};

/**
 * 更新类别
 * @param params
 * @returns
 */
export const updateClassifyApi = async (params: {
  id: string | undefined;
  name: string;
}) => {
  return request('/api/admin/space/type/update', {
    method: 'POST',
    data: params,
  });
};
/**
 * 删除类别
 * @param params
 * @returns
 */
export const deleteClassifyApi = async (params: { id: string[] }) => {
  return request('/api/admin/space/type/delete', {
    method: 'POST',
    data: params,
  });
};
/**
 * 获取各类别文件列表
 * @param params
 * @returns
 */
export const getFileListApi = async (params: FileListParamsProps) => {
  return request('/api/admin/space/info/page', {
    method: 'GET',
    params: params,
  });
};
/**
 * 上传文件
 * @param params
 * @returns
 */
export const uploadFileApi = async (params: FormData) => {
  return request('/api/admin/base/comm/upload', {
    method: 'POST',
    data: params,
  });
};
/**
 * 文件添加到列表
 * @param params
 * @returns
 */
export const addFileApi = async (params: AddFileParamsProps) => {
  return request('/api/admin/space/info/add', {
    method: 'POST',
    data: params,
  });
};
/**
 * 删除文件
 * @param params
 * @returns
 */
export const deleteFileApi = async (params: { id: number | string }) => {
  return request('/api/admin/space/info/delete', {
    method: 'POST',
    data: params,
  });
};
