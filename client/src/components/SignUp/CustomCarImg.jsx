import { useState } from "react";
import PropTypes from "prop-types";
import "./CustomImgInput.css";

function CustomCarImg({ handleChange }) {
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
        id="carImage-button"
        name="carImage"
        onChange={handleFileChange}
        autoComplete="off"
        style={{ display: "none" }}
      />
      <label
        htmlFor="carImage-button"
        className="custom-file button"
        alt="upload car image"
      >
        <p>{selectedFile || "upload car photo"}</p>
      </label>
    </div>
  );
}

CustomCarImg.propTypes = {
  handleChange: PropTypes.func.isRequired,
};

export default CustomCarImg;
