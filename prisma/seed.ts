import { PrismaClient } from '../app/generated/prisma/client.ts';
import { PrismaPg } from '@prisma/adapter-pg';
import pg from 'pg';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config({ override: true });

const { Pool } = pg;

const pool = new Pool({
    connectionString: process.env.DIRECT_URL || process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
    console.log("Seeding initial users to Supabase...");

    const passwordHash = await bcrypt.hash("Ijlsg@2026#Secure", 10);

    const usersToSeed = [
        {
            email: "admin@ijlsg.org",
            firstName: "System",
            lastName: "Admin",
            role: "ADMIN",
            password: passwordHash,
            acceptedTC: true,
            acceptedPP: true,
            emailVerified: true,
        },
        {
            email: "manager@ijlsg.org",
            firstName: "Managing",
            lastName: "Editor",
            role: "MANAGER",
            password: passwordHash,
            acceptedTC: true,
            acceptedPP: true,
            emailVerified: true,
        },
        {
            email: "editor@ijlsg.org",
            firstName: "Editorial",
            lastName: "Board",
            role: "EDITOR",
            password: passwordHash,
            acceptedTC: true,
            acceptedPP: true,
            emailVerified: true,
        },
        {
            email: "reviewer@ijlsg.org",
            firstName: "Peer",
            lastName: "Reviewer",
            role: "PRE_REVIEWER",
            password: passwordHash,
            acceptedTC: true,
            acceptedPP: true,
            emailVerified: true,
        },
        {
            email: "user@ijlsg.org",
            firstName: "Author",
            lastName: "Scholar",
            role: "USER",
            password: passwordHash,
            acceptedTC: true,
            acceptedPP: true,
            emailVerified: true,
        }
    ];

    for (const u of usersToSeed) {
        const existing = await prisma.user.findUnique({ where: { email: u.email } });
        if (!existing) {
            await prisma.user.create({ data: u as any });
            console.log(`✅ Created user: ${u.email} [${u.role}]`);
        } else {
            console.log(`ℹ️ User already exists: ${u.email}`);
        }
    }

    console.log("🎉 All seed users processed successfully!");
}

main()
    .catch((e) => {
        console.error("Seeding error:", e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
        await pool.end();
    });
