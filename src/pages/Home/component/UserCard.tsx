import classNames from 'classnames';
import { userInfoProps } from '../type';
import HomeCard from './HomeCard';

interface userCardProps {
  userInfo: userInfoProps;
}

const userCard: React.FC<userCardProps> = ({ userInfo }: userCardProps) => {
  return (
    <HomeCard>
      <section className="card-header">
        <span>总用户数</span>
        <span className="text-[18px] font-bold ml-[10px]">
          {userInfo.totalUser}
        </span>
      </section>
      <section
        className={classNames('card-body', 'flex items-center justify-between')}
      >
        <div style={{ display: 'flex', flex: 1 }}>
          <span className="text-[#d8d8d8]">周同比</span>
          <span className="ml-[10px] text-[#F41E91]">{userInfo.weekRate}</span>
        </div>
        <div style={{ display: 'flex', flex: 1 }}>
          <span className="text-[#d8d8d8]">日同比</span>
          <span className="ml-[10px] text-[#13AE91]">{userInfo.dayRate}</span>
        </div>
      </section>
      <section className="card-footer">
        <span>日增用户数</span>
        <span className="text-[16px] ml-[10px]">{userInfo.dayAddUser}</span>
      </section>
    </HomeCard>
  );
};

export default userCard;
