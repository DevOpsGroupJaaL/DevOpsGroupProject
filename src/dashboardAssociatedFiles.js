import { Table } from 'antd';
 
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
];

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const DashboardAssociatedFiles = () => {
  return (
      <Table
        columns={columns}
        pagination={{
          position: 'bottomRight',
        }}
        dataSource={data}
      />
  );
};

export default DashboardAssociatedFiles;