import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./index.css";

const timeSlots = [
  {
    heading: "Morning",
    slots: ["9 AM", "10 AM", "11 AM"],
  },
  {
    heading: "Noon",
    slots: ["12 PM", "1 PM", "2 PM"],
  },
  {
    heading: "Evening",
    slots: ["3 PM", "4 PM", "5 PM", "6 PM"],
  },
];

const CalendarStrip = ({ onSelectDateTime }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  console.log("dat", selectedTimeSlot);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeSlotSelect = (timeSlot) => {
    console.log("eh");
    setSelectedTimeSlot(timeSlot);
    onSelectDateTime(selectedDate, timeSlot);
  };

  return (
    <div className="calendar-strip">
      <DatePicker selected={selectedDate} onChange={handleDateChange} inline />
      {selectedDate && (
        <div className="time-slots-container">
          {timeSlots.map((section) => (
            <div key={section.heading}>
              <h4 style={{ color: "white" }}>{section.heading}</h4>
              <div className="time-slots">
                {section.slots.map((slot) => (
                  <button
                    key={slot}
                    className={`time-slot ${
                      selectedTimeSlot === slot ? "selected" : ""
                    }`}
                    onClick={() => handleTimeSlotSelect(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CalendarStrip;
