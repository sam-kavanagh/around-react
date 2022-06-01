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
          <button type="button" className="element__like-button"/>
          <p className="element__like-count">{card.likes.length}</p>
        </div>
      </div>
    </article>
  );
}


export default Card;
