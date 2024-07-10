import { useState, useEffect } from "react";
import { useLoaderData, useNavigate, Form } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import "../components/Profile/ProfileEdit.css";

const Api = import.meta.env.VITE_API_URL;

export default function EditProfile() {
  const user = useLoaderData();
  const navigate = useNavigate();

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const params = { id: user.id };

    const editFormData = {
      firstname: formData.firstname,
      lastname: formData.lastname,
      email: formData.email,
      city: formData.city,
      image: formData.image,
    };

    try {
      const response = await fetch(`${Api}/api/users/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(editFormData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      navigate(`/profile/${params.id}`);
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <Form method="put" className="edit-form" onSubmit={handleSubmit}>
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
            <span className="label-title">Image URL:</span>
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
          <span className="label-title">First Name:</span>
          <input
            className="edit-input container"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </label>
        <label className="edit-label ">
          <span className="label-title">Last Name:</span>
          <input
            className="edit-input container"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </label>
        <label className="edit-label ">
          <span className="label-title">Email:</span>
          <input
            className="edit-input container"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label className="edit-label ">
          <span className="label-title">City:</span>
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
