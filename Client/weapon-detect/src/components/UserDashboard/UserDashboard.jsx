import { useState } from 'react';

const UserDashboard = ({ handleLogout }) => {

  // State management
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedCamera, setSelectedCamera] = useState(null);

  // Simulated Camera Data
  const cameras = [
    {
      id: 1,
      title: "Camera 1",
      thumbnail: "https://via.placeholder.com/400x300?text=Camera+1",
      streamUrl: "/src/assets/detection.mp4", 
    },
    {
      id: 2,
      title: "Camera 2",
      thumbnail: "https://via.placeholder.com/400x300?text=Camera+2",
      streamUrl: "http://path-to-camera-stream-2", // Replace with actual camera stream URL
    },
    {
      id: 3,
      title: "Camera 3",
      thumbnail: "https://via.placeholder.com/400x300?text=Camera+3",
      streamUrl: "http://path-to-camera-stream-3", // Replace with actual camera stream URL
    },
    {
      id: 4,
      title: "Camera 4",
      thumbnail: "https://via.placeholder.com/400x300?text=Camera+4",
      streamUrl: "http://path-to-camera-stream-4", // Replace with actual camera stream URL
    }
  ];

  // Function to handle camera selection
  const handleCameraClick = (camera) => {
    setSelectedCamera(camera);
  };

  return (
    <div
      className="text-gray-800"
      style={{
        backgroundImage: 'url(/src/assets/dashboard.jpg)', // Path to your background image
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Layout */}
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gradient-to-r from-[#482566] to-black border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-4 p-14 border-b border-gray-100">
              {sidebarOpen && (
                <div className="flex items-center">
                  <img
                    src="/src/assets/logo.png"
                    alt="Logo"
                    className="w-12 h-auto"
                  />
                  <span className="ml-2 text-white font-bold text-3xl">Recon Eye</span>
                </div>
              )}

              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-200 hover:text-red-500 mt-2"
              >
                {sidebarOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 17l-5-5m0 0l5-5m-5 5h12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  </svg>
                )}
              </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 p-2 space-y-1 overflow-y-auto mt-4">
              {[{
                label: 'Dashboard',
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              }, {
                label: 'Edit Profile',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16"><path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/></svg>
              },  {
                label: 'Camera Directory',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video-fill" viewBox="0 0 16 16"><path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z"/></svg>
              }, {
                label: 'Alerts',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>
              }, {
                label: 'View History',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-clock-history" viewBox="0 0 16 16">
  <path d="M8.515 1.019A7 7 0 0 0 8 1V0a8 8 0 0 1 .589.022zm2.004.45a7 7 0 0 0-.985-.299l.219-.976q.576.129 1.126.342zm1.37.71a7 7 0 0 0-.439-.27l.493-.87a8 8 0 0 1 .979.654l-.615.789a7 7 0 0 0-.418-.302zm1.834 1.79a7 7 0 0 0-.653-.796l.724-.69q.406.429.747.91zm.744 1.352a7 7 0 0 0-.214-.468l.893-.45a8 8 0 0 1 .45 1.088l-.95.313a7 7 0 0 0-.179-.483m.53 2.507a7 7 0 0 0-.1-1.025l.985-.17q.1.58.116 1.17zm-.131 1.538q.05-.254.081-.51l.993.123a8 8 0 0 1-.23 1.155l-.964-.267q.069-.247.12-.501m-.952 2.379q.276-.436.486-.908l.914.405q-.24.54-.555 1.038zm-.964 1.205q.183-.183.35-.378l.758.653a8 8 0 0 1-.401.432z"/>
  <path d="M8 1a7 7 0 1 0 4.95 11.95l.707.707A8.001 8.001 0 1 1 8 0z"/>
  <path d="M7.5 3a.5.5 0 0 1 .5.5v5.21l3.248 1.856a.5.5 0 0 1-.496.868l-3.5-2A.5.5 0 0 1 7 9V3.5a.5.5 0 0 1 .5-.5"/>
</svg>
              }, {
                label: 'Suspicious Activity',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-radioactive" viewBox="0 0 16 16">
  <path d="M8 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8"/>
  <path d="M9.653 5.496A3 3 0 0 0 8 5c-.61 0-1.179.183-1.653.496L4.694 2.992A5.97 5.97 0 0 1 8 2c1.222 0 2.358.365 3.306.992zm1.342 2.324a3 3 0 0 1-.884 2.312 3 3 0 0 1-.769.552l1.342 2.683c.57-.286 1.09-.66 1.538-1.103a6 6 0 0 0 1.767-4.624zm-5.679 5.548 1.342-2.684A3 3 0 0 1 5.005 7.82l-2.994-.18a6 6 0 0 0 3.306 5.728ZM10 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0"/>
</svg>
              }, {
                label: 'Acknowledge Threats',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-cloud-haze2-fill" viewBox="0 0 16 16">
  <path d="M8.5 2a5 5 0 0 1 4.905 4.027A3 3 0 0 1 13 12H3.5A3.5 3.5 0 0 1 .035 9H5.5a.5.5 0 0 0 0-1H.035a3.5 3.5 0 0 1 3.871-2.977A5 5 0 0 1 8.5 2m-6 8a.5.5 0 0 0 0 1h9a.5.5 0 0 0 0-1zM0 13.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5"/>
</svg>
              }].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`flex items-center p-2 rounded-lg text-sm ${index === 0 ? 'bg-blue-50 text-blue-600' : 'text-white hover:bg-gray-50 hover:text-blue-600'}`}
                >
                  <div className="mr-2">{item.icon}</div>
                  <span>{item.label}</span>
                </a>
              ))}

              {/* Logout Button */}
              <button
                onClick={handleLogout} // Call handleLogout directly
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

          {/* Dashboard Content */}
          <main className="flex-1 overflow-auto p-4 md:p-6">
            {/* Camera Directory Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {cameras.map((camera) => (
                <div
                  key={camera.id}
                  className="bg-purple-900 rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleCameraClick(camera)} // Handle camera click
                >
                  <img
                    src="/src/assets/Service4.png" 
                    alt="Private Investigation Services"
                    className="w-20 h-20 object-cover rounded-full mb-4 mx-auto"
                  />
                  <div className="mt-2 text-center">
                    <p className="text-lg font-semibold text-white">{camera.title}</p>
                  </div>
                </div>
              ))}

              {/* Insert image below the first two cameras */}
              <div className="lg:col-span-4 sm:col-span-4 md:col-span-4 bg-cover rounded-lg p-4">
                <img
                  src="/src/assets/dashboard2.jpg" // Path to your image
                  alt="Dashboard Image"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>

            {/* Camera Stream Modal */}
            {selectedCamera && (
              <div
                className="fixed inset-0 z-50 overflow-hidden bg-black bg-opacity-50 flex justify-center items-center"
                onClick={() => setSelectedCamera(null)} // Close modal on outside click
              >
                <div className="bg-gradient-to-r from-[#482566] to-black p-6 rounded-lg shadow-lg">
                  <video
                    src={selectedCamera.streamUrl}
                    controls
                    className="w-full h-auto rounded-md"
                  ></video>
                  <button
                    onClick={() => setSelectedCamera(null)}
                    className="mt-4 p-2 bg-red-500 text-white rounded-md"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
