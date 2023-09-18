import React from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleEnrollClick = () => {
    navigate("/chatbot");
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#c7ffcd" }}
    >
      <div className="card" style={{ width: "400px" }}>
        <div className="card-body">
          <div style={{ backgroundColor: "#007B5E", padding: "20px" }}>
            <h1 className="card-title text-center text-white">
              Enter into Student Info System
            </h1>
            <button
              className="btn btn-primary btn-block"
              onClick={handleEnrollClick}
            >
              Enroll Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
