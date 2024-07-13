import "../Styles/AboutUs.css";

function AboutusPage() {
  return (
    <div className="aboutUs">
      <div className="aboutUsContent">
        <h1>About GeoCode</h1>
        <p>
          Welcome to GeoCode! We are dedicated to making electric vehicle travel
          easier and more convenient through our interactive mapping
          application. Our goal is to provide users with up-to-date information
          on charging stations, routes, and points of interest, ensuring a
          seamless and enjoyable journey.
        </p>
        <h2>Our Mission</h2>
        <p>
          At GeoCode, our mission is to revolutionize the electric vehicle
          experience by offering a comprehensive, user-friendly map that helps
          drivers find the best charging stations. We aim to support the
          transition to sustainable transportation by making electric vehicle
          travel more accessible and efficient.
        </p>
        <h2>Our Team</h2>
        <p>
          Our team is composed of passionate professionals with expertise in web
          development, geographic information systems, and sustainable
          transportation. We are committed to delivering a high-quality
          application that meets the needs of our users and contributes to a
          greener future.
        </p>
        <h2>Contact Us</h2>
        <p>
          Have questions or feedback? We’d love to hear from you! Reach out to
          us at <a href="/Contact">contact@geocode.com</a>.
        </p>
      </div>
    </div>
  );
}
export default AboutusPage;
