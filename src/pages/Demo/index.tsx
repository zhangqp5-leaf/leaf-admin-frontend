import { AudioOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import classNames from 'classnames';
import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import NumberFlip from './NumberFlip';
import './index.less';

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: '#1677ff',
    }}
  />
);
const socket = io('http://localhost:1921', {
  withCredentials: true,
});

const Demo = () => {
  const [demoNumber, setDemoNumber] = useState(123);
  const [chatHis, setChatHis] = useState<any[]>([]);

  const checkSocket = (value: any) => {
    const _params = {
      from: 'admin',
      to: 'user',
      createTime: new Date().getTime(),
      content: value,
    };
    socket.emit('chat', _params);
  };
  socket.on('chatBack', (arg) => {
    setChatHis(arg);
  });

  useEffect(() => {}, []);

  const onSearch = (value: any) => {
    setDemoNumber(value);
  };

  return (
    <>
      <div
        className={classNames('flex gap-[12px] items-center', 'demoContainer')}
      >
        {demoNumber
          .toString()
          .split('')
          .map((item: string, index: number) => {
            return <NumberFlip number={Number(item)} key={index} />;
          })}
      </div>
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        suffix={suffix}
        onSearch={onSearch}
      />
      {chatHis.map((i) => (
        <div key={i._id}>{i._source.content}</div>
      ))}
      <Search
        placeholder="input search text"
        enterButton="Search"
        size="large"
        suffix={suffix}
        onSearch={checkSocket}
      />
      {/* <Button onClick={() => checkSocket()}>click</Button> */}
    </>
  );
};

export default Demo;
