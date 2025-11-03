
import { useState, useEffect } from "react";
// import { Addusers } from "../../utility/Models/UserModel"; // Import the Addusers component
import { Outlet } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


const UserDashboard = ({ handleLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [activeNav, setActiveNav] = useState("/UserDashboard/UserDash"); // State to track active nav
  const [user, setUser] = useState(null);

  // Fetch logged-in user profile (name + profile picture)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3001/user/profile", { withCredentials: true });
        setUser(res.data || null);
      } catch (e) {
        // ignore; fallback UI will show default avatar
      }
    };
    fetchProfile();
  }, []);

  // Simulated Camera Data
  const cameras = [
    { id: 1, title: "Camera 1", streamUrl: "/src/assets/detection.mp4" },
    { id: 2, title: "Camera 2", streamUrl: "/src/assets/v8l.mp4" },
    { id: 3, title: "Camera 3", streamUrl: "/src/assets/v8n.mp4" },
    { id: 4, title: "Camera 4", streamUrl: "/src/assets/v8s.mp4" },
  ];

  // Function to handle camera selection
  const handleCameraClick = (camera) => {
    setSelectedCamera(camera);
  };

  // Function to open the dialog
  const openDialog = () => {
    setIsDialogOpen(true);
  };

  // Function to close the dialog
  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const navs = [
    {
      title: "UserDashboard",
      URL: "/UserDashboard/UserDash",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      title: "Edit Profile",
      URL: "/UserDashboard/EditProfile",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video-fill" viewBox="0 0 16 16"><path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z"/></svg>
    },
    {
      title: "View Live Feed",
      URL: "/UserDashboard/Streaming",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      title: "Alerts",
      URL: "/UserDashboard/alerts",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      title: "Acknowledge Threats",
      URL: "/UserDashboard/acknowledge",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      title: "View History",
      URL: "/UserDashboard/history",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
    {
      title: "Report Suspicious Activity",
      URL: "/UserDashboard/report",
      icon: (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
    },
  ];

  return (
    <div
      className="text-gray-100"
      style={{
        backgroundImage: "linear-gradient(180deg, rgba(0,0,0,0.96), rgba(0,0,0,0.9))",
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
          } fixed md:relative inset-y-0 left-0 z-40 w-64 bg-black border-r border-white shadow-lg transition-all duration-300 ease-in-out`}
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
                  <span className="ml-2 text-white font-bold text-3xl">
                    Recon Eye
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
                  className={`flex items-center p-2 rounded-lg text-sm transition ${
                    nav.URL === activeNav
                      ? "bg-white text-red-600"
                      : "text-white/80 hover:bg-white hover:text-red-600"
                  }`}
                  onClick={() => setActiveNav(nav.URL)} // Set the active nav
                >
                  <div className="mr-2">{nav.icon}</div>
                  <div className="mr-2">{nav.title}</div>
                </Link>
              ))}

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="text-white bg-orange-600 px-4 py-2 rounded-md hover:bg-orange-500"
              >
                Logout
              </button>
            </nav>
          </div>
        </aside>

        {/* Overlay for mobile when sidebar is open */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-white z-30 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

  {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          <header className="bg- border-b border-white h-16 flex items-center justify-between px-4 md:px-18 p-14 shadow-sm text-2xl md:text-3xl">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-white hover:text-orange-400"
                aria-label="Toggle sidebar"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <span className="text-white font-bold">Welcome to User Dashboard</span>
            </div>
            <div className="flex-1"></div>
            <div className="flex items-center gap-3">
              <div className="hidden sm:block text-white text-sm md:text-base">{new Date().toLocaleDateString()}</div>
              <div className="flex items-center gap-2 bg-white/10 rounded-full px-2 py-1">
                <img
                  src={(user && user.profilePicture) || "/Avatar.png"}
                  alt="avatar"
                  className="w-8 h-8 rounded-full object-cover border border-white/30"
                />
                <div className="hidden sm:block text-white text-sm font-medium">
                  {user ? `${user.firstName || ''} ${user.lastName || ''}`.trim() || 'User' : 'User'}
                </div>
              </div>
            </div>
          </header>


        <div className="flex-1 overflow-y-auto bg-gray-100">
          <div className="p-4 min-h-full">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
     </div>
  );
};

export default UserDashboard;
