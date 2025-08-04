import React, { useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
  const [cardData, setCardData] = useState({
    Fname: "",
    Lname: "",
    email: "",
    phone: "",
    Cname: "",
    Cnumber: "",
    Cadd: "",
  });
  const [isCardAdded, setIsCardAdded] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const apiUrl = "http://192.168.0.103:4000";

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        const [first, last] = parsedUser.name?.split(" ") || ["", ""];
        setCardData((prev) => ({
          ...prev,
          Fname: first,
          Lname: last,
          email: parsedUser.email,
        }));

        // Fetch card data if already added
      fetch(`${apiUrl}/cards/email/${parsedUser.email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data && data.email) {
            setCardData({
              id: data.id,
              Fname: data.Fname,
              Lname: data.Lname,
              email: data.email,
              phone: data.phone,
              Cname: data.Cname,
              Cnumber: data.Cnumber,
              Cadd: data.Cadd,
            });
            setIsCardAdded(true);
            setIsEditing(false);
          }
        })
        .catch((err) => {
          console.error("No existing card:", err);
        });
      } catch (err) {
        console.error("Invalid JSON in localStorage:", err);
      }
    }
  }, []);

  const handleChange = (e) => {
    setCardData({ ...cardData, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/cards/add`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Card added successfully!");
        setIsCardAdded(true);
        setIsEditing(false);

        // Get the returned card ID from backend
        setCardData(prev => ({
          ...prev,
          id: result.id   // ⬅ Save this for update
        }));

      } else {
        alert(result.message || "Failed to add card info.");
      }
    } catch (err) {
      console.error("Error adding card:", err);
      alert("Something went wrong. Try again.");
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/cards/${cardData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(cardData),
      });

      const result = await response.json();
      if (response.ok) {
        alert("Card updated successfully!");
        setIsEditing(false);
      } else {
        alert(result.message || "Failed to update card info.");
      }
    } catch (err) {
      console.error("Error updating card:", err);
      alert("Something went wrong. Try again.");
    }
  };

  if (!user) return <p>No user data found. Please login again.</p>;

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ backgroundColor: "#f2f2f2" }}>
  <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
    <h2 className="text-center text-2xl font-bold text-gray-800 mb-6">Profile Form</h2>

    <form onSubmit={isCardAdded ? handleUpdate : handleAdd}>
      {/* First Name */}
      <label className="block font-semibold mb-1">First Name:</label>
      <input
        type="text"
        name="Fname"
        value={cardData.Fname}
        onChange={handleChange}
        readOnly
        className="w-full mb-4 px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
      />

      {/* Last Name */}
      <label className="block font-semibold mb-1">Last Name:</label>
      <input
        type="text"
        name="Lname"
        value={cardData.Lname}
        onChange={handleChange}
        readOnly
        className="w-full mb-4 px-3 py-2 rounded-lg border border-gray-300 bg-gray-100 cursor-not-allowed"
      />

      {/* Email */}
      <label className="block font-semibold mb-1">Email:</label>
      <input
        type="email"
        name="email"
        value={cardData.email}
        onChange={handleChange}
        readOnly={!isEditing}
        className={`w-full mb-4 px-3 py-2 rounded-lg border ${
          isEditing ? 'border-gray-300 bg-white' : 'border-gray-300 bg-gray-100 cursor-not-allowed'
        }`}
      />

      {/* Phone */}
      <label className="block font-semibold mb-1">Phone Number:</label>
      <input
        type="tel"
        name="phone"
        value={cardData.phone}
        onChange={handleChange}
        placeholder="e.g. +91 1234567890"
        readOnly={!isEditing}
        required
        className={`w-full mb-4 px-3 py-2 rounded-lg border ${
          isEditing ? 'border-gray-300 bg-white' : 'border-gray-300 bg-gray-100 cursor-not-allowed'
        }`}
      />

      {/* Company Name */}
      <label className="block font-semibold mb-1">Company Name:</label>
      <input
        type="text"
        name="Cname"
        value={cardData.Cname}
        onChange={handleChange}
        readOnly={!isEditing}
        required
        className={`w-full mb-4 px-3 py-2 rounded-lg border ${
          isEditing ? 'border-gray-300 bg-white' : 'border-gray-300 bg-gray-100 cursor-not-allowed'
        }`}
      />

      {/* Company Number */}
      <label className="block font-semibold mb-1">Company Phone:</label>
      <input
        type="tel"
        name="Cnumber"
        value={cardData.Cnumber}
        onChange={handleChange}
        readOnly={!isEditing}
        required
        className={`w-full mb-4 px-3 py-2 rounded-lg border ${
          isEditing ? 'border-gray-300 bg-white' : 'border-gray-300 bg-gray-100 cursor-not-allowed'
        }`}
      />

      {/* Company Address */}
      <label className="block font-semibold mb-1">Company Address:</label>
      <input
        type="text"
        name="Cadd"
        value={cardData.Cadd}
        onChange={handleChange}
        readOnly={!isEditing}
        required
        className={`w-full mb-6 px-3 py-2 rounded-lg border ${
          isEditing ? 'border-gray-300 bg-white' : 'border-gray-300 bg-gray-100 cursor-not-allowed'
        }`}
      />

      {/* Buttons */}
      <div className="flex justify-between gap-4">
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          {isCardAdded ? "Update Info" : "Add Info"}
        </button>

        {isCardAdded && !isEditing && (
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition"
          >
            Edit
          </button>
        )}
      </div>
    </form>
  </div>
</div>

  );
}

export default Profile;
