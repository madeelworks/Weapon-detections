import React, { useEffect, useMemo, useState }  from 'react'
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
        
        } catch {
          setErr("Failed to load alerts. Please try again.");
        } finally {
          setLoading(false);
        }
      };
  
      fetchAlerts();
    }, []); 
  


  const [daysFilter, setDaysFilter] = useState("7");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("latest");
  const cutoff = daysFilter !== "all" ? moment().subtract(parseInt(daysFilter, 10), "days") : null;
  const acknowledgedBase = useMemo(() => alerts.filter(a => a.isViewed && (a.timestamp || a.createdAt || a.updatedAt) && (cutoff ? moment(a.timestamp || a.createdAt || a.updatedAt).isSameOrAfter(cutoff) : true)), [alerts, cutoff]);
  const acknowledged = useMemo(() => {
    let list = acknowledgedBase.filter(a => {
      const q = search.trim().toLowerCase();
      if (!q) return true;
      const klass = String(a.class_name || '').toLowerCase();
      const loc = String(a.location || '').toLowerCase();
      return klass.includes(q) || loc.includes(q);
    });
    list = list.sort((a,b) => {
      if (sortBy === 'latest') return new Date(b.timestamp || b.createdAt || b.updatedAt) - new Date(a.timestamp || a.createdAt || a.updatedAt);
      if (sortBy === 'oldest') return new Date(a.timestamp || a.createdAt || a.updatedAt) - new Date(b.timestamp || b.createdAt || b.updatedAt);
      if (sortBy === 'confidence-high') return (b.confidence || 0) - (a.confidence || 0);
      if (sortBy === 'confidence-low') return (a.confidence || 0) - (b.confidence || 0);
      return 0;
    });
    return list;
  }, [acknowledgedBase, search, sortBy]);

  const [page, setPage] = useState(1);
  const pageSize = 9;
  const totalPages = Math.max(1, Math.ceil(acknowledged.length / pageSize));
  const startIdx = (page - 1) * pageSize;
  const pageItems = acknowledged.slice(startIdx, startIdx + pageSize);
  useEffect(() => { if (page > totalPages) setPage(1) }, [acknowledged.length, totalPages]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold text-black">Acknowledged Threats</h1>
              <p className="text-sm text-gray-500">{daysFilter === "all" ? "All acknowledged alerts" : `Acknowledged alerts (last ${daysFilter} days)`}</p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100">{acknowledged.length} total</span>
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2">
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search class or location" className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700" />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700">
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="confidence-high">Confidence high</option>
              <option value="confidence-low">Confidence low</option>
            </select>
            <select value={daysFilter} onChange={(e) => setDaysFilter(e.target.value)} className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700">
              <option value="1">1 day</option>
              <option value="4">4 days</option>
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
              <option value="all">All</option>
            </select>
          </div>
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
          <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {pageItems.map((alert) => (
              <div key={alert._id} className="rounded-xl bg-white border border-gray-200 shadow hover:shadow-md transition overflow-hidden">
                <div className="relative">
                  {alert.s3_url ? (
                    <img src={alert.s3_url} alt="detection" className="w-full h-40 object-cover" />
                  ) : (
                    <div className="w-full h-40 bg-gray-100" />
                  )}
                  <div className="absolute top-2 left-2 flex items-center gap-2">
                    <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-900/80 text-white">{alert.class_name}</span>
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">Acknowledged</span>
                  </div>
                </div>
                <div className="p-3">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-700 font-semibold">{(alert.confidence * 100).toFixed(1)}%</div>
                    <Link to={alert.s3_url} target="_blank" className="text-xs px-2 py-1 rounded bg-blue-600 text-white">Open</Link>
                  </div>
                  <div className="mt-2 text-xs text-gray-500">
                    {alert.timestamp ? moment(alert.timestamp).format("lll") : (alert.createdAt ? moment(alert.createdAt).format("lll") : "—")}
                  </div>
                  <div className="mt-1 text-sm text-gray-700 truncate">
                    {alert.location || "Unknown location"}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="text-xs text-gray-500">Page {page} of {totalPages}</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Prev</button>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Next</button>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Acknowledge
