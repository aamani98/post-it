const key = "accessToken";

export const storeToken = (token) => {
  localStorage.setItem(key, token);
};

export const getToken = () => {
  return localStorage.getItem(key);
};

export const removeToken = () => {
  localStorage.removeItem(key);
};
