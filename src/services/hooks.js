const { useMemo } = require("react");

/**
 * This hook is a wrapper to be used with
 * useAsyncTask provided by react-hooks-async
 *
 * @param {callable} func
 */

export const useApi = (func) => {
  return useMemo(() => async ({ signal }, ...params) => func(...params), [
    func,
  ]);
};
