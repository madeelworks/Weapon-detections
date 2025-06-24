import { useState } from 'react';

export default function App() {
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
      // Replace with actual camera stream URL
    },
    {
      id: 2,
      title: "Camera 2",
      thumbnail: "https://via.placeholder.com/400x300?text=Camera+2",
      streamUrl: "/src/assets/v8l.mp4", // Replace with actual camera stream URL
    },
    {
      id: 3,
      title: "Camera 3",
      thumbnail: "https://via.placeholder.com/400x300?text=Camera+3",
      streamUrl: "/src/assets/v8n.mp4", // Replace with actual camera stream URL
    },
    {
      id: 4,
      title: "Camera 4",
      thumbnail: "https://via.placeholder.com/400x300?text=Camera+4",
      streamUrl: "/src/assets/v8s.mp4", // Replace with actual camera stream URL
    }
  ];

  // Function to handle camera selection
  const handleCameraClick = (camera) => {
    setSelectedCamera(camera);
  };

  return (
    <div
      className=" text-gray-800"
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
          className={`${sidebarOpen ? 'w-64' : 'w-16'} bg-gradient-to-r from-[#482566] to-black border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out mt-20`}
        >
          <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
              {sidebarOpen && (
                <div className="flex items-center">
                  <img
                    src="/src/assets/logo.png"
                    alt="Logo"
                    className="w-12 h-auto"
                  />
                  <span className="ml-2 text-white font-bold">Recon Eye</span>
                </div>
              )}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="text-gray-500 hover:text-blue-600"
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
            <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
              {[{
                label: 'Dashboard',
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
              }, {
                label: 'Add Users',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-people-fill" viewBox="0 0 16 16"><path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/></svg>
              }, {
                label: 'Contact Information',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-person-lines-fill" viewBox="0 0 16 16"><path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5m.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1z"/></svg>
              }, {
                label: 'Camera Directory',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video-fill" viewBox="0 0 16 16"><path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2z"/></svg>
              }, {
                label: 'Manage Files',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-file-earmark" viewBox="0 0 16 16"><path d="M14 4.5V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2h5.5zm-3 0A1.5 1.5 0 0 1 9.5 3V1H4a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V4.5z"/></svg>
              }, {
                label: 'Configure System',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-gear-fill" viewBox="0 0 16 16"><path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/></svg>
              }, {
                label: 'Recent Alerts',
                icon: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-exclamation-triangle-fill" viewBox="0 0 16 16"><path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5m.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2"/></svg>
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
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className="bg-gradient-to-r from-[#482566] to-blacke border-b border-gray-200 h-16 flex items-center justify-between mt-20 px-4 shadow-sm">
            <span className="ml-2 text-white font-bold">Welcome to Admin Dashboard</span>
            <div className="flex-1"></div>
            <div className="flex items-center space-x-4">
              <div className="text-white text-sm">{new Date().toLocaleDateString()}</div>
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
                  onClick={() => handleCameraClick(camera)}
                   // Handle camera click
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
                onClick={() => setSelectedCamera(null)} 
                // Close modal on outside click
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
}
