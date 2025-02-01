"use client";
import "./globals.css";
// import Navbar from "@/components/Navbar/page";
// import Footer from "@/components/Footer/page";
// import { usePathname } from "next/navigation";
import { initializeAuthState } from "@/store/auth";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // const pathname = usePathname();
  // const noLayoutRoutes = ["/login", "/signup", "/forgot-password", "/reset-password", "/profile", "/dashboard"];
  // const shouldHideLayout = noLayoutRoutes.includes(pathname);

  useEffect(() => {
    initializeAuthState(); // Initialize the auth state on page load
  }, []);

  return (
    <html lang="en" className="dark">
      <body>
        <Toaster position="top-right" />
        {/* {!shouldHideLayout && <Navbar />} */}
        <main>{children}</main>
        {/* {!shouldHideLayout && <Footer />} */}
      </body>
    </html>
  );
}
