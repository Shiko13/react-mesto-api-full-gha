export const url = "https://s-al-terentev.nomoredomains.work";

export const authorizate = (email, password) => {
  const test = fetch(`${url}/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
  console.log('test ', test);
  return fetch(`${url}/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then((res) => checkResponse(res));
};

export const registrate = (email, password) => {
  return fetch(`${url}/sign-up`, {
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
  console.log('checkResponse', res);
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
  console.log('checkResponse to json', res.json());
  return res.json();
};
