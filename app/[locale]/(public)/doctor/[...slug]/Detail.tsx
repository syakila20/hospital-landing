"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { useEffect } from "react";
import useDoctorBooking from "../hooks/useGetDoctor";
import { Doctor } from "@/app/dummyData";
import Back from "@/app/components/Back/Back";

interface Props {
  doctor: Doctor;
}

const DoctorDetail = ({ doctor }: Props) => {
  const booking = useDoctorBooking(doctor as Doctor);

  // AUTO SELECT FIRST AVAILABLE DATE
  useEffect(() => {
    if (!booking.selectedDate) {
      const firstAvailable = booking.daysArray.find(
        (d) => d && booking.isDateAvailable(d),
      );
      if (firstAvailable) booking.setSelectedDate(firstAvailable);
    }
  }, [booking.daysArray, booking.selectedDate]);

  return (
    <section>
      <Back
        desc="Doctor Details"
        title="Back to Doctor List"
        linkTo="/doctor"
      />

      <div className="mx-auto grid lg:grid-cols-3 gap-10">
        {/* PROFILE */}
        <div className="lg:col-span-2 space-y-4 ">
          <div className="shadow-gray-100 shadow-xs border-b border-b-gray-200">
            <div className="flex gap-4 items-center flex-wrap">
              <div className="relative w-40 h-40 shrink-0">
                <Image
                  src={doctor?.image as string}
                  alt={doctor.name}
                  fill
                  className="object-cover mask-[linear-gradient(to_bottom,black_10%,transpcararent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)]"
                />
              </div>
              <div className="flex flex-col flex-1">
                <div className="mb-4">
                  <span className="text-sm px-3 py-1 border border-emerald-500/50 bg-emerald-600 rounded-full text-white">
                    Available
                  </span>
                </div>
                <span className="text-2xl lg:text-2xl font-bold text-slate-700 leading-none">
                  {doctor.name}
                </span>
                <p className="text-slate-400 text-md mt-2">
                  {doctor.specialty}
                </p>
              </div>
            </div>
          </div>
          <div className={`flex flex-wrap gap-2`}>
            {doctor?.schedules?.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-center px-3 py-2 bg-white/60 text-slate-600 rounded-md shadow-sm text-sm font-light"
              >
                <span className="font-semibold">{item?.day}</span>
                <span className="text-xs ">
                  {item?.start} - {item?.end}
                </span>
              </div>
            ))}
          </div>
          <span className="text-2xl font-bold text-slate-600">
            Work Experience
          </span>
          <div className="relative border-l-2 border-emerald-700 pl-6 pt-5">
            {doctor.experiences.map((exp, index) => (
              <div key={index} className="mb-10 relative">
                <span className="absolute -left-9 -top-0.5 w-6 h-6 bg-emerald-500 rounded-full border-4 border-white shadow"></span>

                <p className="text-sm text-emerald-600 font-semibold">
                  {exp.year}
                </p>
                <h3 className="text-emerald-700 text-lg font-semibold">
                  {exp.title}
                </h3>
                <p className="text-slate-500 text-sm">{exp.place}</p>
                <p className="text-slate-800 mt-2">{exp.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* BOOKING */}
        <div className="bg-white/40 p-6 rounded-2xl shadow-sm lg:sticky lg:top-24 w-full">
          <h2 className="font-semibold text-lg mb-4 text-gray-700">
            Book Appointment
          </h2>

          <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
            <button
              onClick={booking.prevMonth}
              disabled={booking.monthOffset === 0}
              className="px-3 py-1 bg-emerald-500 rounded disabled:cursor-not-allowed disabled:bg-gray-600 cursor-pointer"
            >
              Prev
            </button>

            <span className="font-semibold text-slate-700">
              {booking.baseDate.toLocaleString("default", {
                month: "long",
                year: "numeric",
              })}
            </span>

            <button
              onClick={booking.nextMonth}
              disabled={booking.monthOffset === 4}
              className="px-3 py-1 bg-emerald-500 rounded disabled:cursor-not-allowed disabled:bg-gray-600 cursor-pointer"
            >
              Next
            </button>
          </div>

          {/* Calendar */}
          <div className="mb-4 overflow-x-auto">
            <div className="grid grid-cols-7 gap-2 text-xs text-gray-500 uppercase font-semibold text-center mb-2 min-w-[300px]">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day}>{day}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-2 text-xs text-center min-w-[300px]">
              {booking.daysArray.map((date, i) => {
                if (!date) return <div key={i}></div>;

                const available = booking.isDateAvailable(date);
                const fullDay = booking.isFullDay(date);
                const isSelected =
                  booking.selectedDate &&
                  date.toDateString() === booking.selectedDate.toDateString();

                return (
                  <button
                    key={i}
                    disabled={!available}
                    onClick={() => {
                      if (available) {
                        booking.setSelectedDate(date);
                        booking.setSelectedTime(null);
                      }
                    }}
                    className={`p-2 rounded text-sm transition min-w-8 ${
                      isSelected
                        ? "bg-emerald-600 text-white"
                        : fullDay
                          ? "bg-red-500 text-white cursor-not-allowed"
                          : available
                            ? "bg-gray-900 text-white hover:bg-emerald-500 cursor-pointer"
                            : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {date.getDate()}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Slots */}
          <div className="space-y-2 min-w-[200px]">
            {booking.selectedDate ? (
              booking.getAvailableSlots().map((slot) => (
                <button
                  key={slot.value}
                  disabled={slot.isFull}
                  onClick={() => booking.setSelectedTime(slot.value)}
                  className={`w-full py-2 rounded text-sm transition min-w-[4rem] ${
                    booking.selectedTime === slot.value
                      ? "bg-emerald-500 text-white"
                      : slot.isFull
                        ? "bg-red-500/70 text-white cursor-not-allowed"
                        : "bg-gray-900 hover:bg-emerald-500 cursor-pointer"
                  }`}
                >
                  {slot.label}
                  {slot.isFull && " (Full Booked)"}
                </button>
              ))
            ) : (
              <p className="text-gray-400 text-sm">
                Select a date to see available slots
              </p>
            )}
          </div>

          <button
            disabled={!booking.selectedDate || !booking.selectedTime}
            className="w-full mt-4 py-3 bg-emerald-600 text-white rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
          >
            Confirm Booking
          </button>
          <div className="w-full mt-2">
            <div className="flex items-center gap-2">
              <div className="bg-gray-900 rounded-sm w-4 h-4" />
              <span className="text-gray-900 text-sm">Available</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-emerald-500 rounded-sm w-4 h-4" />
              <span className="text-emerald-500 text-sm">Selected</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-red-500 rounded-sm w-4 h-4" />
              <span className="text-red-500 text-sm">Full Booked</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="bg-gray-400 rounded-sm w-4 h-4" />
              <span className="text-gray-400 text-sm">Disabled</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DoctorDetail;
// "use client";

// import Image from "next/image";
// import { motion } from "framer-motion";
// import useDoctorBooking from "../hooks/useGetDoctor";
// import { Doctor } from "@/app/dummyData";
// import Back from "@/app/components/Back/Back";
// import { useEffect } from "react";

// interface Props {
//   doctor: Doctor;
// }

// const DoctorDetail = ({ doctor }: Props) => {
//   const booking = useDoctorBooking(doctor);

//   // Debug waktu dan slots di console untuk device asli
//   useEffect(() => {
//     console.log("??Today:", new Date().toString());
//     console.log("??Booking baseDate:", booking.baseDate.toString());
//     console.log("??SelectedDate:", booking.selectedDate?.toString());
//     console.log("??Available slots:", booking.getAvailableSlots());
//   }, [booking.selectedDate, booking.baseDate]);

//   return (
//     <section className="w-[90%] md:w-[85%] xl:w-[85%] mx-auto pt-10 bg1linear-to-br from-fuchsia-50 to-teal-50 relative py-4 h-auto">
//       <Back
//         desc="Doctor Details"
//         title="Back to Doctor List"
//         linkTo="/doctor"
//       />

//       <div className="mx-auto grid lg:grid-cols-3 gap-6">
//         {/* PROFILE */}
//         <div className="lg:col-span-2 space-y-6">
//           <div className="border-b border-gray-300 pb-4 flex flex-wrap gap-4 items-center">
//             <div className="relative w-48 h-48 flex-shrink-0">
//               <Image
//                 src={doctor.image as string}
//                 alt={doctor.name}
//                 fill
//                 className="object-cover rounded-lg"
//               />
//             </div>
//             <div className="flex flex-col flex-1 min-w-0">
//               <span className="text-2xl font-bold truncate">{doctor.name}</span>
//               <p className="text-slate-600 mt-1 truncate">{doctor.specialty}</p>
//               <span className="inline-block mt-2 px-3 py-1 bg-emerald-600 text-white rounded-full text-sm w-max">
//                 Available
//               </span>
//             </div>
//           </div>

//           <h2 className="text-2xl font-semibold text-slate-700">
//             Work Experience
//           </h2>
//           <div className="relative border-l-2 border-emerald-700 pl-6">
//             {doctor.experiences.map((exp, i) => (
//               <motion.div
//                 key={i}
//                 initial={{ opacity: 0, x: -20 }}
//                 whileInView={{ opacity: 1, x: 0 }}
//                 viewport={{ once: true }}
//                 className="mb-8 relative"
//               >
//                 <span className="absolute -left-8 -top-1 w-5 h-5 bg-emerald-500 rounded-full border-2 border-white shadow" />
//                 <p className="text-sm text-emerald-600 font-semibold">
//                   {exp.year}
//                 </p>
//                 <h3 className="text-emerald-700 text-lg font-semibold">
//                   {exp.title}
//                 </h3>
//                 <p className="text-gray-500 text-sm">{exp.place}</p>
//                 <p className="text-gray-800 mt-1">{exp.description}</p>
//               </motion.div>
//             ))}
//           </div>
//         </div>

//         {/* BOOKING */}
//         <div className="bg-white/80 p-5 rounded-xl shadow-md lg:sticky lg:top-20 w-full min-w-0">
//           <h2 className="text-lg font-semibold text-gray-700 mb-4">
//             Book Appointment
//           </h2>

//           {/* Month Navigation */}
//           <div className="flex justify-between items-center mb-3 flex-wrap gap-2">
//             <button
//               onClick={booking.prevMonth}
//               disabled={booking.monthOffset === 0}
//               className="px-3 py-1 bg-emerald-500 rounded disabled:bg-gray-400 disabled:cursor-not-allowed text-white"
//             >
//               Prev
//             </button>

//             <span className="font-semibold text-slate-700 whitespace-nowrap">
//               {booking.baseDate.toLocaleString("default", {
//                 month: "long",
//                 year: "numeric",
//               })}
//             </span>

//             <button
//               onClick={booking.nextMonth}
//               disabled={booking.monthOffset === 4}
//               className="px-3 py-1 bg-emerald-500 rounded disabled:bg-gray-400 disabled:cursor-not-allowed text-white"
//             >
//               Next
//             </button>
//           </div>

//           {/* Calendar */}
//           <div className="mb-4 overflow-x-auto">
//             <div className="grid grid-cols-7 gap-1 text-xs text-gray-500 uppercase font-semibold text-center mb-2 min-w-[300px]">
//               {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
//                 <div key={day}>{day}</div>
//               ))}
//             </div>

//             <div className="grid grid-cols-7 gap-1 text-xs text-center min-w-[300px]">
//               {booking.daysArray.map((date, i) => {
//                 if (!date) return <div key={i}></div>;

//                 const available = booking.isDateAvailable(date);
//                 const fullDay = booking.isFullDay(date);
//                 const isSelected =
//                   booking.selectedDate &&
//                   date.toDateString() === booking.selectedDate.toDateString();

//                 return (
//                   <button
//                     key={i}
//                     disabled={!available}
//                     onClick={() => {
//                       if (available) {
//                         booking.setSelectedDate(date);
//                         booking.setSelectedTime(null);
//                       }
//                     }}
//                     className={`p-2 rounded text-sm transition min-w-[2.5rem] ${
//                       isSelected
//                         ? "bg-emerald-600 text-white"
//                         : fullDay
//                           ? "bg-red-100 text-red-600 cursor-not-allowed"
//                           : available
//                             ? "bg-gray-900 hover:bg-emerald-500 cursor-pointer"
//                             : "bg-gray-200 text-gray-400 cursor-not-allowed"
//                     }`}
//                   >
//                     {date.getDate()}
//                   </button>
//                 );
//               })}
//             </div>
//           </div>

//           {/* Slots */}
//           <div className="space-y-2 overflow-x-auto min-w-[300px]">
//             {booking.getAvailableSlots().map((slot) => (
//               <button
//                 key={slot.value}
//                 disabled={slot.isFull}
//                 onClick={() => booking.setSelectedTime(slot.value)}
//                 className={`w-full py-2 rounded text-sm transition min-w-[4rem] ${
//                   booking.selectedTime === slot.value
//                     ? "bg-emerald-500 text-white"
//                     : slot.isFull
//                       ? "bg-red-500/70 text-white cursor-not-allowed"
//                       : "bg-gray-900 text-white hover:bg-emerald-500 cursor-pointer"
//                 }`}
//               >
//                 {slot.label}
//                 {slot.isFull && " (Full)"}
//               </button>
//             ))}
//           </div>

//           <button
//             disabled={!booking.selectedDate || !booking.selectedTime}
//             className="w-full mt-4 py-3 bg-emerald-600 text-white rounded-lg disabled:bg-gray-500 disabled:cursor-not-allowed"
//           >
//             Confirm Booking
//           </button>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default DoctorDetail;
