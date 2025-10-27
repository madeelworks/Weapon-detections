import React, { useRef, useEffect, useState } from "react";
import axios from "axios";

const Streaming = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [detections, setDetections] = useState([]);
  const [streaming, setStreaming] = useState(false);

  useEffect(() => {
    // Request webcam access
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
        setStreaming(true);
      })
      .catch((err) => {
        console.error("Error accessing webcam:", err);
      });
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  useEffect(() => {
    let interval;
    if (streaming) {
      interval = setInterval(captureAndSendFrame, 1000); // 1 frame per second
    }
    return () => clearInterval(interval);
  }, [streaming]);

  const captureAndSendFrame = async () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    canvas.toBlob(async (blob) => {
      if (!blob) return;
      const formData = new FormData();
      formData.append("file", blob, "frame.jpg");
      try {
        const res = await axios.post(
          "http://localhost:8000/detect-frame",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        setDetections(res.data.detections);
      } catch (err) {
        console.error("Detection error:", err);
      }
    }, "image/jpeg");
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Real-Time Weapon Detection</h1>

      {/* Video Stream positioned at the top */}
      <div className="flex justify-center mb-4">
        <video
          ref={videoRef}
          autoPlay
          playsInline
          className="rounded shadow"
          style={{ width: 700, height: 500 }}
        />
      </div>

      <canvas ref={canvasRef} style={{ display: "none" }} />

      {/* Detections container with scrolling */}
      <div className="w-full max-w-xl bg-white rounded shadow p-4 mt-4">
        <h2 className="font-semibold mb-2">Detections:</h2>
        <div
          style={{
            maxHeight: 300, // Increase height to trigger scrolling if necessary
            overflowY: "auto", // Enable vertical scroll
          }}
          className="text-xs bg-gray-200 rounded p-2"
        >
          <pre style={{ whiteSpace: "pre-wrap", wordWrap: "break-word" }}>
            {JSON.stringify(detections, null, 2)}
          </pre>
        </div>
      </div>
    </div>
  );
};

export default Streaming;
