class Api {
  constructor(data) {
    this.url = data.baseUrl;
    this.headers = data.headers;
    this.token = data.token;
  }

  _request(url, options) {
    console.log('url', url);
    console.log('options', options);
    return fetch(url, options).then(this._checkResponse);
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  setToken(token) {
    this.token = token;
    this.headers.authorization = `Bearer ${token}`;
}
  
  addCard(newCardData) {
    return this._request(`${this.url}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({ name: newCardData.name, link: newCardData.link }),
    });
  }

  getInfoAboutMe() {
    console.log('getInfoAboutMe(), headers: ', this.headers);
    return this._request(`${this.url}/users/me`, {
      headers: this.headers,
    });
  }

  getCards() {
    console.log('getCards(), headers: ', this.headers);
    return this._request(`${this.url}/cards`, {
      headers: this.headers,
    });
  }

  updateProfileData(data) {
    return this._request(`${this.url}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({ name: data.name, about: data.about }),
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      return this._request(`${this.url}/cards/${id}/likes`, {
        method: "PUT",
        headers: this.headers,
      });
    } else {
      return this._request(`${this.url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this.headers,
      });
    }
  }

  updateProfileAvatar(data) {
    return this._request(`${this.url}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar: data.avatar
      }),
    });
  }

  deleteCard(cardId) {
    return this._request(`${this.url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this.headers,
    });
  }
}

export const ApiConst = new Api({
  baseUrl: "https://api.s-al-terentev.nomoredomains.work",
  headers: {
    "Content-Type": "application/json",
  },
});
