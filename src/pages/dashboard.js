import { useState } from 'react';
import Sidebar from '@/components/navbar';
import Profile from './profile';
import withAuth from './withAuth';
import Layout from '@/components/layout';
import Createtask from './createtask';
import Viewtask from './viewtask';

import { useEffect } from 'react';


function Dashboard() {
  // localStorage.setItem("page","profile")
  const [activePage, setActivePage] = useState('profile');
  useEffect(() => {
    // On page load, check if there's a stored page in localStorage
    const savedPage = localStorage.getItem('activePage');
    if (savedPage) {
      setActivePage(savedPage);
    }
  }, []);

  useEffect(() => {
    // Store the active page to localStorage whenever it changes
    if (activePage) {
      localStorage.setItem('activePage', activePage);
    }
  }, [activePage]);

  const renderContent = () => {
    switch (activePage) {
      case 'profile':
        return <Profile />;
      case 'createtask':
        return <Createtask/>;
      case 'viewtasks':
        return <Viewtask/>;
       
    }
  };

  return (
  <Layout title={"Dashboard"}>    
    <div className="d-flex flex-row">
      <Sidebar setActivePage={setActivePage} />
      <div  style={{marginLeft:"250px",width:"100%"}}>
        {/* <h1 className="mb-4 fw-bold text-center text-secondary-emphasis">Welcome to Task Management System</h1> */}
        <div className='ps-5'>
        {renderContent()}
        </div>
        
      </div>
    </div>
    </Layout>
  );
}

export default withAuth(Dashboard);
