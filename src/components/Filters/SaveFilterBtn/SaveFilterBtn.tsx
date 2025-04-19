import { createFilter } from "@/db/repos/filtersRepo";
import { SaveFilterPopover } from "./fragments/SaveFilterPopover";

export const SaveFilterBtn = async () => {
  const serverActionCreateFilter = async (formData: FormData) => {
    "use server";
    const filterName = formData.get("filterName");
    const filterValue = formData.get("filterValue");

    if (
      !filterValue ||
      String(filterName).length > 30 ||
      typeof filterValue !== "string" ||
      !filterName ||
      typeof filterName !== "string"
    ) {
      throw new Error("Bad name"); //Should never, its checked on form
    }

    // Sanitize inputs to prevent XSS attacks

    await createFilter(filterName, filterValue);
    return { success: true };
  };

  return <SaveFilterPopover serverAction={serverActionCreateFilter} />;
};
