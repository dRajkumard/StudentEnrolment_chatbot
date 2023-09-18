import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const ConfirmationPage = () => {
  const data = useSelector((state)=>state.chatbot)
  console.log("d",data  )
  const location = useLocation();
  const { name, age } = location.state || {};
  const cardStyle = {
    width: "400px",
    height: "600px",
    textAlign: "center",
  };

  const textStyle = {
   
  };
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: '#c7ffcd' }}>
      <div className="card" style={cardStyle}>
        <div className="card-body"style={{ backgroundColor: '#007B5E', padding: '20px' ,color:'white'}}>
          {data  ? (
           <p style={textStyle}>
           Your name {data.name} aged {data.age} has been added to the student system. You may now exit.
         </p>
       ) : (
         <p style={textStyle}>No user data found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPage;
