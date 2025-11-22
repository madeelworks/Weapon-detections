import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import moment from "moment";

const AdminAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlertId, setSelectedAlertId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setErr("");
        const res = await axios.get("http://localhost:3001/api/detection/all", { withCredentials: true });
        setAlerts(res.data?.data || []);
      } catch (e) {
        setErr("Failed to load alerts. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  const selectedAlert = alerts.find(a => a._id === selectedAlertId);

  const acknowledgeAlert = async () => {
    if (!selectedAlertId) return;
    try {
      await axios.put(`http://localhost:3001/api/detection/${selectedAlertId}/acknowledge`, {}, { withCredentials: true });
      setAlerts(prev => prev.map(a => a._id === selectedAlertId ? { ...a, isViewed: true } : a));
    } catch (e) {
      console.error("ack error", e);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Alerts</h1>
              <p className="text-sm text-gray-500">All alerts across users</p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100">{alerts.length} total</span>
          </div>
          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="text-2xl font-semibold">Images</h2>
            <p className="text-sm text-gray-500">Preview of selected detection</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

          <div className="bg-white rounded-xl shadow p-4 sticky top-4 self-start">
            {!selectedAlert ? (
              <div className="text-center py-12 text-gray-500">Select an alert to view its image.</div>
            ) : (
              <div className="space-y-3">
                <img src={selectedAlert.s3_url} alt="detection" className="w-full h-auto max-h-[60vh] object-contain rounded-md border" />
                <div className="text-xs text-gray-500">Key: {selectedAlert.s3_key}</div>
                <div className="mt-2 flex items-center gap-3">
                  <a href={selectedAlert.s3_url} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-500">Open Image</a>
                  <button onClick={acknowledgeAlert} className={`px-4 py-2 rounded-md text-white text-sm ${selectedAlert.isViewed ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"}`}>{selectedAlert.isViewed ? "Acknowledged" : "Acknowledge"}</button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAlerts;