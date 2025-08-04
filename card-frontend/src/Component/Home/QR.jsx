import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";

const QR = () => {
  const [user, setUser] = useState(null);
  const apiUrl = "http://192.168.0.103:4000";

  useEffect(() => {
    const stored = localStorage.getItem("userData");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  if (!user) return <p>Loading QR...</p>;

  const frontendUrl = "http://192.168.0.103:3000";
  const encodedEmail = encodeURIComponent(user.email);
  const profileLink = `${frontendUrl}/home?email=${encodedEmail}`;

  // 🔽 Store scanned user's ID in the backend
  const handleQRScan = async (scannedUserId) => {
    try {
      const token = localStorage.getItem("token");
      console.log(token);

      const response = await fetch(`${apiUrl}/homes/scan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({ scannedUserId }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("✅ Scanned user stored:", data);
      } else {
        console.warn("⚠️ Scan failed:", data.message || data.error);
      }
    } catch (error) {
      console.error("❌ Error scanning user:", error);
    }
  };

  // 🔽 This function should be called after a successful QR scan
  const onScanSuccess = (scannedData) => {
    // scannedData could be an email, ID, or URL depending on your QR format
    // Extract ID from email if needed — adjust based on what you encode in the QR
    const scannedUserId = scannedData; 
    handleQRScan(scannedUserId);
  };

  return (
    <div className="flex flex-col items-center justify-center mt-16 text-center px-4">
  <h2 className="text-3xl font-bold mb-4 text-gray-800">Share Your Digital Card</h2>

  <div className="bg-white p-6 rounded-lg shadow-md">
    <QRCode size={300} value={profileLink} />
  </div>

  <p className="text-gray-600 mt-4">Scan this QR to connect with me!</p>

  {/* 🔽 Simulate scan for testing */}
  <button
    onClick={() => onScanSuccess(user._id)}
    className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 transform hover:scale-105"
  >
    Simulate My QR Scan
  </button>
</div>

  );
};

export default QR;
