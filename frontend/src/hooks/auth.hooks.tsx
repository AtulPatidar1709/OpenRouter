import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authApi } from "../api/auth.api";
import type { LoginInput, RegisterInput } from "../types/auth.schema";
import type { ApiError } from "@/types/apiError";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

/* ================= USER QUERY ================= */
export const useUserQuery = () => {
  const query = useQuery({
    queryKey: ["user"],
    queryFn: authApi.userInfo,
    retry: false,
    refetchOnWindowFocus: false,
    staleTime: Infinity,
  });

  return {
    user: query.data ?? null,
    isUserLoading: query.isLoading,
    isUserError: query.isError,
  };
};

/* ================= AUTH MUTATIONS ================= */
export const useAuth = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: authApi.login,
    onSuccess: (data) => {
      queryClient.setQueryData(["user"], data.user);
      toast.success("Logged in successfully");
      navigate("/");
    },
    onError: (err: ApiError) => {
      toast.error(err.message);
    },
  });

  const registerMutation = useMutation({
    mutationFn: authApi.register,
    onSuccess: () => {
      toast.success("Registered successfully");
      navigate("/verify-otp");
    },
    onError: (err: ApiError) => {
      toast.error(err.message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: authApi.logout,
    onSuccess: () => {
      queryClient.clear();
      toast.success("Logged out");
      navigate("/login");
    },
  });

  return {
    login: (data: LoginInput) => loginMutation.mutate(data),
    register: (data: RegisterInput) => registerMutation.mutate(data),
    logout: () => logoutMutation.mutate(),

    isLoginLoading: loginMutation.isPending,
    isRegisterLoading: registerMutation.isPending,
  };
};
