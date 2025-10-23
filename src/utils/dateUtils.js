/**
 * Devuelve un array con todos los días de un mes
 * @param {number} year
 * @param {number} month - 0 = Enero, 11 = Diciembre
 * @returns {Date[]|null[]} Array de Date o null (para huecos)
 */
export const getDaysInMonth = (year, month) => {
  const date = new Date(year, month, 1);
  const days = [];

  // Ajustamos startDay para que lunes=0, domingo=6
  let startDay = date.getDay(); // 0=domingo, 1=lunes ... 6=sábado
  startDay = startDay === 0 ? 6 : startDay - 1;

  const totalDays = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < startDay; i++) days.push(null);
  for (let day = 1; day <= totalDays; day++) days.push(new Date(year, month, day));

  return days;
};

/**
 * Formatea una fecha a 'YYYY-MM-DD'
 */
export function formatDate(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

/**
 * Nombre del día de la semana, lunes = 0
 */
export function getDayName(date) {
  const days = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];
  let dayIndex = date.getDay() - 1;
  if (dayIndex < 0) dayIndex = 6;
  return days[dayIndex];
}
