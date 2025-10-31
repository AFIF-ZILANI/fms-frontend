import { useQuery, useMutation } from "@tanstack/react-query";

/**
 * A small helper that wraps fetch with JSON parsing + error handling.
 */

console.log(`${process.env.SERVER_URI}/${process.env.API_VERSION}`);
// if (!process.env.SERVER_URI || !process.env.API_VERSION) {
//   throw Error("Server Base URL is missing!");
// }
// const server_URI = `${process.env.SERVER_URI}/${process.env.API_VERSION}`;
const server_URI = "http://localhost:4000/api/v1";

async function fetchJson<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const isFormData = options.body instanceof FormData;

  const headers: HeadersInit = isFormData
    ? options.headers || {} // Let browser set content-type for FormData
    : {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      };
  console.log("[TEST] - [API URL]: ", server_URI + endpoint);
  const res = await fetch(server_URI + endpoint, {
    ...options,
    headers,
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Request failed: ${res.status} - ${text}`);
  }

  // 204 No Content (e.g. DELETE)
  if (res.status === 204) return {} as T;

  return res.json();
}

/* ------------------------- QUERY (GET) ------------------------- */

export function useGetData<T>(
  endpoint: string,
  options?: Parameters<typeof useQuery<T>>[0]
) {
  return useQuery<T>({
    queryKey: [endpoint],
    queryFn: () => fetchJson<T>(endpoint),
    refetchOnWindowFocus: false,
    retry: 1,
    ...options,
  });
}

/* ------------------------- MUTATIONS ------------------------- */

/**
 * POST request
 */
export function usePostData<TInput, TOutput>(endpoint: string) {
  return useMutation<TOutput, Error, TInput>({
    mutationKey: [endpoint, "POST"],
    mutationFn: (data: TInput) =>
      fetchJson<TOutput>(endpoint, {
        method: "POST",
        body: JSON.stringify(data),
      }),
  });
}

/**
 * PUT request
 */
export function usePutData<TInput, TOutput>(endpoint: string) {
  return useMutation<TOutput, Error, TInput>({
    mutationKey: [endpoint, "PUT"],
    mutationFn: (data: TInput) =>
      fetchJson<TOutput>(endpoint, {
        method: "PUT",
        body: JSON.stringify(data),
      }),
  });
}

/**
 * PATCH request
 */
export function usePatchData<TInput, TOutput>(endpoint: string) {
  return useMutation<TOutput, Error, TInput>({
    mutationKey: [endpoint, "PATCH"],
    mutationFn: (data: TInput) =>
      fetchJson<TOutput>(endpoint, {
        method: "PATCH",
        body: JSON.stringify(data),
      }),
  });
}

/**
 * DELETE request
 */
export function useDeleteData<
  TOutput = unknown,
  TInput = { id: string | number }
>(endpoint: string) {
  return useMutation<TOutput, Error, TInput>({
    mutationKey: [endpoint, "DELETE"],
    mutationFn: (data: TInput) =>
      fetchJson<TOutput>(endpoint, {
        method: "DELETE",
        body: JSON.stringify(data),
      }),
  });
}

/**
 * DELETE Bulk request
 */
export function useDeleteBulkData<
  TOutput = unknown,
  TInput = {
    ids: string[] | number[];
  }
>(endpoint: string) {
  return useMutation<TOutput, Error, TInput>({
    mutationKey: [endpoint, "DELETE"],
    mutationFn: (data: TInput) =>
      fetchJson<TOutput>(endpoint, {
        method: "DELETE",
        body: JSON.stringify(data),
      }),
  });
}
