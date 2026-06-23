const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const coursesToSeed = [
  {
    title: "MBA – Finance",
    stream: "Finance",
    description: "Equips students with the analytical and strategic skills required to navigate the financial sector, corporate finance, investment banking, and portfolio management.",
    duration: "2 Years (4 Semesters)",
    eligibility: "Graduation in any discipline with minimum 50% aggregate marks (45% for SC/ST). Valid entrance exam score (CAT/MAT/CMAT/state-level test) preferred.",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "MBA – Marketing",
    stream: "Marketing",
    description: "Focuses on market research, brand management, digital marketing, sales strategies, and consumer behavior in the digital and global marketplace.",
    duration: "2 Years (4 Semesters)",
    eligibility: "Graduation in any discipline with minimum 50% aggregate marks (45% for SC/ST). Valid entrance exam score (CAT/MAT/CMAT/state-level test) preferred.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "MBA – Human Resources",
    stream: "Human Resources",
    description: "Prepares future leaders to manage talent, organizational behavior, employee relations, recruitment, and strategic HR initiatives in modern enterprises.",
    duration: "2 Years (4 Semesters)",
    eligibility: "Graduation in any discipline with minimum 50% aggregate marks (45% for SC/ST). Valid entrance exam score (CAT/MAT/CMAT/state-level test) preferred.",
    image: "https://images.unsplash.com/photo-1521791136364-728647530e35?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "MBA – Information Technology",
    stream: "Information Technology",
    description: "Bridges the gap between technology and business, teaching management of enterprise systems, database administration, cybersecurity, and tech innovation.",
    duration: "2 Years (4 Semesters)",
    eligibility: "Graduation in any discipline with minimum 50% aggregate marks (45% for SC/ST). Valid entrance exam score (CAT/MAT/CMAT/state-level test) preferred.",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "MBA – International Business",
    stream: "International Business",
    description: "Provides insights into global trade laws, cross-cultural management, import-export operations, international logistics, and global finance.",
    duration: "2 Years (4 Semesters)",
    eligibility: "Graduation in any discipline with minimum 50% aggregate marks (45% for SC/ST). Valid entrance exam score (CAT/MAT/CMAT/state-level test) preferred.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "MBA – Operations Management",
    stream: "Operations Management",
    description: "Focuses on optimizing supply chain operations, project management, quality assurance, logistics, and manufacturing processes for peak efficiency.",
    duration: "2 Years (4 Semesters)",
    eligibility: "Graduation in any discipline with minimum 50% aggregate marks (45% for SC/ST). Valid entrance exam score (CAT/MAT/CMAT/state-level test) preferred.",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "MBA – Business Analytics",
    stream: "Business Analytics",
    description: "Teaches data interpretation, statistical modeling, machine learning concepts in business, predictive modeling, and data-driven decision making.",
    duration: "2 Years (4 Semesters)",
    eligibility: "Graduation in any discipline with minimum 50% aggregate marks (45% for SC/ST). Valid entrance exam score (CAT/MAT/CMAT/state-level test) preferred.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=600&auto=format&fit=crop",
  },
  {
    title: "MBA – Hospitality and Tourism",
    stream: "Hospitality and Tourism",
    description: "Focuses on service sector management, hotel operations, travel planning, resort management, and events organization within the global tourism industry.",
    duration: "2 Years (4 Semesters)",
    eligibility: "Graduation in any discipline with minimum 50% aggregate marks (45% for SC/ST). Valid entrance exam score (CAT/MAT/CMAT/state-level test) preferred.",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=600&auto=format&fit=crop",
  },
];

async function main() {
  console.log("Starting seed process...");

  // Seed Admin user
  const adminEmail = "admin@peacecollege.site";
  const existingAdmin = await prisma.admin.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = bcrypt.hashSync("PeaceAdmin2026!", 10);
    await prisma.admin.create({
      data: {
        email: adminEmail,
        password: hashedPassword,
      },
    });
    console.log(`Admin user seeded: ${adminEmail}`);
  } else {
    console.log(`Admin user already exists: ${adminEmail}`);
  }

  // Seed Courses
  for (const course of coursesToSeed) {
    await prisma.course.upsert({
      where: { stream: course.stream },
      update: {
        title: course.title,
        description: course.description,
        duration: course.duration,
        eligibility: course.eligibility,
        image: course.image,
      },
      create: course,
    });
  }
  console.log("All course specializations seeded successfully.");
}

main()
  .catch((e) => {
    console.error("Error during seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
