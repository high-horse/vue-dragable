import { reactive, readonly } from "vue";

interface AuthState {
  isAuthenticated: boolean,
  user: any | null,
}

export function useAuth() { 
  const state = reactive<AuthState>({
    isAuthenticated: false,
    user: null,
  });
  
  function login(userData: any): void {
    state.isAuthenticated = true;
    state.user = userData;
  }
  
  function logout() {
    state.isAuthenticated = false;
    state.user = null;
  }
  
  return {
    state: readonly(state),
    login,
    logout,
  };
}