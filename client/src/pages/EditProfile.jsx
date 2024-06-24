import { useState, useEffect } from "react";
import { useLoaderData, Form } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";

import "../components/Profile/ProfileEdit.css";

export default function EditProfile() {
  const user = useLoaderData();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    city: "",
    image: "",
  });

  useEffect(() => {
    if (user !== null) {
      setFormData({
        firstname: user.firstname || "",
        lastname: user.lastname || "",
        email: user.email || "",
        city: user.city || "",
        image: user.image || "",
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Form method="put" className="edit-form">
      <section className="image-edit-container">
        <div className="photoComponent">
          {user.image !== null ? (
            <img src={user.image} alt="user profile" className="profilePhoto" />
          ) : (
            <FaRegUserCircle className="noPhoto" />
          )}
        </div>

        <div className="img-input">
          <label className="edit-label">
            <p>Image URL:</p>
            <input
              className="edit-input container"
              type="text"
              name="image"
              value={formData.image}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="button" className="button">
          import
        </button>
      </section>
      <div className="edit-box">
        <label className="edit-label ">
          <p> First Name:</p>
          <input
            className="edit-input container"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </label>
        <label className="edit-label ">
          <p>Last Name:</p>
          <input
            className="edit-input container"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </label>
        <label className="edit-label ">
          <p>Email:</p>
          <input
            className="edit-input container"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label className="edit-label ">
          <p>City:</p>
          <input
            className="edit-input container"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit" className="button">
        save
      </button>
    </Form>
  );
}
