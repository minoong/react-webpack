import React, { useState } from 'react';
import { Card, Button, Input, AutoComplete } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

const { TextArea } = Input;
const { Option } = AutoComplete;

const AddNote = (props) => {
  const [result, setResult] = useState([]);

  const handleSearch = (value) => {
    let res = [];

    if (!value || value.indexOf('@') >= 0) {
      res = [];
    } else {
      res = ['gmail.com', '163.com', 'qq.com'].map((domain) => `${value}@${domain}`);
    }

    setResult(res);
  };
  return (
    <Card
      key="addForm"
      id="addForm"
      title={
        <Input
          required
          value={props.inputTitle}
          placeholder="제목을 입력하세요."
          style={{ width: '60%' }}
          onChange={props.onChangeTitle}
        ></Input>
      }
      extra={
        <Button type="primary" onClick={props.onSubmit}>
          {<PlusOutlined />}
        </Button>
      }
    >
      <AutoComplete
        style={{
          width: '60%',
        }}
        onSearch={handleSearch}
        placeholder="input here"
      >
        {result.map((email) => (
          <Option key={email} value={email}>
            {email}
          </Option>
        ))}
      </AutoComplete>
      <TextArea
        placeholder="내용을 입력하세요."
        rows={3}
        onChange={props.onChangeContent}
        value={props.inputContent}
      ></TextArea>
    </Card>
  );
};

export default React.memo(AddNote);
