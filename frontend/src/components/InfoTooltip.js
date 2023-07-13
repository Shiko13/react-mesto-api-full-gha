function InfoTooltip({ isOpen, onClose, image, text }) {
  return (
    <div className={`popup ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button className="popup__close-button" onClick={onClose}></button>
        <img src={image} alt="Успешная/неуспешная картинка" className="popup__tooltip-image"></img>
        <p className="popup__tooltip-text">{text}</p>
      </div>
    </div>
  );
}

export default InfoTooltip;
