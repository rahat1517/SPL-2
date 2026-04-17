
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000/api";
const request = async (path, options = {}) => {
  const auth = JSON.parse(localStorage.getItem("academix-auth") || "{}");
  const headers = {
    "Content-Type": "application/json",
    ...(options.headers || {}),
  };
  if (auth.token) {
    headers.Authorization = `Bearer ${auth.token}`;
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  return response;
};

export default {
  post: (path, body) => request(path, { method: "POST", body: JSON.stringify(body) }),
};