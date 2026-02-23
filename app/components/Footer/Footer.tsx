import { useTranslations } from "next-intl";
import { hospitalConfig } from "./config";

export default function Footer() {
  const t = useTranslations();

  return (
    <footer
      className="bg-slate-50 border-t pt-2.5 border-slate-100 text-slate-700
    "
    >
      <div
        className="    relative overflow-hidden md:w-[85%] xl:w-[85%] mx-auto
 px-6 py-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h2 className="text-xl font-semibold text-slate-900">
              RS Sehat Sentosa
            </h2>
            <p className="mt-3 text-sm leading-relaxed">{t("brand.tagline")}</p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              {t("sections.servicesTitle")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {hospitalConfig["services"]?.map((item, idx) => (
                <li key={idx}> {t(`services.${item}`)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              {t("sections.informationTitle")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {hospitalConfig["information"]?.map((item, idx) => (
                <li key={idx}> {t(`information.${item}`)}</li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
              {t("sections.contactTitle")}
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              <li>📍 Jl. Kesehatan No. 10, Jakarta</li>
              <li>☎️ (021) 1234 5678</li>
              <li>✉️ info@rssehatsentosa.id</li>
              <li className="mt-3 text-xs text-slate-500">
                IGD & Ambulans 24 Jam
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-slate-200 pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500">
          <p>
            © {new Date().getFullYear()} RS Sehat Sentosa. Seluruh hak cipta
            dilindungi.
          </p>
          <p className="mt-2 md:mt-0">Terintegrasi SATUSEHAT Kemenkes</p>
        </div>
      </div>
    </footer>
    // <footer className="bg-black px-12 py-16 text-sm text-gray-400">
    //   <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 md:grid-cols-3">
    //     {/* BRAND */}
    //     <div>
    //       <h3 className="mb-4 text-lg font-semibold text-white">Horizon</h3>
    //       <p className="max-w-xs">
    //         Curated journeys through the world’s most inspiring destinations.
    //       </p>
    //     </div>

    //     {/* NAV */}
    //     <div>
    //       <h4 className="mb-4 text-white">Navigation</h4>
    //       <ul className="space-y-2">
    //         <li>Home</li>
    //         <li>Destinations</li>
    //         <li>About</li>
    //         <li>Contact</li>
    //       </ul>
    //     </div>

    //     {/* SOCIAL */}
    //     <div>
    //       <h4 className="mb-4 text-white">Follow Us</h4>
    //       <ul className="space-y-2">
    //         <li>Instagram</li>
    //         <li>Twitter</li>
    //         <li>LinkedIn</li>
    //       </ul>
    //     </div>
    //   </div>

    //   <div className="mt-16 border-t border-white/10 pt-6 text-center text-xs">
    //     © {new Date().getFullYear()} Horizon. All rights reserved.
    //   </div>
    // </footer>
  );
}
