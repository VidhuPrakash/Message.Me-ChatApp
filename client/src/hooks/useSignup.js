import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const signup = async ({
    fullname,
    username,
    confirmPassword,
    password,
    gender,
  }) => {
    console.log({
      fullname,
      username,
      confirmPassword,
      password,
      gender,
    });
    const success = handleInputErrors({
      fullname,
      username,
      confirmPassword,
      password,
      gender,
    });
    if (!success) return;
    setLoading(true);
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullname,
          username,
          confirmPassword,
          password,
          gender,
        }),
      });
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error || "Failed to sign up");
      }
      // localstorage
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
      console.log(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, signup };
};

export default useSignup;

function handleInputErrors({
  fullname,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullname || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Password do not match");
    return false;
  }
  if (password < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }
  return true;
}
