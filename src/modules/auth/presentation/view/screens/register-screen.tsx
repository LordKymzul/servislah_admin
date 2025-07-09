"use client"

import { useState } from "react";
import { Button } from "../../../../../../components/ui/button";
import { Input } from "../../../../../../components/ui/input";
import { Card, CardContent, CardFooter } from "../../../../../../components/ui/card";
import { Label } from "../../../../../../components/ui/label";
import Link from "next/link";
import { useAuthTanstack } from "../../tanstack/auth-tanstack";

const RegisterScreen = () => {
    const { registerMutation, isLoading } = useAuthTanstack();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        registerMutation.mutate({
            email,
            password,
            platform: "CREDENTIAL" as const,
            role: "ADMIN" as const
        });
    }

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

            {/* Right Section - Register Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-[#2D3748] mb-2">Create Account</h2>
                        <p className="text-[#718096] text-sm">Sign up to start managing car services</p>
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

                                <Button
                                    type="submit"
                                    className="w-full h-11 bg-[#4299E1] hover:bg-[#2B6CB0] text-white transition-colors duration-200"
                                    disabled={isLoading}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center justify-center">
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                                            Creating account...
                                        </div>
                                    ) : (
                                        "Create Account"
                                    )}
                                </Button>
                            </form>
                        </CardContent>

                        <CardFooter className="flex flex-col space-y-4 pb-6">
                            <div className="text-center">
                                <p className="text-sm text-[#718096] mb-4">Already have an account?</p>
                                <Link href="/login">
                                    <Button
                                        variant="outline"
                                        className="w-full h-11 border-[#4299E1] text-[#4299E1] hover:bg-[#F7FAFC] hover:border-[#2B6CB0] hover:text-[#2B6CB0] transition-all duration-200"
                                        disabled={isLoading}
                                    >
                                        Sign in
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

export default RegisterScreen;  