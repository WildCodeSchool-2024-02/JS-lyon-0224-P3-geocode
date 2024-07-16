import useFormContact from "../hooks/UseContactForm";
import ContactInputs from "../components/Contact/ContactInputs";
import "../Styles/Contact.css";

function ContactPage() {
  const { formValues, formErrors, handleChange, handleSubmit } =
    useFormContact();

  return (
    <ContactInputs
      formValues={formValues}
      formErrors={formErrors}
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
}

export default ContactPage;
