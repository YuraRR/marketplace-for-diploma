import { SupabaseClient } from "@supabase/supabase-js";

export const getUserAuthId = async (supabase: SupabaseClient) => {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  console.log("ID: ", user);
  if (userError) {
    console.error("Помилка отримання сесії:", userError.message);
    throw new Error("Не вдалося отримати сесію користувача");
  }

  if (!user) {
    throw new Error("Користувач не автентифікований");
  }

  return user.id;
};
