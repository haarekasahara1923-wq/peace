import Link from "next/link";
import { COLLEGE_INFO } from "@/lib/constants";
import { ArrowRight, BookOpen, GraduationCap, ShieldCheck, Award, Briefcase, PhoneCall } from "lucide-react";

export default function HomePage() {
  const stats = [
    { label: "Placement Rate", value: "100%", sub: "Assistance Program" },
    { label: "Highest Package", value: "12.5 LPA", sub: "National & Global Offers" },
    { label: "Corporate Partners", value: "45+", sub: "Recruiting Annually" },
    { label: "Elite Specializations", value: "8+", sub: "Industry-aligned Streams" },
  ];

  const highlights = [
    {
      icon: <GraduationCap className="w-8 h-8 text-yellow-500" />,
      title: "AICTE Approved MBA",
      desc: "Our two-year postgraduate degree is approved by AICTE, ensuring top-tier curriculum quality and industry-wide recognition.",
    },
    {
      icon: <BookOpen className="w-8 h-8 text-yellow-500" />,
      title: "Case-Study Methodology",
      desc: "Go beyond theoretical concepts with intensive case discussions, live industry projects, and simulation workshops.",
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-yellow-500" />,
      title: "State-of-the-Art Infrastructure",
      desc: "Modern classrooms, computer labs, library, and active seminar halls in our campus at Morar, Gwalior.",
    },
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-slate-900 text-white py-20 lg:py-32">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(30,58,138,0.4),transparent)] z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_70%,rgba(153,27,27,0.3),transparent)] z-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Hero Text */}
          <div className="flex flex-col space-y-6 text-center lg:text-left">
            <span className="inline-flex items-center self-center lg:self-start bg-red-800/80 text-yellow-400 text-xs font-semibold px-4 py-1.5 rounded-full border border-red-700 uppercase tracking-widest">
              🎓 Admissions Open for 2026-2027
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-white font-serif">
              Shape Your Future in <br />
              <span className="text-yellow-500">Business Management</span>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Peace College of Management provides an elite MBA program designed to build leaders, innovators, and entrepreneurs. Learn from the best, interact with industry mentors, and launch your career with top brands.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Link
                href="/contact"
                className="bg-red-700 hover:bg-red-800 text-white font-bold px-8 py-3.5 rounded text-center transition shadow-lg flex items-center justify-center gap-2 group text-sm sm:text-base"
              >
                <span>Apply Online Now</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <a
                href={`tel:${COLLEGE_INFO.phoneRaw}`}
                className="bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 font-bold px-8 py-3.5 rounded text-center transition flex items-center justify-center gap-2 text-sm sm:text-base"
              >
                <PhoneCall className="w-5 h-5 text-yellow-500" />
                <span>Call Admissions</span>
              </a>
            </div>
          </div>

          {/* Right Hero Image Card (Visual Mockup) */}
          <div className="relative mx-auto lg:ml-auto max-w-md w-full">
            <div className="absolute inset-0 bg-gradient-to-tr from-yellow-500 to-red-600 rounded-2xl blur-lg opacity-30 animate-pulse" />
            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-2xl p-6 sm:p-8 relative shadow-2xl">
              <h3 className="text-xl font-bold text-yellow-500 border-b border-slate-700 pb-3 font-serif">
                Why Choose Peace?
              </h3>
              <ul className="space-y-4 pt-4 text-sm sm:text-base">
                <li className="flex items-start gap-3">
                  <Award className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p>AICTE Approved & affiliated premium management curriculum.</p>
                </li>
                <li className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p>Comprehensive Career & Placement Training with 100% placement help.</p>
                </li>
                <li className="flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                  <p>Dual Specializations in Finance, HR, Marketing, Analytics, IT, and more.</p>
                </li>
              </ul>
              <div className="mt-8 pt-4 border-t border-slate-700 flex justify-between items-center text-xs text-slate-400">
                <span>📍 Gwalior, MP</span>
                <span>🎓 2-Year Full Time MBA</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="-mt-8 relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="bg-white rounded-xl shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-6 p-6 sm:p-8 border border-slate-100 divide-y-0 divide-x-0 divide-slate-100 md:divide-x">
          {stats.map((stat, i) => (
            <div key={i} className="text-center p-3 flex flex-col justify-center">
              <span className="text-3xl sm:text-4xl font-extrabold text-blue-900 leading-none">
                {stat.value}
              </span>
              <span className="text-xs sm:text-sm font-bold text-slate-700 mt-2">
                {stat.label}
              </span>
              <span className="text-xxs sm:text-xs text-slate-400 mt-0.5">
                {stat.sub}
              </span>
            </div>
          ))}
        </div>
      </section>

      {/* About Highlights */}
      <section className="py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-xs font-bold uppercase tracking-widest text-red-700">
              Institution Overview
            </h2>
            <p className="text-3xl sm:text-4xl font-bold font-serif text-blue-900 mt-2">
              Transforming Students Into Global Management Leaders
            </p>
            <div className="w-16 h-1 bg-red-700 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((hl, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-slate-100 p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col space-y-4"
              >
                <div className="p-3 bg-red-50 rounded-lg w-fit">
                  {hl.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-900">
                  {hl.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  {hl.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Actions / Next Steps */}
      <section className="bg-red-800 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_right,rgba(30,58,138,0.3),transparent)] z-0" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 flex flex-col items-center space-y-6">
          <h2 className="text-2xl sm:text-4xl font-bold font-serif">
            Ready to Begin Your Corporate Leadership Journey?
          </h2>
          <p className="text-slate-200 text-sm sm:text-base max-w-2xl leading-relaxed">
            Admissions process is straightforward. Submit your inquiry form online, get scheduled for counseling, verify your documents, and secure your MBA specialization seat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 pt-4 w-full justify-center">
            <Link
              href="/contact"
              className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold px-8 py-3.5 rounded transition shadow-md text-sm sm:text-base"
            >
              Fill Admission Inquiry Form
            </Link>
            <Link
              href="/courses"
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-bold px-8 py-3.5 rounded transition text-sm sm:text-base"
            >
              Explore Specializations
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
