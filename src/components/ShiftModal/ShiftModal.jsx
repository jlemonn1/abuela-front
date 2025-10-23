import React, { useContext, useState, useEffect, useRef } from "react";
import { ShiftContext } from "../../context/ShiftContext";
import { formatDate } from "../../utils/dateUtils";
import "./ShiftModal.css";

const Dropdown = ({ value, options, onChange, placeholder }) => {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  const handleClickOutside = (e) => {
    if (ref.current && !ref.current.contains(e.target)) setOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find((o) => o.id === value);

  return (
    <div className="custom-dropdown" ref={ref}>
      <div className="dropdown-header" onClick={() => setOpen(!open)}>
        {selectedOption ? selectedOption.name : placeholder}
        <span className={`arrow ${open ? "open" : ""}`}>▾</span>
      </div>
      {open && (
        <div className="dropdown-list">
          <div
            className="dropdown-item"
            onClick={() => {
              onChange(null);
              setOpen(false);
            }}
          >
            No hay nadie asignado
          </div>
          {options.map((o) => (
            <div
              key={o.id}
              className="dropdown-item"
              onClick={() => {
                onChange(o.id);
                setOpen(false);
              }}
            >
              {o.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const ShiftModal = ({ day, onClose }) => {
  const { shifts, users, assignShift } = useContext(ShiftContext);
  const formattedDate = formatDate(day);

  const [morningUserId, setMorningUserId] = useState(null);
  const [afternoonUserId, setAfternoonUserId] = useState(null);

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
    if (morningUserId !== null) await assignShift(formattedDate, "mañana", morningUserId);
    if (afternoonUserId !== null) await assignShift(formattedDate, "tarde", afternoonUserId);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <h2>Asignar turnos: {formattedDate}</h2>

        <div className="shift-section">
          <label>Turno Mañana:</label>
          <Dropdown
            value={morningUserId}
            options={users}
            onChange={setMorningUserId}
            placeholder="Selecciona una persona"
          />
        </div>

        <div className="shift-section">
          <label>Turno Tarde:</label>
          <Dropdown
            value={afternoonUserId}
            options={users}
            onChange={setAfternoonUserId}
            placeholder="Selecciona una persona"
          />
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
