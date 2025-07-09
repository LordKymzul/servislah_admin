import { useRouter, useSearchParams } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { customLogin, customRegister } from "../../data/services/auth-api.service";
import { LoginDto } from "../../data/entities/dto/login-dto";
import { RegisterDto } from "../../data/entities/dto/register-dto";

export const useAuthTanstack = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const queryClient = useQueryClient();
    const [user, setUser] = useState<any>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkAuth();
    }, []);

    const checkAuth = async () => {
        try {
            const savedUser = localStorage.getItem("user");
            if (savedUser) {
                const parsedUser = JSON.parse(savedUser);
                setUser(parsedUser);
                setIsAuthenticated(true);
                localStorage.setItem("user", JSON.stringify(parsedUser));
            } else {
                setUser(null);
                setIsAuthenticated(false);
            }
        } catch (error) {
            console.error("Auth check failed:", error);
            localStorage.removeItem("user");
            setUser(null);
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    const loginMutation = useMutation({
        mutationFn: async (loginDto: LoginDto) => {
            setIsLoading(true);
            const response = await customLogin(loginDto);
            return response;
        },
        onSuccess: (data) => {
            if (data && data.user_id) {
                const userData = {
                    id: data.user_id,
                    email: data.email,
                    backend_tokens: {
                        access_token: data.backend_tokens.access_token,
                        refresh_token: data.backend_tokens.refresh_token,
                    },
                };

                setUser(userData);
                setIsAuthenticated(true);
                localStorage.setItem("user", JSON.stringify(userData));

                queryClient.invalidateQueries({ queryKey: ["user"] });

                toast.success("Successfully logged in");

                // Handle redirect after successful login
                const redirectTo = searchParams.get('redirect');
                if (redirectTo) {
                    router.replace(redirectTo);
                } else {
                    router.replace("/dashboard");
                }
            } else {
                toast.error("Failed to process login");
                router.replace("/login");
            }
        },
        onError: (error: Error) => {
            toast.error("Login failed: " + error.message);
            router.replace("/login");
        },
        onSettled: () => {
            setIsLoading(false);
        }
    });

    const registerMutation = useMutation({
        mutationFn: async (registerDto: RegisterDto) => {
            setIsLoading(true);
            const response = await customRegister(registerDto);
            return response;
        },
        onSuccess: (data) => {
            if (data && data.user_id) {
                const userData = {
                    id: data.user_id,
                    email: data.email,
                    backend_tokens: {
                        access_token: data.backend_tokens.access_token,
                        refresh_token: data.backend_tokens.refresh_token,
                    },
                };

                setUser(userData);
                setIsAuthenticated(true);
                localStorage.setItem("user", JSON.stringify(userData));

                queryClient.invalidateQueries({ queryKey: ["user"] });

                toast.success("Successfully logged in");
                router.push("/dashboard");
            } else {
                toast.error("Failed to process login");
                router.push("/login");
            }
        },
        onError: (error: Error) => {
            toast.error("Register failed: " + error.message);
            router.push("/register");
        },
        onSettled: () => {
            setIsLoading(false);
        }
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            localStorage.removeItem("user");
            setUser(null);
            setIsAuthenticated(false);
            queryClient.clear();
            return true;
        },
        onSuccess: () => {
            toast.success("Successfully logged out");
            router.push("/");
        },
        onError: (error: Error) => {
            toast.error("Logout failed: " + error.message);
        }
    });

    return {
        user,
        isAuthenticated,
        isLoading,
        loginMutation,
        logoutMutation,
        registerMutation,
        login: (loginDto: LoginDto) => loginMutation.mutate(loginDto),
        logout: () => logoutMutation.mutate(),
        refreshAuth: checkAuth,
    };
};