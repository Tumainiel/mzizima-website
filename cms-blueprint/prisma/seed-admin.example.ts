import { PrismaClient, UserRole } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || "info@mel.co.tz";
  const password = process.env.ADMIN_PASSWORD;

  if (!password) {
    throw new Error("ADMIN_PASSWORD is required. Do not hardcode plaintext passwords.");
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await prisma.user.upsert({
    where: { email },
    update: {
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      active: true
    },
    create: {
      name: "Mzizima Estate Admin",
      email,
      passwordHash,
      role: UserRole.SUPER_ADMIN,
      active: true
    }
  });
}

main()
  .finally(async () => {
    await prisma.$disconnect();
  });
