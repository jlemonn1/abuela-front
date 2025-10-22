import React, { useContext } from "react";
import { ShiftContext } from "../../context/ShiftContext";
import { getDaysInMonth, formatDate, getDayName } from "../../utils/dateUtils";
import DayCell from "./DayCell";
import "./Calendar.css";

const Calendar = ({ onSelectDay }) => {
    const { shifts } = useContext(ShiftContext);
    const today = new Date();
    const days = getDaysInMonth(today.getFullYear(), today.getMonth());

    // Generar un array de 7 días de la semana para la cabecera
    const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    return (
        <div className="calendar-container">
            <div className="calendar-header">
                {dayNames.map((d) => (
                    <div key={d} className="calendar-header-day">
                        {d}
                    </div>
                ))}
            </div>
            <div className="calendar-grid">
                {days.map((day, index) => {
                    if (!day) {
                        return <div key={index} className="calendar-empty"></div>;
                    }
                    const formatted = formatDate(day);
                    const dayShifts = shifts.filter((s) => s.date === formatted);
                    return (
                        <DayCell
                            key={formatted}
                            date={day}
                            shifts={dayShifts}
                            onClick={() => onSelectDay(day)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
