import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Briefcase, Calendar, Banknote, Building2 } from "lucide-react";
import { Placement } from "@prisma/client";

export const revalidate = 0;

export default async function CareersPage() {
  let placements: Placement[] = [];
  let dbError = false;

  try {
    placements = await prisma.placement.findMany({
      orderBy: { datePosted: "desc" },
    });
  } catch (error) {
    console.error("Database fetch error for placements:", error);
    dbError = true;
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(30,58,138,0.3),transparent)] z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif">
            Career & Placements
          </h1>
          <p className="text-slate-300 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Explore exciting career opportunities brought to you by our recruitment cell and premium corporate alliance.
          </p>
        </div>
      </section>

      {/* Main Placement Opportunities Container */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {dbError ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h3 className="text-red-800 font-bold text-lg">Database Connection Pending</h3>
            <p className="text-red-700 text-sm mt-2">
              We couldn&apos;t connect to the database. Ensure your connection settings in `.env` are correct.
            </p>
          </div>
        ) : placements.length === 0 ? (
          <div className="bg-white rounded-xl border border-slate-100 p-12 text-center shadow-sm max-w-2xl mx-auto">
            <Briefcase className="w-12 h-12 text-slate-400 mx-auto" />
            <h3 className="text-slate-800 font-bold text-xl mt-4">
              No Placement Opportunities Available
            </h3>
            <p className="text-slate-500 text-sm mt-2">
              No current placement opportunities. Please check back soon.
            </p>
            <div className="mt-8">
              <Link
                href="/contact"
                className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2.5 px-6 rounded transition shadow-sm text-sm"
              >
                Register for Placement Assistance
              </Link>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {placements.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl border border-slate-100 p-6 sm:p-8 shadow-sm flex flex-col md:flex-row gap-6 items-start hover:shadow-md transition-shadow"
              >
                {/* Company Logo container */}
                <div className="h-16 w-16 sm:h-20 sm:w-20 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center p-2 shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={job.logoUrl}
                    alt={job.companyName}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                {/* Info block */}
                <div className="flex-grow space-y-3">
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-xl font-bold text-blue-900 font-serif">
                      {job.role}
                    </h3>
                    <span className="text-xs bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold flex items-center gap-1">
                      <Building2 className="w-3.5 h-3.5 text-slate-500" />
                      {job.companyName}
                    </span>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed">
                    {job.description}
                  </p>

                  <div className="flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm pt-2">
                    <span className="flex items-center text-slate-500 gap-1.5">
                      <Banknote className="w-4.5 h-4.5 text-red-700 shrink-0" />
                      <strong>Package/CTC:</strong> {job.package}
                    </span>
                    <span className="flex items-center text-slate-500 gap-1.5">
                      <Calendar className="w-4.5 h-4.5 text-red-700 shrink-0" />
                      <strong>Posted:</strong>{" "}
                      {new Date(job.datePosted).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>
                </div>

                {/* Apply CTA */}
                <div className="w-full md:w-auto shrink-0 self-center">
                  <Link
                    href={`/contact?source=placement&company=${encodeURIComponent(
                      job.companyName
                    )}&role=${encodeURIComponent(job.role)}`}
                    className="w-full md:w-auto bg-red-700 text-white font-bold py-2.5 px-6 rounded text-center block hover:bg-red-800 transition-colors text-sm shadow-sm"
                  >
                    Apply Now
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Corporate Recruitment Section */}
        <section className="mt-20 bg-slate-900 text-white rounded-2xl p-8 sm:p-12 relative overflow-hidden shadow-xl">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(153,27,27,0.3),transparent)] z-0" />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold font-serif text-yellow-500">
                Are You a Recruiter?
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                Connect with our Training & Placement Officer to schedule campus drives, internship interviews, and hiring events. We offer customized recruitment programs.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 lg:justify-end">
              <a
                href="mailto:support@peacecollege.site?subject=Recruitment%20Query"
                className="bg-yellow-500 hover:bg-yellow-600 text-slate-900 font-bold px-6 py-3 rounded text-center transition text-sm shrink-0 shadow-sm"
              >
                Send Hiring Query
              </a>
              <Link
                href="/contact"
                className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-bold px-6 py-3 rounded text-center transition text-sm shrink-0"
              >
                View General Contact
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
