"use client";

import { Header } from "@/components/layout/header/Header";

import "@/styles/globals.css";
import "nprogress/nprogress.css";

import { Inter } from "next/font/google";
import { Breadcrumb } from "@/components/layout/header/Breadcrumb";
import { store } from "@/store/store";
import { Provider } from "react-redux";
import { Toaster } from "sonner";
import Footer from "@/components/layout/footer/Footer";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-primary-bg ${inter.className}`}>
        <Provider store={store}>
          <Header />
          <div className="container max-w-[1300px] z-10 flex flex-col items-center justify-center mx-auto">
            <Breadcrumb />
            {children}
            <Footer />
          </div>
          <Toaster richColors />
        </Provider>
      </body>
    </html>
  );
}
