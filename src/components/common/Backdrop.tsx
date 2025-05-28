"use client";

import { useAppSelector, useAppDispatch } from "@/store/store";
import { closeBackdrop } from "@/store/slices/backdropSlice";
import { useRef } from "react";

export const Backdrop = () => {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector((state) => state.backdrop);
  const searchBlockRef = useRef<HTMLDivElement>(null);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (searchBlockRef.current && searchBlockRef.current.contains(e.target as Node)) {
      e.stopPropagation(); // Предотвращаем закрытие при клике внутри SearchBlock
    } else {
      dispatch(closeBackdrop());
    }
  };

  return (
    <div
      className="fixed inset-0 transition-opacity duration-200 ease-in-out bg-black"
      style={{ opacity: isOpen ? 0.33 : 0, pointerEvents: isOpen ? "auto" : "none", zIndex: 20 }}
      onClick={handleBackdropClick}
    />
  );
};
