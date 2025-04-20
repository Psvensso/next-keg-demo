import { unstable_cacheTag as cacheTag } from "next/cache";
import prismaClient from "../prismaClient";
import { HARDCODED_USER_ID } from "./consts";

export async function getApplications() {
  "use cache";
  cacheTag("applications-" + HARDCODED_USER_ID);
  return await prismaClient.application.findMany({
    where: {
      userId: HARDCODED_USER_ID,
    },
  });
}
