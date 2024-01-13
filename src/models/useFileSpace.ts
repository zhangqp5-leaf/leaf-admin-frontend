import { useState } from 'react';

const useFileSpace = () => {
  const [visible, setVisible] = useState<boolean>(false);

  return {
    visible,
    setVisible,
  };
};

export default useFileSpace;
