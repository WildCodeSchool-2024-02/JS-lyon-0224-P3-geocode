import propTypes from "prop-types";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import "./UserCars.css";

import porsche from "../../assets/image/porsche.jpeg";

export default function UserCars({ cars }) {
  if (cars === null || cars.length === 0) {
    return <div className="no-cars container">No cars found.</div>;
  }

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
