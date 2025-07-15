interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
}

interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

class ApiClient {
  private baseURL: string;

  constructor() {
    this.baseURL = "http://localhost:8000/api/v1";
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const config: RequestInit = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      const data = await response.json();

      if (!response.ok) {
        throw {
          message: data.message || "API request failed",
          errors: data.errors || {},
          status: response.status,
        } as ApiError;
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError) {
        // Network error
        throw {
          message: "Network error. Please check your connection.",
          status: 0,
        } as ApiError;
      }
      throw error;
    }
  }

  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "GET" });
  }

  async post<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: "PUT",
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, { method: "DELETE" });
  }
}

export const useApi = () => {
  const api = new ApiClient();

  // Company Formation API methods
  const companyFormation = {
    // Submit complete application
    submit: (data: any) => api.post<ApiResponse>("/company-formation", data),

    // Auto-save form data
    autoSave: (sessionId: string, step: number, data: any) =>
      api.post<ApiResponse>("/company-formation/auto-save", {
        session_id: sessionId,
        step,
        data,
      }),

    // Get saved form data
    getFormData: (sessionId: string) =>
      api.get<ApiResponse>(
        `/company-formation/form-data?session_id=${sessionId}`
      ),

    // Get application status
    getStatus: (referenceNumber: string) =>
      api.get<ApiResponse>(`/company-formation/status/${referenceNumber}`),
  };

  // Health check
  const health = () => api.get<ApiResponse>("/health");

  return {
    api,
    companyFormation,
    health,
  };
};

export type { ApiResponse, ApiError };
