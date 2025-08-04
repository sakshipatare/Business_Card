import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, Search  } from 'lucide-react';
import axios from 'axios';
import './Home.css';

function Home() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedUser, setExpandedUser] = useState(null);
  const apiUrl = "http://192.168.0.103:4000";
  const nextId = useRef(1);

  useEffect(() => {
  const fetchInitialUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
      console.warn("No token found. Please log in.");
      return;
    }

      const res = await fetch(`${apiUrl}/homes`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (Array.isArray(data)) {
        const formatted = data.map((user, index) => {
        const [firstName = "", lastName = ""] = user.name?.split(" ") || [];

        return {
          id: index + 1,
          firstName,
          lastName,
          email: user.email,
          phone: user.phone,
          companyName: user.companyName || "",
          companyNumber: user.companyNumber || "",
          companyAddress: user.companyAddress || "",
        };
      });


        setUsers(formatted);
        nextId.current = formatted.length + 1;
      } else {
        console.error("Unexpected data format from /homes:", data);
      }
    } catch (err) {
      console.error("Error loading saved users:", err);
    }
  };

  fetchInitialUsers();
}, [apiUrl]);


  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get("email");

    if (email) {
      const alreadyExists = users.some(user => user.email === email);
      if (!alreadyExists) {
        fetch(`${apiUrl}/cards/email/${email}`)
          .then(res => res.json())
          .then(async (data) => {
            const newUser = {
              id: nextId.current++,
              firstName: data.Fname || "",
              lastName: data.Lname || "",
              email: data.email || "",
              phone: data.phone || "",
              companyName: data.Cname || "",
              companyNumber: data.Cnumber || "",
              companyAddress: data.Cadd || "",
              isPending: true,
            };


            setUsers(prev => [...prev, newUser]);

            const transformedData = {
              email: newUser.email,
              name: `${newUser.firstName} ${newUser.lastName}`,
              phone: newUser.phone,
              companyName: newUser.companyName,
              companyNumber: newUser.companyNumber,
              companyAddress: newUser.companyAddress,
            };


            const token = localStorage.getItem("token");

            try {
              await axios.post(`${apiUrl}/homes`, transformedData, {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              });
            } catch (err) {
              console.error("Failed to save scanned user:", err.response?.data || err.message);
            }
          })
          .catch(err => console.error("Error fetching scanned card data:", err));
      }
    }
  }, [apiUrl, users]);

  const filteredUsers = users.filter(user =>
    user.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAccept = async (email) => {
  const userToAccept = users.find(user => user.email === email);
  const token = localStorage.getItem("token");

  if (!userToAccept) return;

  try {
    const transformedData = {
      email: userToAccept.email,
      name: `${userToAccept.firstName} ${userToAccept.lastName}`,
      phone: userToAccept.phone,
      companyName: userToAccept.companyName,
      companyNumber: userToAccept.companyNumber,
      companyAddress: userToAccept.companyAddress,
    };

    await axios.post(`${apiUrl}/homes`, transformedData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    // Now mark as not pending
    setUsers(prev =>
      prev.map(user =>
        user.email === email ? { ...user, isPending: false } : user
      )
    );
  } catch (err) {
    console.error("Failed to accept and save user:", err.response?.data || err.message);
  }
};


    const handleReject = async (email) => {
      const token = localStorage.getItem("token");

      try {
        await axios.delete(`${apiUrl}/homes/email/${encodeURIComponent(email)}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.warn("Failed to remove from backend:", err.response?.data || err.message);
      }

      setUsers(prev => prev.filter(user => user.email !== email));
    };


  return (
    // <div className="home">

    //   <input
    //     type="text"
    //     placeholder="Search by name or email..."
    //     value={searchTerm}
    //     onChange={(e) => setSearchTerm(e.target.value)}
    //     style={{ padding: "8px", marginBottom: "20px", width: "300px" }}
    //   />

    //   <table>
    //     <thead>
    //       <tr>
    //         <th>ID</th><th>First Name</th><th>Last Name</th><th>Email</th>
    //         <th>Phone</th><th>Company Name</th><th>Company Number</th><th>Company Address</th><th>Action</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {filteredUsers.map(user => (
    //         <tr key={user.id}>
    //           <td>{user.id}</td>
    //           <td>{user.firstName}</td>
    //           <td>{user.lastName}</td>
    //           <td>{user.email}</td>
    //           <td>{user.phone}</td>
    //           <td>{user.companyName}</td>
    //           <td>{user.companyNumber}</td>
    //           <td>{user.companyAddress}</td>
    //           <td>
    //             {user.isPending ? (
    //               <>
    //                 <button onClick={() => handleAccept(user.email)}>Accept</button>
    //                 <button onClick={() => handleReject(user.email)}>Reject</button>
    //               </>
    //             ) : (
    //               "-"
    //             )}
    //           </td>
    //         </tr>
    //       ))}
    //     </tbody>
    //   </table>
    // </div>

    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-end mb-6">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <span className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-black">
            <Search className="w-4 h-4" />
          </span>
        </div>
      </div>


      {filteredUsers.map(user => (
        <div
          key={user.id}
          className="bg-white shadow-md rounded-lg p-4 mb-4 transition-all duration-300"
        >
          <div
            className="flex justify-between items-center cursor-pointer"
            onClick={() =>
              setExpandedUser(prev => (prev === user.email ? null : user.email))
            }
          >
            <div>
              <h3 className="font-bold text-gray-800 text-lg">
                {user.firstName} {user.lastName}
              </h3>
              <p className="text-sm text-gray-600">{user.companyName}</p>
            </div>
            {expandedUser === user.email ? (
              <ChevronUp className="text-gray-500" />
            ) : (
              <ChevronDown className="text-gray-500" />
            )}
          </div>

          {expandedUser === user.email && (
            <div className="mt-4 text-sm text-gray-700 space-y-1">
              <p><span className="font-semibold">Email:</span> {user.email}</p>
              <p><span className="font-semibold">Phone:</span> {user.phone}</p>
              <p><span className="font-semibold">Company Number:</span> {user.companyNumber}</p>
              <p><span className="font-semibold">Company Address:</span> {user.companyAddress}</p>
              <div className="flex gap-2 mt-2">
                {user.isPending ? (
                  <>
                    <button
                      onClick={() => handleAccept(user.email)}
                      className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                    >
                      Accept
                    </button>
                    <button
                      onClick={() => handleReject(user.email)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className="text-gray-400 italic">No action</span>
                )}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default Home;
