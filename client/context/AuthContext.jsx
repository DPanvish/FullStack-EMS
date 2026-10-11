import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../api/api";

const AuthContext = createContext(null);

export function AuthProvider({children}){
  const queryClient = useQueryClient();

  const {
    data: sessionUser,
    isLoading: loading,
    refetch: refreshSession
  } = useQuery({
    queryKey: ["auth", "session"],
    queryFn: async () => {
      try {
        const { data } = await api.get("/auth/session");
        return data?.user || null;
      } catch (error) {
        return null;
      }
    },
    staleTime: 5 * 60 * 1000,
  });

  const user = sessionUser ?? null;

  const loginMutation = useMutation({
    mutationFn: async ({ email, password, role_type }) => {
      const { data } = await api.post("/auth/login", { email, password, role_type });
      return data.user;
    },
    onSuccess: (newUser) => {
      queryClient.setQueryData(["auth", "session"], newUser);
      queryClient.invalidateQueries();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      await api.post("/auth/logout");
    },
    onSuccess: () => {
      queryClient.setQueryData(["auth", "session"], null);
      queryClient.clear();
    },
  });

  const login = async (email, password, role_type) => {
    return await loginMutation.mutateAsync({ email, password, role_type });
  };

  const logout = async () => {
    try {
      await logoutMutation.mutateAsync();
    } catch (e) {
      console.error(e);
      queryClient.setQueryData(["auth", "session"], null);
      queryClient.clear();
    }
  };

  const value = { user, token: null, loading, login, logout, refreshSession };

  return <AuthContext.Provider value={value}>
    {children}
  </AuthContext.Provider>
}

export function useAuth(){
  const ctx = useContext(AuthContext);

  if(!ctx){
    throw new Error("useAuth must be used within AuthProvider");
  }

  return ctx;
}