import { Tabs } from 'antd';
import DashboardMyFiles from './dashboardMyFiles.js';
import DashboardAssociatedFiles from './dashboardAssociatedFiles.js';

const items = [
  {
    key: '1',
    label: `My Files`,
    children: <DashboardMyFiles/>,
  },
  {
    key: '2',
    label: `Assorted Files`,
    children: <DashboardAssociatedFiles/>,
  },
];


const Dashboard = () => (
    <Tabs defaultActiveKey="1" items={items} />
);

export default Dashboard;
