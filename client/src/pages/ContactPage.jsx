import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import notify from "../poptoastify/notify";
import "../components/Contact/Contact.css";

function ContactPage({ handleContact }) {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    message: "",
    form: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const setError = (name, errorMsg) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: errorMsg,
    }));
  };

  const clearError = (name) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

  const validateInputs = () => {
    const { firstname, lastname, email, subject, message } = formValues;
    const validations = [
      {
        field: "firstname",
        value: firstname,
        requiredMsg: "Firstname is required",
        minLength: 3,
        minLengthMsg: "Firstname must be at least 3 characters long",
      },
      {
        field: "lastname",
        value: lastname,
        requiredMsg: "Lastname is required",
        minLength: 2,
        minLengthMsg: "Lastname must be at least 2 characters long",
      },
      {
        field: "email",
        value: email,
        requiredMsg: "Email is required",
        validate: isValidEmail,
        validateMsg: "Provide a valid email address",
      },
      {
        field: "subject",
        value: subject,
        requiredMsg: "Subject is required",
        minLength: 2,
        minLengthMsg: "Subject must be at least 2 characters long",
      },
      {
        field: "message",
        value: message,
        requiredMsg: "Message is required",
        minLength: 10,
        minLengthMsg: "Message must be at least 10 characters long",
      },
    ];
    let isValid = true;
    validations.forEach(
      ({
        field,
        value,
        requiredMsg,
        validate,
        validateMsg,
        minLength,
        minLengthMsg,
      }) => {
        if (value.trim() === "") {
          setError(field, requiredMsg);
          isValid = false;
        } else if (validate && !validate(value)) {
          setError(field, validateMsg);
          isValid = false;
        } else if (minLength && value.length < minLength) {
          setError(field, minLengthMsg);
          isValid = false;
        } else {
          clearError(field);
        }
      }
    );

    return isValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const contactData = {
      firstname: formValues.firstname,
      lastname: formValues.lastname,
      email: formValues.email,
      subject: formValues.subject,
      message: formValues.message,
    };

    if (validateInputs()) {
      try {
        const result = await handleContact(contactData);
        if (result.success) {
          notify("Message sent successfully!", "success");
          navigate("/");
        } else {
          setError("form", result.error);
        }
      } catch (error) {
        setError("form", "An unexpected error occurred.");
      }
    }
  };

  return (
    
      <form className="bodyform" id="form" onSubmit={handleSubmit}>
        <div className="inscription-component">
          <h1>Contact</h1>
          <div className="input-control">
            <input
              className="input container"
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Your firstname please"
              value={formValues.firstname}
              onChange={handleChange}
            />
            {formErrors.firstname && (
              <div className="error">{formErrors.firstname}</div>
            )}
          </div>
          <div className="input-control">
            <input
              className="input container"
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Your lastname please"
              value={formValues.lastname}
              onChange={handleChange}
            />
            {formErrors.lastname && (
              <div className="error">{formErrors.lastname}</div>
            )}
          </div>
          <div className="input-control">
            <input
              className="input container"
              type="email"
              id="email"
              name="email"
              placeholder="Your email address"
              value={formValues.email}
              onChange={handleChange}
            />
            {formErrors.email && (
              <div className="error">{formErrors.email}</div>
            )}
          </div>
          <div className="input-control">
            <input
              className="input container"
              type="text"
              id="subject"
              name="subject"
              placeholder="Your subject"
              value={formValues.subject}
              onChange={handleChange}
            />
            {formErrors.subject && (
              <div className="error">{formErrors.subject}</div>
            )}
          </div>
          <div className="input-control">
            <textarea
              className="input-text container"
              id="message"
              name="message"
              placeholder="Your message (max 300 characters)*"
              value={formValues.message}
              onChange={handleChange}
            />
            {formErrors.message && (
              <div className="error">{formErrors.message}</div>
            )}
          </div>
          <button
            className="button"
            id="signupbut"
            type="submit"
            onClick={notify}
          >
            Send Message
          </button>
          {formErrors.form && <div className="error">{formErrors.form}</div>}
        </div>
      </form>
    
  );
}

ContactPage.propTypes = {
  handleContact: PropTypes.func.isRequired,
};

export default ContactPage;
