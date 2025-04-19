import { PrismaClient } from "@/utils/generated/prisma/client";
import csv from "csv-parser";
import * as fs from "fs";
import * as path from "path";
import stripBom from "strip-bom-stream";
import { fileURLToPath } from "url";

//Makes a url safe slug name from a course title
function sluggify(str: string) {
  str = str.replace(/å/g, "a");
  str = str.replace(/ä/g, "a");
  str = str.replace(/ö/g, "o");
  str = str.toLowerCase();
  str = str.replace(/\s+/g, "-"); // Replace spaces with hyphens
  str = str.replace(/&/g, "-and-"); // Replace & with 'and'
  str = str.replace(/[^\w-]+/g, ""); // Remove all non-word chars
  str = str.replace(/--+/g, "-"); // Replace multiple hyphens with single hyphen
  str = str.replace(/^-+/, ""); // Trim - from start of text
  str = str.replace(/-+$/, ""); // Trim - from end of text
  return str;
}

const prisma = new PrismaClient();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function seedDatabase() {
  const filePath = path.join(__dirname, "technical_assignment_input_data.csv");

  return new Promise((resolve, reject) => {
    fs.createReadStream(filePath)
      .pipe(stripBom())
      .pipe(
        csv({
          separator: ";",
        })
      )
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .on("data", async (row: any) => {
        try {
          const instituteNameSlug = sluggify(row.InstituteName);
          const courseNameSlug = sluggify(row.CourseName);
          //Just a little seed test
          if (encodeURIComponent(instituteNameSlug) !== instituteNameSlug) {
            throw "bad seed, instituteNameSlug: " + instituteNameSlug;
          }
          if (encodeURIComponent(courseNameSlug) !== courseNameSlug) {
            throw "bad seed, courseNameSlug: " + courseNameSlug;
          }

          await prisma.course.create({
            data: {
              id: row.CourseId,
              instituteName: row.InstituteName,
              instituteNameSlug,
              courseName: row.CourseName,
              courseNameSlug,
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
