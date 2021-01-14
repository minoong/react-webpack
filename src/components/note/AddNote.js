import React, { useCallback, useState } from 'react';
import { Card, Button, Input, AutoComplete } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = AutoComplete;

const AddNote = (props) => {
  return (
    <Card
      key="addForm"
      id="addForm"
      title={
        <AutoComplete
          style={{
            width: '60%',
          }}
          value={props.inputTitle}
          onSearch={props.onChangeTitle}
          placeholder="input title"
        >
          {props.suggests &&
            props.suggests.map(({ title, id }) => (
              <Option key={id} value={title}>
                {title}
              </Option>
            ))}
        </AutoComplete>
      }
      extra={
        <Button type="primary" onClick={props.onSubmit}>
          {<PlusOutlined />}
        </Button>
      }
    >
      <TextArea
        placeholder="input content"
        rows={3}
        onChange={props.onChangeContent}
        value={props.inputContent}
      ></TextArea>
    </Card>
  );
};

export default React.memo(AddNote);
