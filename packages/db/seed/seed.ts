import csv from "csv-parser";
import * as fs from "fs";
import * as path from "path";
import { Course, PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

async function seedDatabase() {
  const filePath = path.join(__dirname, "technical_assignment_input_data.csv");
  const courses: Course[] = [];
  fs.createReadStream(filePath)
    .pipe(csv({ separator: ";" }))
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
