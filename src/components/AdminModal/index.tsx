import type { ModalProps } from 'antd';
import { Modal } from 'antd';
import React from 'react';

import './index.less';

const AdminModal: React.FC<ModalProps> = (props: ModalProps) => {
  const { styles, ...restProps } = props;
  const modalStyles = {
    header: {
      padding: '12px 16px',
      borderBottom: '1px #eee solid',
      marginBottom: '0px',
      ...styles?.header,
    },
    body: {
      padding: '0px 16px',
      ...styles?.body,
    },
    footer: {
      padding: '12px 16px',
      marginTop: '0px',
      borderTop: '1px #eee solid',
      ...styles?.footer,
    },
  };
  return (
    <Modal {...restProps} styles={modalStyles} wrapClassName="wrap-modal" />
  );
};

export default AdminModal;
