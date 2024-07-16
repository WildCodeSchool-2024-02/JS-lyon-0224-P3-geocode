import propTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "swiper/css";
import "swiper/css/pagination";

import "../../Styles/UserCars.css";

import porsche from "../../assets/image/porsche.jpeg";

export default function UserCars({ cars }) {
  const navigate = useNavigate(); // Initialize useNavigate

  if (cars === null || cars.length === 0) {
    return <div className="no-cars container">No cars found.</div>;
  }

  const handleEdit = (carId) => {
    navigate(`/editCar/${carId}`);
  };

  return (
    <div className="userCars">
      <div className="carInfo">
        <ul>
          <Swiper
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
                  <button
                    type="button"
                    className="button"
                    onClick={() => handleEdit(car.id)}
                  >
                    Edit
                  </button>
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
};
