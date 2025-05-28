"use client";

import { useAppSelector } from "@/store/store";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useEffect, useState } from "react";

export const LoginButtons = () => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="relative flex items-center justify-end gap-2 cursor-pointer min-w-[140px]">
      <div className="flex flex-col">
        {!isAuthenticated || !user ? (
          <div className="flex justify-between gap-1 font-bold text-white">
            <Link href={"/login"}>Вхід</Link>
            <span>/</span>
            <Link href={"/register"}>Реєстрація</Link>
          </div>
        ) : (
          <Link
            href={"/cabinet"}
            className="flex gap-3 p-2 transition-all duration-300 rounded-lg hover:bg-gray-700"
          >
            <FontAwesomeIcon className="text-2xl text-light-gray-bg" icon={faUser} />

            <div className="flex items-center gap-2 text-white ">
              <span>{user.name}</span>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};
