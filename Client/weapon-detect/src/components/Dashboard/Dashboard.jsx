import { useState, useEffect } from "react";
// import { Addusers } from "../../utility/Models/UserModel"; // Import the Addusers component
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Dashboard = ({ handleLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  
  // Auto-hide sidebar on mobile, show on desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  

  // // Simulated Camera Data
  // const cameras = [
  //   { id: 1, title: "Camera 1", streamUrl: "/src/assets/detection.mp4" },
  //   { id: 2, title: "Camera 2", streamUrl: "/src/assets/v8l.mp4" },
  //   { id: 3, title: "Camera 3", streamUrl: "/src/assets/v8n.mp4" },
  //   { id: 4, title: "Camera 4", streamUrl: "/src/assets/v8s.mp4" },
  // ];

  // // Function to handle camera selection
  // const handleCameraClick = (camera) => {
  //   setSelectedCamera(camera);
  // };

  // // Function to open the dialog
  // const openDialog = () => {
  //   setIsDialogOpen(true);
  // };

  // // Function to close the dialog
  // const closeDialog = () => {
  //   setIsDialogOpen(false);
  // };

  const navs = [
    {
      title: "Dashboard",
      URL: "/dashboard",
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="home">
          <path d="M3 10l9-7 9 7v9a2 2 0 0 1-2 2h-4a2 2 0 0 1-2-2v-4H9v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        </svg>
      ),
    },
    {
      title: "Users",
      URL: "/dashboard/users",
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="users">
          <circle cx="8" cy="8" r="3" />
          <circle cx="16" cy="8" r="3" />
          <path d="M5 20c0-3 3-5 6-5M13 15c3 0 6 2 6 5" />
        </svg>
      ),
    },
    {
      title: "Alerts",
      URL: "/dashboard/alerts",
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="alerts">
          <path d="M12 3a6 6 0 0 0-6 6v4l-2 2h16l-2-2V9a6 6 0 0 0-6-6" />
          <path d="M13 21a1 1 0 0 1-2 0" />
        </svg>
      ),
    },
    {
      title: "Configure System",
      URL: "/dashboard/configure",
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="settings">
          <circle cx="12" cy="12" r="3" />
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1 1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0A1.65 1.65 0 0 0 9 4.09V4a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0A1.65 1.65 0 0 0 20 12h.09a2 2 0 1 1 0 4H20a1.65 1.65 0 0 0-1-1z" />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="text-gray-800"
      style={{
        backgroundImage: "url(/src/assets/dashboard.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Layout: fixed sidebar, scrollable content only */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar - completely hidden when closed, overlay on mobile */}
        <aside
          className={`${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:w-0"
          } fixed md:relative inset-y-0 left-0 z-40 w-64 bg-black border-r border-gray-200 shadow-lg transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100 p-14">
              {sidebarOpen && (
                <div className="flex items-center">
                  <img
                    src="/src/assets/logo.png"
                    alt="Logo"
                    className="w-12 h-auto"
                  />
                    <span className="text-white font-extrabold tracking-wide text-lg ml-2">
              Recon <span className="text-red-500">Eye</span>
            </span>
             
                </div>
              )}
              <button
                onClick={() => setSidebarOpen(false)}
                className="text-gray-200 hover:text-red-500 mt-2 md:hidden"
                aria-label="Close sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
              {navs.map((nav, index) => (
                <Link
                  key={index}
                  to={nav.URL}
                  className={`flex items-center p-2 rounded-lg text-sm ${
                    index === 0
                       ? "bg-white text-red-600"
                      : "text-white/80 hover:bg-white hover:text-red-600"
                  }`}
                >
                  <div className="mr-2">{nav.icon}</div>
                  <div className="mr-2">{nav.title}</div>
                </Link>
              ))}

              <button
                onClick={() => setShowLogoutConfirm(true)}
                className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

  {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          <header className="bg-black border-b border-gray-200 h-16 flex items-center justify-between px-4 md:px-18 p-14 shadow-sm text-2xl md:text-3xl">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white hover:text-red-500"
                aria-label="Toggle sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="text-white font-bold">Admin Dashboard</span>
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-4">
              <div className="text-white text-lg md:text-2xl">{new Date().toLocaleDateString()}</div>
            </div>
          </header>

        <div className="flex-1 overflow-y-auto bg-gray-100">
          <div className="p-4 min-h-full">
            <Outlet />
          </div>
        </div>
        {showLogoutConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={() => setShowLogoutConfirm(false)} />
            <div className="relative bg-white rounded-xl shadow-lg w-full max-w-sm mx-4 p-5">
              <div className="text-lg font-semibold text-black">Are you sure you want to logout?</div>
              <div className="mt-4 flex items-center justify-end gap-3">
                <button onClick={() => setShowLogoutConfirm(false)} className="px-4 py-2 rounded-md bg-gray-200 text-gray-800">Cancel</button>
                <button onClick={() => { setShowLogoutConfirm(false); handleLogout(); }} className="px-4 py-2 rounded-md bg-red-600 text-white">Logout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
     </div>
  );
};

export default Dashboard;
