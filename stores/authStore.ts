import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import axios from 'axios';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  locale?: string;
  timezone?: string;
  role: string;
  emailVerified?: boolean;
  twoFactorEnabled?: boolean;
  tenantId: string;
  createdAt: string;
  lastLoginAt?: string;
  tenant?: {
    id: string;
    name: string;
    slug: string;
    plan: string;
    status: string;
    enabledModules?: any;
  };
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  
  // Actions
  setAuth: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
  refreshAuth: () => Promise<void>;
  checkAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      refreshToken: null,
      isAuthenticated: false,
      isLoading: true,

      setAuth: (user, token, refreshToken) => {
        // Set axios default header
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        set({
          user,
          token,
          refreshToken,
          isAuthenticated: true,
          isLoading: false,
        });
      },

      logout: () => {
        // Remove axios default header
        delete axios.defaults.headers.common['Authorization'];
        
        // Clear storage
        localStorage.removeItem('auth-storage');
        
        set({
          user: null,
          token: null,
          refreshToken: null,
          isAuthenticated: false,
          isLoading: false,
        });

        // Redirect to login
        window.location.href = '/auth/login';
      },

      refreshAuth: async () => {
        const { refreshToken } = get();
        
        if (!refreshToken) {
          get().logout();
          return;
        }

        try {
          const response = await axios.post(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
            { refreshToken }
          );

          if (response.data.success) {
            get().setAuth(
              response.data.user,
              response.data.token,
              response.data.refreshToken
            );
          } else {
            get().logout();
          }
        } catch (error) {
          get().logout();
        }
      },

      checkAuth: () => {
        const { token } = get();
        
        if (token) {
          // Set axios default header if token exists
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
          set({ isLoading: false });
        } else {
          set({ isLoading: false, isAuthenticated: false });
        }
      },
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({
        user: state.user,
        token: state.token,
        refreshToken: state.refreshToken,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

// Axios interceptor for token refresh
axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        await useAuthStore.getState().refreshAuth();
        
        // Retry original request with new token
        const { token } = useAuthStore.getState();
        originalRequest.headers['Authorization'] = `Bearer ${token}`;
        
        return axios(originalRequest);
      } catch (refreshError) {
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);