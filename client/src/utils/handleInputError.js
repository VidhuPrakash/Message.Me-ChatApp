// signup field validation

export function handleSignupInputErrors({
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

// login field validation
export function handleLoginInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }
  if (password < 6) {
    toast.error("Password must be at least 6 characters long");
    return false;
  }
  return true;
}
