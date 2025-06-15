"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
// Initialize Prisma Client
const prisma = new client_1.PrismaClient();
// Read seed.json file
const seedDataPath = path.join(__dirname, 'seed.json');
const seedData = JSON.parse(fs.readFileSync(seedDataPath, 'utf-8'));
async function main() {
    // Step 1: Create or update Sponsors
    const sponsorPromises = seedData.map(async (bounty) => {
        const sponsorData = bounty.sponsor;
        return prisma.sponsors.upsert({
            where: { slug: sponsorData.slug },
            update: {
                name: sponsorData.name,
                logo: sponsorData.logo,
                isVerified: sponsorData.isVerified,
                st: sponsorData.st,
                updatedAt: new Date(),
            },
            create: {
                id: generateUUID(), // Generate a new UUID for the sponsor
                name: sponsorData.name,
                slug: sponsorData.slug,
                logo: sponsorData.logo,
                isVerified: sponsorData.isVerified,
                st: sponsorData.st,
                industry: 'Unknown', // Default value, as industry is required in schema
                createdAt: new Date(),
                updatedAt: new Date(),
            },
        });
    });
    const sponsors = await Promise.all(sponsorPromises);
    const sponsorIdMapping = sponsors.reduce((acc, sponsor) => {
        acc[sponsor.slug] = sponsor.id;
        return acc;
    }, {});
    // Step 2: Create Bounties
    const bountyPromises = seedData.map(async (bounty) => {
        return prisma.bounties.create({
            data: {
                id: bounty.id,
                title: bounty.title,
                slug: bounty.slug,
                rewardAmount: bounty.rewardAmount,
                deadline: bounty.deadline ? new Date(bounty.deadline) : null,
                type: bounty.type,
                token: bounty.token,
                winnersAnnouncedAt: bounty.winnersAnnouncedAt ? new Date(bounty.winnersAnnouncedAt) : null,
                isWinnersAnnounced: bounty.isWinnersAnnounced,
                isFeatured: bounty.isFeatured,
                compensationType: bounty.compensationType,
                minRewardAsk: bounty.minRewardAsk,
                maxRewardAsk: bounty.maxRewardAsk,
                status: bounty.status,
                sponsorId: sponsorIdMapping[bounty.sponsor.slug],
                pocId: 'placeholder-poc-id', // Placeholder, as pocId is required but not in seed.json
                source: 'NATIVE', // Default value for required field
                isPublished: true, // Assume true for open bounties
                isActive: true, // Default value
                isArchived: false, // Default value
                createdAt: new Date(),
                updatedAt: new Date(),
                // Note: Comments and Submission counts are not directly insertable; they are relations
                // You may need to seed Comments and Submission separately if needed
            },
        });
    });
    await Promise.all(bountyPromises);
    console.log('Seeding completed.');
}
// Utility function to generate UUID (since some IDs are UUIDs in the schema)
function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === 'x' ? r : (r & 0x3) | 0x8;
        return v.toString(16);
    });
}
main()
    .then(async () => {
    await prisma.$disconnect();
})
    .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
});
