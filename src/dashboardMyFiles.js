import { Space, Table, Input, Button } from 'antd';
import { useState, useEffect } from 'react';
import Popup from './assign.js';

let data = [];

const DashboardMyFiles = () => {
    const [dataSource, setDataSource] = useState(data);
    const [value, setValue] = useState('');

    const [isModalOpen, setIsModalOpen] = useState(false);

    const showModal = () => {
      setIsModalOpen(true);
    };


    useEffect(() => {
      fetch('/api/users/test@test.com') // TODO: replace with current user's email using cognito getcurrentuser get email and use it here... not good but fine for mvp
        .then((response) => response.text())
        .then((body) => {
          console.log(body);
        });
    }, [])

    const columns = [
      {
        title: 'File',
        dataIndex: 'name',
        key: 'name',
        render: (text) => <a>{text}</a>,
      },
      {
        title: 'Associated users',
        dataIndex: 'age',
        key: 'age',
      },
      {
        title: 'Status',
        dataIndex: 'address',
        key: 'address',
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => (
          <Space size="middle">
            <Button type="primary" onClick={showModal}>Share </Button>
            <Popup isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
            <Button type="primary" >Delete</Button>
          </Space>
        ),
      },
    ];

    const FilterByNameInput = (
        <Input
            placeholder="Input Search Text"
            value={value}
            onChange={e => {
                const currValue = e.target.value;
                setValue(currValue);
                const filteredData = data.filter(entry =>
                entry.name.includes(currValue)
                );
                setDataSource(filteredData);
            }}
        />
    );

    return (
        <>
            <Space>
              <div>
                {FilterByNameInput}
              </div>
              <Button href="/upload" type='primary'>
                Add File
              </Button>

            </Space>
            <Table
                columns={columns}
                pagination={{
                position: 'bottomRight',
                }}
                dataSource={dataSource}
            />
        </>
    );
};



export default DashboardMyFiles;


