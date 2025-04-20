import { createContext } from "@/utils/createContext";
import useClientSearchParamState from "@/utils/hooks/useClientSearchParamState";

const defaultState = {
  category: [],
  institute: "",
  page: "1",
};

export const useFilterForm = () => {
  const [filterState, doUpdateFilterValue] =
    useClientSearchParamState(defaultState);

  const updateFilterValue: typeof doUpdateFilterValue = (val, replace) => {
    doUpdateFilterValue(
      {
        page: "1",
        ...val,
      },
      replace
    );
  };

  return { filterState, updateFilterValue };
};

export type TFilterFormContext = ReturnType<typeof useFilterForm>;
const [FilterFormProvider, useFilterFormContext] =
  createContext<TFilterFormContext>({
    name: "FilterFormContext",
    errorMessage:
      "useFilterFormContext: `context` is undefined. Seems you forgot to wrap the panel parts in `<FilterFormProvider />` ",
  });

export { FilterFormProvider as FilterFormProvider, useFilterFormContext };
