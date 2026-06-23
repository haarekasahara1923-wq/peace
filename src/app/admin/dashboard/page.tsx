import { prisma } from "@/lib/prisma";
import AdminDashboardClient from "@/components/AdminDashboardClient";
import Link from "next/link";
import { LogOut } from "lucide-react";
import { logoutAdmin } from "@/app/actions/auth";
import { Course, Placement, ContactSubmission } from "@prisma/client";

export const revalidate = 0;

export default async function AdminDashboardPage() {
  let courses: Course[] = [];
  let placements: Placement[] = [];
  let submissions: ContactSubmission[] = [];
  let dbError = false;

  try {
    courses = await prisma.course.findMany({
      orderBy: { stream: "asc" },
    });
    placements = await prisma.placement.findMany({
      orderBy: { datePosted: "desc" },
    });
    submissions = await prisma.contactSubmission.findMany({
      orderBy: { submittedAt: "desc" },
    });
  } catch (error) {
    console.error("Dashboard database fetch error:", error);
    dbError = true;
  }

  // Logout wrapper action
  const handleLogout = async () => {
    "use server";
    await logoutAdmin();
  };

  if (dbError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
        <div className="max-w-md w-full bg-slate-800 border border-slate-700 p-8 rounded-xl text-center space-y-4">
          <h2 className="text-red-500 font-bold text-xl">Database Error</h2>
          <p className="text-slate-300 text-sm">
            Failed to connect to the database. Ensure your Neon Postgres connection string is configured and you have run migrations.
          </p>
          <div className="pt-4">
            <Link
              href="/"
              className="bg-slate-700 hover:bg-slate-650 text-white font-semibold py-2.5 px-6 rounded text-sm inline-block"
            >
              Go to Home Page
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Admin Header */}
      <header className="bg-slate-900 text-white py-4 px-6 sticky top-0 z-40 flex justify-between items-center border-b border-slate-800">
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold font-serif tracking-tight text-white leading-none">
            PEACE
          </span>
          <span className="text-[10px] bg-red-800 text-yellow-400 font-bold px-2 py-0.5 rounded tracking-wide uppercase">
            Admin Panel
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-400 hidden sm:inline">
            Logged in as admin@peacecollege.site
          </span>
          <form action={handleLogout}>
            <button
              type="submit"
              className="bg-red-900 hover:bg-red-800 text-white text-xs font-semibold py-1.5 px-3 rounded flex items-center gap-1.5 transition-colors border border-red-800"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </form>
        </div>
      </header>

      {/* Main Dashboard Client */}
      <AdminDashboardClient
        initialCourses={courses}
        initialPlacements={placements}
        initialSubmissions={submissions}
      />
    </div>
  );
}
