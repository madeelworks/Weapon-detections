import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import moment from "moment";
import "chart.js/auto";
import { Line, Doughnut } from "react-chartjs-2";

const AdminAlerts = () => {
  const [alerts, setAlerts] = useState([]);
  const [selectedAlertId, setSelectedAlertId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("all");
  const [retry, setRetry] = useState(0);
  const [name, setName] = useState("");
  const [days, setDays] = useState("all");

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        setErr("");
        const params = { page, limit: 12, q, status };
        if (name) params.name = name;
        if (days !== 'all') params.days = parseInt(days, 10);
        const res = await axios.get("http://localhost:3001/api/detection/admin", { params, withCredentials: true });
        const data = res.data?.data || [];
        setAlerts(data);
        setPages(res.data?.pages || 1);
      } catch (e) {
        console.error("Admin alerts load error", e);
        setErr("Failed to load alerts. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, [page, q, status, name, days, retry]);

  const selectedAlert = alerts.find(a => a._id === selectedAlertId);

  const formatInPK = (ts) => {
    try {
      const d = new Date(ts);
      return new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Karachi", month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" }).format(d);
    } catch {
      return "";
    }
  };

  const acknowledgeAlert = async () => {
    if (!selectedAlertId) return;
    try {
      await axios.put(`http://localhost:3001/api/detection/${selectedAlertId}/acknowledge`, {}, { withCredentials: true });
      setAlerts(prev => prev.map(a => a._id === selectedAlertId ? { ...a, isViewed: true } : a));
    } catch {
      console.error("ack error")
    }
  };

  const lineData = useMemo(() => {
    const labels = [];
    const totalCounts = [];
    const ackCounts = [];
    const now = moment();
    for (let i = 6; i >= 0; i--) {
      const day = moment(now).subtract(i, "days");
      labels.push(day.format("ddd"));
      const dayDetections = alerts.filter(d => {
        const ts = d.timestamp || d.createdAt || d.updatedAt;
        return ts && moment(ts).isSame(day, "day");
      });
      totalCounts.push(dayDetections.length);
      ackCounts.push(dayDetections.filter(d => d.isViewed).length);
    }
    return {
      labels,
      datasets: [
        { label: "Detections (last 7 days)", data: totalCounts, borderColor: "rgba(59,130,246,1)", backgroundColor: "rgba(59,130,246,0.2)", tension: 0.35, fill: true },
        { label: "Acknowledged (last 7 days)", data: ackCounts, borderColor: "#10b981", backgroundColor: "rgba(16,185,129,0.2)", tension: 0.35, fill: true },
      ],
    };
  }, [alerts]);

  const doughnutData = useMemo(() => {
    let guns = 0, heavy = 0, knives = 0, other = 0;
    alerts.forEach(d => {
      const name = String(d.class_name || "").toLowerCase();
      if (name.includes("gun")) guns += 1;
      else if (name.includes("heavy")) heavy += 1;
      else if (name.includes("knife")) knives += 1;
      else other += 1;
    });
    return {
      labels: ["Guns", "Heavy Weapon", "Knives", "Other"],
      datasets: [{ label: "By Class", data: [guns, heavy, knives, other], backgroundColor: ["#ef4444", "#8b5cf6", "#f59e0b", "#10b981"], borderWidth: 0 }],
    };
  }, [alerts]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="bg-white rounded-xl shadow p-4 mb-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-semibold">Admin Alerts</h1>
              <p className="text-sm text-gray-500">All detections across users</p>
            </div>
            <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded-md border border-blue-100">{alerts.length} shown</span>
          </div>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-5 gap-2">
            <input value={q} onChange={(e) => { setPage(1); setQ(e.target.value); }} placeholder="Search class or location" className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700" />
            <input value={name} onChange={(e) => { setPage(1); setName(e.target.value); }} placeholder="Search by name" className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700" />
            <select value={status} onChange={(e) => { setPage(1); setStatus(e.target.value); }} className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700">
              <option value="all">All</option>
              <option value="ack">Acknowledged</option>
              <option value="unack">Unacknowledged</option>
            </select>
            <select value={days} onChange={(e) => { setPage(1); setDays(e.target.value); }} className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-700">
              <option value="all">All time</option>
              <option value="1">Last 1 day</option>
              <option value="3">Last 3 days</option>
              <option value="4">Last 4 days</option>
              <option value="7">Last 7 days</option>
              <option value="14">Last 14 days</option>
            </select>
            <button onClick={() => setRetry(r => r + 1)} className="px-3 py-1 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50">Retry</button>
            {err && <div className="text-xs text-red-600">{err}</div>}
          </div>
        </div>

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
              <div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {alerts.map((alert) => (
                    <li key={alert._id} className={`border rounded-lg p-4 transition bg-white ${selectedAlertId === alert._id ? "border-blue-500 ring-1 ring-blue-100" : "border-gray-200 hover:shadow-sm"}`}>
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold px-2 py-1 rounded bg-gray-900/80 text-white">{alert.class_name}</span>
                            <span className={`text-xs px-2 py-1 rounded ${alert.isViewed ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>{alert.isViewed ? 'Acknowledged' : 'Unacknowledged'}</span>
                          </div>
                          <div className="mt-2 text-sm text-gray-700">
                            <span className="font-medium">{alert.user?.firstName} {alert.user?.lastName}</span>
                            <span className="mx-2 text-gray-400">•</span>
                            <span>{alert.location || "Unknown location"}</span>
                          </div>
                          <div className="mt-1 text-xs text-gray-500">
                            {alert.timestamp ? formatInPK(alert.timestamp) : "—"}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <button onClick={() => setSelectedAlertId(alert._id)} className="px-3 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-500 shadow">View Image</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-gray-500">Page {page} of {pages}</div>
                  <div className="flex items-center gap-2">
                    <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Prev</button>
                    <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages} className="px-3 py-1 rounded border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50">Next</button>
                  </div>
                </div>
              </div>
            )}
          </div>

        {selectedAlert && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow w-[90vw] max-w-3xl p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-xl font-semibold">{selectedAlert.class_name}</h3>
                  <p className="text-sm text-gray-500">{selectedAlert.user?.firstName} {selectedAlert.user?.lastName} • {selectedAlert.location || "Unknown location"}</p>
                </div>
                <button onClick={() => setSelectedAlertId(null)} className="px-3 py-2 rounded-md bg-gray-200 text-gray-800 text-sm hover:bg-gray-300">Close</button>
              </div>
              <div className="mt-3">
                {selectedAlert.s3_url ? (
                  <img src={selectedAlert.s3_url} alt="detection" className="w-full h-auto max-h-[70vh] object-contain rounded-md border" />
                ) : (
                  <div className="text-center py-10 text-gray-500">No image available.</div>
                )}
              </div>
              <div className="mt-2 text-xs text-gray-500">Key: {selectedAlert.s3_key}</div>
              <div className="mt-3 flex items-center justify-end gap-3">
                <a href={selectedAlert.s3_url} target="_blank" rel="noreferrer" className="px-4 py-2 rounded-md bg-blue-600 text-white text-sm hover:bg-blue-500">Open Original</a>
                <button onClick={acknowledgeAlert} className={`px-4 py-2 rounded-md text-white text-sm ${selectedAlert.isViewed ? "bg-green-600 hover:bg-green-500" : "bg-red-600 hover:bg-red-500"}`}>{selectedAlert.isViewed ? "Acknowledged" : "Acknowledge"}</button>
              </div>
            </div>
          </div>
        )}

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-3 shadow">
            <div className="text-sm text-gray-700 mb-2 font-semibold">Detections over time (last 7 days)</div>
            <div style={{ height: "200px" }}>
              <Line
                data={lineData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: { legend: { position: "bottom" } },
                  scales: { x: { grid: { display: false } }, y: { grid: { color: "rgba(0,0,0,0.05)" } } },
                }}
              />
            </div>
          </div>
          <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-3 shadow">
            <div className="text-sm text-gray-700 mb-2 font-semibold">By class</div>
            <div style={{ height: "200px" }}>
              <Doughnut
                data={doughnutData}
                options={{ maintainAspectRatio: false, plugins: { legend: { position: "bottom" } }, cutout: "60%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAlerts;
