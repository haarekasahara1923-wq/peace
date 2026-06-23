"use client";

import { useState } from "react";
import {
  createCourse,
  updateCourse,
  deleteCourse,
} from "@/app/actions/courses";
import {
  createPlacement,
  updatePlacement,
  deletePlacement,
} from "@/app/actions/placements";
import {
  Plus,
  Edit2,
  Trash2,
  Layers,
  Briefcase,
  Inbox,
  Image as ImageIcon,
  AlertCircle,
  Search,
} from "lucide-react";

interface Course {
  id: string;
  title: string;
  stream: string;
  description: string;
  duration: string;
  eligibility: string;
  image: string;
}

interface Placement {
  id: string;
  companyName: string;
  role: string;
  package: string;
  description: string;
  logoUrl: string;
  datePosted: Date;
}

interface Submission {
  id: string;
  studentName: string;
  course: string;
  contactNo: string;
  email: string | null;
  submittedAt: Date;
}

interface AdminDashboardClientProps {
  initialCourses: Course[];
  initialPlacements: Placement[];
  initialSubmissions: Submission[];
}

type TabType = "courses" | "placements" | "submissions";

export default function AdminDashboardClient({
  initialCourses,
  initialPlacements,
  initialSubmissions,
}: AdminDashboardClientProps) {
  const [activeTab, setActiveTab] = useState<TabType>("courses");

  // Local state to show updates dynamically
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [placements, setPlacements] = useState<Placement[]>(initialPlacements);
  const [submissions] = useState<Submission[]>(initialSubmissions);

  // Search filter for submissions
  const [subSearch, setSubSearch] = useState("");

  // Modals & Form States
  const [courseModal, setCourseModal] = useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    selectedId?: string;
  }>({ isOpen: false, mode: "add" });

  const [placementModal, setPlacementModal] = useState<{
    isOpen: boolean;
    mode: "add" | "edit";
    selectedId?: string;
  }>({ isOpen: false, mode: "add" });

  // Course Form Inputs
  const [courseTitle, setCourseTitle] = useState("");
  const [courseStream, setCourseStream] = useState("");
  const [courseDesc, setCourseDesc] = useState("");
  const [courseDur, setCourseDur] = useState("");
  const [courseElig, setCourseElig] = useState("");
  const [courseImg, setCourseImg] = useState<File | null>(null);

  // Placement Form Inputs
  const [compName, setCompName] = useState("");
  const [jobRole, setJobRole] = useState("");
  const [jobPackage, setJobPackage] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [compLogo, setCompLogo] = useState<File | null>(null);

  // Status alerts
  const [actionLoading, setActionLoading] = useState(false);
  const [actionStatus, setActionStatus] = useState<{
    type: "success" | "error" | "idle";
    message: string;
  }>({ type: "idle", message: "" });

  const resetCourseForm = () => {
    setCourseTitle("");
    setCourseStream("");
    setCourseDesc("");
    setCourseDur("");
    setCourseElig("");
    setCourseImg(null);
    setActionStatus({ type: "idle", message: "" });
  };

  const resetPlacementForm = () => {
    setCompName("");
    setJobRole("");
    setJobPackage("");
    setJobDesc("");
    setCompLogo(null);
    setActionStatus({ type: "idle", message: "" });
  };

  // COURSE CRUD HANDLERS
  const handleOpenCourseAdd = () => {
    resetCourseForm();
    setCourseModal({ isOpen: true, mode: "add" });
  };

  const handleOpenCourseEdit = (c: Course) => {
    setActionStatus({ type: "idle", message: "" });
    setCourseTitle(c.title);
    setCourseStream(c.stream);
    setCourseDesc(c.description);
    setCourseDur(c.duration);
    setCourseElig(c.eligibility);
    setCourseImg(null);
    setCourseModal({ isOpen: true, mode: "edit", selectedId: c.id });
  };

  const handleCourseSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setActionStatus({ type: "idle", message: "" });

    const formData = new FormData();
    formData.append("title", courseTitle);
    formData.append("stream", courseStream);
    formData.append("description", courseDesc);
    formData.append("duration", courseDur);
    formData.append("eligibility", courseElig);
    if (courseImg) {
      formData.append("image", courseImg);
    }

    try {
      if (courseModal.mode === "add") {
        const res = await createCourse(formData);
        if (res.error) {
          setActionStatus({ type: "error", message: res.error });
        } else if (res.success && res.course) {
          setCourses([...courses, res.course]);
          setCourseModal({ isOpen: false, mode: "add" });
        }
      } else {
        const id = courseModal.selectedId!;
        const res = await updateCourse(id, formData);
        if (res.error) {
          setActionStatus({ type: "error", message: res.error });
        } else if (res.success && res.course) {
          setCourses(courses.map((item) => (item.id === id ? res.course! : item)));
          setCourseModal({ isOpen: false, mode: "edit" });
        }
      }
    } catch (err) {
      console.error(err);
      setActionStatus({ type: "error", message: "Failed to save course." });
    } finally {
      setActionLoading(false);
    }
  };

  const handleCourseDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this course stream?")) return;
    try {
      const res = await deleteCourse(id);
      if (res.success) {
        setCourses(courses.filter((c) => c.id !== id));
      } else if (res.error) {
        alert(res.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete course.");
    }
  };

  // PLACEMENT CRUD HANDLERS
  const handleOpenPlacementAdd = () => {
    resetPlacementForm();
    setPlacementModal({ isOpen: true, mode: "add" });
  };

  const handleOpenPlacementEdit = (p: Placement) => {
    setActionStatus({ type: "idle", message: "" });
    setCompName(p.companyName);
    setJobRole(p.role);
    setJobPackage(p.package);
    setJobDesc(p.description);
    setCompLogo(null);
    setPlacementModal({ isOpen: true, mode: "edit", selectedId: p.id });
  };

  const handlePlacementSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setActionLoading(true);
    setActionStatus({ type: "idle", message: "" });

    const formData = new FormData();
    formData.append("companyName", compName);
    formData.append("role", jobRole);
    formData.append("package", jobPackage);
    formData.append("description", jobDesc);
    if (compLogo) {
      formData.append("logo", compLogo);
    }

    try {
      if (placementModal.mode === "add") {
        const res = await createPlacement(formData);
        if (res.error) {
          setActionStatus({ type: "error", message: res.error });
        } else if (res.success && res.placement) {
          // Date conversion helper
          const formatted = {
            ...res.placement,
            datePosted: new Date(res.placement.datePosted),
          };
          setPlacements([formatted, ...placements]);
          setPlacementModal({ isOpen: false, mode: "add" });
        }
      } else {
        const id = placementModal.selectedId!;
        const res = await updatePlacement(id, formData);
        if (res.error) {
          setActionStatus({ type: "error", message: res.error });
        } else if (res.success && res.placement) {
          const formatted = {
            ...res.placement,
            datePosted: new Date(res.placement.datePosted),
          };
          setPlacements(placements.map((item) => (item.id === id ? formatted : item)));
          setPlacementModal({ isOpen: false, mode: "edit" });
        }
      }
    } catch (err) {
      console.error(err);
      setActionStatus({ type: "error", message: "Failed to save placement." });
    } finally {
      setActionLoading(false);
    }
  };

  const handlePlacementDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this placement opportunity?")) return;
    try {
      const res = await deletePlacement(id);
      if (res.success) {
        setPlacements(placements.filter((p) => p.id !== id));
      } else if (res.error) {
        alert(res.error);
      }
    } catch (err) {
      console.error(err);
      alert("Failed to delete placement.");
    }
  };

  // FILTER SUBMISSIONS
  const filteredSubmissions = submissions.filter((sub) => {
    const term = subSearch.toLowerCase();
    return (
      sub.studentName.toLowerCase().includes(term) ||
      sub.course.toLowerCase().includes(term) ||
      sub.contactNo.includes(term) ||
      (sub.email && sub.email.toLowerCase().includes(term))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Navigation tabs */}
      <div className="flex border-b border-slate-200 mb-8 bg-white p-1.5 rounded-lg shadow-sm w-fit gap-2">
        <button
          onClick={() => setActiveTab("courses")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
            activeTab === "courses"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Manage Courses</span>
        </button>
        <button
          onClick={() => setActiveTab("placements")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
            activeTab === "placements"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Briefcase className="w-4 h-4" />
          <span>Manage Placements</span>
        </button>
        <button
          onClick={() => setActiveTab("submissions")}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
            activeTab === "submissions"
              ? "bg-slate-900 text-white"
              : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
          }`}
        >
          <Inbox className="w-4 h-4" />
          <span>Form Submissions</span>
          {submissions.length > 0 && (
            <span className="bg-red-700 text-white text-[10px] px-1.5 py-0.5 rounded-full font-bold ml-1">
              {submissions.length}
            </span>
          )}
        </button>
      </div>

      {/* ==================== COURSES TAB ==================== */}
      {activeTab === "courses" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Course Specializations</h2>
              <p className="text-xs text-slate-400">Add, edit, or remove MBA streams.</p>
            </div>
            <button
              onClick={handleOpenCourseAdd}
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded text-sm flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Add Specialization</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            {courses.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">No courses seeded yet. Click add specialization to create one.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                      <th className="py-3.5 px-6">Image</th>
                      <th className="py-3.5 px-6">Stream / Title</th>
                      <th className="py-3.5 px-6">Duration</th>
                      <th className="py-3.5 px-6">Eligibility</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 text-slate-600">
                    {courses.map((c) => (
                      <tr key={c.id} className="hover:bg-slate-50/50">
                        <td className="py-4 px-6">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={c.image}
                            alt={c.title}
                            className="w-16 h-10 object-cover rounded border border-slate-200"
                          />
                        </td>
                        <td className="py-4 px-6 font-semibold text-slate-800">
                          <div>{c.title}</div>
                          <div className="text-slate-400 font-normal text-xs">Stream: {c.stream}</div>
                        </td>
                        <td className="py-4 px-6 text-xs">{c.duration}</td>
                        <td className="py-4 px-6 text-xs max-w-xs truncate">{c.eligibility}</td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => handleOpenCourseEdit(c)}
                            className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 transition-colors inline-block"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleCourseDelete(c.id)}
                            className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition-colors inline-block"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== PLACEMENTS TAB ==================== */}
      {activeTab === "placements" && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Placement Opportunities</h2>
              <p className="text-xs text-slate-400">Post new job descriptions and company CTCs.</p>
            </div>
            <button
              onClick={handleOpenPlacementAdd}
              className="bg-red-700 hover:bg-red-800 text-white font-semibold py-2 px-4 rounded text-sm flex items-center gap-1.5 shadow"
            >
              <Plus className="w-4 h-4" />
              <span>Post Opportunity</span>
            </button>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            {placements.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">No placement opportunities posted yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                      <th className="py-3.5 px-6">Logo</th>
                      <th className="py-3.5 px-6">Company & Role</th>
                      <th className="py-3.5 px-6">CTC / Package</th>
                      <th className="py-3.5 px-6">Posted Date</th>
                      <th className="py-3.5 px-6 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 text-slate-600">
                    {placements.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50">
                        <td className="py-4 px-6">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={p.logoUrl}
                            alt={p.companyName}
                            className="h-10 w-10 object-contain rounded bg-slate-50 p-1 border border-slate-100"
                          />
                        </td>
                        <td className="py-4 px-6 font-semibold text-slate-800">
                          <div>{p.role}</div>
                          <div className="text-slate-400 font-normal text-xs">{p.companyName}</div>
                        </td>
                        <td className="py-4 px-6 text-xs text-red-700 font-bold">{p.package}</td>
                        <td className="py-4 px-6 text-xs">
                          {new Date(p.datePosted).toLocaleDateString("en-IN")}
                        </td>
                        <td className="py-4 px-6 text-right space-x-2">
                          <button
                            onClick={() => handleOpenPlacementEdit(p)}
                            className="text-blue-600 hover:text-blue-800 p-1.5 rounded hover:bg-blue-50 transition-colors inline-block"
                            title="Edit"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handlePlacementDelete(p.id)}
                            className="text-red-600 hover:text-red-800 p-1.5 rounded hover:bg-red-50 transition-colors inline-block"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== SUBMISSIONS TAB ==================== */}
      {activeTab === "submissions" && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Contact Us Submissions</h2>
              <p className="text-xs text-slate-400">Read inquiries submitted by prospective students.</p>
            </div>
            
            {/* Search Submissions */}
            <div className="relative max-w-xs w-full">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Search inquiries..."
                value={subSearch}
                onChange={(e) => setSubSearch(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-4 py-2 text-xs focus:border-red-700 focus:outline-none transition-colors shadow-sm"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            {filteredSubmissions.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-sm">No student inquiries matching criteria.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-sm">
                  <thead>
                    <tr className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                      <th className="py-3.5 px-6">Student Name</th>
                      <th className="py-3.5 px-6">Selected Course</th>
                      <th className="py-3.5 px-6">Contact Number</th>
                      <th className="py-3.5 px-6">Email Address</th>
                      <th className="py-3.5 px-6 text-right">Submitted At</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-150 text-slate-600">
                    {filteredSubmissions.map((sub) => (
                      <tr key={sub.id} className="hover:bg-slate-50/50">
                        <td className="py-4 px-6 font-semibold text-slate-800">{sub.studentName}</td>
                        <td className="py-4 px-6 text-xs">{sub.course}</td>
                        <td className="py-4 px-6 text-xs">
                          <a href={`tel:+91${sub.contactNo}`} className="hover:underline text-blue-600">
                            {sub.contactNo}
                          </a>
                        </td>
                        <td className="py-4 px-6 text-xs">
                          {sub.email ? (
                            <a href={`mailto:${sub.email}`} className="hover:underline">
                              {sub.email}
                            </a>
                          ) : (
                            <span className="text-slate-400 font-serif italic text-xxs">None</span>
                          )}
                        </td>
                        <td className="py-4 px-6 text-right text-[11px] text-slate-400">
                          {new Date(sub.submittedAt).toLocaleDateString("en-IN")}{" "}
                          {new Date(sub.submittedAt).toLocaleTimeString("en-IN", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ==================== COURSE EDIT/ADD MODAL ==================== */}
      {courseModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 overflow-hidden shadow-2xl">
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-lg font-serif">
                {courseModal.mode === "add" ? "Add MBA Specialization" : "Edit Specialization"}
              </h3>
              <button
                onClick={() => setCourseModal({ isOpen: false, mode: "add" })}
                className="text-slate-400 hover:text-white text-xs uppercase font-bold"
              >
                Close
              </button>
            </div>

            <form onSubmit={handleCourseSubmit} className="p-6 space-y-4">
              {actionStatus.type === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{actionStatus.message}</span>
                </div>
              )}

              {/* Title */}
              <div>
                <label className="block text-xxs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Title (e.g. MBA – Finance)
                </label>
                <input
                  type="text"
                  value={courseTitle}
                  onChange={(e) => setCourseTitle(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:border-red-700 focus:outline-none bg-slate-50/50"
                  required
                />
              </div>

              {/* Stream */}
              <div>
                <label className="block text-xxs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Stream (Unique ID - e.g. Finance)
                </label>
                <input
                  type="text"
                  value={courseStream}
                  onChange={(e) => setCourseStream(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:border-red-700 focus:outline-none bg-slate-50/50"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xxs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Description
                </label>
                <textarea
                  value={courseDesc}
                  onChange={(e) => setCourseDesc(e.target.value)}
                  rows={3}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:border-red-700 focus:outline-none bg-slate-50/50"
                  required
                />
              </div>

              {/* Duration & Eligibility */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xxs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    value={courseDur}
                    onChange={(e) => setCourseDur(e.target.value)}
                    placeholder="2 Years (4 Semesters)"
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:border-red-700 focus:outline-none bg-slate-50/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xxs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Eligibility
                  </label>
                  <input
                    type="text"
                    value={courseElig}
                    onChange={(e) => setCourseElig(e.target.value)}
                    placeholder="Bachelor's degree with 50%"
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:border-red-700 focus:outline-none bg-slate-50/50"
                    required
                  />
                </div>
              </div>

              {/* Image upload */}
              <div>
                <label className="block text-xxs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Upload Image
                </label>
                <div className="border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 flex flex-col items-center justify-center text-center">
                  <ImageIcon className="w-8 h-8 text-slate-400 mb-1" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCourseImg(e.target.files?.[0] || null)}
                    className="text-xs text-slate-500 max-w-xs mx-auto"
                    required={courseModal.mode === "add"}
                  />
                  {courseModal.mode === "edit" && (
                    <span className="text-[10px] text-slate-400 mt-1">
                      Leave empty to keep current image.
                    </span>
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setCourseModal({ isOpen: false, mode: "add" })}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-red-700 hover:bg-red-800 text-white text-xs font-semibold py-2 px-4 rounded flex items-center gap-1.5 shadow"
                >
                  {actionLoading ? "Saving..." : "Save Stream"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ==================== PLACEMENT EDIT/ADD MODAL ==================== */}
      {placementModal.isOpen && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 overflow-hidden shadow-2xl">
            <div className="bg-slate-900 text-white p-5 flex justify-between items-center">
              <h3 className="font-bold text-lg font-serif">
                {placementModal.mode === "add" ? "Post Placement Job" : "Edit Placement Post"}
              </h3>
              <button
                onClick={() => setPlacementModal({ isOpen: false, mode: "add" })}
                className="text-slate-400 hover:text-white text-xs uppercase font-bold"
              >
                Close
              </button>
            </div>

            <form onSubmit={handlePlacementSubmit} className="p-6 space-y-4">
              {actionStatus.type === "error" && (
                <div className="bg-red-50 border border-red-200 text-red-800 text-xs rounded-lg p-3 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0 text-red-600" />
                  <span>{actionStatus.message}</span>
                </div>
              )}

              {/* Company & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xxs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={compName}
                    onChange={(e) => setCompName(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:border-red-700 focus:outline-none bg-slate-50/50"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xxs font-bold text-slate-700 uppercase tracking-wide mb-1">
                    Job Role
                  </label>
                  <input
                    type="text"
                    value={jobRole}
                    onChange={(e) => setJobRole(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:border-red-700 focus:outline-none bg-slate-50/50"
                    required
                  />
                </div>
              </div>

              {/* Package */}
              <div>
                <label className="block text-xxs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Package / CTC (e.g. 8.5 LPA)
                </label>
                <input
                  type="text"
                  value={jobPackage}
                  onChange={(e) => setJobPackage(e.target.value)}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:border-red-700 focus:outline-none bg-slate-50/50"
                  required
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xxs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Job Description / Details
                </label>
                <textarea
                  value={jobDesc}
                  onChange={(e) => setJobDesc(e.target.value)}
                  rows={4}
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs focus:border-red-700 focus:outline-none bg-slate-50/50"
                  required
                />
              </div>

              {/* Logo upload */}
              <div>
                <label className="block text-xxs font-bold text-slate-700 uppercase tracking-wide mb-1">
                  Upload Company Logo
                </label>
                <div className="border border-dashed border-slate-300 rounded-lg p-4 bg-slate-50 flex flex-col items-center justify-center text-center">
                  <ImageIcon className="w-8 h-8 text-slate-400 mb-1" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setCompLogo(e.target.files?.[0] || null)}
                    className="text-xs text-slate-500 max-w-xs mx-auto"
                    required={placementModal.mode === "add"}
                  />
                  {placementModal.mode === "edit" && (
                    <span className="text-[10px] text-slate-400 mt-1">
                      Leave empty to keep current logo.
                    </span>
                  )}
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setPlacementModal({ isOpen: false, mode: "add" })}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="bg-red-700 hover:bg-red-800 text-white text-xs font-semibold py-2 px-4 rounded flex items-center gap-1.5 shadow"
                >
                  {actionLoading ? "Posting..." : "Post Opportunity"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
