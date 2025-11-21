import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

/**
 * Expected alert shape from API:
 * {
 *   _id: string,
 *   title: string,
 *   description: string,
 *   createdAt: string | Date,
 *   images: string[]   // array of image URLs
 * }
 *
 * Fetch endpoint suggestion (adjust to your backend):
 * GET http://localhost:3001/alerts?userId=<currentUserId>
 */

const Alerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlertId, setSelectedAlertId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        let userID = ""; 
        setLoading(true);
        setErr("");
         const user = await axios.get("http://localhost:3001/user/profile", { withCredentials: true });
        console.log("user", user)

         if(!user){

          console.log("User Not found")
          return
         }
         userID = user.data._id

         console.log("userID", userID)
        const res = await axios.get(`http://localhost:3001/api/detection/${userID}`,  {
          withCredentials: true,
        });

        console.log("res", res);
        setAlerts(res.data.data);
      
      } catch (e) {
        setErr("Failed to load alerts. Please try again.", e);
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, []); 

  const selectedAlert = alerts.find(a => a._id === selectedAlertId);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page container */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Top header row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Alerts</h1>
              <p className="text-sm text-gray-500">All alerts for the logged-in user</p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100">{alerts.length} total</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-2xl font-semibold">Images</h2>
            <p className="text-sm text-gray-500">Images related to the selected alert</p>
          </div>
        </div>

        {/* Content row: left = alerts list, right = images panel */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Left: Alerts list */}
          <div className="bg-white rounded-xl shadow p-4">
            {loading ? (
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
                <div className="h-4 bg-gray-200 rounded animate-pulse" />
              </div>
            ) : err ? (
              <div className="text-center py-8 text-red-600">{err}</div>
            ) : alerts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No alerts found.</div>
            ) : (
              <ul className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                {alerts.map((alert) => (
                  <li
                    key={alert._id}
                    // className={`border rounded-lg p-4 hover:shadow-sm transition bg-white ${
                    //   selectedAlertId === alert._id ? "border-blue-500 ring-1 ring-blue-100" : "border-gray-200"
                    // }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      {/* <div>
                        <h3 className="text-lg font-semibold">{alert.title || "Untitled Alert"}</h3>
                        <p className="text-sm text-gray-600 mt-1">
                          {alert.description || "No description"}
                        </p>
                        <div className="mt-2 text-xs text-gray-500">
                          {alert.createdAt
                            ? new Date(alert.createdAt).toLocaleString()
                            : "—"}
                        </div>
                        <div className="mt-2 text-xs">
                          <span className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded">
                            Images: {Array.isArray(alert.images) ? alert.images.length : 0}
                          </span>
                        </div>
                      </div> */}

                      <div className="flex flex-col items-end gap-2">
                        <Link
                          to={alert.s3_url}
                          target="_blank"
                          className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-500 shadow"
                        >
                          View Image
                        </Link>
                      </div>
                        
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Right: Images panel */}
          <div className="bg-white rounded-xl shadow p-4 sticky top-4 self-start">
            {!selectedAlert ? (
              <div className="text-center py-12 text-gray-500">
                Select an alert to view its images.
              </div>
            ) : Array.isArray(selectedAlert.images) && selectedAlert.images.length > 0 ? (
              <>
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedAlert.title}</h3>
                    <p className="text-sm text-gray-500">
                      Showing {selectedAlert.images.length} image
                      {selectedAlert.images.length > 1 ? "s" : ""}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedAlertId(null)}
                    className="px-3 py-2 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300"
                  >
                    Clear
                  </button>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {selectedAlert.images.map((url, idx) => (
                    <div key={idx} className="relative">
                      <img
                        src={url}
                        alt={`alert-${selectedAlert._id}-${idx}`}
                        className="w-full h-36 object-cover rounded-md border shadow-sm"
                      />
                      <a
                        href={url}
                        target="_blank"
                        rel="noreferrer"
                        className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded"
                      >
                        Open
                      </a>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-12 text-gray-500">
                No images found for this alert.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
