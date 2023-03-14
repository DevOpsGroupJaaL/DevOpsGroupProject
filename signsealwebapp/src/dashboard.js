import { Tabs } from 'antd';
import Dashboard_MyFiles from './dashboard_MyFiles.js';
import Dashboard_AssociatedFiles from './dashboard_AssociatedFiles.js';

const items = [
  {
    key: '1',
    label: `My Files`,
    children: <Dashboard_MyFiles/>,
  },
  {
    key: '2',
    label: `Assorted Files`,
    children: <Dashboard_AssociatedFiles/>,
  },
];

const Dashboard = () => (
    <Tabs defaultActiveKey="1" items={items} />
);

export default Dashboard;