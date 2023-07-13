import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
  const [values, setValues] = useState({});

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setValues({});
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onAddPlace({
      name: values.name,
      link: values.link
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
        name="name"
        placeholder="Название"
        id="input-add-title"
        minLength="2"
        maxLength="30"
        required
        value={values.name ?? ""}
        onChange={handleChange}
      />
      <span id="input-add-title-error" className="popup__error"></span>
      <input
        className="popup__input popup__input_type_subtitle"
        type="url"
        name="link"
        placeholder="Ссылка на картинку"
        id="input-add-subtitle"
        required
        value={values.link ?? ""}
        onChange={handleChange}
      />
      <span id="input-add-subtitle-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
