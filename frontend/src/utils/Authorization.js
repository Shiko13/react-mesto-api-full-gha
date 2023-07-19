export const url = "https://api.s-al-terentev.nomoredomains.work";

export const authorizate = (email, password) => {
  return fetch(`${url}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => {
    if (res.token) {
      localStorage.setItem('token', res.token);
      return res.token;
    }
  });
};

export const registrate = (email, password) => {
  return fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const checkToken = (token) => {
  return fetch(`${url}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
  })
    .then((res) => checkResponse(res))
    .then((data) => data);
};

const checkResponse = (res) => {
  if (!res.ok) {
    return res
      .json()
      .then((data) => ({
        data: data,
      }))
      .then((res) => {
        return Promise.reject(`Ошибка: ${res.data.error || res.data.message}`);
      });
  }
  return res.json();
};
