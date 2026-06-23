import { COLLEGE_INFO } from "@/lib/constants";
import { Award, Compass, Eye, ShieldCheck, MapPin } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="bg-slate-50">
      {/* Subpage Header Banner */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(30,58,138,0.3),transparent)] z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif">
            About Our Institute
          </h1>
          <p className="text-slate-300 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Learn about Peace College of Management&apos;s history, mission, vision, and campus facilities in Gwalior.
          </p>
        </div>
      </section>

      {/* College Introduction Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-700">
              Welcome to Peace
            </h2>
            <p className="text-3xl font-bold font-serif text-blue-900 leading-tight">
              Pioneering Management Education with Academic Rigor & Corporate Realism
            </p>
            <div className="w-12 h-1 bg-red-700" />
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Peace College of Management stands as a premier business school dedicated to grooming the next generation of industry leaders. Located in Gwalior, Madhya Pradesh, we provide an academic environment that combines technical expertise, managerial proficiency, and high ethical standards.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              Our AICTE-approved MBA program focuses heavily on case-study analysis, professional presentations, internships, and corporate connections. We pride ourselves on creating career-ready students who possess a global outlook and the capability to solve complex business problems.
            </p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex items-start gap-4">
              <Award className="w-8 h-8 text-yellow-500 shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900">AICTE Approved</h3>
                <p className="text-slate-50 text-xs mt-1 text-slate-500">Fully validated curriculum ensuring high national standards.</p>
              </div>
            </div>
            <div className="bg-white border border-slate-100 rounded-xl p-6 shadow-sm flex items-start gap-4">
              <ShieldCheck className="w-8 h-8 text-yellow-500 shrink-0" />
              <div>
                <h3 className="font-bold text-blue-900">Modern Facilities</h3>
                <p className="text-slate-50 text-xs mt-1 text-slate-500">Equipped with computer labs, high-speed Wi-Fi, and libraries.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-16 bg-blue-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(153,27,27,0.2),transparent)] z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12">
          
          {/* Vision */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-10 flex flex-col space-y-4">
            <div className="p-3 bg-red-800/80 rounded-xl w-fit">
              <Eye className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-white">Our Vision</h3>
            <p className="text-slate-300 text-sm leading-relaxed">
              To be recognized as a center of excellence in management education, producing ethical, creative, and globally competent leaders who contribute positively to businesses and society.
            </p>
          </div>

          {/* Mission */}
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8 sm:p-10 flex flex-col space-y-4">
            <div className="p-3 bg-red-800/80 rounded-xl w-fit">
              <Compass className="w-8 h-8 text-yellow-400" />
            </div>
            <h3 className="text-2xl font-bold font-serif text-white">Our Mission</h3>
            <ul className="text-slate-300 text-sm space-y-2.5 leading-relaxed">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>To deliver high-quality, practical business education designed for global challenges.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>To bridge the gap between academia and corporate requirements through constant industry interface.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold">•</span>
                <span>To foster entrepreneurship, research, leadership, and ethical decision-making.</span>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* Addresses and Offices Section */}
      <section className="py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-700">
              Locate Us
            </h2>
            <p className="text-3xl font-bold font-serif text-blue-900 mt-2">
              Our Campuses & Offices
            </p>
            <div className="w-12 h-1 bg-red-700 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            
            {/* Campus Address Card */}
            <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm flex flex-col justify-between">
              <div className="flex flex-col space-y-4">
                <div className="p-3 bg-red-50 rounded-lg w-fit">
                  <MapPin className="w-6 h-6 text-red-700" />
                </div>
                <h3 className="text-xl font-bold text-blue-950 font-serif">College Campus</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {COLLEGE_INFO.campusAddress}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Morar, Gwalior (M.P.)</span>
                <span className="font-semibold text-red-700">Academic Wing</span>
              </div>
            </div>

            {/* City Office Card */}
            <div className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm flex flex-col justify-between">
              <div className="flex flex-col space-y-4">
                <div className="p-3 bg-red-50 rounded-lg w-fit">
                  <MapPin className="w-6 h-6 text-red-700" />
                </div>
                <h3 className="text-xl font-bold text-blue-950 font-serif">City Office</h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {COLLEGE_INFO.officeAddress}
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Morar, Gwalior (M.P.)</span>
                <span className="font-semibold text-red-700">Admissions & Queries</span>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
