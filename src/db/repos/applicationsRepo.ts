import prismaClient from "../prismaClient";
import { HARDCODED_USER_ID } from "./consts";

export async function getApplicationById(applicationId: string) {
  return (
    (await prismaClient.application.findUnique({
      where: {
        userId: HARDCODED_USER_ID,
        id: applicationId,
      },
    })) != null
  );
}

export async function getApplications() {
  return await prismaClient.application.findMany({
    where: {
      userId: HARDCODED_USER_ID,
    },
  });
}
