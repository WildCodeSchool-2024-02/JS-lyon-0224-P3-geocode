import { useState } from "react";
import "../components/Contact/Contact.css";

function ContactForm() {
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
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const setError = (name, message) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: message,
    }));
  };

  const setSuccess = (name) => {
    setFormErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const isValidEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.toLowerCase());

  const validateInputs = () => {
    const { firstname, lastname, email, subject, messageText } = formValues;
    const fields = [
      {
        name: "firstname",
        value: firstname,
        message: "Firstname is required",
        minLength: 3,
        errorMessage: "Firstname must be at least 3 characters long",
      },
      {
        name: "lastname",
        value: lastname,
        message: "Lastname is required",
        minLength: 2,
        errorMessage: "Lastname must be at least 2 characters long",
      },
      {
        name: "email",
        value: email,
        message: "Email is required",
        validate: isValidEmail,
        errorMessage: "Provide a valid email address",
      },
      {
        name: "subject",
        value: subject,
        message: "Subject is required",
        minLength: 2,
        errorMessage: "Subject must be at least 2 characters long",
      },
      {
        name: "message",
        value: messageText,
        message: "Message is required",
        minLength: 10,
        errorMessage: "Message must be at least 10 characters long",
      },
    ];

    let allValid = true;
    fields.forEach(
      ({ name, value, message, validate, errorMessage, minLength }) => {
        if (value.trim() === "") {
          setError(name, message);
          allValid = false;
        } else if (validate && !validate(value)) {
          setError(name, errorMessage);
          allValid = false;
        } else if (minLength && value.length < minLength) {
          setError(name, errorMessage);
          allValid = false;
        } else {
          setSuccess(name);
        }
      }
    );
    return allValid;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      window.location.href = "/";
      alert("Message Sent.");
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
          {formErrors.email && <div className="error">{formErrors.email}</div>}
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
        <button className="button" id="signupbut" type="submit">
          <h3>Send Message</h3>
        </button>
      </div>
    </form>
  );
}
export default ContactForm;
