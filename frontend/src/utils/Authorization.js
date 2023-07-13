export const url = "https://auth.nomoreparties.co";

export const authorizate = (email, password) => {
  return fetch(`${url}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const registrate = (email, password) => {
  return fetch(`${url}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const checkToken = (token) => {
  return fetch(`${url}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
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
