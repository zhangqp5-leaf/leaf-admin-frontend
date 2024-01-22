import { DatePicker } from 'antd';
import classNames from 'classnames';
import dayjs from 'dayjs';
import { useState } from 'react';
import { storeInfoProps } from '../type';
import HomeCard from './HomeCard';

interface StoreCardProps {
  storeInfo: storeInfoProps;
}

const StoreCard = ({ storeInfo }: StoreCardProps) => {
  const [isActive, setIsActive] = useState<string>('day');

  const tabData = [
    {
      name: '今日',
      value: 'day',
    },
    {
      name: '本周',
      value: 'week',
    },
    {
      name: '本月',
      value: 'month',
    },
    {
      name: '全年',
      value: 'year',
    },
  ];

  return (
    <HomeCard className="col-span-2">
      <section className="font-bold h-[50px] pl-[20px] flex items-center">
        <span>门店销售额排名</span>
      </section>
      <section
        className={classNames('card-header', 'justify-between')}
        style={{ height: '32px' }}
      >
        <div className="flex gap-[16px]">
          {tabData.map((item) => (
            <span
              className="cursor-pointer"
              key={item.value}
              style={isActive === item.value ? {} : { color: '#d8d8d8' }}
              onClick={() => setIsActive(item.value)}
            >
              {item.name}
            </span>
          ))}
        </div>
        <DatePicker defaultValue={dayjs()} />
      </section>
      <section
        className={classNames(
          'card-body',
          'mt-[36px] flex flex-col gap-[32px]',
        )}
      >
        {storeInfo.data &&
          storeInfo.data.map((item, index) => (
            <div
              className={classNames('flex items-center justify-between')}
              key={item.name}
            >
              <section className="flex items-center leading-[14px]">
                <div
                  className="mr-[12px] text-center"
                  style={
                    index < 3
                      ? {
                          background: '#000',
                          color: '#fff',
                          height: '16px',
                          width: '16px',
                          borderRadius: '14px',
                        }
                      : {}
                  }
                >
                  {index + 1}
                </div>
                <span>{item.name}</span>
              </section>
              <span>{item.count}</span>
            </div>
          ))}
      </section>
    </HomeCard>
  );
};

export default StoreCard;
