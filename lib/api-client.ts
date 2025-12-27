import { cookies } from "next/headers";
import { ActionResponse } from "@/types";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8081";

type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface RequestConfig {
  method?: RequestMethod;
  body?: unknown;
  headers?: Record<string, string>;
  requiresAuth?: boolean;
  cache?: RequestCache;
}

interface RequestInterceptor {
  onRequest?: (
    config: RequestConfig & { url: string }
  ) => Promise<RequestConfig & { url: string }>;
}

interface ResponseInterceptor {
  onResponse?: <T>(response: Response, data: T) => Promise<T>;
  onError?: (error: Response) => Promise<ActionResponse>;
}

// Request interceptors
const requestInterceptors: RequestInterceptor[] = [
  {
    // Auth interceptor - automatically adds auth token
    onRequest: async (config) => {
      if (config.requiresAuth) {
        const cookieStore = await cookies();
        const token = cookieStore.get("auth-token")?.value;

        if (token) {
          config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`,
          };
        }
      }
      return config;
    },
  },
];

// Response interceptors
const responseInterceptors: ResponseInterceptor[] = [
  {
    // Error handler interceptor
    onError: async (response) => {
      const status = response.status;

      // Handle common error cases
      if (status === 401) {
        return {
          success: false,
          error: "Unauthorized. Please login again.",
        };
      }

      if (status === 403) {
        return {
          success: false,
          error: "You do not have permission to perform this action.",
        };
      }

      if (status === 404) {
        return {
          success: false,
          error: "The requested resource was not found.",
        };
      }

      if (status === 422) {
        try {
          const errorData = await response.json();
          return {
            success: false,
            error: errorData.message || "Validation error.",
          };
        } catch {
          return {
            success: false,
            error: "Validation error.",
          };
        }
      }

      if (status >= 500) {
        return {
          success: false,
          error: "Server error. Please try again later.",
        };
      }

      // Default error
      try {
        const errorText = await response.text();
        return {
          success: false,
          error: errorText || `Request failed with status ${status}`,
        };
      } catch {
        return {
          success: false,
          error: `Request failed with status ${status}`,
        };
      }
    },
  },
];

// Run request interceptors
async function runRequestInterceptors(
  config: RequestConfig & { url: string }
): Promise<RequestConfig & { url: string }> {
  let currentConfig = config;

  for (const interceptor of requestInterceptors) {
    if (interceptor.onRequest) {
      currentConfig = await interceptor.onRequest(currentConfig);
    }
  }

  return currentConfig;
}

// Run response error interceptors
async function runErrorInterceptors(
  response: Response
): Promise<ActionResponse> {
  for (const interceptor of responseInterceptors) {
    if (interceptor.onError) {
      return await interceptor.onError(response);
    }
  }

  return {
    success: false,
    error: "An unknown error occurred",
  };
}

/**
 * Centralized API client with interceptor support
 */
export async function apiClient<T>(
  endpoint: string,
  config: RequestConfig = {}
): Promise<ActionResponse<T>> {
  const {
    method = "GET",
    body,
    headers = {},
    requiresAuth = false,
    cache = "no-store",
  } = config;

  try {
    // Build initial config
    let requestConfig: RequestConfig & { url: string } = {
      url: `${API_URL}${endpoint}`,
      method,
      body,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      requiresAuth,
      cache,
    };

    // Run request interceptors
    requestConfig = await runRequestInterceptors(requestConfig);

    // Check if auth is required but token is missing
    if (requiresAuth && !requestConfig.headers?.Authorization) {
      return {
        success: false,
        error: "Unauthorized. Please login.",
      };
    }

    // Make the request
    const response = await fetch(requestConfig.url, {
      method: requestConfig.method,
      headers: requestConfig.headers,
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : undefined,
      cache: requestConfig.cache,
    });

    // Handle error responses
    if (!response.ok) {
      return (await runErrorInterceptors(response)) as ActionResponse<T>;
    }

    // Handle empty responses (204 No Content)
    if (response.status === 204) {
      return {
        success: true,
        data: undefined as T,
      };
    }

    // Parse JSON response
    const data: T = await response.json();

    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(`API Error [${endpoint}]:`, error);

    return {
      success: false,
      error: "An error occurred while processing your request.",
    };
  }
}

/**
 * Convenience methods for common HTTP verbs
 */
export const api = {
  get: <T>(endpoint: string, requiresAuth = false) =>
    apiClient<T>(endpoint, { method: "GET", requiresAuth }),

  post: <T>(endpoint: string, body: unknown, requiresAuth = true) =>
    apiClient<T>(endpoint, { method: "POST", body, requiresAuth }),

  put: <T>(endpoint: string, body: unknown, requiresAuth = true) =>
    apiClient<T>(endpoint, { method: "PUT", body, requiresAuth }),

  patch: <T>(endpoint: string, body: unknown, requiresAuth = true) =>
    apiClient<T>(endpoint, { method: "PATCH", body, requiresAuth }),

  delete: <T>(endpoint: string, requiresAuth = true) =>
    apiClient<T>(endpoint, { method: "DELETE", requiresAuth }),
};

/**
 * Upload file with FormData (special case - no JSON)
 */
export async function apiUpload<T>(
  endpoint: string,
  formData: FormData
): Promise<ActionResponse<T>> {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token")?.value;

    if (!token) {
      return {
        success: false,
        error: "Unauthorized. Please login.",
      };
    }

    const response = await fetch(`${API_URL}${endpoint}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        // Note: Don't set Content-Type for FormData, browser sets it with boundary
      },
      body: formData,
    });

    if (!response.ok) {
      return (await runErrorInterceptors(response)) as ActionResponse<T>;
    }

    const data: T = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    console.error(`API Upload Error [${endpoint}]:`, error);
    return {
      success: false,
      error: "An error occurred while uploading.",
    };
  }
}
