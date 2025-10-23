import React, { useContext } from "react";
import { ShiftContext } from "../../context/ShiftContext";
import { getDaysInMonth, formatDate } from "../../utils/dateUtils";
import DayCell from "./DayCell";
import "./Calendar.css";

const Calendar = ({ onSelectDay }) => {
    const { shifts } = useContext(ShiftContext);
    const today = new Date();
    const days = getDaysInMonth(today.getFullYear(), today.getMonth());

    const dayNames = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

    // Nombre del mes en español con primera letra en mayúscula
    const monthName = today.toLocaleString("es-ES", { month: "long", year: "numeric" });
    const monthNameCapitalized = monthName.charAt(0).toUpperCase() + monthName.slice(1);

    return (
        <div className="calendar-container">
            <div className="calendar-month">{monthNameCapitalized}</div>


            <div className="calendar-header">
                {dayNames.map((d) => (
                    <div key={d} className="calendar-header-day">{d}</div>
                ))}
            </div>

            <div className="calendar-grid">
                {days.map((day, index) => {
                    if (!day) return <div key={index} className="calendar-empty"></div>;

                    const formatted = formatDate(day);
                    const dayShifts = shifts.filter((s) => s.date === formatted);

                    const isToday = formatted === formatDate(today);

                    return (
                        <DayCell
                            key={formatted}
                            date={day}
                            shifts={dayShifts}
                            extraClass={isToday ? "today" : ""}
                            onClick={() => onSelectDay(day)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default Calendar;
