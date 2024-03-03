import { useState } from 'react';

const useChatModal = () => {
  const [openChat, setOpenChat] = useState<boolean>(false);

  return {
    openChat,
    setOpenChat,
  };
};

export default useChatModal;
