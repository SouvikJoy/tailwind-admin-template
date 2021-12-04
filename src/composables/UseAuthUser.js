import useSupabase from '@/composables/UseSupabase';
import { ref } from 'vue';

const user = ref(null);

export default function useAuthUser() {
  const { supabase } = useSupabase();

  const login = async({ email, password }) => {
    const { user, error } = await supabase.auth.signIn({ email, password });
    if (error) throw error;


    return user;
  };

  const loginWithRefreshToken = async(token) => {
    const { user, error } = await supabase.auth.signIn({ refreshToken: token });
    if (error) throw error;
    return user;
  };

  // eslint-disable-next-line no-unused-vars
  const loginWithSocialProvider = async(token) => {
        // eslint-disable-next-line no-undef
    const { user, error } = await supabase.auth.signIn({
      provider: 'github',
    });
    if (error) throw error;
    return user;
  };

  const logout = async() => {
    const { error } = supabase.auth.signOut();
    if (error) throw error;
  };

  const isLoggedIn = () => {
    return !!user.value;
  };

  const register = async({ email, password, ...meta }) => {
    const { user, error } = await supabase.auth.signUp(
      { email, password },
      {
        data: meta,
        redirectTo: `${window.location.origin}/me?fromEmail=registrationConfirmation"`,
      }
    );
    if (error) throw error;
    return user;
  };

  const update = async(data) => {
    const { user, error } = await supabase.auth.update(data);
    if (error) throw error;
    return user;
  };

  const sendPasswordRestEmail = async(email) => {
    const { user, error } = await supabase.auth.api.resetPasswordForEmail(
      email
    );
    if (error) throw error;
    return user;
  };

  // eslint-disable-next-line no-unused-vars
  const maybeHandleEmailConfirmation = async(route) => {};
  return {
    user,
    login,
    loginWithSocialProvider,
    loginWithRefreshToken,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordRestEmail,
    maybeHandleEmailConfirmation,
  };
}
