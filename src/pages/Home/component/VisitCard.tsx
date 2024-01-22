import { TinyArea } from '@ant-design/charts';
import { visitInfoProps } from '../type';
import HomeCard from './HomeCard';

interface VisitCardProps {
  visitInfo: visitInfoProps;
}

const VisitCard: React.FC<VisitCardProps> = ({ visitInfo }: VisitCardProps) => {
  const config = {
    autoFit: true,
    data: visitInfo.data,
    smooth: true,
  };

  return (
    <HomeCard>
      <section className="card-header">
        <span>总访问量</span>
        <span className="text-[18px] font-bold ml-[10px]">
          {visitInfo.totalVisit}
        </span>
      </section>
      <section className="card-body">
        <TinyArea {...config} />
      </section>
      <section className="card-footer">
        <span>日访问量</span>
        <span className="text-[16px] ml-[10px]">{visitInfo.dayVisit}</span>
      </section>
    </HomeCard>
  );
};

export default VisitCard;
