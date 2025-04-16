import { createContext } from "@/utils/createContext";
export type TUseCreateCategoryPickerArgs = {
  count: number;
};
export const useCreateCategoryPicker = (m: TUseCreateCategoryPickerArgs) => {
  return m;
};

export type TCategoryPickerContext = ReturnType<typeof useCreateCategoryPicker>;
const [CategoryPickerProvider, useCategoryPickerContext] =
  createContext<TCategoryPickerContext>({
    name: "CategoryPickerContext",
    errorMessage:
      "useCategoryPickerContext: `context` is undefined. Seems you forgot to wrap the panel parts in `<CategoryPickerProvider />` ",
  });

export { CategoryPickerProvider, useCategoryPickerContext };
