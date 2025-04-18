export type SearchParamValue = string | string[] | number | number[] | boolean;
export type SearchParamRecord = Record<string, SearchParamValue>;

/**
 * Updates URL search parameters without removing existing params
 * @param params Record of key-value pairs to update in the URL
 * @param options Configuration options
 */
export function updateSearchParams(
  params: SearchParamRecord,
  options: { replace?: boolean } = {}
): void {
  // Get current URL and searchParams
  const url = new URL(window.location.href);
  const searchParams = new URLSearchParams(url.search);

  // Process each parameter
  Object.entries(params).forEach(([key, value]) => {
    // Remove existing values for this key
    searchParams.delete(key);

    // Handle different value types
    if (Array.isArray(value)) {
      value.forEach((item) => {
        searchParams.append(key, item.toString());
      });
    } else if (value !== undefined && value !== null) {
      searchParams.set(key, value.toString());
    }
  });

  // Update URL
  url.search = searchParams.toString();

  // Update browser history
  if (options.replace) {
    window.history.replaceState({}, "", url);
  } else {
    window.history.pushState({}, "", url);
  }
}

export function getSearchParams(): Record<string, string | string[]> {
  const searchParams = new URLSearchParams(window.location.search);
  const params: Record<string, string | string[]> = {};

  searchParams.forEach((value, key) => {
    if (key in params) {
      // If key exists, convert to array if not already
      const existing = params[key];
      if (Array.isArray(existing)) {
        existing.push(value);
      } else {
        params[key] = [existing, value];
      }
    } else {
      params[key] = value;
    }
  });

  return params;
}
