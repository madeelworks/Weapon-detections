
import { useState, useEffect } from "react";
// import { Addusers } from "../../utility/Models/UserModel"; // Import the Addusers component
import { Outlet } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";


const UserDashboard = ({ handleLogout }) => {
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
  const [activeNav, setActiveNav] = useState("/UserDashboard/UserDash"); // State to track active nav
  const [user, setUser] = useState(null);

  // Fetch logged-in user profile (name + profile picture)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get("http://localhost:3001/user/profile", { withCredentials: true });
        setUser(res.data || null);
      } catch {
        console.error("Failed to load profile")
      }
    };
    fetchProfile();
  }, []);


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
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="profile">
          <circle cx="12" cy="8" r="3" />
          <path d="M6 20c0-3 3-5 6-5s6 2 6 5" />
        </svg>
      )
    },
    {
      title: "View Live Feed",
      URL: "/UserDashboard/Streaming",
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="live feed">
          <rect x="3" y="6" width="12" height="12" rx="2" />
          <path d="M17 10l4-2v8l-4-2z" />
        </svg>
      ),
    },
    {
      title: "Alerts",
      URL: "/UserDashboard/alerts",
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="alerts">
          <path d="M12 3a6 6 0 0 0-6 6v4l-2 2h16l-2-2V9a6 6 0 0 0-6-6" />
          <path d="M13 21a1 1 0 0 1-2 0" />
        </svg>
      ),
    },
    {
      title: "Acknowledge Threats",
      URL: "/UserDashboard/acknowledge",
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="acknowledge">
          <circle cx="12" cy="12" r="9" />
          <path d="M8 12l2.5 2.5L16 9" />
        </svg>
      ),
    },
    {
      title: "View History",
      URL: "/UserDashboard/history",
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="history">
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v6l4 2" />
        </svg>
      ),
    },
    {
      title: "Report Suspicious Activity",
      URL: "/UserDashboard/report",
      icon: (
        <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-label="report">
          <path d="M22 16c-1.5 1.5-3.5 2.5-5 3-4 1-9-4-10-8 .5-1.5 1.5-3.5 3-5l3 2-2 3c1 2 3 3 5 4l3-2 3 3z" />
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
                className="text-white hover:text-red-500"
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

export default UserDashboard;
