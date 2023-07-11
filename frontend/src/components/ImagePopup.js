function ImagePopup({ card, onClose }) {
  return (
    <div className={`popup popup_zoom-card ${card.link ? "popup_opened" : " "}`}>
      <form className="zoom">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <img
          className="zoom__image"
          src={card ? card.link : ""}
          alt={card ? card.name : ""}
        />
        <h2 className="zoom__title">{card ? card.name : ""}</h2>
      </form>
    </div>
  );
}

export default ImagePopup;
