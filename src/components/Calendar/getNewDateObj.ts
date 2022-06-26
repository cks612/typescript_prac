export function getNewDateObj(newDate: Date) {
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const date = newDate.getDate();
  const day = newDate.getDay();
  const lastday = new Date(
    newDate.getFullYear(),
    newDate.getMonth() + 1,
    0
  ).getDate();
  return { year, month, date, day, lastday };
}
