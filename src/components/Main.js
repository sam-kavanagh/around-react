import React from "react";
import Card from "./Card";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards,
}) {
  const currentUser = React.useContext(CurrentUserContext);

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
          <img
            src={currentUser.avatar}
            alt={currentUser.avatar ? currentUser.name : ""}
            className="profile__image"
          />
        </div>
        <div className="profile__info">
          <h2 className="profile__name">{currentUser.name}</h2>
          <p className="profile__description">{currentUser.about}</p>
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
            <Card card={card} onCardClick={onCardClick} onCardLike={onCardLike} onCardDelete={onCardDelete} key={card._id} />
          ))}
        </ul>
      </section>
    </main>
  );
}

export default Main;
