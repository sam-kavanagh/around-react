import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onDeleteCard }) {
  const cardStyle = { backgroundImage: `url(${card.link})` };

  const currentUser = React.useContext(CurrentUserContext);

  function handleClick() {
    onCardClick(card);
  }

  // Checking if the current user is the owner of the current card
  const isOwn = card.owner._id === currentUser._id;

  // Creating a variable which you'll then set in `className` for the delete button
  const cardDeleteButtonClassName = `element__trash-button ${
    isOwn ? "element__trash-button_visible" : "element__trash-button_hidden"
  }`;

  // Check if the card was liked by the current user
  const isLiked = card.likes.some((user) => user._id === currentUser._id);

  // Create a variable which you then set in `className` for the like button
  const cardLikeButtonClassName = `element__like-button &{isLiked && 'element__like-button_full}`;

  return (
    <article className="element">
      <button
        type="button"
        className={cardDeleteButtonClassName}
        onClick={onDeleteCard}
      />
      <img
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        className="element__image"
        style={cardStyle}
      />
      <div className="element__card">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-container">
          <button type="button" className="element__like-button" />
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
