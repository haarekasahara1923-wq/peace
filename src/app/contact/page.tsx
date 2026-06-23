"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { submitContactForm } from "@/app/actions/contact";
import { COLLEGE_INFO, MBA_SPECIALIZATIONS } from "@/lib/constants";
import { Phone, Mail, MapPin, CheckCircle2, MessageSquare, AlertCircle } from "lucide-react";

function ContactForm() {
  const searchParams = useSearchParams();
  const [studentName, setStudentName] = useState("");
  const [course, setCourse] = useState("");
  const [contactNo, setContactNo] = useState("");
  const [email, setEmail] = useState("");
  
  const [status, setStatus] = useState<{
    type: "idle" | "loading" | "success" | "error";
    message: string;
  }>({ type: "idle", message: "" });

  const [whatsappUrl, setWhatsappUrl] = useState("");

  // Pre-fill course from query param if available
  useEffect(() => {
    const courseParam = searchParams.get("course");
    if (courseParam) {
      const match = MBA_SPECIALIZATIONS.find(
        (s) => s.name.toLowerCase() === courseParam.toLowerCase() || s.name.includes(courseParam)
      );
      if (match) {
        setCourse(match.name);
      } else {
        setCourse(courseParam);
      }
    }

    const companyParam = searchParams.get("company");
    const roleParam = searchParams.get("role");
    if (companyParam && roleParam) {
      setStudentName(`[Placement Inquiry for ${roleParam} at ${companyParam}] `);
    }
  }, [searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ type: "loading", message: "Submitting inquiry..." });
    setWhatsappUrl("");

    const formData = new FormData();
    formData.append("studentName", studentName);
    formData.append("course", course);
    formData.append("contactNo", contactNo);
    formData.append("email", email);

    try {
      const res = await submitContactForm(formData);

      if (res.error) {
        setStatus({ type: "error", message: res.error });
        return;
      }

      if (res.success && res.submission) {
        setStatus({
          type: "success",
          message: "Your admission inquiry was successfully submitted!",
        });

        // Clear Form
        setStudentName("");
        setCourse("");
        setContactNo("");
        setEmail("");

        // Build WhatsApp text
        const messageText = `Hello Peace College Admin, I am interested in MBA admissions.
Name: ${res.submission.studentName}
Course: ${res.submission.course}
Contact No: ${res.submission.contactNo}
${res.submission.email ? `Email: ${res.submission.email}` : ""}`;

        // Note: WhatsApp's official click-to-chat link opens a pre-filled chat, 
        // but the user must tap Send themselves — there is no way for a website 
        // to auto-send a WhatsApp message without user action (WhatsApp does not 
        // allow this for any number that isn't integrated with the paid WhatsApp Business API).
        // Implementing the wa.me redirect as the closest equivalent.
        const waUrl = `${COLLEGE_INFO.whatsappLink}?text=${encodeURIComponent(messageText)}`;
        setWhatsappUrl(waUrl);

        // Open in new tab
        window.open(waUrl, "_blank");
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
      {/* Left Column: Contact info */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <h2 className="text-3xl font-bold font-serif text-blue-900 leading-tight">
            Get in Touch
          </h2>
          <p className="text-slate-600 text-sm mt-3 leading-relaxed">
            Have questions about admissions, fees, syllabus, or hostel facilities? Drop your inquiry here or contact us directly on phone/WhatsApp.
          </p>
        </div>

        <div className="space-y-6 text-sm">
          {/* Phone */}
          <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div className="p-3 bg-red-50 text-red-700 rounded-lg">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-sm">Call & WhatsApp</h3>
              <a
                href={`tel:${COLLEGE_INFO.phoneRaw}`}
                className="text-slate-600 hover:text-red-700 font-semibold block mt-1"
              >
                {COLLEGE_INFO.phone} (WhatsApp Enabled)
              </a>
              <span className="text-xs text-slate-400">Available 9:00 AM to 6:00 PM</span>
            </div>
          </div>

          {/* Email */}
          <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div className="p-3 bg-red-50 text-red-700 rounded-lg">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-blue-900 text-sm">Email Admissions</h3>
              <a
                href={`mailto:${COLLEGE_INFO.email}`}
                className="text-slate-600 hover:text-red-700 font-semibold block mt-1"
              >
                {COLLEGE_INFO.email}
              </a>
            </div>
          </div>

          {/* Addresses */}
          <div className="flex items-start gap-4 bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
            <div className="p-3 bg-red-50 text-red-700 rounded-lg">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="space-y-3">
              <div>
                <h4 className="font-bold text-blue-900 text-xs uppercase tracking-wider text-yellow-600">
                  Campus Address
                </h4>
                <p className="text-slate-600 text-xs mt-0.5">{COLLEGE_INFO.campusAddress}</p>
              </div>
              <div className="border-t border-slate-100 pt-2">
                <h4 className="font-bold text-blue-900 text-xs uppercase tracking-wider text-yellow-600">
                  City Office Address
                </h4>
                <p className="text-slate-600 text-xs mt-0.5">{COLLEGE_INFO.officeAddress}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-100 p-8 shadow-md">
        <h3 className="text-xl font-bold text-blue-950 font-serif border-b border-slate-100 pb-4">
          Admission Inquiry Form
        </h3>

        {status.type === "success" ? (
          <div className="mt-6 space-y-6 text-center py-6">
            <div className="p-3 bg-green-50 text-green-700 rounded-full w-fit mx-auto">
              <CheckCircle2 className="w-12 h-12" />
            </div>
            <div className="space-y-2">
              <h4 className="text-xl font-bold text-slate-800">Form Submitted Successfully!</h4>
              <p className="text-slate-500 text-sm max-w-md mx-auto">
                {status.message} We are redirecting you to WhatsApp to connect with our admissions officer immediately.
              </p>
            </div>

            {whatsappUrl && (
              <div className="pt-4">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-colors"
                >
                  <MessageSquare className="w-5 h-5 fill-white" />
                  <span>Open Chat on WhatsApp</span>
                </a>
                <p className="text-xxs text-slate-400 mt-2">
                  If WhatsApp did not open automatically, please click the button above.
                </p>
              </div>
            )}

            <button
              onClick={() => setStatus({ type: "idle", message: "" })}
              className="text-xs text-red-700 font-semibold hover:underline block mx-auto pt-4"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 mt-6">
            {status.type === "error" && (
              <div className="bg-red-50 border border-red-200 text-red-800 text-sm rounded-lg p-4 flex items-center gap-2.5">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{status.message}</span>
              </div>
            )}

            {/* Student Name */}
            <div>
              <label htmlFor="studentName" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Name of Student <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="studentName"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="Enter student's full name"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-red-700 focus:outline-none transition-colors"
                required
                disabled={status.type === "loading"}
              />
            </div>

            {/* Course Interest Dropdown */}
            <div>
              <label htmlFor="course" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                MBA Specialization Interest <span className="text-red-600">*</span>
              </label>
              <select
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-red-700 focus:outline-none transition-colors bg-white"
                required
                disabled={status.type === "loading"}
              >
                <option value="">-- Select Specialization --</option>
                {MBA_SPECIALIZATIONS.map((spec) => (
                  <option key={spec.id} value={spec.name}>
                    {spec.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Contact No. */}
            <div>
              <label htmlFor="contactNo" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Contact No. (WhatsApp Preferred) <span className="text-red-600">*</span>
              </label>
              <input
                type="tel"
                id="contactNo"
                value={contactNo}
                onChange={(e) => setContactNo(e.target.value)}
                placeholder="Enter 10-digit mobile number"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-red-700 focus:outline-none transition-colors"
                required
                disabled={status.type === "loading"}
              />
              <span className="text-[10px] text-slate-400 block mt-1">
                Must be a valid 10-digit Indian mobile number (e.g. 7999453467).
              </span>
            </div>

            {/* Email ID */}
            <div>
              <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Email ID <span className="text-slate-400">(Optional)</span>
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter student's email address"
                className="w-full border border-slate-200 rounded-lg px-4 py-2.5 text-sm focus:border-red-700 focus:outline-none transition-colors"
                disabled={status.type === "loading"}
              />
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={status.type === "loading"}
                className="w-full bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-4 rounded-lg shadow transition-colors text-sm sm:text-base flex items-center justify-center gap-2"
              >
                {status.type === "loading" ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    <span>Submitting Inquiry...</span>
                  </>
                ) : (
                  <span>Submit Inquiry & Connect via WhatsApp</span>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Page Header */}
      <section className="bg-slate-900 text-white py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(30,58,138,0.3),transparent)] z-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-serif">
            Contact & Support
          </h1>
          <p className="text-slate-300 mt-3 text-sm sm:text-base max-w-xl mx-auto">
            Get in touch with our admissions department to clarify queries or register for counselling.
          </p>
        </div>
      </section>

      {/* Main Form container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <Suspense fallback={<div className="text-center py-12 text-slate-500">Loading form...</div>}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}
