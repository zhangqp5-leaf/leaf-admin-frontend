import { Progress } from '@ant-design/charts';
import classNames from 'classnames';
import { saleInfoProps } from '../type';
import HomeCard from './HomeCard';

interface SaleCardProps {
  saleInfo: saleInfoProps;
}

const SaleCard = ({ saleInfo }: SaleCardProps) => {
  const config = {
    autoFit: true,
    barWidthRatio: 0.3,
    percent: saleInfo.data,
    color: ['#5B8FF9', '#E8EDF3'],
  };

  return (
    <HomeCard>
      <section className="card-header">
        <span>总销售额</span>
        <span className="text-[18px] font-bold ml-[10px]">
          {saleInfo.totalSale}
        </span>
      </section>
      <section className={classNames('card-body')}>
        <Progress {...config} />
      </section>
      <section className="card-footer">
        <div style={{ display: 'flex', flex: 1 }}>
          <span className="text-[#d8d8d8]">周同比</span>
          <span className="ml-[10px] text-[#F41E91]">{saleInfo.weekRate}</span>
        </div>
        <div style={{ display: 'flex', flex: 1 }}>
          <span className="text-[#d8d8d8]">日同比</span>
          <span className="ml-[10px] text-[#13AE91]">{saleInfo.dayRate}</span>
        </div>
      </section>
    </HomeCard>
  );
};

export default SaleCard;
