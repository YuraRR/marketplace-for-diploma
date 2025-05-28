import { useAppDispatch } from "@/store/store";
import { openBackdrop, closeBackdrop } from "@/store/slices/backdropSlice";

export const useBackdrop = () => {
  const dispatch = useAppDispatch();

  const open = () => {
    dispatch(openBackdrop());
  };

  const close = () => {
    dispatch(closeBackdrop());
  };

  return { open, close };
};
