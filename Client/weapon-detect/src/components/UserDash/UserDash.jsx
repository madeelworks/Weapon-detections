
import { useMemo } from 'react';
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

  // Mock analytics (replace with real API later)
  const kpis = useMemo(() => ({
    totalDetections: 128,
    guns: 74,
    knives: 39,
    other: 15,
    last24h: 12,
  }), []);

  const lineData = useMemo(() => ({
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        label: 'Detections',
        data: [12, 19, 9, 15, 22, 11, 40],
        borderColor: 'rgba(59,130,246,1)',
        backgroundColor: 'rgba(59,130,246,0.2)',
        tension: 0.35,
        fill: true,
      },
    ],
  }), []);

  const doughnutData = useMemo(() => ({
    labels: ['Guns', 'Knives', 'Other'],
    datasets: [
      {
        label: 'By Class',
        data: [kpis.guns, kpis.knives, kpis.other],
        backgroundColor: ['#ef4444', '#f59e0b', '#10b981'],
        borderWidth: 0,
      },
    ],
  }), [kpis]);

  return (
    <div className="p-4 space-y-6">
      {/* KPI cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-4 shadow">
          <div className="text-sm text-gray-500">Total Detections</div>
          <div className="text-3xl font-bold mt-1">{kpis.totalDetections}</div>
        </div>
        <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-4 shadow">
          <div className="text-sm text-gray-500">Guns</div>
          <div className="text-3xl font-bold mt-1 text-red-600">{kpis.guns}</div>
        </div>
        <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-4 shadow">
          <div className="text-sm text-gray-500">Knives</div>
          <div className="text-3xl font-bold mt-1 text-amber-600">{kpis.knives}</div>
        </div>
        <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-4 shadow">
          <div className="text-sm text-gray-500">Last 24h</div>
          <div className="text-3xl font-bold mt-1 text-blue-600">{kpis.last24h}</div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-xl bg-white/90 backdrop-blur border border-gray-200 p-3 shadow">
          <div className="text-sm text-gray-700 mb-2 font-semibold">Detections over time</div>
          <div style={{ height: '200px' }}>
            <Line
              data={lineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
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