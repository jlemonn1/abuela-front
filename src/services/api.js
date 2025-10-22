const API_URL = "http://localhost:8080/api";

// Obtener todos los turnos en un rango de fechas
export async function getShifts(start, end) {
  const res = await fetch(`${API_URL}/shifts?start=${start}&end=${end}`);
  if (!res.ok) {
    throw new Error("Error al obtener turnos");
  }
  return res.json();
}

// Obtener todos los cuidadores
export async function getUsers() {
  const res = await fetch(`${API_URL}/users`);
  if (!res.ok) {
    throw new Error("Error al obtener cuidadores");
  }
  return res.json();
}

// Asignar o modificar un turno
export async function assignShift(date, type, userId) {
  const res = await fetch(`${API_URL}/shifts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ date, type, userId }),
  });
  if (!res.ok) {
    throw new Error("Error al asignar turno");
  }
  return res.json();
}
