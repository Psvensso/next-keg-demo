import useClientSearchParamState from "@/utils/client/useClientSearchParamState";
import { createContext } from "@/utils/createContext";

export const useFiltersClient = () => {
  const [filterState, updateFilterValue] = useClientSearchParamState({
    category: [],
  });

  return { filterState, updateFilterValue };
};

export type TFiltersClientContext = ReturnType<typeof useFiltersClient>;
const [FiltersClientProvider, useFiltersClientContext] =
  createContext<TFiltersClientContext>({
    name: "FiltersClientContext",
    errorMessage:
      "useFiltersClientContext: `context` is undefined. Seems you forgot to wrap the panel parts in `<FiltersClientProvider />` ",
  });

export { FiltersClientProvider, useFiltersClientContext };
