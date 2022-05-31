import React from "react";

function Card({ card, onCardClick, onDeleteCard }) {
  const cardStyle = { backgroundImage: `url(${card.link})` };

  function handleClick() {
    onCardClick(card);
  }

  return (
    <article className="element">
      <button
        type="button"
        className="element__trash-button"
        onClick={onDeleteCard}
      ></button>
      <img
        src={card.link}
        alt={card.name}
        onClick={handleClick}
        className="element__image"
        style={cardStyle}
      />
      <div class="element__card">
        <h2 class="element__title">{card.name}</h2>
        <div class="element__like-container">
          <button type="button" class="element__like-button"></button>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}

export default Card;
