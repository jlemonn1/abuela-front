import React from "react";
import "./DayCell.css";

const DayCell = ({ date, shifts, onClick }) => {
  const dayNumber = date.getDate();

  // Buscar turno mañana y tarde
  const morningShift = shifts.find((s) => s.type === "mañana");
  const afternoonShift = shifts.find((s) => s.type === "tarde");

  return (
    <div className="day-cell" onClick={onClick}>
      <div className="day-number">{dayNumber}</div>

      {/* Turno mañana */}
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

      {/* Turno tarde */}
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
