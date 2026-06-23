import { COLLEGE_INFO } from "@/lib/constants";

export default function DisclaimerPage() {
  return (
    <div className="bg-slate-50 min-h-screen pb-16">
      {/* Page Header */}
      <section className="bg-slate-900 text-white py-12 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h1 className="text-3xl font-extrabold font-serif">Disclaimer</h1>
          <p className="text-slate-300 mt-2 text-sm">
            Important notices and limits of liability regarding the contents of this website.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 bg-white border border-slate-100 rounded-xl p-8 sm:p-12 shadow-sm text-sm sm:text-base text-slate-700 space-y-6 leading-relaxed">
        <p className="text-xs text-slate-400">Last updated: June 2026</p>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-900 font-serif border-b border-slate-100 pb-2">
            General Information Disclosure
          </h2>
          <p>
            The information contained on this website is for general educational and informational purposes only. The information is provided by Peace College of Management, and while we endeavor to keep the information up-to-date and correct, we make no representations or warranties of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or availability with respect to the website or the information, courses, services, or related graphics contained on the website for any purpose. Any reliance you place on such information is therefore strictly at your own risk.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-900 font-serif border-b border-slate-100 pb-2">
            Admissions and Course Content
          </h2>
          <p>
            Courses, syllabus structures, fee schedules, eligibility criteria, and academic policies listed on this website may change in response to AICTE guidelines, university notifications, or management directives. The college does not guarantee the availability of seats for any specialization until provisional registration fees are paid and verified in person.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-900 font-serif border-b border-slate-100 pb-2">
            Placements and Careers
          </h2>
          <p>
            All information regarding placement packages, recruiters, average salaries, and recruiting partners represents past performance. While the college provides full training and placement cell assistance to all eligible students, past performance does not guarantee future results. Securing a placement is subject to the candidate&apos;s academic performance, personality traits, performance in interview rounds, and selection criteria set by the respective recruiters. The college makes no guarantee of employment or specific salary packages for any student.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-900 font-serif border-b border-slate-100 pb-2">
            External Links Disclaimer
          </h2>
          <p>
            Through this website, you may be able to link to other websites (including but not limited to the AICTE website, affiliated university websites, or social media pages). These external sites are not under the control of Peace College of Management. We have no control over the nature, content, and availability of those sites. The inclusion of any links does not necessarily imply a recommendation or endorse the views expressed within them.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-900 font-serif border-b border-slate-100 pb-2">
            Technological Contingencies
          </h2>
          <p>
            Every effort is made to keep the website up and running smoothly. However, Peace College of Management takes no responsibility for, and will not be liable for, the website being temporarily unavailable due to technical issues beyond our control.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-blue-900 font-serif border-b border-slate-100 pb-2">
            Queries and Support
          </h2>
          <p>
            If you have any questions or require formal verification of any content, please contact us at:
          </p>
          <ul className="list-disc list-inside space-y-1 text-slate-600 pl-2">
            <li><strong>Email:</strong> {COLLEGE_INFO.email}</li>
            <li><strong>Phone:</strong> {COLLEGE_INFO.phone}</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
