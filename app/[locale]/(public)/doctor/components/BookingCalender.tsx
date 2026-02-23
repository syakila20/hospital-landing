"use client";

import { useState, useMemo } from "react";

interface Schedule {
  day: string;
  time: string; // contoh: "09:00 - 13:00"
}

interface Props {
  schedule: Schedule[];
}

export default function BookingCalendar({ schedule }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  // Generate 7 hari ke depan
  const next7Days = useMemo(() => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  }, []);

  const getDayName = (date: Date) => {
    return date.toLocaleDateString("id-ID", { weekday: "long" });
  };

  const generateTimeSlots = (range: string) => {
    const [start, end] = range.split(" - ");
    const slots = [];
    let current = parseInt(start.split(":")[0]);

    const endHour = parseInt(end.split(":")[0]);

    while (current < endHour) {
      slots.push(`${current.toString().padStart(2, "0")}:00`);
      current++;
    }

    return slots;
  };

  const availableSlots = useMemo(() => {
    if (!selectedDate) return [];

    const dayName = getDayName(selectedDate);
    const match = schedule.find(
      (item) => item.day.toLowerCase() === dayName.toLowerCase(),
    );

    if (!match) return [];

    return generateTimeSlots(match.time);
  }, [selectedDate, schedule]);

  return (
    <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
      {/* Date Picker */}
      <h3 className="text-lg font-semibold mb-6">Pilih Tanggal</h3>

      <div className="flex gap-3 overflow-x-auto pb-4">
        {next7Days.map((date, index) => (
          <button
            key={index}
            onClick={() => {
              setSelectedDate(date);
              setSelectedTime(null);
            }}
            className={`min-w-[90px] px-4 py-3 rounded-2xl text-sm transition ${
              selectedDate?.toDateString() === date.toDateString()
                ? "bg-emerald-600 text-white shadow-md"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            <div>
              {date.toLocaleDateString("id-ID", {
                day: "numeric",
                month: "short",
              })}
            </div>
            <div className="text-xs">{getDayName(date).slice(0, 3)}</div>
          </button>
        ))}
      </div>

      {/* Time Slots */}
      {selectedDate && (
        <>
          <h3 className="text-lg font-semibold mt-8 mb-4">Pilih Jam</h3>

          {availableSlots.length > 0 ? (
            <div className="grid grid-cols-3 gap-3">
              {availableSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-2 rounded-xl text-sm transition ${
                    selectedTime === time
                      ? "bg-emerald-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              Tidak ada jadwal tersedia di hari ini.
            </p>
          )}
        </>
      )}

      {/* Booking Button */}
      {selectedDate && selectedTime && (
        <button className="mt-8 w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-2xl font-medium transition">
          Konfirmasi Booking
        </button>
      )}
    </div>
  );
}
