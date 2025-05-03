// // components/Sidebar.js
// import Link from 'next/link';

// export default function Sidebar() {
//   return (
//     <div className="bg-dark text-danger d-flex flex-column vh-100 p-3" style={{ width: '180px' }}>
//       <h3 className="mb-4 text-left fw-bold">Dashboard</h3>

//       <nav className="flex-grow-1 text-center ms-3 " style={{fontSize:"20px"}}>
//         <Link href='/profile' style={{textDecoration:"none"}}>
//           <div className="d-flex align-items-center mb-3 text-white center">
//           <i className="bi bi-person-fill me-2"></i>
//             Profile
//           </div>
//         </Link>

//         <Link href="/tasks" style={{ textDecoration: 'none' }}>
//         <div className="d-flex align-items-center mb-3 text-white ">
//           <i className="bi bi-card-checklist me-2"></i>
//           View Tasks
//         </div>
//       </Link>

//       <Link href="/create-task" style={{ textDecoration: 'none' }}>
//         <div className="d-flex align-items-center mb-3 text-white ">
//           <i className="bi bi-plus-square-fill me-2"></i>
//           Create Task
//         </div>
//       </Link>

//       <Link href="/settings" style={{ textDecoration: 'none' }}>
//         <div className="d-flex align-items-center mb-3 text-white ">
//           <i className="bi bi-gear-fill me-2"></i>
//           Settings
//         </div>
//       </Link>

//       <Link href="/logout" style={{ textDecoration: 'none' }}>
//         <div className="d-flex align-items-center mb-3 text-white ">
//           <i className="bi bi-box-arrow-right me-2"></i>
//           Logout
//         </div>
//       </Link>
//       </nav>
//     </div>
//   );
// }


export default function Sidebar({ setActivePage }) {
    return (
      <div className="bg-light p-3" style={{ width: '250px', position: 'fixed', height: '100vh' }}>
        <ul className="nav flex-column">
            <h3 className="fw-bold text-left">Dashboard</h3>
          <li className="nav-item" onClick={() => setActivePage('profile')}>
            <span className="nav-link">👤 Profile</span>
          </li>
          <li className="nav-item" onClick={() => setActivePage('tasks')}>
            <span className="nav-link">📋 View Tasks</span>
          </li>
          <li className="nav-item" onClick={() => setActivePage('create-task')}>
            <span className="nav-link">➕ Create Task</span>
          </li>
          <li className="nav-item" onClick={() => setActivePage('settings')}>
            <span className="nav-link">⚙️ Settings</span>
          </li>
        </ul>
      </div>
    );
  }
  