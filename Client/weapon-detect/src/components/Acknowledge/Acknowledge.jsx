import React, { useEffect, useState }  from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import moment from 'moment';

function Acknowledge() {
    const [alerts, setAlerts] = useState([]);
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
          setErr("Failed to load alerts. Please try again.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchAlerts();
    }, []); 
  


  const acknowledged = alerts.filter(a => a.isViewed);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-black">Acknowledged Threats</h1>
            <p className="text-sm text-gray-500">Alerts marked as acknowledged</p>
          </div>
          <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100">{acknowledged.length} total</span>
        </div>

        {loading ? (
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
          </div>
        ) : err ? (
          <div className="text-center py-8 text-red-600">{err}</div>
        ) : acknowledged.length === 0 ? (
          <div className="text-center py-12 text-gray-500">No acknowledged alerts yet.</div>
        ) : (
          <ul className="space-y-3">
            {acknowledged.map((alert) => (
              <li key={alert._id} className="border rounded-lg p-4 bg-white border-gray-200">
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
                      {alert.timestamp ? moment(alert.timestamp).format("lll") : "—"}
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <Link to={alert.s3_url} target="_blank" className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-500 shadow">Open Image</Link>
                    <span className="px-3 py-2 rounded-md bg-green-600 text-white text-sm">Acknowledged</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

export default Acknowledge
