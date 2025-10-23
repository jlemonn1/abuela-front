import React from "react";
import "./DayCell.css";

const DayCell = ({ date, shifts, onClick, extraClass }) => {
  if (!date) return <div className="calendar-empty"></div>;

  const dayNumber = date.getDate();
  const morningShift = shifts.find((s) => s.type === "mañana");
  const afternoonShift = shifts.find((s) => s.type === "tarde");

  return (
    <div className={`day-cell ${extraClass}`} onClick={onClick}>
      <div className="day-number">{dayNumber}</div>

      <div className="shift-spot morning">
        {morningShift ? (
          <div
            className="shift-initial"
            style={{ backgroundColor: morningShift.user.color }}
          >
            {morningShift.user.name[0].toUpperCase()}
          </div>
        ) : (
          <div className="shift-empty">–</div>
        )}
      </div>

      <div className="shift-spot afternoon">
        {afternoonShift ? (
          <div
            className="shift-initial"
            style={{ backgroundColor: afternoonShift.user.color }}
          >
            {afternoonShift.user.name[0].toUpperCase()}
          </div>
        ) : (
          <div className="shift-empty">–</div>
        )}
      </div>
    </div>
  );
};

export default DayCell;
