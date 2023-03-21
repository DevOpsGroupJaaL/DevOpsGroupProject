import { Tabs } from 'antd';
import DashboardMyFiles from './dashboardMyFiles.js';
import DashboardAssociatedFiles from './dashboardAssociatedFiles.js';



const Dashboard = (props) => {
  const items = [
    {
      key: '1',
      label: `My Files`,
      children: <DashboardMyFiles currentUser={props.currentUser}/>,
    },
    {
      key: '2',
      label: `Associated Files`,
      children: <DashboardAssociatedFiles/>,
    },
  ];
  return (
    <Tabs defaultActiveKey="1" items={items} />
);};

export default Dashboard;
