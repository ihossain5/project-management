import { useEffect, useState } from "react";
import { projectAuth, projectFirestore } from "../firebase/config";
import useAuthContext from "./useAuthContext";

const useLogOut = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  const [isCancelled, setIsCancelled] = useState(false);

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign the user out
    try {
      // update online status
      const { uid } = projectAuth.currentUser;
      await projectFirestore
        .collection("users")
        .doc(uid)
        .update({ online: false });

      await projectAuth.signOut();

      //dispatch  logout action
      dispatch({ type: "LOGOUT" });
      // update state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);
  return { logout, error, isPending };
};

export default useLogOut;
