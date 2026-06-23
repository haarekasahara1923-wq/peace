import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { GraduationCap, Clock, CheckCircle } from "lucide-react";
import { Course } from "@prisma/client";

export const revalidate = 0; // Disable cache so it fetches fresh DB content

export default async function CoursesPage() {
  let courses: Course[] = [];
  let dbError = false;

  try {
    courses = await prisma.course.findMany({
      orderBy: { stream: "asc" },
    });
  } catch (error) {
    console.error("Database fetch error for courses:", error);
    dbError = true;
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Page Header */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(30,58,138,0.3),transparent)] z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif">
            MBA Specializations Offered
          </h1>
          <p className="text-slate-300 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Choose your career path from our elite, AICTE-approved MBA specializations tailored for the modern economy.
          </p>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        {dbError ? (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-2xl mx-auto text-center">
            <h3 className="text-red-800 font-bold text-lg">Database Connection Pending</h3>
            <p className="text-red-700 text-sm mt-2">
              We couldn&apos;t connect to the database to fetch courses. If you are setting up the project, please ensure:
            </p>
            <ul className="text-red-700 text-xs mt-3 space-y-1 text-left list-disc list-inside max-w-md mx-auto">
              <li>Your database connection string `DATABASE_URL` is configured in `.env`.</li>
              <li>You have executed `npx prisma db push` to create the tables.</li>
              <li>You have run `npx prisma db seed` to insert the initial course data.</li>
            </ul>
          </div>
        ) : courses.length === 0 ? (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 max-w-2xl mx-auto text-center">
            <h3 className="text-amber-800 font-bold text-lg">No Courses Found</h3>
            <p className="text-amber-700 text-sm mt-1">
              There are no courses seeded in the database. Please run:
            </p>
            <code className="block bg-slate-900 text-amber-300 text-xs py-2 px-4 rounded mt-3 select-all">
              npx prisma db seed
            </code>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden flex flex-col justify-between hover:shadow-md transition-shadow group"
              >
                <div>
                  {/* Course Image */}
                  <div className="h-48 w-full overflow-hidden relative bg-slate-100">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={course.image}
                      alt={course.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 bg-red-800 text-white font-bold text-xxs px-2.5 py-1 rounded uppercase tracking-wider">
                      MBA Stream
                    </div>
                  </div>

                  {/* Course Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-blue-900 group-hover:text-red-700 transition-colors font-serif">
                      {course.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm mt-3 leading-relaxed">
                      {course.description}
                    </p>

                    {/* Course Details Block */}
                    <div className="mt-6 space-y-3 pt-4 border-t border-slate-100 text-xs sm:text-sm">
                      <div className="flex items-center text-slate-700 gap-2">
                        <Clock className="w-4 h-4 text-red-700 shrink-0" />
                        <span>
                          <strong>Duration:</strong> {course.duration}
                        </span>
                      </div>
                      <div className="flex items-start text-slate-700 gap-2">
                        <GraduationCap className="w-4 h-4 text-red-700 shrink-0 mt-0.5" />
                        <span>
                          <strong>Eligibility:</strong> {course.eligibility}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card CTA */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/contact?course=${encodeURIComponent(course.title)}`}
                    className="w-full bg-blue-900 text-white font-semibold py-2.5 px-4 rounded text-center block hover:bg-red-800 transition-colors text-sm shadow-sm"
                  >
                    Apply for Specialization
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Dynamic Pedagogy Section */}
        <section className="mt-20 border-t border-slate-200 pt-16">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-bold font-serif text-blue-950">
              Our Educational Pedagogy
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Our curriculum blends theoretical learning with practical insights to prepare you for contemporary corporate environments.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              "Case Study & Simulations",
              "Seminars & Guest Lectures",
              "Industrial Internships",
              "Personality Grooming Labs",
            ].map((ped, i) => (
              <div
                key={i}
                className="bg-white rounded-lg border border-slate-100 p-5 shadow-sm text-center flex flex-col items-center justify-center space-y-2"
              >
                <CheckCircle className="w-6 h-6 text-green-600" />
                <span className="font-semibold text-slate-800 text-sm">{ped}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
