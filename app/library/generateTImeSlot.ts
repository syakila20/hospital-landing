export const generateTimeSlots = (start: string, end: string) => {
  const slots: string[] = [];

  let [hour, minute] = start.split(":").map(Number);
  const [endHour, endMinute] = end.split(":").map(Number);

  while (hour < endHour || (hour === endHour && minute < endMinute)) {
    const formatted = `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`;

    slots.push(formatted);

    minute += 30;
    if (minute >= 60) {
      minute = 0;
      hour += 1;
    }
  }

  return slots;
};
