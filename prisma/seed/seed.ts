import { PrismaClient } from "@/utils/generated/prisma/client";
import csv from "csv-parser";
import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDatabase() {
  const filePath = path.join(__dirname, "technical_assignment_input_data.csv");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const courses: any[] = [];
  fs.createReadStream(filePath)
    .pipe(csv({ separator: ";" }))
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .on("data", (row: any) => {
      courses.push({
        id: row.CourseId,
        instituteName: row.InstituteName,
        courseName: row.CourseName,
        category: row.Category,
        deliveryMethod: row.DeliveryMethod,
        location: row.Location,
        language: row.Language === "NULL" ? null : row.Language,
        startDate: new Date(row.StartDate),
      });
    })
    .on("end", async () => {
      console.log("CSV file successfully processed");
      for (const course of courses) {
        await prisma.course.create({
          data: course,
        });
      }

      console.log("Database seeding completed");
      await prisma.$disconnect();
    });
}

seedDatabase().catch((e) => {
  console.error(e);
  prisma.$disconnect();
  process.exit(1);
});
