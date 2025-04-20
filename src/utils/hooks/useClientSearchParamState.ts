import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";

type State = Record<string, string | string[]>;
const getValues = (search: string, initialState: State) => {
  return Object.keys(initialState).reduce<State>((acc, key) => {
    acc[key] = new URLSearchParams(search).getAll(key);
    return acc;
  }, {});
};

type ParamValue = string[] | string;
export type Params = Record<string, ParamValue>;

function useClientSearchParams<T extends State>(
  initialState: T
): readonly [
  Record<keyof T, ParamValue>,
  (newParams: Partial<Record<keyof T, ParamValue>>, replace?: boolean) => void
] {
  const searchParams = useSearchParams();
  const searchParamsValues = getValues(
    searchParams.toString(),
    initialState
  ) as Record<keyof T, ParamValue>;

  const router = useRouter();

  const updateValue = useCallback(
    (
      newParams: Partial<Record<keyof T, ParamValue>>,
      replace: boolean = true
    ) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.keys(newParams).forEach((paramName) => {
        params.delete(String(paramName));
        const newValue = newParams[paramName];
        if (Array.isArray(newValue)) {
          newValue.forEach((item) =>
            params.append(String(paramName), item.toString())
          );
        } else if (newValue) {
          params.append(String(paramName), newValue.toString());
        }
      });

      const newSearch = params.toString();
      const href = `${window.location.pathname}${
        newSearch ? `?${newSearch}` : ""
      }`;
      if (replace) {
        router.replace(href);
      } else {
        router.push(href);
      }
    },
    [searchParams, router]
  );

  return [
    searchParamsValues as Record<keyof T, ParamValue>,
    updateValue,
  ] as const;
}

export default useClientSearchParams;
