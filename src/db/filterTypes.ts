export const okFilterParams = {
  category: true,
};

export type FilterParamsRecord = Record<
  keyof typeof okFilterParams,
  string | string[]
>;
