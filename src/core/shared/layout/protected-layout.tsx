'use client'
import { useAuthTanstack } from '@/src/modules/auth/presentation/tanstack/auth-tanstack';
import { Loader2 } from 'lucide-react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

interface ProtectedLayoutProps {
    children: React.ReactNode
}

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    const { isAuthenticated, isLoading } = useAuthTanstack()
    const router = useRouter()
    const pathname = usePathname()
    const searchParams = useSearchParams()

    const isDashboardRoute = pathname.startsWith('/dashboard');

    useEffect(() => {
        if (!isLoading) {
            if (isDashboardRoute && !isAuthenticated) {
                // Fix: Ensure proper URL construction for redirect
                router.push(`/login`);
            } else if (isAuthenticated) {
                const redirectTo = searchParams.get('redirect');
                if (redirectTo) {
                    // Fix: Ensure we're handling the redirect path correctly
                    router.replace(redirectTo);
                    return;
                }

                if (pathname === '/login' || pathname === '/register') {
                    router.replace('/dashboard');
                }
            }
        }
    }, [isAuthenticated, isLoading, isDashboardRoute, pathname, router, searchParams])

    if (isLoading && isDashboardRoute) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <Loader2 className="w-10 h-10 animate-spin" />
            </div>
        );
    }

    if (isDashboardRoute && !isAuthenticated && !isLoading) {
        return null;
    }

    return <>{children}</>;
}