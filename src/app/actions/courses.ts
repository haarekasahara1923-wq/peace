"use server";

import { prisma } from "@/lib/prisma";
import { uploadImageBuffer } from "@/lib/cloudinary";
import { cookies } from "next/headers";
import { verifyAdminToken } from "@/lib/auth-tokens";
import { revalidatePath } from "next/cache";

async function checkAuth() {
  const token = cookies().get("admin_token")?.value;
  if (!token) return false;
  const verified = await verifyAdminToken(token);
  return !!verified;
}

export async function createCourse(formData: FormData) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return { error: "Unauthorized access." };
  }

  const title = formData.get("title") as string;
  const stream = formData.get("stream") as string;
  const description = formData.get("description") as string;
  const duration = formData.get("duration") as string;
  const eligibility = formData.get("eligibility") as string;
  const imageFile = formData.get("image") as File;

  if (!title || !stream || !description || !duration || !eligibility) {
    return { error: "All text fields are required." };
  }

  if (!imageFile || imageFile.size === 0) {
    return { error: "Course image is required." };
  }

  try {
    // Check if stream already exists
    const existing = await prisma.course.findUnique({
      where: { stream },
    });
    if (existing) {
      return { error: `A course specialization for '${stream}' already exists.` };
    }

    // Upload to Cloudinary
    const buffer = Buffer.from(await imageFile.arrayBuffer());
    const imageUrl = await uploadImageBuffer(buffer, "peace_courses");

    const course = await prisma.course.create({
      data: {
        title,
        stream,
        description,
        duration,
        eligibility,
        image: imageUrl,
      },
    });

    revalidatePath("/courses");
    revalidatePath("/admin/dashboard");
    return { success: true, course };
  } catch (error) {
    console.error("Create course error:", error);
    return { error: "Failed to create course. Please try again." };
  }
}

export async function updateCourse(id: string, formData: FormData) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return { error: "Unauthorized access." };
  }

  const title = formData.get("title") as string;
  const stream = formData.get("stream") as string;
  const description = formData.get("description") as string;
  const duration = formData.get("duration") as string;
  const eligibility = formData.get("eligibility") as string;
  const imageFile = formData.get("image") as File;

  if (!title || !stream || !description || !duration || !eligibility) {
    return { error: "All text fields are required." };
  }

  try {
    // Verify course exists
    const course = await prisma.course.findUnique({
      where: { id },
    });
    if (!course) {
      return { error: "Course not found." };
    }

    // Check if stream is being changed to an existing stream
    if (stream !== course.stream) {
      const existing = await prisma.course.findUnique({
        where: { stream },
      });
      if (existing) {
        return { error: `A course specialization for '${stream}' already exists.` };
      }
    }

    let imageUrl = course.image;
    if (imageFile && imageFile.size > 0) {
      // Upload new image
      const buffer = Buffer.from(await imageFile.arrayBuffer());
      imageUrl = await uploadImageBuffer(buffer, "peace_courses");
    }

    const updated = await prisma.course.update({
      where: { id },
      data: {
        title,
        stream,
        description,
        duration,
        eligibility,
        image: imageUrl,
      },
    });

    revalidatePath("/courses");
    revalidatePath("/admin/dashboard");
    return { success: true, course: updated };
  } catch (error) {
    console.error("Update course error:", error);
    return { error: "Failed to update course. Please try again." };
  }
}

export async function deleteCourse(id: string) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return { error: "Unauthorized access." };
  }

  try {
    await prisma.course.delete({
      where: { id },
    });

    revalidatePath("/courses");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Delete course error:", error);
    return { error: "Failed to delete course." };
  }
}
