class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
    
    _handleServerResponse(res) {
    return res.ok? res.json() : Promise.reject(`Error: ${res.status}`);
    }
  
    getAppInfo() {
    return Promise.all([api.getUserInfo(), api.getInitialCardList()]);
    }
    
    getUserInfo() {
     return fetch(`${this._baseUrl}/users/me`, {
       headers: this._headers,
      }).then(this._handleServerResponse);
    }
    
    patchUserInfo({name, description: about}) {
     return fetch(`${this._baseUrl}/users/me`, {
       headers: this._headers,
       method: "PATCH",
       body: JSON.stringify({
         name,
         about,
       }),
     }).then(this._handleServerResponse);
    }
    
    getInitialCardList() {
     return fetch (`${this._baseUrl}/cards`, {
       headers: this._headers,
     }).then(this._handleServerResponse);
    }
    
    addCard({name, link}) {
      return fetch (`${this._baseUrl}/cards`, {
        headers: this._headers,
        method: "POST",
        body: JSON.stringify({
          name,
          link,
        }),
      }).then(this._handleServerResponse);
    }
  
    addLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._handleServerResponse);
    }
  
    removeLike(cardId) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._handleServerResponse);
    }
  
    setUserAvatar({avatar}) {
     return fetch (`${this._baseUrl}/users/me/avatar `, {
       headers: this._headers,
       method: "PATCH",
       body: JSON.stringify({ 
        avatar,
        }),
      }).then(this._handleServerResponse);
    }
  
  
    deleteCard(cardId) {
     return fetch (`${this._baseUrl}/cards/${cardId}`, {
       headers: this._headers,
       method: "DELETE"
     }).then(this._handleServerResponse);
    }
    
    changeLikeCardStatus(cardId, like) {
      return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
        headers: this._headers,
        method: like ? "PUT" : "DELETE",
        body: JSON.stringify(),
      }).then(this._handleServerResponse);
    }
  }
  
  export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/group-12",
    headers: {
      authorization: "816a5952-0b40-4365-b524-9e18859b6d37",
      "Content-Type": "application/json",
    },
  });

  export default Api;