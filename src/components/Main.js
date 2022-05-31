import React from "react";
import Card from "./Card";
import { api } from "../utils/api";

function Main({
  onEditAvatarClick,
  onEditProfileClick,
  onAddPlaceClick,
  onCardClick,
}) {
  const [userName, setuserName] = React.useState("");
  const [userAvatar, setuserAvatar] = React.useState("");
  const [userDescription, setuserDescription] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    api
      .getAppInfo()
      .then(([userData, card]) => {
        setuserName(userData.name);
        setuserAvatar(userData.avatar);
        setuserDescription(userData.about);
        setCards(card);
      })
      .catch((error) => console.log(error));
  }, []);


  return (
    <main className="main">
      <section class="profile">
        <div class="profile__container">
          <div class="profile__avatar">
            <button
              type="button"
              className="profile__avatar-button"
              onClick={onEditAvatarClick}
            ></button>
          </div>
          <img src={userAvatar} alt={userAvatar ? userName : ''}   className="profile__image" />
        </div>
        <div className="profile__info">
          <h2 className="profile__name">{userName}</h2>
          <p className="profile__description">{userDescription}</p>
          <button
            onClick={onEditProfileClick}
            type="button"
            id="edit-profile-button"
            className="profile__edit-button"
          ></button>
        </div>
        <button
          onClick={onAddPlaceClick}
          type="button"
          className="profile__add-button"
          id="add-card-button"
        ></button>
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
