import propTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import "swiper/css";
import "swiper/css/pagination";

import "../../Styles/UserCars.css";
import porsche from "../../assets/image/porsche.jpeg";

import AddCarPopUp from "./addCarPopUp";

export default function UserCars({ cars, onAddCar }) {
  const [showAddCarPopUp, setShowAddCarPopUp] = useState(false);
  const swiperRef = useRef(null); // Reference to the Swiper instance, allows direct access to its methods

  const handleAddCarClick = () => {
    setShowAddCarPopUp(true);
    if (swiperRef.current) {
      swiperRef.current.swiper.disable(); // Disable Swiper interaction
    }
  };

  const handleClosePopUp = () => {
    setShowAddCarPopUp(false);
    // Enable Swiper
    if (swiperRef.current) {
      swiperRef.current.swiper.enable(); // Re-enable Swiper interaction
    }
  };

  const navigate = useNavigate();

  if (cars === null || cars.length === 0) {
    return <div className="no-cars container">No cars found.</div>;
  } // If no cars are found, display a message

  const handleEdit = (carId) => {
    navigate(`/editCar/${carId}`);
  };

  return (
    <div className="userCars">
      <div className="carInfo">
        <ul>
          <Swiper
            ref={swiperRef} // Reference to the Swiper instance
            spaceBetween={50}
            slidesPerView={1}
            pagination={{
              clickable: true,
            }}
            modules={[Pagination]}
            className="pagination"
          >
            {cars.map((car) => (
              <SwiperSlide key={car.id}>
                <div className="car-slide">
                  <h3>
                    <span>{car.brand}</span> {car.model}
                  </h3>
                  <img src={porsche} alt="porsche" className="img" />
                  <p>
                    <span>Socket:</span> {car.socket}
                  </p>
                  <div className="btn-component">
                    <button
                      type="button"
                      onClick={handleAddCarClick}
                      className="button"
                    >
                      Add Car
                    </button>
                    {showAddCarPopUp && (
                      <AddCarPopUp
                        onClose={handleClosePopUp}
                        onSubmit={(newCar) => {
                          onAddCar(newCar);
                          handleClosePopUp();
                        }}
                      />
                    )}
                    <button
                      type="button"
                      className="deletebtn"
                      onClick={() => handleEdit(car.id)}
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </ul>
      </div>
    </div>
  );
}

UserCars.propTypes = {
  cars: propTypes.arrayOf(
    propTypes.shape({
      id: propTypes.number.isRequired,
      brand: propTypes.string.isRequired,
      model: propTypes.string.isRequired,
      socket: propTypes.string.isRequired,
    })
  ).isRequired,
  onAddCar: propTypes.func.isRequired,
};
