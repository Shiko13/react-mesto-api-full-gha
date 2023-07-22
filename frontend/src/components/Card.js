import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDeleteClick, onCardLike }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((i) => i === currentUser._id);
  const cardLikeButtonClassName = ( 
    `element__like-button ${isLiked && 'element__like-button_active'}` 
  );; 

  function handleClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDeleteClick(card);
  }

  function handleLikeClick() {
    onCardLike(card);
  }

  return (
    <div className="element">
      <img
        className="element__image"
        src={card.link}
        alt={card.name}
        onClick={handleClick}
      />
      {isOwn && (
        <button
          className="element__delete-button element__delete-button_show"
          type="button"
          aria-label="Удалить фотографию"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="element__block">
        <h2 className="element__title">{card.name}</h2>
        <div className="element__like-block">
          <button
            className={cardLikeButtonClassName}
            type="button"
            aria-label="Лайкнуть"
            onClick={handleLikeClick}
          ></button>
          <p className="element__like-counter element__like-counter_active">
            {card.likes.length}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Card;
