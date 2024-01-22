import { TinyArea } from '@ant-design/charts';
import { Table } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { onlineInfoProps } from '../type';
import HomeCard from './HomeCard';

interface OnlineCardProps {
  onlineInfo: onlineInfoProps;
}

const OnlineCard = ({ onlineInfo }: OnlineCardProps) => {
  const config = {
    autoFit: true,
    data: onlineInfo.searchData,
    smooth: true,
  };

  const columns: ColumnsType<any> = [
    {
      title: '排名',
      dataIndex: 'key',
      key: 'key',
      align: 'center',
    },
    {
      title: '搜索关键词',
      dataIndex: 'keyWord',
      key: 'keyWord',
      align: 'center',
    },
    {
      title: '用户数',
      dataIndex: 'userCount',
      key: 'userCount',
      align: 'center',
    },
    {
      title: '周涨幅',
      dataIndex: 'marginOfIncrease',
      key: 'marginOfIncrease',
      align: 'center',
    },
  ];

  return (
    <HomeCard className="col-span-3">
      <section className="font-bold h-[50px] pl-[20px] flex items-center">
        <span>线上热门搜索</span>
      </section>
      <section className="grid grid-cols-2 gap-[24px]">
        <div>
          <div className="flex items-center justify-between h-[50px] px-[20px]">
            <span>
              搜索用户数
              <span className="font-bold text-[16px] ml-[12px]">
                {onlineInfo.searchUser}
              </span>
            </span>
            <span className="ml-[10px] text-[#F41E91]">
              {onlineInfo.searchRate}
            </span>
          </div>
          <div className="h-[50px]">
            <TinyArea {...config} />
          </div>
        </div>
        <div>
          <div className="flex items-center justify-between h-[50px] px-[20px]">
            <span>
              关注用户数
              <span className="font-bold text-[16px] ml-[12px]">
                {onlineInfo.followUser}
              </span>
            </span>
            <span className="ml-[10px] text-[#F41E91]">
              {onlineInfo.followRate}
            </span>
          </div>
          <div className="h-[50px]">
            <TinyArea {...config} />
          </div>
        </div>
      </section>
      <Table
        dataSource={onlineInfo.tableData}
        columns={columns}
        pagination={false}
        size="small"
      />
    </HomeCard>
  );
};

export default OnlineCard;
