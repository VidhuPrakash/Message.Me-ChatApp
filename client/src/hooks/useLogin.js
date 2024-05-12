import React, { useState } from "react";
import axios from "axios";
import { handleLoginInputErrors } from "../utils/handleInputError";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    const success = handleLoginInputErrors({ username, password });
    if (!success) return;

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      const data = await response.json(); // no need for response.json() with axios

      // Check if login was successful
      if (data.error) {
        throw new Error(data.error || "Failed to log in");
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      // Optionally, you can return user data here
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
      console.log("Login Error:", error.message);
      // Rethrow the error to handle it in the component if necessary
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;
