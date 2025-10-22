import React, { useContext, useState, useEffect } from "react";
import { ShiftContext } from "../../context/ShiftContext";
import { formatDate } from "../../utils/dateUtils";
import "./ShiftModal.css";

const ShiftModal = ({ day, onClose }) => {
  const { shifts, users, assignShift } = useContext(ShiftContext);
  const formattedDate = formatDate(day);

  // Estados locales por turno
  const [morningUserId, setMorningUserId] = useState(null);
  const [afternoonUserId, setAfternoonUserId] = useState(null);

  // Cargar datos si ya existen
  useEffect(() => {
    const morningShift = shifts.find(
      (s) => s.date === formattedDate && s.type === "mañana"
    );
    const afternoonShift = shifts.find(
      (s) => s.date === formattedDate && s.type === "tarde"
    );

    setMorningUserId(morningShift?.user?.id || null);
    setAfternoonUserId(afternoonShift?.user?.id || null);
  }, [day, shifts, formattedDate]);

  const handleSave = async () => {
    // Guardar ambos turnos
    if (morningUserId !== null) {
      await assignShift(formattedDate, "mañana", morningUserId);
    }
    if (afternoonUserId !== null) {
      await assignShift(formattedDate, "tarde", afternoonUserId);
    }
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>Asignar turnos: {formattedDate}</h2>

        {/* Turno de Mañana */}
        <div className="shift-section">
          <label>Turno Mañana:</label>
          <select
            value={morningUserId || ""}
            onChange={(e) => setMorningUserId(Number(e.target.value))}
          >
            <option value="">No hay nadie asignado</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        {/* Turno de Tarde */}
        <div className="shift-section">
          <label>Turno Tarde:</label>
          <select
            value={afternoonUserId || ""}
            onChange={(e) => setAfternoonUserId(Number(e.target.value))}
          >
            <option value="">No hay nadie asignado</option>
            {users.map((u) => (
              <option key={u.id} value={u.id}>
                {u.name}
              </option>
            ))}
          </select>
        </div>

        <div className="modal-buttons">
          <button className="save-button" onClick={handleSave}>
            Guardar
          </button>
          <button className="cancel-button" onClick={onClose}>
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShiftModal;
