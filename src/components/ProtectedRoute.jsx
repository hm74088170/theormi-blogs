import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const ProtectedRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);
  const [isAdmin, setIsAdmin] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const checkAdmin = async () => {
      if (user) {
        console.log("User logged in:", user.email);
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          const userData = snap.data();
          console.log("User Firestore data:", userData);
          setIsAdmin(userData.isAdmin === true);
        } else {
          console.log("No user document found.");
          setIsAdmin(false);
        }
      }
    };

    if (user) checkAdmin();
  }, [user]);

  if (loading || (user && isAdmin === null)) {
    return <p>Loading...</p>;
  }

  if (!user || !isAdmin) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
