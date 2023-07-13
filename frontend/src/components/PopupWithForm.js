function PopupWithForm({ name, title, isOpen, onClose, buttonText, children, onSubmit }) {
  return (
    <div className={`popup popup_${name} ${isOpen ? "popup_opened" : ""}`}>
      <div className="popup__container">
        <button
          className="popup__close-button"
          type="button"
          aria-label="Закрыть"
          onClick={onClose}
        ></button>
        <h2 className="popup__title">{title}</h2>
        <form
          className={`popup__form popup__edit-form`}
          name={name}
          onSubmit={onSubmit}
        >
          {children}
          <button
            className="popup__save-button"
            type="submit"
            aria-label="Сохранить"
            onClick={onClose}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
