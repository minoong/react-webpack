/* eslint-disable react/prop-types */
import React from 'react';
import { Button, Card, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

const { Paragraph } = Typography;

const Note = (props) => {
  return (
    <Card
      hoverable="true"
      key={props.id}
      id={props.id}
      title={<h3>{props.title}</h3>}
      style={{ marginTop: 16 }}
      extra={
        <Button danger type="ghost" onClick={() => props.onRemove(props.id)}>
          {<DeleteOutlined />}
        </Button>
      }
    >
      <Paragraph>{props.content}</Paragraph>
    </Card>
  );
};

export default React.memo(Note);
