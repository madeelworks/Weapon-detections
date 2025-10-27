
import { useState } from 'react';
import { Outlet } from 'react-router-dom';

const UserDash = () => {
  const [ setSelectedCamera] = useState(null);


  // Simulated Camera Data
  const cameras = [
    { id: 1, title: "Camera 1", streamUrl: "/src/assets/detection.mp4" },
    { id: 2, title: "Camera 2", streamUrl: "/src/assets/v8l.mp4" },
    { id: 3, title: "Camera 3", streamUrl: "/src/assets/v8n.mp4" },
    { id: 4, title: "Camera 4", streamUrl: "/src/assets/v8s.mp4" }
  ];

  // Function to handle camera selection
  const handleCameraClick = (camera) => {
    setSelectedCamera(camera);
  };
  console.log("userDash called")

  return (
    <div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {cameras.map((camera) => (
                <div
                  key={camera.id}
                  className="bg-purple-900 rounded-lg p-4 border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => handleCameraClick(camera)}
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
            </div>
            

            {/* Add User Dialog */}
            {/* <Addusers isDialogOpen={isDialogOpen} closeDialog={closeDialog} /> */}
</div>
  );
};



export default UserDash;