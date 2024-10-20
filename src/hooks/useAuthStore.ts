import { create } from 'zustand'; // Changed to named import

type AuthState = {
  isAuthenticated: boolean;
  user: {id: string, email: string};
  token: string;
  refreshToken: string;
  setAuthenticated: (auth: boolean, token: string, refreshToken: string, user: {id: string, email: string}) => void;
};

const useAuthStore = create<AuthState>((set) => ({
  isAuthenticated: false,
  user: { id: '', email: '' }, // Initialize user
  token: '', // Initialize token
  refreshToken: '', // Initialize refreshToken
  // ... existing code ...
  setAuthenticated: (auth, token, refreshToken, user) => 
    set({ isAuthenticated: auth, token, refreshToken, user }),
  // ... existing code ...
}));

export default useAuthStore;
