import { createClient } from "@/utils/supabase/client";

export const signUp = async (email: string, name: string, password: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { name },
      emailRedirectTo: `${location.origin}/auth/callback`,
    },
  });
  console.log(error);
  if (error) {
    return { data, error };
  }

  if (data.user) {
    const { error: insertError } = await supabase.from("profiles").insert({
      auth_id: data.user.id,
      email: data.user.email,
      first_name: name,
    });

    if (insertError) {
      console.error("Error inserting user into custom table:", insertError.message);

      return { data, error: insertError };
    }
  }
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error || !data.user) {
    return { data: null, error };
  }

  const name = data.user?.user_metadata?.name || "Котик";
  return { data, name, error };
};

export const signOut = async () => {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();
  return { error };
};
