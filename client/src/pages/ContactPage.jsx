import { useState } from "react";
import "../components/Contact/Contact.css";

function ContactForm() {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    contactMessage: "",
  });

  const [formErrors, setFormErrors] = useState({
    firstname: "",
    lastname: "",
    email: "",
    subject: "",
    contactMessage: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
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
    const { firstname, lastname, email, subject, contactMessage } = formValues;
    const fields = [
      {
        name: "firstname",
        value: firstname,
        message: "firstname is required",
        minLength: 3,
        errorMessage: "firstname must be at least 3 characters long",
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
        name: "contactMessage",
        value: contactMessage,
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
        } else if (validate === true && validate(value) === false) {
          setError(name, errorMessage);
          allValid = false;
        } else if (value.length < minLength) {
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
    if (validateInputs() === true) {
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
          {formErrors.firstname !== "" && (
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
            required
          />
          {formErrors.lastname !== "" && (
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
          {formErrors.email !== "" && (
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
          {formErrors.subject !== "" && (
            <div className="error">{formErrors.subject}</div>
          )}
        </div>
        <div className="input-control">
          <textarea
            className="input-text container"
            id="contactMessage"
            name="contactMessage"
            placeholder="Your message (max 300 characters)*"
            value={formValues.contactMessage}
            onChange={handleChange}
          />
          {formErrors.contactMessage !== "" && (
            <div className="error">{formErrors.contactMessage}</div>
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
