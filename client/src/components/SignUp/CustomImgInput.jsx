import { useState } from "react";
import PropTypes from "prop-types";
import "./CustomImgInput.css";

function CustomImgInput({ handleChange }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file.name);
      handleChange(event);
    }
  };

  return (
    <div className="custom-file-input">
      <input
        type="file"
        id="profileImage-button"
        name="profileImage"
        onChange={handleFileChange}
        autoComplete="off"
        style={{ display: "none" }}
      />
      <label
        htmlFor="profileImage-button"
        className="custom-file button"
        alt="upload profile image"
      >
        <p>{selectedFile || "upload profile photo"}</p>
      </label>
    </div>
  );
}

CustomImgInput.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default CustomImgInput;
