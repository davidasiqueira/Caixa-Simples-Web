export function getLast30Days(): string[] {
  let date = new Date();
  let dates = [];
  for (let i = 0; i < 30; i++) {
    let newDate = new Date(date.setDate(date.getDate() - 1));
    let dd = (newDate.getDate() + 1).toString().padStart(2, "0");
    let mm = (newDate.getMonth() + 1).toString().padStart(2, "0");
    dates.push(`${dd}/${mm}`);
  }
  return dates.reverse();
}