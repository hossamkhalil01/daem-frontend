import React from "react";
import Navbar from "../components/layouts/Navbar";
import Footer from "../components/layouts/Footer";
import UserProfile from "../components/UserProfile";
export default function ProfilePage() {
  return (
    <>
      <Navbar />
      <UserProfile />
      <Footer />
    </>
  );
}
