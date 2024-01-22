import service from '@/services';
import { useRequest } from '@umijs/max';
import classNames from 'classnames';
import LineSaleCard from './component/LineSaleCard';
import OnlineCard from './component/OnlineCard';
import PayCard from './component/PayCard';
import SaleCard from './component/SaleCard';
import SaleTypeCard from './component/SaleTypeCard';
import StoreCard from './component/StoreCard';
import UserCard from './component/UserCard';
import VisitCard from './component/VisitCard';

import './index.less';

const { getHomeInfoApi } = service.HomeController;

const HomePage: React.FC = () => {
  const { data: pageInfo } = useRequest(getHomeInfoApi);

  return (
    <div
      className={classNames('grid grid-cols-1 gap-[12px]', 'home-container')}
    >
      <div className="grid grid-cols-4 gap-[12px]">
        <UserCard userInfo={pageInfo?.userInfo || {}} />
        <VisitCard visitInfo={pageInfo?.visitInfo || {}} />
        <PayCard payInfo={pageInfo?.payInfo || {}} />
        <SaleCard saleInfo={pageInfo?.saleInfo || {}} />
      </div>
      <div className="grid grid-cols-5 gap-[12px]">
        <LineSaleCard lineSaleInfo={pageInfo?.lineSaleInfo || {}} />
        <StoreCard storeInfo={pageInfo?.storeInfo || {}} />
        <OnlineCard onlineInfo={pageInfo?.onlineInfo || {}} />
        <SaleTypeCard saleTypeInfo={pageInfo?.saleTypeInfo || {}} />
      </div>
    </div>
  );
};

export default HomePage;
