import { TinyColumn } from '@ant-design/charts';
import { payInfoProps } from '../type';
import HomeCard from './HomeCard';

interface PayCardProps {
  payInfo: payInfoProps;
}

const PayCard = ({ payInfo }: PayCardProps) => {
  const config = {
    autoFit: true,
    data: payInfo.data,
    tooltip: {
      customContent: function (x: any, data: any) {
        return `NO.${x}: ${data[0]?.data?.y.toFixed(2)}`;
      },
    },
    barBackground: {
      style: {
        fill: 'rgba(0,0,0,0.1)',
      },
    },
  };

  return (
    <HomeCard>
      <section className="card-header">
        <span>支付笔数</span>
        <span className="text-[18px] font-bold ml-[10px]">
          {payInfo.totalPay}
        </span>
      </section>
      <section className="card-body">
        <TinyColumn {...config} />
      </section>
      <section className="card-footer">
        <span>转化率</span>
        <span className="text-[16px] ml-[10px]">{payInfo.conversionRate}</span>
      </section>
    </HomeCard>
  );
};

export default PayCard;
