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

export async function createPlacement(formData: FormData) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return { error: "Unauthorized access." };
  }

  const companyName = formData.get("companyName") as string;
  const role = formData.get("role") as string;
  const packageVal = formData.get("package") as string; // CTC/Package
  const description = formData.get("description") as string;
  const logoFile = formData.get("logo") as File;

  if (!companyName || !role || !packageVal || !description) {
    return { error: "All text fields are required." };
  }

  if (!logoFile || logoFile.size === 0) {
    return { error: "Company logo is required." };
  }

  try {
    // Upload to Cloudinary
    const buffer = Buffer.from(await logoFile.arrayBuffer());
    const logoUrl = await uploadImageBuffer(buffer, "peace_placements");

    const placement = await prisma.placement.create({
      data: {
        companyName,
        role,
        package: packageVal,
        description,
        logoUrl,
        datePosted: new Date(),
      },
    });

    revalidatePath("/careers");
    revalidatePath("/admin/dashboard");
    return { success: true, placement };
  } catch (error) {
    console.error("Create placement error:", error);
    return { error: "Failed to create placement opportunity. Please try again." };
  }
}

export async function updatePlacement(id: string, formData: FormData) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return { error: "Unauthorized access." };
  }

  const companyName = formData.get("companyName") as string;
  const role = formData.get("role") as string;
  const packageVal = formData.get("package") as string;
  const description = formData.get("description") as string;
  const logoFile = formData.get("logo") as File;

  if (!companyName || !role || !packageVal || !description) {
    return { error: "All text fields are required." };
  }

  try {
    const placement = await prisma.placement.findUnique({
      where: { id },
    });
    if (!placement) {
      return { error: "Placement opportunity not found." };
    }

    let logoUrl = placement.logoUrl;
    if (logoFile && logoFile.size > 0) {
      const buffer = Buffer.from(await logoFile.arrayBuffer());
      logoUrl = await uploadImageBuffer(buffer, "peace_placements");
    }

    const updated = await prisma.placement.update({
      where: { id },
      data: {
        companyName,
        role,
        package: packageVal,
        description,
        logoUrl,
      },
    });

    revalidatePath("/careers");
    revalidatePath("/admin/dashboard");
    return { success: true, placement: updated };
  } catch (error) {
    console.error("Update placement error:", error);
    return { error: "Failed to update placement. Please try again." };
  }
}

export async function deletePlacement(id: string) {
  const isAuth = await checkAuth();
  if (!isAuth) {
    return { error: "Unauthorized access." };
  }

  try {
    await prisma.placement.delete({
      where: { id },
    });

    revalidatePath("/careers");
    revalidatePath("/admin/dashboard");
    return { success: true };
  } catch (error) {
    console.error("Delete placement error:", error);
    return { error: "Failed to delete placement opportunity." };
  }
}
