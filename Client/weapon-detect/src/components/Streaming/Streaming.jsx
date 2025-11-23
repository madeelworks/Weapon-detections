import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

const Streaming = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [detections, setDetections] = useState([]);
  const [streaming, setStreaming] = useState(false);
  const [fps, setFps] = useState(1);
  const [mirror, setMirror] = useState(true);
  const streamRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(null)

  // Handle camera start/stop
  const handleStartStop = async () => {
    if (streaming) {
      // Stop camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
        streamRef.current = null;
      }
      if (videoRef.current) {
        videoRef.current.pause();
        videoRef.current.srcObject = null;
      }
      setStreaming(false);
      setDetections([]);
    } else {
      // Start camera
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          // Explicitly play the video
          await videoRef.current.play();
          setStreaming(true);
        }
      } catch (err) {
        console.error("Error accessing webcam:", err);
        alert("Failed to access camera. Please check permissions.");
      }
    }
  };

    useEffect(() => {
      const fetchProfile = async () => {
        try {
          const res = await axios.get("http://localhost:3001/user/profile", { withCredentials: true });
          setCurrentUser(res.data);
        } catch (e) {
          console.error("user not found: ",e)
        }
      };
      fetchProfile();
    }, []);

    console.log("currentUser", currentUser)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Frame capture interval when streaming
  useEffect(() => {
    if (!streaming) return;
    
    let interval;
    // Start interval after a small delay to ensure video is ready
    const startInterval = () => {
      const intervalMs = Math.max(250, Math.floor(1000 / Math.max(1, fps)));
      interval = setInterval(() => {
        captureAndSendFrame();
      }, intervalMs);
    };
    
    // Wait a bit for video to initialize, then start capturing
    const timeoutId = setTimeout(startInterval, 500);
    
    return () => {
      clearTimeout(timeoutId);
      if (interval) clearInterval(interval);
    };
  }, [streaming, fps]);

  const captureAndSendFrame = async () => {
    if(!currentUser){
      console.log("User not found")
      return 
    }

    console.log("currentUser found", currentUser)

    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || !streaming) return;
    // Only capture if video is ready and has dimensions
    if (video.readyState < 2 || video.videoWidth === 0 || video.videoHeight === 0) return;
    
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(async (blob) => {
      if (!blob || !streaming) return;
      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");

      try {
        const res = await axios.post(
          `http://localhost:8000/detect-frame/${currentUser._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        console.log("res.data.detections", res.data.detections)
        setDetections(res.data.detections || []);
      } catch (err) {
        console.error("Detection error:", err);
      }
    }, "image/jpeg");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-7xl px-4 py-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold">Live Feed</h1>
          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">FPS</label>
            <select
              className="border border-gray-300 rounded px-2 py-1 text-sm text-gray-500"
              value={fps}
              onChange={(e) => setFps(Number(e.target.value))}
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={4}>4</option>
              <option value={8}>8</option>
            </select>
            <label className="flex items-center gap-1 text-sm text-gray-600 ml-3">
              <input type="checkbox" checked={mirror} onChange={(e) => setMirror(e.target.checked)} /> Mirror
            </label>
            <button
              onClick={handleStartStop}
              className={`ml-3 px-3 py-1.5 rounded text-white text-sm ${streaming ? 'bg-red-600 hover:bg-red-500' : 'bg-green-600 hover:bg-green-500'}`}
            >
              {streaming ? 'Stop' : 'Start'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-xl shadow p-3">
            <div className="relative w-full rounded-lg overflow-hidden bg-black">
              <div className="w-full aspect-video flex items-center justify-center relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className={`w-full h-full object-contain ${mirror ? 'scale-x-[-1]' : ''} ${streaming ? 'block' : 'hidden'}`}
                />
                {!streaming && (
                  <div className="absolute inset-0 text-white text-center flex flex-col items-center justify-center">
                    <svg className="w-16 h-16 mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    <p className="text-lg opacity-75">Click Start to begin live feed</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-4">
            <h2 className="font-semibold mb-3 text-gray-500">Detections</h2>
            {Array.isArray(detections) && detections.length > 0 ? (
              <div className="space-y-2 max-h-[60vh] overflow-y-auto pr-1">
                {detections.map((d, i) => (
                  <div key={i} className="flex items-center justify-between border rounded-lg p-2">
                    <div className="flex items-center gap-2">
                      <span className="inline-block w-2 h-2 rounded-full bg-red-500" />
                      <div className="text-sm font-medium text-black">{d.class_name || d.className || 'object'}</div>
                    </div>
                    <div className="text-xs text-gray-600">{(d.confidence ?? d.conf ?? 0).toFixed(2)}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-sm text-gray-500">No detections yet.</div>
            )}
            <div className="mt-3 text-xs text-gray-500">Streaming {streaming ? 'on' : 'off'} at ~{fps} FPS</div>
          </div>
        </div>

        <canvas ref={canvasRef} style={{ display: 'none' }} />
      </div>
    </div>
  );
};

export default Streaming;
