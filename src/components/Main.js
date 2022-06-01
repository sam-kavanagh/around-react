import React, { useState, useEffect } from "react";
import Card from "./Card";
import { api } from "../utils/api";

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
}) {
  const [user, setUser] = useState({});
  const [cards, setCards] = useState([]);

  useEffect(() => {
    api
      .getAppInfo()
      .then(([userInfo, card]) => {
        setUser({
          name: userInfo.name,
          avatar: userInfo.avatar,
          about: userInfo.description,
        })
        setCards(card);
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <main className="main">
      <section className="profile">
        <div className="profile__container">
          <div className="profile__avatar">
            <button
              type="button"
              className="profile__avatar-button"
              onClick={onEditAvatarClick}
            />
          </div>
          <img src={user.avatar} alt={user.avatar ? user.name : ''}   className="profile__image" />
        </div>
        <div className="profile__info">
          <h2 className="profile__name">{user.name}</h2>
          <p className="profile__description">{user.description}</p>
          <button
            onClick={onEditProfileClick}
            type="button"
            id="edit-profile-button"
            className="profile__edit-button"
          />
        </div>
        <button
          onClick={onAddPlaceClick}
          type="button"
          className="profile__add-button"
          id="add-card-button"
        />
      </section>
      <section className="card-template">
        <ul className="elements">
          {cards.map((card) => (
            <Card card={card} onCardClick={onCardClick} key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
