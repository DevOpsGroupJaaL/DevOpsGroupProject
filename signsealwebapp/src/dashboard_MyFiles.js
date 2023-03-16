import { Space, Table, Tag, Input, Button } from 'antd';
import { useState } from 'react'; 

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
        <a>Share </a>
        <a>Delete</a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    path: '/path/to/my.pdf',
    name: 'Pdf file name',
    status: 'pending',
    owner: 'id  '
  },
];

const Dashboard_MyFiles = () => {
    const [dataSource, setDataSource] = useState(data);
    const [value, setValue] = useState('');

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
                <Button> Add File</Button>

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

export default Dashboard_MyFiles;