import React, { useContext } from "react";
import { ShiftContext } from "../../context/ShiftContext";
import "./Header.css";

const Header = () => {
  const { refreshShifts, loading } = useContext(ShiftContext);

  return (
    <header className="header-container">
      <h1 className="header-title">
        AgüelaTurnos
        <span className="glow"></span>
      </h1>
      <button
        className="refresh-button"
        onClick={refreshShifts}
        disabled={loading}
      >
        {loading ? "Cargando..." : "Refrescar"}
      </button>
    </header>
  );
};

export default Header;
