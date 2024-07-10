import { useState } from "react";
import { useNavigate } from "react-router-dom";
import notify from "../poptoastify/notify";
import handleContact from "../API/HandleContact";

const useContactForm = () => {
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
        } else if (value.length < minLength) {
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

  return {
    formValues,
    formErrors,
    handleChange,
    handleSubmit,
  };
};

export default useContactForm;
