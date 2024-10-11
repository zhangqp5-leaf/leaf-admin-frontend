import service from '@/services';
import { useModel } from '@umijs/max';
import { App, Button, Input } from 'antd';
import classNames from 'classnames';
import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import AdminModal from '../AdminModal';
// import { messageListItemProps } from './type';

const { TextArea } = Input;

const { getUserListApi } = service.UserController;

const ChatModal: React.FC = () => {
  const { message } = App.useApp();

  const { openChat, setOpenChat } = useModel('useChatModal');
  const { initialState } = useModel('@@initialState');

  const socket = io(
    `http://122.51.12.76:1921?username=${initialState?.currentUser?.nickname}`,
    // `http://192.168.2.181:1921?username=${initialState?.currentUser?.nickname}`
  );

  const [messageText, setMessageText] = useState('');
  const [chatWindowList, setChatWindowList] = useState([]);
  const [activeChatWindow, setActiveChatWindow] = useState<any>({});
  const [messageList, setMessageList] = useState<any[]>([]);

  const sendMessage = () => {
    if (!messageText) {
      message.error('发送消息不能为空！');
      return;
    }
    const _params = {
      username: initialState?.currentUser?.nickname,
      recipientName: activeChatWindow.nickname,
      content: messageText,
      timestamp: Date.now(),
      // read: false,
    };
    console.log({ _params });
    socket.emit('chat', _params);
    setMessageText('');
  };
  socket.on('chatBack', (arg) => {
    setMessageList(arg);
  });
  const changeChatWindow = (windowItem: any) => {
    setMessageList([]);
    setActiveChatWindow(windowItem);
    // 加载历史消息
    socket.emit('getHistoryChat', {
      username: initialState?.currentUser?.nickname,
      recipientName: windowItem.nickname,
    });
  };
  // 加载聊天列表
  const initChatUserList = async () => {
    const res = await getUserListApi();
    if (res && res.code === 200) {
      setChatWindowList(
        res.data.filter(
          (i: any) => i.nickname !== initialState?.currentUser?.nickname,
        ),
      );
    }
  };

  useEffect(() => {
    if (openChat) {
      initChatUserList();
    }
  }, [openChat]);

  return (
    <AdminModal
      open={openChat}
      width={1100}
      title={<div className="flex justify-center items-center">聊天窗口</div>}
      onCancel={() => setOpenChat(false)}
      footer={null}
      styles={{
        body: {
          display: 'grid',
          height: '600px',
          backgroundColor: '#f0f2f5',
          padding: '8px',
          gridTemplateColumns: '300px 1fr',
          gap: '8px',
        },
      }}
    >
      <section className={classNames('bg-[#fff] rounded-[8px]')}>
        <div className="flex p-[12px]">关键字搜索</div>
        <div className="h-[520px] overflow-auto">
          {chatWindowList.map((item: any) => (
            <div
              className="flex items-center gap-[12px] px-[10px] py-[12px] cursor-pointer hover:bg-[#f0f2f5]"
              style={
                activeChatWindow.nickname === item.nickname
                  ? { backgroundColor: '#f0f2f5' }
                  : {}
              }
              onClick={() => changeChatWindow(item)}
              key={item.nickname}
            >
              <img
                src={item.headImg}
                style={{ height: '28px', width: '28px' }}
                alt=""
              />
              <div></div>
              {item.nickname}
            </div>
          ))}
        </div>
      </section>
      <section className={classNames('bg-[#fff] rounded-[8px]')}>
        <div className="flex p-[12px]">与{activeChatWindow.nickname}聊天中(只有一个小的服务器，同时部署了前端+后端应用+mysql+es，所以性能较差)</div>
        <div className="flex flex-col-reverse gap-[12px] h-[420px] overflow-auto bg-[#f0f2f5] p-[12px]">
          {messageList.map((item) => {
            if (item._source.username === initialState?.currentUser?.nickname) {
              return (
                <div
                  className="flex flex-row-reverse gap-[12px]"
                  key={item._id}
                >
                  <img
                    src={initialState?.currentUser?.headImg}
                    style={{ height: '28px', width: '28px' }}
                    alt=""
                  />
                  <div
                    className={classNames(
                      'w-fit max-w-[500px] overflow-auto bg-[#fff]',
                      'p-[8px] rounded-b-md rounded-tl',
                    )}
                  >
                    {item._source.content}
                  </div>
                </div>
              );
            } else {
              return (
                <div className="flex flex-row gap-[12px]" key={item._id}>
                  <img
                    src={activeChatWindow.headImg}
                    style={{ height: '28px', width: '28px' }}
                    alt=""
                  />
                  <div
                    className={classNames(
                      'w-fit max-w-[500px] overflow-auto bg-[#fff]',
                      'p-[8px] rounded-b-md rounded-tr',
                    )}
                  >
                    {item._source.content}
                  </div>
                </div>
              );
            }
          })}
        </div>
        <div className="p-[12px] flex gap-[12px] items-end">
          <TextArea
            rows={4}
            maxLength={600}
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onPressEnter={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          />
          <Button
            type="primary"
            style={{ height: 'fit-container' }}
            onClick={() => sendMessage()}
          >
            发送
          </Button>
        </div>
      </section>
    </AdminModal>
  );
};

export default ChatModal;
