import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [values, setValues] = useState({});
  const currentUser = React.useContext(CurrentUserContext);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    setValues({ name: currentUser.name, description: currentUser.about });
  }, [currentUser, props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name: values.name,
      about: values.description
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__input popup__input_type_title"
        type="text"
        name="name"
        placeholder="Имя"
        id="input-edit-title"
        minLength="2"
        maxLength="40"
        required
        value={values.name ?? ""}
        onChange={handleChange}
      />
      <span id="input-edit-title-error" className="popup__error"></span>
      <input
        className="popup__input popup__input_type_subtitle"
        type="text"
        name="description"
        placeholder="Занятие"
        id="input-edit-subtitle"
        minLength="2"
        maxLength="200"
        required
        value={values.description ?? ""}
        onChange={handleChange}
      />
      <span id="input-edit-subtitle-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
