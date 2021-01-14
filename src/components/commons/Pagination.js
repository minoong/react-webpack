import React, { useState } from 'react';
import * as antd from 'antd';

const Pagination = ({ length }) => {
  const [pager, setPager] = useState({
    current: 1,
    pageSize: 1,
  });

  const { current, pageSize } = pager;

  const onShowSizeChange = (current, pageSize) => {
    setPager({
      ...pager,
      current: Math.ceil(current / pageSize),
      pageSize,
    });

    console.log(pager);
  };
  const onChange = (current, pageSize) => {
    console.log(current, pageSize);
  };
  return (
    <>
      <antd.Pagination
        showSizeChanger
        defaultCurrent={current}
        total={length}
        pageSizeOptions={[1, 2, 3, 4, 5, 10]}
        pageSize={pageSize}
        style={{ textAlign: 'center' }}
        onShowSizeChange={onShowSizeChange}
        // onChange={onChange}
      />
    </>
  );
};

export default React.memo(Pagination);
