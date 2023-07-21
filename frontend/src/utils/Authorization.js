class Authorization {
  constructor(data) {
    this.url = data.baseUrl;
    this.headers = data.headers;
  }

_request(url, options) {
  return fetch(url, options).then(this._checkResponse);
}

_checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

authorizate = (email, password) => {
  return this._request(`${this.url}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
  },
    body: JSON.stringify({ email, password }),
  });
};

registrate = (email, password) => {
  return this._request(`${this.url}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
  },
    body: JSON.stringify({ email, password }),
  });
};

checkToken(jwt) {
  return this._request(`${this.url}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`
    },
  })
};
}

export const Auth = new Authorization({
  baseUrl: "https://api.s-al-terentev.nomoredomains.work",
  headers: {
    "Content-Type": "application/json",
  },
});
