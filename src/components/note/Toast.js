import React, { useEffect } from 'react';
import { message } from 'antd';
import { useSelector } from 'react-redux';

const Toast = ({ length }) => {
  useEffect(() =>
    message
      .loading(`총 ${length} 건 등록되어 있어요.`, 2.5)
      .then(() => message.success(`총 ${length} 건 등록되어 있어요.`)),
  );
  return <></>;
};

export default React.memo(Toast);
