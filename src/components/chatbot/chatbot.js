import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import logo from "../../../src/assets/images/logo.webp";
import { setAge, setName } from "../../reduxstore/slices/chatbotSlice";
import CalendarStrip from "../calenderstripe";
import "./index.css";

const Chatbot = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [showGotItButton, setShowGotItButton] = useState(false);
  const [showCalendarStrip, setShowCalendarStrip] = useState(false);
  let [countdown, setCountdown] = useState(false);

  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [userName, setUserName] = useState("");
  const [showNameInput, setShowNameInput] = useState(false);
  const [userAge, setUserAge] = useState("");
  const [showAgeInput, setShowAgeInput] = useState(false);

  console.log("slee", messages);

  useEffect(() => {
    const welcomeMessageTimer = setTimeout(() => {
      addBotMessage("Hello, Welcome to the student info system!", "bot");
    }, 3000);
    const gotItButtonTimer = setTimeout(() => {
      setShowGotItButton(true);
    }, 5000);
    return () => {
      clearTimeout(welcomeMessageTimer);
      clearTimeout(gotItButtonTimer);
    };
  }, []);

  const addBotMessage = (message, user) => {
    console.log("mess", messages);
    setMessages((prevemessage) => [
      ...prevemessage,
      { text: message, sender: user },
    ]);
  };

  const handleGotIt = () => {
    addBotMessage("Got it!", "user");
    setShowGotItButton(false);
    setTimeout(() => {
      addBotMessage("Pick a slot!", "bot");

      setShowCalendarStrip(true);
    }, 1000);
  };

  const handleSelectDateTime = (date, timeSlot) => {
    const selectedDate = new Date(date);
    const dateStr = selectedDate.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "short",
      weekday: "short",
    });

    if (date && timeSlot) {
      let time = `${dateStr},${timeSlot}`;
      console.log("time", time);

      addBotMessage(time, "user");
      setShowNameInput(true);
      setShowCalendarStrip(false);
    }
  };
  const handleNameInputChange = (e) => {
    setUserName(e.target.value);
  };

  const handleNameInputSubmit = () => {
    addBotMessage(`User: ${userName}`);
    dispatch(setName(userName))
    setShowNameInput(false);
    setShowAgeInput(true);
  };
  const handleAgeInputChange = (e) => {
    setUserAge(e.target.value);
  };

  const handleAgeInputSubmit = () => {
    addBotMessage(`User: ${userName}, Age: ${userAge}`);
    addBotMessage("Thank you. In 5 seconds, bot will exit");
    dispatch(setAge(userAge))

    let count = 5;
    let countdownInterval = setInterval(() => {
      if (count > 1) {
        setCountdown(count);
      } else {
        clearInterval(countdownInterval);
        navigate("/confirmation", {
          state: { name: userName, age: userAge },
        });
      }
      count--;
    }, 1000);

    setShowAgeInput(false);
  };

  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center vh-100"
      style={{ backgroundColor: "#c7ffcd" }}
    >
      <div className="chatbot">
        <div className="card" style={{ width: "412px", height: "915px" }}>
          <div
            className="card-body"
            style={{ backgroundColor: "#007B5E", padding: "20px" }}
          >
            <div className="card_container">
              <nav className="navbar navbar-expand-lg navbar-light bg-light container-fluid ">
                <div className="container-fluid">
                  <img
                    src={logo}
                    alt="Logo"
                    width="50px"
                    height="50px"
                    style={{ zIndex: 999 }}
                  />
                </div>
                <span className="navbar-toggler-icon"></span>
              </nav>

              <div className="chatbot-messages  ">
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`message ${
                      message.sender === "bot" ? "bot" : "user"
                    }`}
                  >
                    <span
                      className={`message-sender d-flex align-items-center ${message.sender}`}
                    >
                      {message.sender === "bot" ? (
                        <i
                          className="fa-solid fa-robot"
                          style={{ color: "white" }}
                        ></i>
                      ) : (
                        <i
                          className="fa-solid fa-user"
                          style={{ color: "white" }}
                        ></i>
                      )}
                    </span>
                    <span className="message-text">{message.text}</span>
                  </div>
                ))}
                {showGotItButton && (
                  <div className="user-input text-left  message ">
                    <button className="btn btn-primary" onClick={handleGotIt}>
                      Got It
                    </button>
                  </div>
                )}
                {showCalendarStrip && (
                  <div className="calendar-strip message-sender message">
                    <CalendarStrip onSelectDateTime={handleSelectDateTime} />
                  </div>
                )}
                {selectedDateTime && (
                  <div className="selected-datetime message-sender message">
                    Selected Date: {selectedDateTime.date.toDateString()}
                    <br />
                    Selected Time Slot: {selectedDateTime.timeSlot}
                  </div>
                )}
                {showNameInput ? (
                  <div className="input-container message">
                    <div className="input-field">
                      <input
                        type="text"
                        placeholder="Please enter your name"
                        value={userName}
                        onChange={handleNameInputChange}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleNameInputSubmit();
                          }
                        }}
                      />
                    </div>
                    <div className="button-field">
                      <button
                        className="btn btn-primary"
                        onClick={handleNameInputSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                ) : null}
                {showAgeInput ? (
                  <div className="input-container">
                    <div className="input-field">
                      <input
                        type="number"
                        placeholder="Please enter your age"
                        value={userAge}
                        onChange={handleAgeInputChange}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleAgeInputSubmit();
                          }
                        }}
                      />
                    </div>
                    <div className="button-field">
                      <button
                        className="btn btn-primary"
                        onClick={handleAgeInputSubmit}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                ) : null}

                {countdown && (
                  <div className="countdown-message">
                    <p className="countdown-text">{countdown}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
