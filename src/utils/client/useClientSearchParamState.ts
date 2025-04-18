"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useMemo } from "react";

type State = Record<string, string[]>;
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
  (paramName: keyof T, newValue: ParamValue) => void
] {
  const searchParams = useSearchParams();
  const router = useRouter();

  const value = useMemo(
    () =>
      getValues(searchParams.toString(), initialState) as Record<
        keyof T,
        ParamValue
      >,
    [searchParams, initialState]
  );

  const updateValue = useCallback(
    (paramName: keyof T, newValue: ParamValue, replace: boolean = true) => {
      const params = new URLSearchParams(searchParams.toString());
      params.delete(String(paramName));
      if (Array.isArray(newValue)) {
        newValue.forEach((item) =>
          params.append(String(paramName), item.toString())
        );
      } else {
        params.append(String(paramName), newValue.toString());
      }
      const newSearch = params.toString();
      const href = `${window.location.pathname}${
        newSearch ? `?${newSearch}` : ""
      }`;

      //This will cause a nav to the server.
      //Thats ok for our filter use-case in this demo but... nah.. feels like it should be more controlled
      if (replace) {
        router.replace(href);
      } else {
        router.push(href);
      }
    },
    [searchParams, router]
  );

  return [value as Record<keyof T, ParamValue>, updateValue] as const;
}

export default useClientSearchParams;
