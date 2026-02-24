import { useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { login } from "@/state/user/userSlice";
import { setIdentifier, setPassword } from "@/state/user/userSlice";

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
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(login({identifier, password}));
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