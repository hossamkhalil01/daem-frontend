import "../styles/Carousel.css";
export default function Carousel({ images }) {
  return (
    <div
      id="carouselExampleControls"
      className="carousel slide"
      data-bs-ride="carousel"
      data-bs-interval="false"
    >
      <div className="carousel-images carousel-inner">
        {images.map((image, index) => (
          <div
            className={index === 0 ? " carousel-item active" : "carousel-item"}
            key={index}
          >
            <img
              className="carousel-img d-block w-100"
              src={"http://localhost:8000/public/images/" + image}
              alt="First slide"
            />
          </div>
        ))}
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}
