import React, { useEffect } from 'react';
import { message } from 'antd';
import { useSelector } from 'react-redux';

const Toast = ({ length, view }) => {
  useEffect(() => {
    if (view === 'Y') {
      message
        .loading(`총 ${length} 건 로딩 완료...`, 0.3)
        .then(() => message.success(`총 ${length} 건 등록되어 있어요.`, 0.3));
    } else {
      message.loading(`로딩 중...`, 0.5);
    }
  }, [view]);
  return <></>;
};

export default React.memo(Toast);
