import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    setName("");
    setImage("");
  }, [props.isOpen]);

  function handleSetName(e) {
    setName(e.target.value);
  }

  function handleSetImage(e) {
    setImage(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name,
      link: image
    });
  }

  return (
    <PopupWithForm
          name="add-card"
          title="Новое место"
          buttonText="Создать"
          isOpen={props.isOpen}
          onClose={props.onClose}
          onSubmit={handleSubmit}
        >
          <input
            className="popup__input popup__input_type_title"
            type="text"
            name="title"
            placeholder="Название"
            id="input-add-title"
            minLength="2"
            maxLength="30"
            required
            value={name || ""}
            onChange={handleSetName}
          />
          <span id="input-add-title-error" className="popup__error"></span>
          <input
            className="popup__input popup__input_type_subtitle"
            type="url"
            name="subtitle"
            placeholder="Ссылка на картинку"
            id="input-add-subtitle"
            required
            value={image}
            onChange={handleSetImage}
          />
          <span id="input-add-subtitle-error" className="popup__error"></span>
        </PopupWithForm>
  );
}

export default AddPlacePopup;
