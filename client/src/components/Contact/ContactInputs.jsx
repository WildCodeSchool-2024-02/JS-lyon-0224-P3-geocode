import PropTypes from "prop-types";

function ContactInputs({ formValues, formErrors, handleChange, handleSubmit }) {
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
          Send Message
        </button>
        {formErrors.form && <div className="error">{formErrors.form}</div>}
      </div>
    </form>
  );
}

ContactInputs.propTypes = {
  formValues: PropTypes.shape({
    firstname: PropTypes.string.isRequired,
    lastname: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    subject: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  formErrors: PropTypes.shape({
    firstname: PropTypes.string,
    lastname: PropTypes.string,
    email: PropTypes.string,
    subject: PropTypes.string,
    message: PropTypes.string,
    form: PropTypes.string,
  }).isRequired,
  handleChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default ContactInputs;
