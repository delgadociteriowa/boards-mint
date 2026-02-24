'use client';

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { syncUserData, logout, updateUser, setFirstName, setLastName, setEditingFirst, setEditingLast } from "@/state/user/userSlice";

type UserPayload = Partial<{
  firstname: string;
  lastname: string;
}>;

export const useAccount = () => {
  const dispatch = useAppDispatch();
  const { userName, email, firstName, lastName, editingFirst, editingLast }  = useAppSelector(state => state.user);

  const { data: session, status, update } = useSession();
  const router = useRouter();

  useEffect(() => {
    const syncSessionToState = () => {
      if (status === "loading") return;

      if (status === "unauthenticated") {
        router.push("/login");
        return
      }

      if (status === "authenticated" && session) {
        dispatch(syncUserData(
          {
            userName: session.user.username,
            firstName: session.user.firstname,
            lastName: session.user.lastname,
            email: session.user.email || '',
          }
        ))
      }
      
    }
    syncSessionToState();
  }, [status, session, dispatch, router]);

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleSave = async (field: "firstname" | "lastname") => {
    const payload: UserPayload = {
      [field]: field === "firstname" ? firstName : lastName,
    };

    await dispatch(updateUser(payload));
    await update();

    field === "firstname"
      ? dispatch(setEditingFirst(false))
      : dispatch(setEditingLast(false));
  };

  return {
    userName,
    email,
    firstName,
    lastName,
    editingFirst,
    editingLast,
    dispatch,
    setFirstName,
    setLastName,
    handleSave,
    setEditingFirst,
    setEditingLast,
    handleLogout
  }
}