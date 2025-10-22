/**
 * Devuelve un array con todos los días de un mes
 * @param {number} year - Año completo (ej: 2025)
 * @param {number} month - Mes (0 = Enero, 11 = Diciembre)
 * @returns {Date[]} Array de objetos Date de cada día del mes
 */
export const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];

  // Ajustamos startDay para que lunes=0, domingo=6
  let startDay = date.getDay(); // 0=domingo, 1=lunes ... 6=sábado
  startDay = startDay === 0 ? 6 : startDay - 1;

  const totalDays = new Date(year, month + 1, 0).getDate();

  // Rellenar días vacíos para alinear el primer día
  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  // Agregar días del mes
  for (let day = 1; day <= totalDays; day++) {
    days.push(new Date(year, month, day));
  }

  return days;
};



/**
 * Formatea una fecha a 'YYYY-MM-DD' (para comparar con los turnos)
 * @param {Date} date
 * @returns {string} Fecha en formato ISO simple
 */
export function formatDate(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, "0");
    const d = String(date.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
}

/**
 * Devuelve el día de la semana como texto (0 = Domingo, 6 = Sábado)
 * @param {Date} date
 * @returns {string} Nombre del día
 */
export function getDayName(date) {
    const days = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];
    return days[date.getDay()];
}
