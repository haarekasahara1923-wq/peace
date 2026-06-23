"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function submitContactForm(formData: FormData) {
  const studentName = formData.get("studentName") as string;
  const course = formData.get("course") as string;
  const contactNo = formData.get("contactNo") as string;
  const email = formData.get("email") as string;

  // Basic Validation
  if (!studentName || !studentName.trim()) {
    return { error: "Student Name is required." };
  }
  if (!course) {
    return { error: "Please select a course specialization." };
  }
  if (!contactNo) {
    return { error: "Contact number is required." };
  }

  // Validate as 10-digit Indian mobile number
  // Indian mobile numbers start with 6, 7, 8, or 9 and are exactly 10 digits
  const cleanPhone = contactNo.replace(/\D/g, "");
  const phoneRegex = /^[6-9]\d{9}$/;
  if (!phoneRegex.test(cleanPhone)) {
    return { error: "Please enter a valid 10-digit Indian mobile number." };
  }

  try {
    const submission = await prisma.contactSubmission.create({
      data: {
        studentName: studentName.trim(),
        course,
        contactNo: cleanPhone,
        email: email ? email.trim() : null,
      },
    });

    revalidatePath("/admin/dashboard");
    return {
      success: true,
      submission: {
        studentName: submission.studentName,
        course: submission.course,
        contactNo: submission.contactNo,
        email: submission.email,
      },
    };
  } catch (error) {
    console.error("Contact form submission error:", error);
    return { error: "Failed to submit form. Please try again." };
  }
}
