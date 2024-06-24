import { useState, useEffect } from "react";
import { useLoaderData, Form } from "react-router-dom";
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
      <div className="edit-box">
        <label className="edit-label ">
          First Name:
          <input
            className="edit-input container"
            type="text"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
          />
        </label>
        <label className="edit-label ">
          Last Name:
          <input
            className="edit-input container"
            type="text"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
          />
        </label>
        <label className="edit-label ">
          Email:
          <input
            className="edit-input container"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </label>
        <label className="edit-label ">
          City:
          <input
            className="edit-input container"
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
        </label>
        <label className="edit-label ">
          Image URL:
          <input
            className="edit-input container"
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
          />
        </label>
      </div>
      <button type="submit" className="button">
        <h3>save</h3>
      </button>
    </Form>
  );
}
