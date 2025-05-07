import { useRouter } from 'next/router';
import withAuth from '@/pages/withAuth';
import Link from 'next/link';

 function Sidebar({ setActivePage }) {
  const router = useRouter();
  const handleLogout=()=>{
    localStorage.removeItem('token');
    localStorage.removeItem("activePage")
    router.push('/');
  }
    return (
      <div className="bg-light p-3" style={{ width: '250px', position: 'fixed', height: '100vh' }}>
        <ul className="nav flex-column">
          <h3 className="fw-bold text-left text-danger">Dashboard</h3>
          <div>
          <button className="nav-item btn" onClick={() => setActivePage('profile')}>
            <span className="nav-link">👤 Profile</span>
          </button>
          </div>
          <div>
          <button className="nav-item btn" onClick={() => setActivePage('viewtasks')}>
            <span className="nav-link">📋 View Tasks</span>
          </button>
          </div>
          <div>
          <button className="nav-item btn" onClick={() => setActivePage('createtask')}>
            <span className="nav-link">➕ Create Task</span>
          </button>
          </div>
          <div>
          <button className="nav-item btn" onClick={() => setActivePage('settings')}>
            <span className="nav-link">⚙️ Settings</span>
          </button>
          </div>
          
          <div>
          <button className="nav-item btn" onClick={handleLogout}>
              <span className="nav-link">🔚 Logout</span>
          </button>
          </div>
          
          
         

        </ul>
      </div>
    );
  }
  
  export default withAuth(Sidebar);