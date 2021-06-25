import React from "react";
const LandingPage = (props) => {
  return (
    <div>
      <header>
        <div className="header-top-bar">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <ul className="top-bar-info list-inline-item pl-0 mb-0">
                  <li className="list-inline-item">
                    <a href="mailto:support@gmail.com">
                      <i className="icofont-support-faq mr-2"></i>
                      support@novena.com
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <i className="icofont-location-pin mr-2"></i>Address
                    Ta-134/A, New York, USA{" "}
                  </li>
                </ul>
              </div>
              <div className="col-lg-6">
                <div className="text-lg-right top-right-bar mt-2 mt-lg-0">
                  <a href="tel:+23-345-67890">
                    <span>Call Now : </span>
                    <span className="h4">823-4565-13456</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <nav className="navbar navbar-expand-lg navigation" id="navbar">
          <div className="container">
            <a className="navbar-brand" href="index.html">
              <img src="images/logo.png" alt="" className="img-fluid" />
            </a>

            <button
              className="navbar-toggler collapsed"
              type="button"
              data-toggle="collapse"
              data-target="#navbarmain"
              aria-controls="navbarmain"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="icofont-navigation-menu"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarmain">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item active">
                  <a className="nav-link" href="index.html">
                    Home
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="about.html">
                    About
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="service.html">
                    Services
                  </a>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="department.html"
                    id="dropdown02"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Department <i className="icofont-thin-down"></i>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dropdown02">
                    <li>
                      <a className="dropdown-item" href="department.html">
                        Departments
                      </a>
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="department-single.html"
                      >
                        Department Single
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="doctor.html"
                    id="dropdown03"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Doctors <i className="icofont-thin-down"></i>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dropdown03">
                    <li>
                      <a className="dropdown-item" href="doctor.html">
                        Doctors
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="doctor-single.html">
                        Doctor Single
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="appoinment.html">
                        Appoinment
                      </a>
                    </li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="blog-sidebar.html"
                    id="dropdown05"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    Blog <i className="icofont-thin-down"></i>
                  </a>
                  <ul className="dropdown-menu" aria-labelledby="dropdown05">
                    <li>
                      <a className="dropdown-item" href="blog-sidebar.html">
                        Blog with Sidebar
                      </a>
                    </li>

                    <li>
                      <a className="dropdown-item" href="blog-single.html">
                        Blog Single
                      </a>
                    </li>
                  </ul>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="contact.html">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </header>

      {/* <!-- Slider Start --> */}
      <section className="banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-xl-7">
              <div className="block">
                <div className="divider mb-3"></div>
                <span className="text-uppercase text-sm letter-spacing ">
                  Total Health care solution
                </span>
                <h1 className="mb-3 mt-3">Your most trusted health partner</h1>

                <p className="mb-4 pr-5">
                  A repudiandae ipsam labore ipsa voluptatum quidem quae
                  laudantium quisquam aperiam maiores sunt fugit, deserunt rem
                  suscipit placeat.
                </p>
                <div className="btn-container ">
                  <a
                    href="appoinment.html"
                    target="_blank"
                    className="btn btn-main-2 btn-icon btn-round-full"
                  >
                    Make appoinment{" "}
                    <i className="icofont-simple-right ml-2  "></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="features">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="feature-block d-lg-flex">
                <div className="feature-item mb-5 mb-lg-0">
                  <div className="feature-icon mb-4">
                    <i className="icofont-surgeon-alt"></i>
                  </div>
                  <span>24 Hours Service</span>
                  <h4 className="mb-3">Online Appoinment</h4>
                  <p className="mb-4">
                    Get ALl time support for emergency.We have introduced the
                    principle of family medicine.
                  </p>
                  <a
                    href="appoinment.html"
                    className="btn btn-main btn-round-full"
                  >
                    Make a appoinment
                  </a>
                </div>

                <div className="feature-item mb-5 mb-lg-0">
                  <div className="feature-icon mb-4">
                    <i className="icofont-ui-clock"></i>
                  </div>
                  <span>Timing schedule</span>
                  <h4 className="mb-3">Working Hours</h4>
                  <ul className="w-hours list-unstyled">
                    <li className="d-flex justify-content-between">
                      Sun - Wed : <span>8:00 - 17:00</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      Thu - Fri : <span>9:00 - 17:00</span>
                    </li>
                    <li className="d-flex justify-content-between">
                      Sat - sun : <span>10:00 - 17:00</span>
                    </li>
                  </ul>
                </div>

                <div className="feature-item mb-5 mb-lg-0">
                  <div className="feature-icon mb-4">
                    <i className="icofont-support"></i>
                  </div>
                  <span>Emegency Cases</span>
                  <h4 className="mb-3">1-800-700-6200</h4>
                  <p>
                    Get ALl time support for emergency.We have introduced the
                    principle of family medicine.Get Conneted with us for any
                    urgency .
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section about">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 col-sm-6">
              <div className="about-img">
                <img
                  src="images/about/img-1.jpg"
                  alt=""
                  className="img-fluid"
                />
                <img
                  src="images/about/img-2.jpg"
                  alt=""
                  className="img-fluid mt-4"
                />
              </div>
            </div>
            <div className="col-lg-4 col-sm-6">
              <div className="about-img mt-4 mt-lg-0">
                <img
                  src="images/about/img-3.jpg"
                  alt=""
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-lg-4">
              <div className="about-content pl-4 mt-4 mt-lg-0">
                <h2 className="title-color">
                  Personal care <br />& healthy living
                </h2>
                <p className="mt-4 mb-5">
                  We provide best leading medicle service Nulla perferendis
                  veniam deleniti ipsum officia dolores repellat laudantium
                  obcaecati neque.
                </p>

                <a
                  href="service.html"
                  className="btn btn-main-2 btn-round-full btn-icon"
                >
                  Services<i className="icofont-simple-right ml-3"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="cta-section ">
        <div className="container">
          <div className="cta position-relative">
            <div className="row">
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="counter-stat">
                  <i className="icofont-doctor"></i>
                  <span className="h3">58</span>k<p>Happy People</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="counter-stat">
                  <i className="icofont-flag"></i>
                  <span className="h3">700</span>+<p>Surgery Comepleted</p>
                </div>
              </div>

              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="counter-stat">
                  <i className="icofont-badge"></i>
                  <span className="h3">40</span>+<p>Expert Doctors</p>
                </div>
              </div>
              <div className="col-lg-3 col-md-6 col-sm-6">
                <div className="counter-stat">
                  <i className="icofont-globe"></i>
                  <span className="h3">20</span>
                  <p>Worldwide Branch</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section service gray-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7 text-center">
              <div className="section-title">
                <h2>Award winning patient care</h2>
                <div className="divider mx-auto my-4"></div>
                <p>
                  Lets know moreel necessitatibus dolor asperiores illum
                  possimus sint voluptates incidunt molestias nostrum
                  laudantium. Maiores porro cumque quaerat.
                </p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-item mb-4">
                <div className="icon d-flex align-items-center">
                  <i className="icofont-laboratory text-lg"></i>
                  <h4 className="mt-3 mb-3">Laboratory services</h4>
                </div>

                <div className="content">
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-item mb-4">
                <div className="icon d-flex align-items-center">
                  <i className="icofont-heart-beat-alt text-lg"></i>
                  <h4 className="mt-3 mb-3">Heart Disease</h4>
                </div>
                <div className="content">
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-item mb-4">
                <div className="icon d-flex align-items-center">
                  <i className="icofont-tooth text-lg"></i>
                  <h4 className="mt-3 mb-3">Dental Care</h4>
                </div>
                <div className="content">
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-item mb-4">
                <div className="icon d-flex align-items-center">
                  <i className="icofont-crutch text-lg"></i>
                  <h4 className="mt-3 mb-3">Body Surgery</h4>
                </div>

                <div className="content">
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-item mb-4">
                <div className="icon d-flex align-items-center">
                  <i className="icofont-brain-alt text-lg"></i>
                  <h4 className="mt-3 mb-3">Neurology Sargery</h4>
                </div>
                <div className="content">
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 col-md-6 col-sm-6">
              <div className="service-item mb-4">
                <div className="icon d-flex align-items-center">
                  <i className="icofont-dna-alt-1 text-lg"></i>
                  <h4 className="mt-3 mb-3">Gynecology</h4>
                </div>
                <div className="content">
                  <p className="mb-4">
                    Saepe nulla praesentium eaque omnis perferendis a
                    doloremque.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section appoinment">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 ">
              <div className="appoinment-content">
                <img
                  src="images/about/img-3.jpg"
                  alt=""
                  className="img-fluid"
                />
                <div className="emergency">
                  <h2 className="text-lg">
                    <i className="icofont-phone-circle text-lg"></i>+23 345
                    67980
                  </h2>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-10 ">
              <div className="appoinment-wrap mt-5 mt-lg-0">
                <h2 className="mb-2 title-color">Book appoinment</h2>
                <p className="mb-4">
                  Mollitia dicta commodi est recusandae iste, natus eum
                  asperiores corrupti qui velit . Iste dolorum atque similique
                  praesentium soluta.
                </p>
                <form
                  id="#"
                  className="appoinment-form"
                  method="post"
                  action="#"
                >
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          id="exampleFormControlSelect1"
                        >
                          <option>Choose Department</option>
                          <option>Software Design</option>
                          <option>Development cycle</option>
                          <option>Software Development</option>
                          <option>Maintenance</option>
                          <option>Process Query</option>
                          <option>Cost and Duration</option>
                          <option>Modal Delivery</option>
                        </select>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <select
                          className="form-control"
                          id="exampleFormControlSelect2"
                        >
                          <option>Select Doctors</option>
                          <option>Software Design</option>
                          <option>Development cycle</option>
                          <option>Software Development</option>
                          <option>Maintenance</option>
                          <option>Process Query</option>
                          <option>Cost and Duration</option>
                          <option>Modal Delivery</option>
                        </select>
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          name="date"
                          id="date"
                          type="text"
                          className="form-control"
                          placeholder="dd/mm/yyyy"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          name="time"
                          id="time"
                          type="text"
                          className="form-control"
                          placeholder="Time"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          name="name"
                          id="name"
                          type="text"
                          className="form-control"
                          placeholder="Full Name"
                        />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          name="phone"
                          id="phone"
                          type="Number"
                          className="form-control"
                          placeholder="Phone Number"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="form-group-2 mb-4">
                    <textarea
                      name="message"
                      id="message"
                      className="form-control"
                      rows="6"
                      placeholder="Your Message"
                    ></textarea>
                  </div>

                  <a
                    className="btn btn-main btn-round-full"
                    href="appoinment.html"
                  >
                    Make Appoinment{" "}
                    <i className="icofont-simple-right ml-2  "></i>
                  </a>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section testimonial-2 gray-bg">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="section-title text-center">
                <h2>We served over 5000+ Patients</h2>
                <div className="divider mx-auto my-4"></div>
                <p>
                  Lets know moreel necessitatibus dolor asperiores illum
                  possimus sint voluptates incidunt molestias nostrum
                  laudantium. Maiores porro cumque quaerat.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-12 testimonial-wrap-2">
              <div className="testimonial-block style-2  gray-bg">
                <i className="icofont-quote-right"></i>

                <div className="testimonial-thumb">
                  <img
                    src="images/team/test-thumb1.jpg"
                    alt=""
                    className="img-fluid"
                  />
                </div>

                <div className="client-info ">
                  <h4>Amazing service!</h4>
                  <span>John Partho</span>
                  <p>
                    They provide great service facilty consectetur adipisicing
                    elit. Itaque rem, praesentium, iure, ipsum magnam deleniti a
                    vel eos adipisci suscipit fugit placeat.
                  </p>
                </div>
              </div>

              <div className="testimonial-block style-2  gray-bg">
                <div className="testimonial-thumb">
                  <img
                    src="images/team/test-thumb2.jpg"
                    alt=""
                    className="img-fluid"
                  />
                </div>

                <div className="client-info">
                  <h4>Expert doctors!</h4>
                  <span>Mullar Sarth</span>
                  <p>
                    They provide great service facilty consectetur adipisicing
                    elit. Itaque rem, praesentium, iure, ipsum magnam deleniti a
                    vel eos adipisci suscipit fugit placeat.
                  </p>
                </div>

                <i className="icofont-quote-right"></i>
              </div>

              <div className="testimonial-block style-2  gray-bg">
                <div className="testimonial-thumb">
                  <img
                    src="images/team/test-thumb3.jpg"
                    alt=""
                    className="img-fluid"
                  />
                </div>

                <div className="client-info">
                  <h4>Good Support!</h4>
                  <span>Kolis Mullar</span>
                  <p>
                    They provide great service facilty consectetur adipisicing
                    elit. Itaque rem, praesentium, iure, ipsum magnam deleniti a
                    vel eos adipisci suscipit fugit placeat.
                  </p>
                </div>

                <i className="icofont-quote-right"></i>
              </div>

              <div className="testimonial-block style-2  gray-bg">
                <div className="testimonial-thumb">
                  <img
                    src="images/team/test-thumb4.jpg"
                    alt=""
                    className="img-fluid"
                  />
                </div>

                <div className="client-info">
                  <h4>Nice Environment!</h4>
                  <span>Partho Sarothi</span>
                  <p className="mt-4">
                    They provide great service facilty consectetur adipisicing
                    elit. Itaque rem, praesentium, iure, ipsum magnam deleniti a
                    vel eos adipisci suscipit fugit placeat.
                  </p>
                </div>
                <i className="icofont-quote-right"></i>
              </div>

              <div className="testimonial-block style-2  gray-bg">
                <div className="testimonial-thumb">
                  <img
                    src="images/team/test-thumb1.jpg"
                    alt=""
                    className="img-fluid"
                  />
                </div>

                <div className="client-info">
                  <h4>Modern Service!</h4>
                  <span>Kolis Mullar</span>
                  <p>
                    They provide great service facilty consectetur adipisicing
                    elit. Itaque rem, praesentium, iure, ipsum magnam deleniti a
                    vel eos adipisci suscipit fugit placeat.
                  </p>
                </div>
                <i className="icofont-quote-right"></i>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="section clients">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-7">
              <div className="section-title text-center">
                <h2>Partners who support us</h2>
                <div className="divider mx-auto my-4"></div>
                <p>
                  Lets know moreel necessitatibus dolor asperiores illum
                  possimus sint voluptates incidunt molestias nostrum
                  laudantium. Maiores porro cumque quaerat.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row clients-logo">
            <div className="col-lg-2">
              <div className="client-thumb">
                <img src="images/about/1.png" alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="client-thumb">
                <img src="images/about/2.png" alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="client-thumb">
                <img src="images/about/3.png" alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="client-thumb">
                <img src="images/about/4.png" alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="client-thumb">
                <img src="images/about/5.png" alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="client-thumb">
                <img src="images/about/6.png" alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="client-thumb">
                <img src="images/about/3.png" alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="client-thumb">
                <img src="images/about/4.png" alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="client-thumb">
                <img src="images/about/5.png" alt="" className="img-fluid" />
              </div>
            </div>
            <div className="col-lg-2">
              <div className="client-thumb">
                <img src="images/about/6.png" alt="" className="img-fluid" />
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <!-- footer Start --> */}
      <footer className="footer section gray-bg">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 mr-auto col-sm-6">
              <div className="widget mb-5 mb-lg-0">
                <div className="logo mb-4">
                  <img src="images/logo.png" alt="" className="img-fluid" />
                </div>
                <p>
                  Tempora dolorem voluptatum nam vero assumenda voluptate,
                  facilis ad eos obcaecati tenetur veritatis eveniet distinctio
                  possimus.
                </p>

                <ul className="list-inline footer-socials mt-4">
                  <li className="list-inline-item">
                    <a href="https://www.facebook.com/themefisher">
                      <i className="icofont-facebook"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://twitter.com/themefisher">
                      <i className="icofont-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="https://www.pinterest.com/themefisher/">
                      <i className="icofont-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="widget mb-5 mb-lg-0">
                <h4 className="text-capitalize mb-3">Department</h4>
                <div className="divider mb-4"></div>

                <ul className="list-unstyled footer-menu lh-35">
                  <li>
                    <a href="#">Surgery </a>
                  </li>
                  <li>
                    <a href="#">Wome's Health</a>
                  </li>
                  <li>
                    <a href="#">Radiology</a>
                  </li>
                  <li>
                    <a href="#">Cardioc</a>
                  </li>
                  <li>
                    <a href="#">Medicine</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="widget mb-5 mb-lg-0">
                <h4 className="text-capitalize mb-3">Support</h4>
                <div className="divider mb-4"></div>

                <ul className="list-unstyled footer-menu lh-35">
                  <li>
                    <a href="#">Terms & Conditions</a>
                  </li>
                  <li>
                    <a href="#">Privacy Policy</a>
                  </li>
                  <li>
                    <a href="#">Company Support </a>
                  </li>
                  <li>
                    <a href="#">FAQuestions</a>
                  </li>
                  <li>
                    <a href="#">Company Licence</a>
                  </li>
                </ul>
              </div>
            </div>

            <div className="col-lg-3 col-md-6 col-sm-6">
              <div className="widget widget-contact mb-5 mb-lg-0">
                <h4 className="text-capitalize mb-3">Get in Touch</h4>
                <div className="divider mb-4"></div>

                <div className="footer-contact-block mb-4">
                  <div className="icon d-flex align-items-center">
                    <i className="icofont-email mr-3"></i>
                    <span className="h6 mb-0">Support Available for 24/7</span>
                  </div>
                  <h4 className="mt-2">
                    <a href="tel:+23-345-67890">Support@email.com</a>
                  </h4>
                </div>

                <div className="footer-contact-block">
                  <div className="icon d-flex align-items-center">
                    <i className="icofont-support mr-3"></i>
                    <span className="h6 mb-0">Mon to Fri : 08:30 - 18:00</span>
                  </div>
                  <h4 className="mt-2">
                    <a href="tel:+23-345-67890">+23-456-6588</a>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="footer-btm py-4 mt-5">
            <div className="row align-items-center justify-content-between">
              <div className="col-lg-6">
                <div className="copyright">
                  &copy; Copyright Reserved to{" "}
                  <span className="text-color">Novena</span> by{" "}
                  <a href="https://themefisher.com/" target="_blank">
                    Themefisher
                  </a>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="subscribe-form text-lg-right mt-5 mt-lg-0">
                  <form action="#" className="subscribe">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Email address"
                    />
                    <a href="#" className="btn btn-main-2 btn-round-full">
                      Subscribe
                    </a>
                  </form>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-lg-4">
                <a className="backtop js-scroll-trigger" href="#top">
                  <i className="icofont-long-arrow-up"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
