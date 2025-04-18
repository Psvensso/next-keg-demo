import prisma from "@/utils/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type");
  const search = searchParams.get("search") || "";

  switch (type) {
    case "categories":
      const categories = await prisma.course.findMany({
        where: {
          category: {
            contains: search,
          },
        },
        select: { category: true },
        distinct: ["category"],
        orderBy: { category: "asc" },
      });
      return NextResponse.json(categories);

    case "institutes":
      const institutes = await prisma.course.findMany({
        where: {
          instituteName: {
            contains: search,
          },
        },
        select: { instituteName: true, instituteNameSlug: true },
        distinct: ["instituteNameSlug"],
        orderBy: { instituteName: "asc" },
      });
      return NextResponse.json(institutes);

    default:
      return NextResponse.json(
        { error: "Invalid filter type" },
        { status: 400 }
      );
  }
}
