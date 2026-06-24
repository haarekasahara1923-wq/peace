const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

async function updateAdmin() {
  console.log("Updating admin credentials...");

  const adminEmail = "admin@peacecollege.site";
  const newPassword = "peace123";

  const hashedPassword = bcrypt.hashSync(newPassword, 10);

  try {
    // Try to update existing admin
    const existing = await prisma.admin.findUnique({
      where: { email: adminEmail },
    });

    if (existing) {
      await prisma.admin.update({
        where: { email: adminEmail },
        data: { password: hashedPassword },
      });
      console.log(`✅ Admin password updated successfully for: ${adminEmail}`);
    } else {
      // Create admin if not exists
      await prisma.admin.create({
        data: {
          email: adminEmail,
          password: hashedPassword,
        },
      });
      console.log(`✅ Admin user created: ${adminEmail}`);
    }

    console.log(`\n🔐 Login Credentials:`);
    console.log(`   Email:    ${adminEmail}`);
    console.log(`   Password: ${newPassword}`);
    console.log(`\n🌐 Admin Panel: http://localhost:3000/admin/login`);
  } catch (error) {
    console.error("❌ Error updating admin:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

updateAdmin();
