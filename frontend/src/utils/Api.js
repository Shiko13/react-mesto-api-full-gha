class Api {
  constructor(data) {
    this._url = data.baseUrl;
    this._headers = data.headers;
  }

  _getServerResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  }

  addCard(newCardData) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name: newCardData.name, link: newCardData.link }),
    }).then(this._getServerResponse);
  }

  getInfoAboutMe() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then(this._getServerResponse);
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then(this._getServerResponse);
  }

  updateProfileData(data) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name: data.name, about: data.about }),
    }).then(this._getServerResponse);
  }

  changeLikeCardStatus(id, isLiked) {
    if (!isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._getServerResponse);
    } else {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._getServerResponse);
    }
  }

  updateProfileAvatar(data) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: data.avatar
      }),
    }).then(this._getServerResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._getServerResponse);
  }
}

const api = new Api({
  baseUrl: "https://http://s-al-terentev.nomoredomains.work",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
