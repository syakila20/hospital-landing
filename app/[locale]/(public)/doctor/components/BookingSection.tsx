"use client";

import { useState } from "react";

interface Schedule {
  day: string;
  start: string;
  end: string;
}

interface Doctor {
  name: string;
  schedule: Schedule[];
}

interface Props {
  doctor: Doctor;
}

export default function BookingSection({ doctor }: Props) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookedSlots, setBookedSlots] = useState<
    { date: string; time: string }[]
  >([
    { date: "2026-02-16", time: "09:30" },
    { date: "2026-02-16", time: "10:00" },
  ]);

  function generateTimeSlots(start: string, end: string) {
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
  }

  const dayName =
    selectedDate &&
    new Date(selectedDate).toLocaleDateString("id-ID", {
      weekday: "long",
    });

  const todaySchedule = doctor.schedule.find(
    (s) => s.day.toLowerCase() === dayName?.toLowerCase(),
  );

  const slots = todaySchedule
    ? generateTimeSlots(todaySchedule.start, todaySchedule.end)
    : [];

  function handleBooking() {
    if (!selectedDate || !selectedTime) return;

    setBookedSlots((prev) => [
      ...prev,
      { date: selectedDate, time: selectedTime },
    ]);

    alert("Booking berhasil 🎉");
    setSelectedTime(null);
  }

  return (
    <div className="bg-white rounded-3xl shadow-xl p-8 mt-12">
      <h2 className="text-2xl font-semibold mb-6">Buat Janji Konsultasi</h2>

      {/* Date Picker */}
      <input
        type="date"
        className="border px-4 py-3 rounded-xl w-full mb-6"
        onChange={(e) => {
          setSelectedDate(e.target.value);
          setSelectedTime(null);
        }}
      />

      {!todaySchedule && selectedDate && (
        <p className="text-red-500">Dokter tidak praktek pada hari ini.</p>
      )}

      {/* Time Slots */}
      {slots.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mb-6">
          {slots.map((slot) => {
            const isBooked = bookedSlots.some(
              (b) => b.date === selectedDate && b.time === slot,
            );

            return (
              <button
                key={slot}
                disabled={isBooked}
                onClick={() => setSelectedTime(slot)}
                className={`py-2 rounded-xl text-sm transition
                  ${
                    isBooked
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : selectedTime === slot
                        ? "bg-emerald-600 text-white"
                        : "bg-white border hover:border-emerald-500"
                  }`}
              >
                {slot}
              </button>
            );
          })}
        </div>
      )}

      {/* Confirm Button */}
      <button
        onClick={handleBooking}
        disabled={!selectedDate || !selectedTime}
        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 rounded-xl transition disabled:opacity-50"
      >
        Konfirmasi Booking
      </button>
    </div>
  );
}
