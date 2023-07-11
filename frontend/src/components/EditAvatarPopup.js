import PopupWithForm from "./PopupWithForm";
import { useRef, useEffect } from "react";

function EditAvatarPopup(props) {
  const refEditAvatar = useRef();

  useEffect(() => {
    if (props.isOpen === false) return;
    refEditAvatar.current.value = "";
  }, [props.isOpen]);

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: refEditAvatar.current.value,
    });
  }

  return (
    <PopupWithForm
      name="edit-avatar"
      title="Обновить аватар"
      buttonText="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        ref={refEditAvatar}
        className="popup__input popup__input_type_subtitle"
        type="url"
        name="link"
        placeholder="Ссылка на изображение"
        id="input-add-avatar"
        required
      />
      <span id="input-add-avatar-error" className="popup__error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
