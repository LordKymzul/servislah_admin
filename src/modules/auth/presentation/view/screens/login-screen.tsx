"use client"

import { useState } from "react";
import { Button } from "../../../../../../components/ui/button";
import { Input } from "../../../../../../components/ui/input";
import { Card, CardContent, CardFooter } from "../../../../../../components/ui/card";
import { Label } from "../../../../../../components/ui/label";
import { Checkbox } from "../../../../../../components/ui/checkbox";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { customLogin } from "../../../data/services/auth-api.service";
import { LoginDto } from "../../../data/entities/dto/login-dto";
import { useAuthTanstack } from "../../tanstack/auth-tanstack";

const LoginScreen = () => {
    const router = useRouter();
    const {
        loginMutation,
        isLoading,
        loginWithGoogle
    } = useAuthTanstack();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        loginMutation.mutate({
            email,
            password,
            platform: "CREDENTIAL" as const
        });
    }
    const handleGoogleLogin = () => {
        loginWithGoogle();
    };

    return (
        <div className="flex min-h-screen">
            {/* Left Section - Decorative */}
            <div className="hidden lg:flex lg:w-1/2 relative bg-[#F5F7FA]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#F5F7FA] to-[#E4E7EB] opacity-90" />
                <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-center">
                    <div className="mb-8">
                        <h1 className="text-5xl font-bold mb-4 text-[#2D3748]">ServisLah</h1>
                        <p className="pt-12 text-lg text-[#4A5568] max-w-md mx-auto">
                            Your one-stop solution for professional car servicing and maintenance
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Section - Login Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-[#2D3748] mb-2">Welcome Back</h2>
                        <p className="text-[#718096] text-sm">Sign in to manage your car service appointments</p>
                    </div>

                    <Card className="border-0 shadow-lg bg-white/50 backdrop-blur-sm">
                        <CardContent className="pt-6">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-sm font-medium text-[#2D3748]">
                                        Email Address
                                    </Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="h-11 border-[#E2E8F0] focus:ring-2 focus:ring-[#4299E1] transition-all duration-200 bg-white text-[#2D3748] placeholder:text-[#A0AEC0]"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="password" className="text-sm font-medium text-[#2D3748]">
                                        Password
                                    </Label>
                                    <Input
                                        id="password"
                                        type="password"
                                        placeholder="Enter your password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                        disabled={isLoading}
                                        className="h-11 border-[#E2E8F0] focus:ring-2 focus:ring-[#4299E1] transition-all duration-200 bg-white text-[#2D3748] placeholder:text-[#A0AEC0]"
                                    />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Checkbox id="remember" disabled={isLoading} className="border-[#E2E8F0] data-[state=checked]:bg-[#4299E1]" />
                                        <Label htmlFor="remember" className="text-sm text-[#718096]">Remember me</Label>
                                    </div>
                                    <Link href="/forgot-password" className="text-sm text-[#4299E1] hover:text-[#2B6CB0] transition-colors">
                                        Forgot password?
                                    </Link>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full h-11 bg-[#4299E1] hover:bg-[#2B6CB0] text-white transition-colors duration-200"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                            Signing in...
                                        </div>
                                    ) : (
                                        "Sign In"
                                    )}
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4 pb-6">
                            <div className="relative w-full py-5">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-[#E2E8F0]"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-[#718096]">Or continue with</span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                variant="outline"
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                                className="w-full h-11 border-[#E2E8F0] hover:bg-[#F7FAFC] transition-all duration-200 flex items-center justify-center gap-2"
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                    />
                                    <path
                                        fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                    />
                                </svg>
                                Sign in with Google
                            </Button>

                            <div className="text-center">
                                <p className="text-sm text-[#718096] mb-4">Don&apos;t have an account?</p>
                                <Link href="/register">
                                    <Button
                                        variant="outline"
                                        className="w-full h-11 border-[#4299E1] text-[#4299E1] hover:bg-[#F7FAFC] hover:border-[#2B6CB0] hover:text-[#2B6CB0] transition-all duration-200"
                                        disabled={isLoading}
                                    >
                                        Create an account
                                    </Button>
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default LoginScreen;