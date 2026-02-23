import Appointment from "@/app/components/AppointmentBanner/Appointment";
import Footer from "@/app/components/Footer/Footer";
import Navbar from "@/app/components/Navbar/Navbar";
import { NextIntlClientProvider } from "next-intl";

export default async function PublicLocaleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="antialiased bg-gradient-to-br from-fuchsia-50 to-teal-50">
      <NextIntlClientProvider>
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Appointment />
        <Footer />
      </NextIntlClientProvider>
    </div>
  );
}

// import { NextIntlClientProvider } from "next-intl";
// import { getMessages, getLocale } from "next-intl/server";

// export default async function LocaleLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   const locale = await getLocale();
//   const messages = await getMessages();
//   console.log("?", locale, messages);
//   return (
//     <html lang={locale}>
//       <body>
//         <NextIntlClientProvider locale={locale} messages={messages}>
//           {children}
//         </NextIntlClientProvider>
//       </body>
//     </html>
//   );
// }
