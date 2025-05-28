"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { LoginButtons } from "./LoginButtons";
import { CartButton } from "@/components/layout/header/CartButton";
import { SearchBlock } from "./SearchBlock/SearchBlock";
import Link from "next/link";
import { CatalogButton } from "@/components/layout/header/CatalogButton";
import { Backdrop } from "@/components/common/Backdrop";

export const Header = () => {
  const [showTopBar, setShowTopBar] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setShowTopBar(window.scrollY === 0);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-10 flex flex-col items-center w-full pb-1.5 bg-gray-800 shadow-md">
      <div
        className={`w-full  bg-gray-900  transition-all duration-400 ease-in ${
          showTopBar ? "opacity-100 max-h-10 py-0.5" : "opacity-0 max-h-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-4 text-white max-w-[1300px] mx-auto text-xs">
          <span>Працюємо 24/7</span>
          <span>(066) 091 2048</span>
          <div className="flex items-center gap-4 ml-auto">
            <Link className="hover:underline" href={"/cabinet/my-shop"}>
              Продавати з нами
            </Link>
            <Link className="hover:underline" href={"/"}>
              Відстежити замовлення
            </Link>
          </div>
        </div>
      </div>

      <div className="flex flex-col w-full max-w-[1300px] mx-auto gap-1 pt-1.5">
        <nav className="flex flex-wrap items-center justify-between rounded-lg">
          <Link href="/">
            <Image src="/images/logo.png" alt="Logo" width={105} height={30} priority />
          </Link>
          <CatalogButton />
          <SearchBlock />
          <LoginButtons />
          <CartButton />
        </nav>
      </div>
      <Backdrop />
    </header>
  );
};
