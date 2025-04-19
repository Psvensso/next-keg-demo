import { createFilter } from "@/db/repos/filtersRepo";
import { SaveFilterPopover } from "./SaveFilterPopover";

export const SaveFilterBtn = async () => {
  const serverActionCreateFilter = async (formData: FormData) => {
    "use server";
    const filterName = formData.get("filterName");
    const filterValue = formData.get("filterValue");

    if (
      !filterValue ||
      typeof filterValue !== "string" ||
      !filterName ||
      typeof filterName !== "string"
    ) {
      throw new Error("Bad name"); //Should never, its required
    }

    // Sanitize inputs to prevent XSS attacks

    await createFilter(filterName, filterValue);
    return { success: true };
  };

  return <SaveFilterPopover serverAction={serverActionCreateFilter} />;
};
