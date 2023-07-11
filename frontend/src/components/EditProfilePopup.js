import { useEffect, useState } from "react";
import PopupWithForm from "./PopupWithForm";
import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";

function EditProfilePopup(props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const currentUser = React.useContext(CurrentUserContext);

  useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
  }, [currentUser, props.isOpen]);

  function handleEditName(e) {
    setName(e.target.value);
  }

  function handleEditDescription(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateUser({
      name,
      about: description
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
        value={name || ""}
        onChange={handleEditName}
      />
      <span id="input-edit-title-error" className="popup__error"></span>
      <input
        className="popup__input popup__input_type_subtitle"
        type="text"
        name="about"
        placeholder="Занятие"
        id="input-edit-subtitle"
        minLength="2"
        maxLength="200"
        required
        value={description || ""}
        onChange={handleEditDescription}
      />
      <span id="input-edit-subtitle-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
