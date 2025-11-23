
import { useEffect, useMemo, useState } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Outlet } from 'react-router-dom';
import 'chart.js/auto';
import { Line, Doughnut } from 'react-chartjs-2';

const UserDash = () => {


  // Simulated Camera Data
  const cameras = [
    { id: 1, title: "Camera 1", streamUrl: "/src/assets/detection.mp4" },
    { id: 2, title: "Camera 2", streamUrl: "/src/assets/v8l.mp4" },
    { id: 3, title: "Camera 3", streamUrl: "/src/assets/v8n.mp4" },
    { id: 4, title: "Camera 4", streamUrl: "/src/assets/v8s.mp4" }
  ];

  const [detections, setDetections] = useState([]);
  const [kpis, setKpis] = useState({ totalDetections: 0, guns: 0, heavy: 0, knives: 0, other: 0, last24h: 0 });

  useEffect(() => {
    const load = async () => {
      try {
        const user = await axios.get('http://localhost:3001/user/profile', { withCredentials: true });
        const userID = user.data._id;
        const res = await axios.get(`http://localhost:3001/api/detection/${userID}`, { withCredentials: true });
        const data = Array.isArray(res.data?.data) ? res.data.data : [];
        setDetections(data);
      } catch {
        console.error('Failed to load detections');
      }
    };
    load();
  }, []);

  useEffect(() => {
    const now = moment();
    let guns = 0, heavy = 0, knives = 0, other = 0, total = 0, last24 = 0;
    detections.forEach(d => {
      total += 1;
      const name = String(d.class_name || '').toLowerCase();
      if (name.includes('gun')) guns += 1;
      else if (name.includes('heavy')) heavy += 1;
      else if (name.includes('knife')) knives += 1;
      else other += 1;
      const ts = d.timestamp || d.createdAt || d.updatedAt;
      if (ts && now.diff(moment(ts), 'hours') < 24) last24 += 1;
    });
    setKpis({ totalDetections: total, guns, heavy, knives, other, last24h: last24 });
  }, [detections]);

  const lineData = useMemo(() => {
    const labels = [];
    const totalCounts = [];
    const ackCounts = [];
    const now = moment();
    for (let i = 6; i >= 0; i--) {
      const day = moment(now).subtract(i, 'days');
      labels.push(day.format('ddd')); // Mon, Tue, ...
      const dayDetections = detections.filter(d => {
        const ts = d.timestamp || d.createdAt || d.updatedAt;
        return ts && moment(ts).isSame(day, 'day');
      });
      totalCounts.push(dayDetections.length);
      ackCounts.push(dayDetections.filter(d => d.isViewed).length);
    }
    return {
      labels,
      datasets: [
        { label: 'Detections (last 7 days)', data: totalCounts, borderColor: 'rgba(59,130,246,1)', backgroundColor: 'rgba(59,130,246,0.2)', tension: 0.35, fill: true },
        { label: 'Acknowledged (last 7 days)', data: ackCounts, borderColor: '#10b981', backgroundColor: 'rgba(16,185,129,0.2)', tension: 0.35, fill: true },
      ],
    };
  }, [detections]);

  const doughnutData = useMemo(() => ({
    labels: ['Guns', 'Heavy Weapon', 'Knives', 'Other'],
    datasets: [{ label: 'By Class', data: [kpis.guns, kpis.heavy, kpis.knives, kpis.other], backgroundColor: ['#ef4444', '#8b5cf6', '#f59e0b', '#10b981'], borderWidth: 0 }],
  }), [kpis]);

  return (
    <div className="p-4 space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-4 shadow">
          <div className="text-sm text-gray-500">Total Detections</div>
          <div className="text-3xl font-bold mt-1 text-black">{kpis.totalDetections}</div>
        </div>
        <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-4 shadow">
          <div className="text-sm text-gray-500">Guns</div>
          <div className="text-3xl font-bold mt-1 text-red-600">{kpis.guns}</div>
        </div>
        <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-4 shadow">
          <div className="text-sm text-gray-500">Heavy Weapon</div>
          <div className="text-3xl font-bold mt-1 text-purple-600">{kpis.heavy}</div>
        </div>
        <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-4 shadow">
          <div className="text-sm text-gray-500">Knives</div>
          <div className="text-3xl font-bold mt-1 text-amber-600">{kpis.knives}</div>
        </div>
        <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-4 shadow">
          <div className="text-sm text-gray-500">Last 24h</div>
          <div className="text-3xl font-bold mt-1 text-blue-600">{kpis.last24h}</div>
        </div>
        <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-4 shadow">
          <div className="text-sm text-gray-500">Acknowledged Threats</div>
          <div className="text-3xl font-bold mt-1 text-green-600">{detections.filter(d => d.isViewed).length}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-3 shadow">
          <div className="text-sm text-gray-700 mb-2 font-semibold">Detections over time (last 7 days)</div>
          <div style={{ height: '200px' }}>
            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                scales: {
                  x: { grid: { display: false } },
                  y: { grid: { color: 'rgba(0,0,0,0.05)' } },
                },
              }}
            />
          </div>
        </div>
        <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-3 shadow">
          <div className="text-sm text-gray-700 mb-2 font-semibold">By class</div>
          <div style={{ height: '200px' }}>
            <Doughnut
              data={doughnutData}
              options={{
                maintainAspectRatio: false,
                plugins: { legend: { position: 'bottom' } },
                cutout: '60%',
              }}
            />
          </div>
        </div>
      </div>

      {/* Cameras quick actions */}
      <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-4 shadow">
        <div className="text-sm text-gray-700 mb-3 font-semibold">Quick cameras</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {cameras.map((camera) => (
            <div key={camera.id} className="bg-purple-900 rounded-lg p-4 shadow hover:shadow-md transition">
              <img
                src="/src/assets/Service4.png"
                alt="Camera"
                className="w-16 h-16 object-cover rounded-full mb-3 mx-auto"
              />
              <div className="text-center text-white font-semibold">{camera.title}</div>
            </div>
          ))}
        </div>
      </div>

      
    </div>
  );
};



export default UserDash;