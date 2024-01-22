import { Column, ColumnConfig } from '@ant-design/charts';
import classNames from 'classnames';
import { useState } from 'react';
import { lineSaleInfoProps } from '../type';
import HomeCard from './HomeCard';

interface LineSaleCardProps {
  lineSaleInfo: lineSaleInfoProps;
}

const LineSaleCard = ({ lineSaleInfo }: LineSaleCardProps) => {
  const [isActive, setIsActive] = useState<string>('1');

  const config: ColumnConfig = {
    data: lineSaleInfo.data || [],
    xField: 'type',
    yField: 'sales',
    columnWidthRatio: 0.4,
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: '类别',
      },
      sales: {
        alias: '销售额',
      },
    },
  };

  return (
    <HomeCard className="col-span-3">
      <section className={classNames('card-header', 'justify-between')}>
        <div className="flex gap-[16px]">
          <span
            className="cursor-pointer"
            style={isActive === '1' ? {} : { color: '#d8d8d8' }}
            onClick={() => setIsActive('1')}
          >
            销售额
          </span>
          <span
            className="cursor-pointer"
            style={isActive === '2' ? {} : { color: '#d8d8d8' }}
            onClick={() => setIsActive('2')}
          >
            访问量
          </span>
        </div>
        <span>2024</span>
      </section>
      <section
        className={classNames('card-body')}
        style={{ height: '300px', margin: '20px' }}
      >
        <Column {...config} />
      </section>
    </HomeCard>
  );
};

export default LineSaleCard;
