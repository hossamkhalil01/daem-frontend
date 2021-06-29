import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
const AboutUsPage = () => {
  return (
    <>
      <Navbar />
      <section className="page-title bg-1">
        <div className="overlay"></div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="block text-center">
                <span className="text-white">About Us</span>
                <h1 className="text-capitalize mb-5 text-lg">About Us</h1>

                <ul className="list-inline breadcumb-nav">
                  <li className="list-inline-item">
                    <p className="text-white">Home</p>
                  </li>
                  <li className="list-inline-item">
                    <span className="text-white">/</span>
                  </li>
                  <li className="list-inline-item">
                    <p className="text-white-50">About Us</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section about-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-4">
              <h2 className="title-color">
                Consulting Platform for your COVID-19 question
              </h2>
            </div>
            <div className="col-lg-8">
              <p>
                A platform to connect volunteering doctors to Corona patients
                who need constant support. The idea is inspired by a facebook
                group where patients create posts with their condition and
                specialized doctors reply to them.
              </p>
              <img
                src="/assets/images/about/sign.png"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="fetaure-page ">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item mb-5 mb-lg-0">
                <img
                  src="/assets/images/about/about-2.jpg"
                  alt=""
                  className="img-fluid w-100"
                />
                <h4 className="mt-3">Medical Counseling</h4>
                <p>
                  You can create your free ticket at any time for ask about
                  medical question .
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item mb-5 mb-lg-0">
                <img
                  src="/assets/images/about/about-1.jpg"
                  alt=""
                  className="img-fluid w-100"
                />
                <h4 className="mt-3">Easy to Reach</h4>
                <p>
                  Support Available for 24/7 with qualified doctors to answer
                  you for all question .
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item mb-5 mb-lg-0">
                <img
                  src="/assets/images/about/about-3.jpg"
                  alt=""
                  className="img-fluid w-100"
                />
                <h4 className="mt-3">Helpful Articles</h4>
                <p>
                  Doctors creates a helpful article it contains a general steps
                  for COVID-19 protection and how to deal with it .
                </p>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="about-block-item">
                <img
                  src="/assets/images/about/about-4.jpg"
                  alt=""
                  className="img-fluid w-100"
                />
                <h4 className="mt-3">Qualified Doctors</h4>
                <p>
                  The platform supports covid-19 patient with a large scale of
                  qualified doctors to help them as much as they can .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default AboutUsPage;
