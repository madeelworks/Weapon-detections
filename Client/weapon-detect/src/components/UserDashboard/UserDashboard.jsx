
import { useState } from "react";
// import { Addusers } from "../../utility/Models/UserModel"; // Import the Addusers component
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";


const UserDashboard = ({ handleLogout }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State for dialog visibility
  const [activeNav, setActiveNav] = useState("/UserDashboard/UserDash"); // State to track active nav

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
      className="text-gray-800"
      style={{
        backgroundImage: "url(/src/assets/dashboard.jpg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${
            sidebarOpen ? "w-64" : "w-16"
          } bg-gradient-to-r from-[#482566] to-black border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out`}
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
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-200 hover:text-red-500 mt-2"
              >
                {sidebarOpen ? (
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
                      d="M11 17l-5-5m0 0l5-5m-5 5h12"
                    />
                  </svg>
                ) : (
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
                      d="M13 5l7 7-7 7M5 5l7 7-7 7"
                    />
                  </svg>
                )}
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
              {navs.map((nav, index) => (
                     <Link
                  key={index}
                  to={nav.URL}
                  className={`flex items-center p-2 rounded-lg text-sm ${
                    nav.URL === activeNav
                      ? "bg-blue-50 text-blue-600"
                      : "text-white hover:bg-gray-50 hover:text-blue-600"
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
                className="text-white bg-red-500 px-4 py-2 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </nav>
          </div>
        </aside>

  {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-gradient-to-r from-[#482566] to-black border-b border-gray-200 h-16 flex items-center justify-between  px-18 p-14 shadow-sm text-3xl">
            <span className="ml-2 text-white font-bold">Welcome to User Dashboard</span>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-4">
              <div className="text-white text-2xl">{new Date().toLocaleDateString()}</div>
            </div>
          </header>


        <Outlet />
      </div>
    </div>
     </div>
  );
};

export default UserDashboard;
