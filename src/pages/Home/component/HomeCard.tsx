import classNames from 'classnames';
import React from 'react';

const HomeCard: React.FC<any> = (props: any) => {
  return (
    <div className={classNames('bg-[#fff] rounded-[6px]', props.className)}>
      {props.children}
    </div>
  );
};

export default HomeCard;
