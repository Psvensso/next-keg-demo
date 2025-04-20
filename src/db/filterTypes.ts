export const okFilterParams = {
  category: true,
  institute: true,
};

export type FilterParamsRecord = Record<
  keyof typeof okFilterParams,
  string | string[]
>;
