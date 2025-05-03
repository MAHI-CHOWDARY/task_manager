import { useState } from 'react';
import Sidebar from '@/components/navbar';
import Profile from './profile';
// import charts from '@/components/charts';
import charts from './charts';


export default function Dashboard() {
  const [activePage, setActivePage] = useState('charts');

  const renderContent = () => {
    switch (activePage) {
      case 'profile':
        return <Profile />;
      case 'charts':
        return <charts/>;
       
    }
  };

  return (
    <div className="d-flex flex-row">
      <Sidebar setActivePage={setActivePage} />
      <div className="p-4" style={{marginLeft:"250px"}}>
        <h1 className="mb-4 fw-bold text-center text-secondary-emphasis">Welcome to Your Dashboard</h1>
        {renderContent()}
      </div>
    </div>
  );
}
