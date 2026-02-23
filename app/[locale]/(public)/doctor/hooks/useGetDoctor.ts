"use client";

import { useState, useMemo } from "react";
import { Doctor } from "@/app/dummyData";

// Dummy fully booked days & slots
const fullyBookedDays = ["2026-03-11", "2026-03-27"]; // format YYYY-MM-DD
const fullyBookedSlots: Record<string, string[]> = {
  "2026-03-26": ["09:00-13:00"],
};

interface Schedule {
  day: string; // e.g. "Monday"
  start: string; // e.g. "09:00"
  end: string; // e.g. "14:00"
}

function useDoctorBooking(doctor: Doctor) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [monthOffset, setMonthOffset] = useState(0);

  const today = new Date();

  // =========================
  // Helpers
  // =========================
  const formatDate = (date: Date) =>
    `${date.getFullYear()}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")}`;

  const isFullDay = (date: Date) => fullyBookedDays.includes(formatDate(date));

  const daysArray = useMemo(() => {
    const baseMonth = new Date(
      today.getFullYear(),
      today.getMonth() + monthOffset,
      1,
    );
    const year = baseMonth.getFullYear();
    const month = baseMonth.getMonth();

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfMonth = new Date(year, month, 1).getDay();

    return [
      ...Array(firstDayOfMonth).fill(null),
      ...Array.from(
        { length: daysInMonth },
        (_, i) => new Date(year, month, i + 1),
      ),
    ];
  }, [monthOffset, today]);

  const dayMap: Record<string, number> = {
    Sunday: 0,
    Monday: 1,
    Tuesday: 2,
    Wednesday: 3,
    Thursday: 4,
    Friday: 5,
    Saturday: 6,
  };

  const availableDaysIndex = doctor.schedules.map(
    (s: Schedule) => dayMap[s.day],
  );

  // =========================
  // Check availability
  // =========================
  const isDateAvailable = (date: Date) => {
    const isCorrectDay = availableDaysIndex.includes(date.getDay());
    const isPast = monthOffset === 0 && date < today;
    const fullDay = isFullDay(date);

    return isCorrectDay && !isPast && !fullDay;
  };

  const getAvailableSlots = () => {
    if (!selectedDate) return [];

    const dateObj =
      selectedDate instanceof Date ? selectedDate : new Date(selectedDate);
    const dayName = dateObj.toLocaleString("en-US", { weekday: "long" });

    const daySchedules = doctor.schedules.filter((s) => s.day === dayName);
    if (!daySchedules.length) return [];

    const dateKey = formatDate(dateObj);
    const bookedRanges = fullyBookedSlots[dateKey] || [];

    return daySchedules.map((schedule) => {
      const range = `${schedule.start}-${schedule.end}`;
      return {
        label: `${schedule.start} - ${schedule.end}`,
        value: range,
        isFull: bookedRanges.includes(range),
      };
    });
  };

  // =========================
  // Navigation (5 months max)
  // =========================
  const nextMonth = () => {
    if (monthOffset < 4) {
      setMonthOffset((prev) => prev + 1);
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };

  const prevMonth = () => {
    if (monthOffset > 0) {
      setMonthOffset((prev) => prev - 1);
      setSelectedDate(null);
      setSelectedTime(null);
    }
  };

  // =========================
  // Base month
  // =========================
  const baseDate = useMemo(
    () => new Date(today.getFullYear(), today.getMonth() + monthOffset, 1),
    [monthOffset],
  );

  return {
    selectedDate,
    setSelectedDate,
    selectedTime,
    setSelectedTime,
    baseDate,
    daysArray,
    isDateAvailable,
    getAvailableSlots,
    nextMonth,
    prevMonth,
    monthOffset,
    isFullDay,
  };
}

export default useDoctorBooking;
