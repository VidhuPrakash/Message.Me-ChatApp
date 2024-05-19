import React, { useState } from "react";
import GenderCheckbox from "./GenderCheckbox";
import { Link } from "react-router-dom";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [input, setInput] = useState({
    fullname: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });
  const { loading, signup } = useSignup();
  const handleCheckboxChange = (gender) => {
    setInput({ ...input, gender });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(input);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      {" "}
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        {" "}
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Sign Up <span className="text-red-500"> ChatMe</span>{" "}
        </h1>{" "}
        <form onSubmit={handleSubmit}>
          {" "}
          <div>
            {" "}
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>{" "}
            </label>{" "}
            <input
              type="text"
              placeholder=""
              className="w-full input input-bordered  h-10"
              value={input.fullname}
              onChange={(e) =>
                setInput({
                  ...input,
                  fullname: e.target.value,
                })
              }
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <label className="label p-2 ">
              <span className="text-base label-text">Username</span>{" "}
            </label>{" "}
            <input
              type="text"
              placeholder=""
              className="w-full input input-bordered h-10"
              value={input.username}
              onChange={(e) =>
                setInput({
                  ...input,
                  username: e.target.value,
                })
              }
            />{" "}
          </div>{" "}
          <div>
            {" "}
            <label className="label">
              <span className="text-base label-text">Password</span>{" "}
            </label>{" "}
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={input.password}
              onChange={(e) =>
                setInput({
                  ...input,
                  password: e.target.value,
                })
              }
            />
          </div>
          <div>
            <label className="label">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="password"
              placeholder="Confirm Password"
              className="w-full input input-bordered h-10"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({
                  ...input,
                  confirmPassword: e.target.value,
                })
              }
            />
          </div>
          <GenderCheckbox
            onCheckBoxChange={handleCheckboxChange}
            selectGender={input.gender}
          />
          <Link
            className="text-sm hover:underline hover:text-red-600 mt-2 inline-block"
            to="/login"
          >
            Already have an account?
          </Link>
          <div>
            <button
              className="btn btn-block btn-sm mt-2 border border-slate-700"
              disabled={loading}
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Sign up"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
