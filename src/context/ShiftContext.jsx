import React, { createContext, useState, useEffect } from "react";
import { getShifts, getUsers, assignShift as apiAssignShift } from "../services/api";

// Creamos el contexto
export const ShiftContext = createContext();

// Provider que envolverá toda la app
export const ShiftProvider = ({ children }) => {
  const [shifts, setShifts] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Función para cargar datos desde el backend
  const refreshShifts = async () => {
    try {
      setLoading(true);
      const today = new Date();
      const start = new Date(today.getFullYear(), today.getMonth(), 1)
        .toISOString()
        .slice(0, 10);
      const end = new Date(today.getFullYear(), today.getMonth() + 1, 0)
        .toISOString()
        .slice(0, 10);

      const [shiftsData, usersData] = await Promise.all([
        getShifts(start, end),
        getUsers(),
      ]);

      setShifts(shiftsData);
      setUsers(usersData);
    } catch (error) {
      console.error("Error al cargar datos:", error);
    } finally {
      setLoading(false);
    }
  };

  // Función para asignar o modificar un turno
  const assignShift = async (date, type, userId) => {
    try {
      const updatedShift = await apiAssignShift(date, type, userId);

      // Actualizamos estado local de forma reactiva
      setShifts((prev) => {
        const index = prev.findIndex(
          (s) => s.date === updatedShift.date && s.type === updatedShift.type
        );
        if (index !== -1) {
          const copy = [...prev];
          copy[index] = updatedShift;
          return copy;
        } else {
          return [...prev, updatedShift];
        }
      });
    } catch (error) {
      console.error("Error al asignar turno:", error);
    }
  };

  useEffect(() => {
    refreshShifts();
  }, []);

  return (
    <ShiftContext.Provider
      value={{
        shifts,
        users,
        loading,
        refreshShifts,
        assignShift,
      }}
    >
      {children}
    </ShiftContext.Provider>
  );
};
