import { COLLEGE_INFO } from "@/lib/constants";

export default function TermsPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Page Header */}
      <section className="bg-slate-900 text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl font-extrabold font-serif">Terms & Conditions</h1>
          <p className="text-slate-300 mt-2 text-sm">
            Please read these terms carefully before using our website or submitting admissions forms.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 bg-white border border-slate-100 rounded-xl p-8 sm:p-12 shadow-sm text-sm sm:text-base text-slate-700 space-y-6 leading-relaxed">
        <p className="text-xs text-slate-400">Last updated: June 2026</p>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-900 font-serif border-b border-slate-100 pb-2">
            1. Acceptance of Terms
          </h2>
          <p>
            By accessing and using this website (the &quot;Site&quot;), representing Peace College of Management, you agree to comply with and be bound by the following terms, conditions, and notices. If you do not agree to these terms, please do not use the Site.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-900 font-serif border-b border-slate-100 pb-2">
            2. Educational Services & Admissions
          </h2>
          <p>
            All descriptions of courses, eligibility criteria, fees, duration, and placement opportunities on this website are subject to change. The college reserves the right to modify the course structure, curriculum, admissions criteria, and scheduling in compliance with AICTE guidelines and regulatory standards.
          </p>
          <p>
            Filling out the Admission Inquiry Form does not guarantee admission. Admissions are finalized only after physical document verification, completion of the counseling process, and payment of the required fees.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-900 font-serif border-b border-slate-100 pb-2">
            3. Accuracy of Student Information
          </h2>
          <p>
            When submitting inquiries or applications, you agree to provide true, accurate, and current information. If any information provided is found to be false, misleading, or fraudulent, the college reserves the right to reject the inquiry or cancel any provisional admission granted.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-900 font-serif border-b border-slate-100 pb-2">
            4. Communication Policy
          </h2>
          <p>
            By submitting your phone number and email on this website, you consent to receive telephone calls, WhatsApp messages, and email notifications from the Peace College of Management admissions department. Standard data rates may apply. You may opt out of future marketing communications by replying to our messages or contacting support.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-900 font-serif border-b border-slate-100 pb-2">
            5. Intellectual Property
          </h2>
          <p>
            The content, logo, graphics, design, database structure, and coding on this website are the intellectual property of Peace College of Management. Unauthorized duplication, modification, distribution, or scraping of content is strictly prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-900 font-serif border-b border-slate-100 pb-2">
            6. Limitation of Liability
          </h2>
          <p>
            While we strive to ensure the accuracy of all information on the Site, we do not warrant that all content is free from typographical errors, server downtime, or external technical issues. Peace College of Management shall not be liable for any direct or indirect damages arising out of the use or inability to use this website.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-900 font-serif border-b border-slate-100 pb-2">
            7. Contact Information
          </h2>
          <p>
            For any queries regarding these Terms and Conditions, please contact us:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
            <li><strong>Email:</strong> {COLLEGE_INFO.email}</li>
            <li><strong>Phone:</strong> {COLLEGE_INFO.phone}</li>
            <li><strong>Campus Address:</strong> {COLLEGE_INFO.campusAddress}</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
