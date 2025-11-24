import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import moment from "moment";

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
  const location = useLocation();
  const isAdminView = location.pathname.startsWith("/dashboard");
  const navigate = useNavigate();
  const [ackLoading, setAckLoading] = useState(false);
  const [daysFilter, setDaysFilter] = useState("7");
  const [retry, setRetry] = useState(0);
  
  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        setErr("");
        let res;
        if (isAdminView) {
          // Admin dashboard view: fetch all detections
          res = await axios.get("http://localhost:3001/api/detection/all", { withCredentials: true });
        } else {
          // User view: fetch user-specific detections
          const user = await axios.get("http://localhost:3001/user/profile", { withCredentials: true });
          if (!user || !user.data?._id) throw new Error("User not found");
          const userID = user.data._id;
          res = await axios.get(`http://localhost:3001/api/detection/${userID}`, { withCredentials: true });
        }

        console.log("res", res);
        setAlerts(res.data.data);
      
      } catch (e) {
        console.error("alerts load error", e);
        setErr(e?.response?.data?.error || "Failed to load alerts. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchAlerts();
  }, [isAdminView, retry]); 

  const selectedAlert = alerts.find(a => a._id === selectedAlertId);
  const cutoff = daysFilter !== "all" ? moment().subtract(parseInt(daysFilter, 10), "days") : null;
  const visibleAlerts = isAdminView
    ? alerts
    : alerts.filter(a => !a.isViewed && a.timestamp && (cutoff ? moment(a.timestamp).isSameOrAfter(cutoff) : true));

  const acknowledgeAlert = async () => {
    if (!selectedAlertId) return;
    try {
      setAckLoading(true);
      await axios.put(`http://localhost:3001/api/detection/${selectedAlertId}/acknowledge`, {}, { withCredentials: true });
      setAlerts(prev => prev.map(a => a._id === selectedAlertId ? { ...a, isViewed: true } : a));
      if (!isAdminView) navigate("/UserDashboard/acknowledge");
    } catch (e) {
      console.error("ack error", e);
    } finally {
      setAckLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Page container */}
      <div className="mx-auto max-w-7xl px-4 py-6">
        {/* Top header row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-black">Alerts</h1>
              <p className="text-sm text-gray-500">{isAdminView ? "All alerts across users" : daysFilter === "all" ? "All unacknowledged alerts" : `Unacknowledged alerts (last ${daysFilter} days)`}</p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100">{visibleAlerts.length} total</span>
            {!isAdminView && (
              <select
                value={daysFilter}
                onChange={(e) => setDaysFilter(e.target.value)}
                className="ml-3 border border-gray-300 rounded px-2 py-1 text-xs text-gray-600"
              >
                <option value="1">1 day</option>
                <option value="4">4 days</option>
                <option value="7">7 days</option>
                <option value="14">14 days</option>
                <option value="30">30 days</option>
                <option value="all">All</option>
              </select>
            )}
            <button onClick={() => setRetry(r => r + 1)} className="ml-3 px-3 py-1 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">Retry</button>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-2xl font-semibold text-black">Images</h2>
            <p className="text-sm text-gray-500">Preview of selected detection</p>
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
              <div className="text-center py-8">
                <div className="text-red-600 mb-3">{err}</div>
                <button onClick={() => setRetry(r => r + 1)} className="px-3 py-2 rounded-md border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">Retry</button>
              </div>
            ) : visibleAlerts.length === 0 ? (
              <div className="text-center py-12 text-gray-500">No alerts found.</div>
            ) : (
              <ul className="space-y-3 max-h-[70vh] overflow-y-auto pr-2">
                {visibleAlerts.map((alert) => (
                  <li key={alert._id} className={`border rounded-lg p-4 transition bg-white ${selectedAlertId === alert._id ? "border-blue-500 ring-1 ring-blue-100" : "border-gray-200 hover:shadow-sm"}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-100 text-gray-700">{alert.class_name}</span>
                          <span className="text-xs text-gray-500">{(alert.confidence * 100).toFixed(1)}%</span>
                        </div>
                        <div className="mt-2 text-sm text-gray-700">
                          <span className="font-medium">{alert.user?.firstName} {alert.user?.lastName}</span>
                          <span className="mx-2 text-gray-400">•</span>
                          <span>{alert.location || "Unknown location"}</span>
                        </div>
                        <div className="mt-1 text-xs text-gray-500">
                          {alert.timestamp ? moment(alert.timestamp).format("lll") : "—"} <span className="mx-1">•</span> {alert.timestamp ? moment(alert.timestamp).fromNow() : ""}
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Link to={alert.s3_url} target="_blank" className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-500 shadow">View Image</Link>
                        <button onClick={() => setSelectedAlertId(alert._id)} className="px-3 py-2 rounded-md bg-gray-100 text-gray-800 text-sm hover:bg-gray-200">Preview</button>
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
              <div className="text-center py-12 text-gray-500">Select an alert to view its image.</div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-semibold">{selectedAlert.class_name}</h3>
                    <p className="text-sm text-gray-500">{selectedAlert.user?.firstName} {selectedAlert.user?.lastName} • {selectedAlert.location || "Unknown location"}</p>
                  </div>
                  <button onClick={() => setSelectedAlertId(null)} className="px-3 py-2 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300">Clear</button>
                </div>
                {selectedAlert.s3_url ? (
                  <img src={selectedAlert.s3_url} alt="detection" className="w-full h-auto max-h-[60vh] object-contain rounded-md border" />
                ) : (
                  <div className="text-center py-10 text-gray-500">No image available.</div>
                )}
                <div className="flex items-center gap-3">
                  <a href={selectedAlert.s3_url} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-500">Open Image</a>
                  <button onClick={acknowledgeAlert} disabled={ackLoading} className={`px-4 py-2 rounded-md text-white text-sm ${selectedAlert.isViewed ? "bg-green-600" : "bg-red-600"} ${ackLoading ? "opacity-70 cursor-not-allowed" : "hover:opacity-90"}`}>{selectedAlert.isViewed ? "Acknowledged" : "Acknowledge"}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alerts;
