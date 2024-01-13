export type ClassifyListItemProps = {
  id: string;
  name: string;
  createTime: string;
  updateTime?: string;
};

export type FileListParamsProps = {
  classifyId: string;
  pageNo: number;
  pageSize: number;
};

export type FileInfoProps = {
  classifyId: string;
  fileId: string;
  id: number;
  name: string;
  size: number;
  type: string;
  url: string;
  createTime: string;
};

export type AddFileParamsProps = {
  classifyId: string;
  fileId: string;
  name: string;
  size: number;
  type: string;
  url: string;
};
