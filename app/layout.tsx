import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TanstackQueryClientProvider from "@/src/core/shared/provider/query-client-provider";
import ProtectedLayout from "@/src/core/shared/layout/protected-layout";
import { Toaster } from "sonner";
import { ThemeProvider } from "@/src/core/theme/theme-provider";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "@/src/core/util/constant";
import { Suspense } from "react";



const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});



//servislaj
export const metadata: Metadata = {
  title: "ServisLah Admin",
  description: "ServisLah Admin",
  openGraph: {
    title: "ServisLah Admin",
    description: "ServisLah Admin",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ServisLah Admin",
    description: "ServisLah Admin",
  },
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" }
  ],
  icons: {
    icon: "/images/favicon.ico",
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className="light"
      style={{ colorScheme: "light" }}
    >
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
        >
          <TanstackQueryClientProvider>
            <GoogleOAuthProvider
              clientId={GOOGLE_CLIENT_ID || ''}
            >
              <ProtectedLayout>
                <Suspense>
                  {children}
                </Suspense>
              </ProtectedLayout>
            </GoogleOAuthProvider>
            <Toaster />

          </TanstackQueryClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
