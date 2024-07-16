import { useEffect, useState } from "react";
import loadAdminData from "../../API/HandleAdmin";
import "../../Styles/AdminUser.css";

function UserTable() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadAdminData();
        setUserData(data);
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="container">
      <h1 className="title">User Table</h1>
      <table>
        <thead>
          <tr>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>City</th>
            <th>Email</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Socket</th>
          </tr>
        </thead>
        <tbody>
          {userData.map(
            ({
              id,
              firstname,
              lastname,
              city,
              email,
              brand,
              model,
              socket,
            }) => (
              <tr key={id}>
                <td>{firstname}</td>
                <td>{lastname}</td>
                <td>{city}</td>
                <td>{email}</td>
                <td>{brand}</td>
                <td>{model}</td>
                <td>{socket}</td>
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
