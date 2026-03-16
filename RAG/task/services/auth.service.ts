export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("token") !== null;
};

export const login = () => {
  localStorage.setItem("token", "logged-in");
};

export const logout = () => {
  localStorage.removeItem("token");
};