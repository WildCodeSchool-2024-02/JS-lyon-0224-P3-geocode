import { useEffect } from "react";
import { useLoaderData, useNavigate, Form } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import axios from "axios";
import UseEditForm from "../hooks/UseEditForm";
import "../Styles/ProfileEdit.css";

const Api = import.meta.env.VITE_API_URL;

export default function EditProfile() {
  const navigate = useNavigate();
  const user = useLoaderData();

  // const [formData, setFormData] = useState({
  //   firstname: "",
  //   lastname: "",
  //   email: "",
  //   city: "",
  //   image: "",
  // });

  const { formData, setFormData, formErrors, handleChange, validateInputs } =
    UseEditForm({
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

  // const handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

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
      await axios.put(`${Api}/api/users/${params.id}`, editFormData, {
        withCredentials: true,
      });

      if (validateInputs() !== false) {
        navigate(`/profile`);
      }
    } catch (error) {
      console.error("Error in handleSubmit:", error);
    }
  };

  return (
    <Form method="put" className="edit-form" onSubmit={handleSubmit}>
      <section className="image-edit-container">
        <div className="photoComponent">
          {user.image !== "" ? (
            <img src={user.image} alt="user profile" className="profilePhoto" />
          ) : (
            <FaRegUserCircle className="noPhoto" />
          )}
        </div>

        <div className="img-input">
          <label>
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
        <button type="button" className="button edit_btn">
          Import
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
          {formErrors.firstname !== "" && (
            <div className="error">{formErrors.firstname}</div>
          )}
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
          {formErrors.lastname !== "" && (
            <div className="error">{formErrors.lastname}</div>
          )}
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
          {formErrors.email !== "" && (
            <div className="error">{formErrors.email}</div>
          )}
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
          {formErrors.city !== "" && (
            <div className="error">{formErrors.city}</div>
          )}
        </label>
      </div>
      <button type="submit" className="button">
        Save
      </button>
    </Form>
  );
}
