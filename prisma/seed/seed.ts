import { PrismaClient } from "@/utils/generated/prisma/client";
import csv from "csv-parser";
import * as fs from "fs";
import GithubSlugger from "github-slugger";
import * as path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();
const instituteSlugger = new GithubSlugger();
const courseSlugger = new GithubSlugger();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDatabase() {
  const filePath = path.join(__dirname, "technical_assignment_input_data.csv");

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(csv({ separator: ";" }))
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .on("data", async (row: any) => {
        try {
          instituteSlugger.reset();
          const instituteNameSlug = instituteSlugger.slug(row.InstituteName);

          await prisma.course.create({
            data: {
              instituteName: row.InstituteName,
              instituteNameSlug: instituteNameSlug,
              courseName: row.CourseName,
              courseNameSlug: courseSlugger.slug(row.CourseName),
              category: row.Category,
              deliveryMethod: row.DeliveryMethod,
              location: row.Location,
              language: row.Language === "NULL" ? null : row.Language,
              startDate: new Date(row.StartDate),
            },
          });
        } catch (error) {
          console.error(`Error processing course ${row.CourseName}:`, error);
        }
      })
      .on("end", async () => {
        console.log(`Database seeding completed`);
        await prisma.$disconnect();
        resolve(true);
      })
      .on("error", (error) => {
        console.error("Error reading CSV:", error);
        reject(error);
      });
  });
}

seedDatabase().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
