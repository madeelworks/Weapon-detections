import React, { useEffect, useState } from "react";
import axios from "axios";

const ConfigureSystem = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [form, setForm] = useState({
    name: "",
    location: "",
    type: "rtsp",
    streamUrl: "",
    status: "active",
    resolution: "1080p",
    frameRate: 30,
    bitrate: 4000,
    sensitivity: "medium",
    threshold: 50,
  });
  const [editingId, setEditingId] = useState(null);

  const load = async () => {
    try {
      setLoading(true);
      setErr("");
      const res = await axios.get("http://localhost:3001/api/cameras", { withCredentials: true });
      setItems(Array.isArray(res.data?.data) ? res.data.data : []);
    } catch (e) {
      setErr(e?.response?.data?.error || "Failed to load cameras");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const submit = async () => {
    try {
      setLoading(true);
      setErr("");
      if (editingId) {
        await axios.put(`http://localhost:3001/api/cameras/${editingId}`, form, { withCredentials: true });
      } else {
        await axios.post("http://localhost:3001/api/cameras", form, { withCredentials: true });
      }
      setForm({ name: "", location: "", type: "rtsp", streamUrl: "", status: "active", resolution: "1080p", frameRate: 30, bitrate: 4000, sensitivity: "medium", threshold: 50 });
      setEditingId(null);
      await load();
    } catch (e) {
      setErr(e?.response?.data?.error || "Failed to save camera");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id) => {
    try {
      setLoading(true);
      setErr("");
      await axios.delete(`http://localhost:3001/api/cameras/${id}`, { withCredentials: true });
      await load();
    } catch (e) {
      setErr(e?.response?.data?.error || "Failed to delete camera");
    } finally {
      setLoading(false);
    }
  };

  const startEdit = (item) => {
    setEditingId(item._id);
    setForm({
      name: item.name || "",
      location: item.location || "",
      type: item.type || "rtsp",
      streamUrl: item.streamUrl || "",
      status: item.status || "active",
      resolution: item.resolution || "1080p",
      frameRate: item.frameRate ?? 30,
      bitrate: item.bitrate ?? 4000,
      sensitivity: item.sensitivity || "medium",
      threshold: item.threshold ?? 50,
    });
  };

  return (
    <div className="p-4 space-y-6">
      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow">
        <div className="flex items-center justify-between mb-3">
          <div className="text-lg font-semibold">Configure System</div>
          {err && <div className="text-sm text-red-600">{err}</div>}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          <input className="border rounded px-3 py-2" placeholder="Camera Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="border rounded px-3 py-2" placeholder="Location" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
          <select className="border rounded px-3 py-2" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })}>
            <option value="rtsp">RTSP</option>
            <option value="usb">USB Webcam</option>
          </select>
          <input className="border rounded px-3 py-2" placeholder="Stream URL" value={form.streamUrl} onChange={(e) => setForm({ ...form, streamUrl: e.target.value })} />
          <select className="border rounded px-3 py-2" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          <select className="border rounded px-3 py-2" value={form.resolution} onChange={(e) => setForm({ ...form, resolution: e.target.value })}>
            <option value="1080p">1080p</option>
            <option value="720p">720p</option>
            <option value="480p">480p</option>
          </select>
          <input className="border rounded px-3 py-2" type="number" placeholder="Frame Rate" value={form.frameRate} onChange={(e) => setForm({ ...form, frameRate: Number(e.target.value) })} />
          <input className="border rounded px-3 py-2" type="number" placeholder="Bitrate (kbps)" value={form.bitrate} onChange={(e) => setForm({ ...form, bitrate: Number(e.target.value) })} />
          <select className="border rounded px-3 py-2" value={form.sensitivity} onChange={(e) => setForm({ ...form, sensitivity: e.target.value })}>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <input className="border rounded px-3 py-2" type="number" placeholder="Trigger Threshold" value={form.threshold} onChange={(e) => setForm({ ...form, threshold: Number(e.target.value) })} />
        </div>
        <div className="mt-3 flex items-center gap-2">
          <button onClick={submit} className="px-4 py-2 rounded bg-blue-600 text-white">{editingId ? "Update" : "Add"}</button>
          {editingId && <button onClick={() => { setEditingId(null); setForm({ name: "", location: "", type: "rtsp", streamUrl: "", status: "active", resolution: "1080p", frameRate: 30, bitrate: 4000, sensitivity: "medium", threshold: 50 }); }} className="px-4 py-2 rounded bg-gray-200">Cancel</button>}
        </div>
      </div>

      <div className="rounded-xl bg-white border border-gray-200 p-4 shadow">
        <div className="text-lg font-semibold mb-3">Cameras</div>
        {loading ? (
          <div className="text-sm text-gray-500">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-sm text-gray-500">No cameras configured.</div>
        ) : (
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {items.map((c) => (
              <li key={c._id} className="border rounded-lg p-3">
                <div className="font-semibold">{c.name}</div>
                <div className="text-sm text-gray-600">{c.location}</div>
                <div className="text-xs text-gray-500">{c.type.toUpperCase()} • {c.status}</div>
                <div className="text-xs text-gray-500">{c.resolution} • {c.frameRate} FPS • {c.bitrate} kbps</div>
                <div className="mt-2 flex items-center gap-2">
                  <button onClick={() => startEdit(c)} className="px-3 py-1 rounded bg-amber-500 text-white">Edit</button>
                  <button onClick={() => remove(c._id)} className="px-3 py-1 rounded bg-red-600 text-white">Delete</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ConfigureSystem;