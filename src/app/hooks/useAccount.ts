'use client';

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/state/hooks";
import { syncUserData, logout, updateUser, setFirstName, setLastName, setEditingField } from "@/state/user/userSlice";

export const useAccount = () => {
  const dispatch = useAppDispatch();
  const { userName, email, firstName, lastName, editingField }  = useAppSelector(state => state.user);

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
    const updateOptions = {
      firstname: firstName,
      lastname: lastName
    } 
    
    const payload = {
      [field]: updateOptions[field].trim().slice(0, 50)
    };
    
    await dispatch(updateUser(payload));
    await update();

    dispatch(setEditingField(null));
  };

  return {
    userName,
    email,
    firstName,
    lastName,
    editingField,
    dispatch,
    setFirstName,
    setLastName,
    handleSave,
    setEditingField,
    handleLogout
  }
}