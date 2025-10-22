import React, { useContext } from "react";
import { ShiftContext } from "../../context/ShiftContext";
import { formatDate, getDayName } from "../../utils/dateUtils";
import "./ShiftList.css";

const ShiftList = () => {
  const { shifts } = useContext(ShiftContext);

  // Obtener fecha de hoy en formato yyyy-mm-dd
  const todayStr = formatDate(new Date());

  // Filtrar solo hoy y futuros
  const upcomingShifts = shifts.filter((s) => s.date >= todayStr);

  if (upcomingShifts.length === 0) {
    return <div className="shiftlist-empty">No hay turnos asignados.</div>;
  }

  return (
    <div className="shiftlist-container">
      {upcomingShifts
        .sort((a, b) => a.date.localeCompare(b.date) || a.type.localeCompare(b.type))
        .map((s) => (
          <div key={`${s.date}-${s.type}`} className="shiftlist-item">
            <div className="shiftlist-date">
              {getDayName(new Date(s.date))} {s.date}
            </div>
            <div className="shiftlist-type">{s.type}</div>
            <div
              className="shiftlist-user"
              style={{ backgroundColor: s.user.color }}
            >
              {s.user.name}
            </div>
          </div>
        ))}
    </div>
  );
};

export default ShiftList;
