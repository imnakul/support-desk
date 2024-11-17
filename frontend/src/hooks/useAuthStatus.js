import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// using selector to select a user from state/ Redux to check if we are login or not

export const useAuthStatus = () => {
   const [loggedIn, setLoggedIn] = useState(false);
   const [checkingStatus, setCheckingStatus] = useState(true);

   const { user } = useSelector((state) => state.auth);

   useEffect(() => {
      if (user) {
         setLoggedIn(true);
      } else {
         setLoggedIn(false);
      }
      setCheckingStatus(false);
   }, [user]);

   return { loggedIn, checkingStatus };
};
