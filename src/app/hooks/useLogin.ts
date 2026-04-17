import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { login } from "@/state/user/userSlice";
import { setIdentifier, setPassword, clearError } from "@/state/user/userSlice";

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const { identifier, password, loading, error }  = useAppSelector(state => state.user);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/account");
    }
  }, [session, router]);

  useEffect(() => {
    if (!error) return;

    const timer = setTimeout(() => {
      dispatch(clearError());
    }, 5000);

    return () => clearTimeout(timer);
  }, [error, dispatch]);
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedIdentifier = identifier.trim().slice(0, 50);
    const trimmedPassword = password.trim().slice(0, 50);
    dispatch(login({identifier: trimmedIdentifier, password: trimmedPassword}));
  };
  
  return {
    dispatch,
    identifier,
    password,
    loading,
    error,
    handleLogin,
    signIn,
    setIdentifier,
    setPassword
  }
}