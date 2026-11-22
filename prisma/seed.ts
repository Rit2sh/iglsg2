import prisma from "../lib/prisma";
import bcrypt from "bcryptjs";
import { SYSTEM_ACCOUNTS } from "../lib/auth/systemUsers";

async function main() {
    console.log("Seeding system accounts into database...");

    for (const acc of SYSTEM_ACCOUNTS) {
        const hashedPassword = await bcrypt.hash(acc.password, 10);

        const user = await prisma.user.upsert({
            where: { email: acc.email },
            update: {
                role: acc.role as any,
                password: hashedPassword,
                firstName: acc.firstName,
                lastName: acc.lastName,
                occupation: acc.designation,
                institute: acc.institution,
            },
            create: {
                id: acc.id,
                email: acc.email,
                password: hashedPassword,
                role: acc.role as any,
                firstName: acc.firstName,
                lastName: acc.lastName,
                acceptedTC: true,
                acceptedPP: true,
                emailVerified: true,
                occupation: acc.designation,
                institute: acc.institution,
            },
        });

        console.log(`Seeded user: [${acc.role}] ${acc.email} (${user.id})`);
    }

    console.log("System accounts seeded successfully.");
}

main()
    .catch((e) => {
        console.error("Seeding error:", e.message);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
