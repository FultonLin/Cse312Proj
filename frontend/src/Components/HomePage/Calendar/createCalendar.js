export default function createCalendar(value) {
  const startDay = value.clone().startOf("month").startOf("week")
  const day = startDay.clone().subtract(1, "day")
  const endDay = value.clone().endOf("month").endOf("week")
  const temp = [];
  while (day.isBefore(endDay, "day")) {
    temp.push(
      Array(7).fill("").map(() => day.add(1, "day").clone())
    );
  }
  return temp;
}